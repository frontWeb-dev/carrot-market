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

  const message = await client.chatMessage.create({
    data: {
      message: body.message,
      Chat: {
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

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
