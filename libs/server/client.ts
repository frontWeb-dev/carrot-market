import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}
// 처음 실행할 때는 global.client는 비어있기 때문에 prisma 실행
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
