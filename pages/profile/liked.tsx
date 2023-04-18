import type { NextPage } from 'next';
import { Layout } from '@components';
import ProductList from '@components/ProductList';

const Liked: NextPage = () => {
  return (
    <Layout title='관심 내역' seoTitle='Like List' path='/profile'>
      <div className='flex flex-col'>
        <ProductList kind='favorites' />
      </div>
    </Layout>
  );
};

export default Liked;
