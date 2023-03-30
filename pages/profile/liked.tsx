import type { NextPage } from 'next';
import Link from 'next/link';
import { Items, Layout } from '@components';

const Liked: NextPage = () => {
  return (
    <Layout title='관심 내역' path='/profile'>
      <div className='flex flex-col'>
        {[...Array(10)].map((_, i) => (
          <Link key={i} href={`/items/${i + 1}`} legacyBehavior>
            <Items id={i} key={i} title='iPhone 14' price={99} comments={1} hearts={1} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Liked;
