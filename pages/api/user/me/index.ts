import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

// 로그인 된 유저 정보 확인
async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  if (request.method === 'GET') {
    const {
      session: { user },
    } = request;

    const profile = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!profile) return response.json({ ok: false });

    response.json({
      ok: true,
      profile,
    });
  }

  if (request.method === 'POST') {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = request;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return response.json({
          ok: false,
          error: 'Email already taken.',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return response.json({
          ok: false,
          error: 'Phone already in use.',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }
    response.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
