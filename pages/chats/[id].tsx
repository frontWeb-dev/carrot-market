import type { NextPage } from 'next';
import { Layout, Message } from '@components';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { UserProps } from '@pages/profile';

const ChatDetail: NextPage = ({ user }: UserProps) => {
  const router = useRouter();
  const { data } = useSWR(`/api/chats/${router.query.id}`, {
    refreshInterval: 1000,
  });

  console.log(data);

  return (
    <Layout
      path='/chats'
      title={
        data?.messages?.shopperId === user?.id
          ? data?.messages?.seller.name
          : data?.messages?.shopper.name
      }>
      <div className='space-y-4 py-5 px-4 pb-16'>
        {data?.messages?.message.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            reversed={message.user.id === user?.id}
          />
        ))}
        <form className='fixed inset-x-0 bottom-0  bg-white pt-2 pb-6'>
          <div className='relative mx-auto flex w-full max-w-md items-center px-4'>
            <input
              type='text'
              name='message'
              className='w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
            />
            <div className='absolute inset-y-0 right-4 flex py-1.5 pr-1.5'>
              <button
                type='submit'
                className='flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
