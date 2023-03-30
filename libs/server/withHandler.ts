import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigType {
  methods: method[];
  handler: (request: NextApiRequest, response: NextApiResponse) => void;
  isPrivate?: boolean;
}

export function withHandler({ methods, handler, isPrivate = true }: ConfigType) {
  return async function (request: NextApiRequest, response: NextApiResponse): Promise<any> {
    if (request.method && !methods.includes(request.method as any)) {
      return response.status(405).end();
    }
    if (isPrivate && !request.session.user) {
      return response.status(401).json({ ok: false });
    }
    try {
      handler(request, response);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error });
    }
  };
}
