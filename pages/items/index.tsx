import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@/components/floatingButton';
import Item from '@/components/items';
import Layout from '@/components/layout';

const Home: NextPage = () => {
  return (
    <Layout title='캐럿 마켓' hasTabBar>
      <div className='flex  flex-col pb-10'>
        {[...Array(10)].map((_, i) => (
          <Link key={i} href={`/items/${i + 1}`} legacyBehavior>
            <Item id={i} key={i} title='iPhone 14' price={99} comments={1} hearts={1} />
          </Link>
        ))}

        {/* Todo. Component 분리 */}
        <FloatingButton href='/items/upload'>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
