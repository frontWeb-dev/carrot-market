import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import { FloatingButton, Items, Layout } from '@components';
import { Product } from '@prisma/client';

export interface ProductWithCount extends Product {
  _count: {
    favorite: number;
  };
}
interface ProductResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { data } = useSWR<ProductResponse>('/api/products');

  return (
    <Layout title='캐럿 마켓' seoTitle='Home' hasTabBar>
      <div className='flex  flex-col pb-10'>
        {data?.products?.map((product) => (
          <Link key={product.id} href={`/items/${product.id}`} legacyBehavior>
            <Items
              id={product.id}
              title={product.name}
              price={product.price}
              hearts={product._count.favorite}
              image={product.image}
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
