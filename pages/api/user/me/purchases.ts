import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = request;

  const purchases = await client.purchase.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favorite: true,
            },
          },
        },
      },
    },
  });

  response.json({
    ok: true,
    purchases,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
