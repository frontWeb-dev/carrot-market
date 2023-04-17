import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

// 가짜 데이터 생성
async function main() {
  [...Array.from(Array(50).keys())].forEach(async (item) => {
    const stream = await client.stream.create({
      data: {
        cloudflareId: '',
        cloudflareKey: '',
        cloudflareUrl: '',
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });

    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
