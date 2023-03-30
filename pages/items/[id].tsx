import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Product, User } from '@prisma/client';
import { Button, Layout, Detail, Similar } from '@components';
import useMutation from '@libs/client/useMutation';
import { joinClassName } from '@libs/client/utils';
import useUser from '@libs/client/useUser';

interface ItemsWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ItemsWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { mutate: unboundMutate } = useSWRConfig();
  const {
    data,
    isLoading,
    mutate: boundMutate,
  } = useSWR<ItemDetailResponse>(router.query.id ? `/api/products/${router.query.id}` : null);

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);

  const onFavoriteClick = () => {
    if (!data) return;
    boundMutate({ ...data, isLiked: !data.isLiked }, false);
    toggleFav({});
  };

  if (isLoading || !data) {
    return (
      <Layout path='/'>
        <Detail />
        <Similar />
      </Layout>
    );
  }

  return (
    <Layout path='/'>
      <div className='px-4  pt-5 pb-10'>
        <div className='mb-8'>
          <div className='h-72 bg-slate-300' />
          <div className='flex cursor-pointer items-center space-x-3 border-t border-b py-3'>
            <div className='h-12 w-12 rounded-full bg-slate-300' />
            <div>
              <p className='text-sm font-medium text-gray-700'>{data.product.user.name}</p>
              <Link href={`/profile/${data.product.user.id}`}>
                <p className='text-xs font-medium text-gray-500'>View profile &rarr;</p>
              </Link>
            </div>
          </div>
          <div className='mt-5'>
            <h1 className='text-3xl font-bold text-gray-900'>{data.product.name}</h1>
            <span className='mt-3 block text-2xl text-gray-900'>${data.product.price}</span>
            <p className=' my-6 text-gray-700'>{data.product.description}</p>
            <div className='flex items-center justify-between space-x-2'>
              <Button large text='Talk to seller' />
              <button
                onClick={onFavoriteClick}
                className={joinClassName(
                  'flex items-center justify-center rounded-md p-3 hover:bg-gray-100',
                  data.isLiked
                    ? 'text-orange-400 hover:text-orange-500'
                    : 'text-gray-400  hover:text-gray-500'
                )}>
                <svg
                  className='h-6 w-6 '
                  xmlns='http://www.w3.org/2000/svg'
                  fill={data?.isLiked ? 'currentColor' : 'none'}
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Similar items</h2>
          <div className=' mt-6 grid grid-cols-2 gap-4'>
            {data.relatedProducts.map((product) => (
              <Link href={`/items/${product.id}`} key={product.id}>
                <div className='mb-4 h-56 w-full bg-slate-300' />
                <h3 className='-mb-1 text-gray-700'>{product.name}</h3>
                <span className='text-sm font-medium text-gray-900'>${product.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ItemDetail;
