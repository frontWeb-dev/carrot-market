import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { id } = request.query;
  const stringId = +id!.toString();
  const product = await client.product.findUnique({
    where: {
      id: stringId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: stringId,
        },
      },
    },
    take: 4,
  });

  response.json({ ok: true, product, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
