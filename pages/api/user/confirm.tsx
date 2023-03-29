import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  const { token } = request.body;
  console.log(token);

  response.status(200).end();
}
export default withHandler('POST', handler);
