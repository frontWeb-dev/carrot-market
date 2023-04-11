import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

// 로그인 된 유저 정보 확인
async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const profile = await client.user.findUnique({
    where: {
      id: request.session.user?.id,
    },
  });

  if (!profile) return response.json({ ok: false });

  response.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
