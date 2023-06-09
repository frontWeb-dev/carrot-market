import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const data = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload
    `,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
        },
      }
    )
  ).json();

  response.json({
    ok: true,
    ...data.result,
  });
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
