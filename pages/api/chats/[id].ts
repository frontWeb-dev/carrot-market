import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { ChatMessage } from '@prisma/client';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
    body,
  } = request;

  if (!id) return response.json({ ok: false });

  if (request.method === 'GET') {
    const messages = await client.chat.findUnique({
      where: {
        id: +id?.toString(),
      },
      include: {
        message: {
          select: {
            user: true,
            message: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        shopper: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    response.json({ ok: true, messages });
  }

  if (request.method === 'POST') {
    const message = await client.message.create({
      data: {
        message: body.message,
        stream: {
          connect: {
            id: +id?.toString()!,
          },
        },
        user: {
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
