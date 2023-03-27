import Layout from '@components/layout';
import type { NextPage } from 'next';
import Link from 'next/link';

const Chats: NextPage = () => {
  return (
    <Layout title='채팅' hasTabBar>
      <div className='divide-y-[1px] p-4'>
        {[...Array(6)].map((_, i) => (
          <Link key={i} href={`/chats/${i + 1}`}>
            <div className='mb-6 flex cursor-pointer items-center space-x-3'>
              <div className='h-12 w-12 rounded-full bg-slate-300' />
              <div>
                <p className='text-gray-700'>Steve Jebs</p>
                <p className='text-sm  text-gray-500'>See you tomorrow in the corner at 2pm!</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
