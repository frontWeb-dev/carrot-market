import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    body: { name, description, price },
    query: { page },
  } = request;

  if (request.method === 'GET') {
    if (!request.query.page) {
      const streams = await client.stream.findMany();
      response.json({ ok: true, streams });
    } else {
      const streams = await client.stream.findMany({
        take: 10,
        skip: 10 * (+page! - 1),
      });
      response.json({ ok: true, streams });
    }
  }

  if (request.method === 'POST') {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json();

    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
        name,
        price: +price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    response.json({
      ok: true,
      stream,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
