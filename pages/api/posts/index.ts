import { NextApiRequest, NextApiResponse } from 'next';
import { withHandler, ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

/* 
  Todo. 동네 생활 질문 등록 API
  - GET
    모든 post 목록 반환하기
  - POST 
    question과 session user 정보 가져오기
    question과 session user id를 연결하여 데이터 생성 
*/

async function handler(request: NextApiRequest, response: NextApiResponse<ResponseType>) {
  if (request.method === 'GET') {
    const {
      query: { latitude, longitude },
    } = request;

    const latitudeParse = parseFloat(latitude.toString());
    const longitudeParse = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            answers: true,
            wondering: true,
          },
        },
      },
      where: {
        latitude: {
          gte: latitudeParse - 0.01,
          lte: latitudeParse + 0.01,
        },
        longitude: {
          gte: longitudeParse - 0.01,
          lte: longitudeParse + 0.01,
        },
      },
    });

    response.json({
      ok: true,
      posts,
    });
  }

  if (request.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = request;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    response.json({
      ok: true,
      post,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
