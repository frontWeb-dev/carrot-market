import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/* 
  Todo. 동네 생활 질문 - 궁금해요 API
  이미 궁금해요 버튼을 눌렀는지 확인 
    -> 눌렀을 경우, 해당 id 삭제 (delete)
    -> 누르지 않은 경우, 해당 id 추가 (create)

*/

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = request;

  if (!id || !user) return response.status(404).json({ ok: false });

  const alreadyExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (alreadyExists) {
    await client.wondering.delete({
      where: { id: alreadyExists.id },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
