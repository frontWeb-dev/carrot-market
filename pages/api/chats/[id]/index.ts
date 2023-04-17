import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { ChatMessage } from '@prisma/client';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
    body: { seller },
  } = request;

  // chat
  if (request.method === 'GET') {
    const messages = await client.chat.findUnique({
      where: {
        id: +id?.toString()!,
      },
      include: {
        message: {
          include: {
            user: true,
          },
        },
        shopper: true,
        seller: true,
      },
    });

    response.json({ ok: true, messages });
  }

  // talk to seller
  if (request.method === 'POST') {
    const message = await client.chat.create({
      data: {
        product: {
          connect: {
            id: +id?.toString()!,
          },
        },
        seller: {
          connect: {
            id: seller,
          },
        },
        shopper: {
          connect: {
            id: user?.id!,
          },
        },
      },
    });

    response.json({
      ok: true,
      message,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
