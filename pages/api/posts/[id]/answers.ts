import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/* 
  Todo. 동네 생활 답변 등록 API
  question과 session user 정보 가져오기
  question과 session user id를 연결하여 데이터 생성 
*/

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { answer },
    session: { user },
  } = request;

  if (!id) return response.status(404).json({ ok: false });

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) return response.status(404).json({ ok: false });

  const answerData = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id?.toString(),
        },
      },
      answer,
    },
  });

  response.json({
    ok: true,
    answer: answerData,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
