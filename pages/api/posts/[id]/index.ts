import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/* 
  Todo. 동네 생활 질문 GET API
  query.id를 통해 해당 데이터 가져오기
  해당 데이터에 user id, name, avatar 같이 내보내기
  궁금해요와 답변 갯수 같이 내보내기
  - 답변 : 답변을 쓴 유저 정보 같이 내보내기
*/

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = request;

  if (!id) return response.status(404).json({ ok: false });

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  });

  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  response.json({
    ok: true,
    post,
    isWondering,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
