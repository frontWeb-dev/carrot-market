import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { phone, email } = request.body;
  const payload = phone ? { phone: +phone } : { email: email };

  const token = await client.token.create({
    data: {
      payload: String(Math.floor(Math.random() * 10000)),
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: 'Anonymous',
            ...payload,
          },
        },
      },
    },
  });

  console.log(token);

  /* if (email) {
    user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) console.log('유저 정보를 찾았습니다.');
    if (!user) {
      console.log('유저 정보가 없습니다. 새로 생성합니다');
      user = await client.user.create({
        data: {
          name: 'Anonymous',
          email: email,
        },
      });
    }
    console.log(user);
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log('유저 정보를 찾았습니다.');
    if (!user) {
      console.log('유저 정보가 없습니다. 새로 생성합니다');
      user = await client.user.create({
        data: {
          name: 'Anonymous',
          phone: +phone,
        },
      });
    }
    console.log(user);
  }
*/

  return response.status(200).end();
}

export default withHandler('POST', handler);
