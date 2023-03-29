import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { phone, email } = request.body;
  const user = phone ? { phone: +phone } : email ? { email: email } : null;

  if (!user) return response.status(400).json({ ok: false });

  const payload = String(Math.random()).substring(2, 8);
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

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.PHONE_NUMBER!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message);
  }
  return response.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
