import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = request;

  if (!id) return response.status(400).json({ ok: false });

  const stream = await client.stream.findUnique({
    where: {
      id: +id?.toString(),
    },
    include: {
      message: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  response.json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
