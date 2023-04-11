import type { NextPage } from 'next';
import { Layout } from '@components';
import ProductList from '@components/ProductList';

const Sold: NextPage = () => {
  return (
    <Layout title='판매 내역' path='/profile'>
      <div className='flex flex-col'>
        <ProductList kind='sales' />
      </div>
    </Layout>
  );
};

export default Sold;
