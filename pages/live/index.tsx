import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { Stream } from '@prisma/client';
import { Layout, FloatingButton } from '@components';
import { useEffect, useState } from 'react';
import { joinClassName } from '@libs/client/utils';
import Pagination from '@components/Pagination';

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Live: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR<StreamsResponse>('/api/stream');
  const { data: limitData } = useSWR<StreamsResponse>(`/api/stream?page=${currentPage}`);

  const totalCount = data?.streams?.length!;

  console.log(totalCount);
  if (!data) return <div>Loading</div>;

  return (
    <Layout title='라이브' hasTabBar>
      <div className='space-y-4 pb-10'>
        {limitData?.streams?.map((stream) => (
          <Link key={stream.id} href={`/live/${stream.id}`}>
            <div className='p-4'>
              {/* aspect-video : 비디오 비율 지정 (16:9) */}
              <div className='relative aspect-video w-full overflow-hidden rounded-md bg-slate-300 shadow-sm'>
                <Image
                  src={`https://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbnail.jpg?height=270`}
                  alt='라이브 썸네일'
                  fill
                />
              </div>
              <h3 className='mt-2 text-lg  text-gray-700'>{stream.name}</h3>
            </div>
          </Link>
        ))}

        {totalCount > 10 && (
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        <FloatingButton href='/live/create'>
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
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Live;
