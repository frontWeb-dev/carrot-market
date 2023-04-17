import type { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '@components';
import useSWR from 'swr';
import { Chat, ChatMessage, User } from '@prisma/client';

interface ChatWithMessage extends Chat {
  message: ChatMessage[];
  shopper?: User;
  seller?: User;
}
interface ChatResult {
  ok: boolean;
  sellerData?: ChatWithMessage[];
  shopperData?: ChatWithMessage[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatResult>('/api/chats');

  console.log(data);
  return (
    <Layout title='채팅' hasTabBar>
      <div className='divide-y-[1px] p-4'>
        {data?.sellerData?.map((chat) => (
          <Link key={chat.id} href={`/chats/${chat.id}`}>
            <div className='mb-6 flex cursor-pointer items-center space-x-3'>
              <div className='h-12 w-12 rounded-full bg-slate-300' />
              <div>
                <p className='text-gray-700'>{chat?.shopper?.name}</p>
                <p className='text-sm  text-gray-500'>
                  {chat?.message?.length > 0 && chat?.message[chat.message.length - 1].message}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {data?.shopperData?.map((chat) => (
          <Link key={chat.id} href={`/chats/${chat.id}`}>
            <div className='mb-6 flex cursor-pointer items-center space-x-3'>
              <div className='h-12 w-12 rounded-full bg-slate-300' />
              <div>
                <p className='text-gray-700'>{chat?.seller?.name}</p>
                <p className='text-sm  text-gray-500'>
                  {chat?.message?.length > 0 && chat?.message[chat.message.length - 1].message}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
