import type { NextPage } from 'next';
import { Layout, Message, ChatInput } from '@components';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

const Stream: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/stream/${router.query.id}` : null
  );

  console.log(data);
  return (
    <Layout path='/live'>
      <div className='space-y-4 py-5  px-4'>
        <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm' />
        <div className='mt-5'>
          <h1 className='text-3xl font-bold text-gray-900'>{data?.stream?.name}</h1>
          <span className='mt-3 block text-2xl text-gray-900'>${data?.stream?.price}</span>
          <p className=' my-6 text-gray-700'>{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Live Chat</h2>
          <div className='h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16'>
            <Message message='Hi how much are you selling them for?' />
            <Message message='I want ￦20,000' reversed />
            <Message message='미쳤어' />
          </div>
          <ChatInput />
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
