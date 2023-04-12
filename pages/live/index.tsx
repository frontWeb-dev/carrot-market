import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { Stream } from '@prisma/client';
import { Layout, FloatingButton } from '@components';

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Live: NextPage = () => {
  const { data } = useSWR<StreamsResponse>('/api/stream');

  return (
    <Layout title='라이브' hasTabBar>
      <div className='space-y-4 divide-y-2 pb-5'>
        {data?.streams?.map((stream) => (
          <Link key={stream.id} href={`/live/${stream.id}`}>
            <div className='p-4'>
              {/* aspect-video : 비디오 비율 지정 (16:9) */}
              <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm'></div>
              <h3 className='mt-2 text-lg  text-gray-700'>{stream.name}</h3>
            </div>
          </Link>
        ))}

        <FloatingButton href='/live/create'>
          <button className='rounded-full  bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500'>
            <svg
              className='h-6 w-6 text-white'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </button>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Live;
