import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = request;

  const reviews = await client.review.findMany({
    where: {
      createForId: user?.id,
    },
    include: {
      createBy: {
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
    reviews,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
