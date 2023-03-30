import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import FloatingButton from '@components/floatingButton';
import Item from '@components/items';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import { Product } from '@prisma/client';

interface ProductResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductResponse>('/api/products');
  console.log(data);

  return (
    <Layout title='캐럿 마켓' hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex  flex-col pb-10'>
        {data?.products?.map((product) => (
          <Link key={product.id} href={`/items/${product.id}`} legacyBehavior>
            <Item
              id={product.id}
              title={product.name}
              price={product.price}
              comments={0}
              hearts={0}
            />
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
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
