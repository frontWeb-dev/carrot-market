import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/* 
  Todo. 동네 생활 질문 등록 API
  question과 session user 정보 가져오기
  question과 session user id를 연결하여 데이터 생성 
*/

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    body: { question },
    session: { user },
  } = request;

  const post = await client.post.create({
    data: {
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  response.json({
    ok: true,
    post,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
