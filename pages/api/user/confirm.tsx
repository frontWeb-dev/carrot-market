import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { withHandler, ResponseType } from '@libs/server/withHandler';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { token } = request.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!foundToken) return response.status(404).end();

  request.session.user = {
    id: foundToken.userId,
  };

  await request.session.save();

  // 같은 userId를 가진 token 모두 삭제
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  response.json({
    ok: true,
  });
}

export default withApiSession(withHandler('POST', handler));
