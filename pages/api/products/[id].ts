import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

// 로그인 된 유저 정보 확인
async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { id } = request.query;
  const product = await client.product.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  response.json({ ok: true, product });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
