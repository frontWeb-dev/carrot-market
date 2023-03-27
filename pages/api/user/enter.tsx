import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@/libs/server/withHandler';
import client from '@/libs/server/client';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log(request.body);
  response.status(200).end();
}

export default withHandler('POST', handler);
