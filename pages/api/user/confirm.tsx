import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { token } = request.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) response.status(404).end();
  request.session.user = {
    id: exists?.userId,
  };

  await request.session.save();
  response.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrot-session',
  password: process.env.IRON_PW!,
});
