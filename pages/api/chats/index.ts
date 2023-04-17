import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  if (request.method === 'GET') {
    const {
      session: { user },
    } = request;

    const sellerData = await client.chat.findMany({
      where: {
        sellerId: user?.id,
      },
      include: {
        message: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            message: true,
          },
        },
        seller: true,
        shopper: true,
      },
    });

    const shopperData = await client.chat.findMany({
      where: {
        shopperId: user?.id,
      },
      include: {
        message: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            message: true,
          },
        },
        seller: true,
        shopper: true,
      },
    });

    response.json({
      ok: true,
      sellerData,
      shopperData,
    });
  }

  if (request.method === 'POST') {
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
