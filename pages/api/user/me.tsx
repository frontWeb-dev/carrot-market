import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  console.log(request.session.user);
  const profile = await client.user.findUnique({
    where: {
      id: request.session.user?.id,
    },
  });

  response.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'carrot-session',
  password: process.env.IRON_PW!,
});
