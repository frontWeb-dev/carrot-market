import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

// 로그인 된 유저 정보 확인
async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  if (request.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favorite: true,
          },
        },
      },
    });
    response.json({
      ok: true,
      products,
    });
  }

  if (request.method === 'POST') {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = request;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    response.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
