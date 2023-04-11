import type { NextPage } from 'next';
import { Layout } from '@components';
import ProductList from '@components/ProductList';

const Bought: NextPage = () => {
  return (
    <Layout title='구매 내역' path='/profile'>
      <div className='flex flex-col'>
        <ProductList kind='purchases' />
      </div>
    </Layout>
  );
};

export default Bought;
