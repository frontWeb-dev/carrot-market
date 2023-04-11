import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = request;

  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  response.json({
    ok: true,
    sales,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
