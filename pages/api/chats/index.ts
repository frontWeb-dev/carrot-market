import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  if (request.method === 'GET') {
    const {
      session: { user },
    } = request;

    const sellerChats = await client.chat.findMany({
      where: {
        sellerId: user?.id,
      },
      include: {
        shopper: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        message: true,
      },
    });

    const shopperChats = await client.chat.findMany({
      where: {
        shopperId: user?.id,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    response.json({
      ok: true,
      sellerChats,
      shopperChats,
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
