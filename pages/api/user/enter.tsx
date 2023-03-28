import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { phone, email } = request.body;
  const user = phone ? { phone: +phone } : email ? { email: email } : null;

  if (!user) return response.status(400).json({ ok: false });

  const token = await client.token.create({
    data: {
      payload: String(Math.random()).substring(2, 8),
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });

  return response.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
