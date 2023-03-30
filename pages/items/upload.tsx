import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Layout, Input, TextArea, Button } from '@components';
import useMutation from '@libs/client/useMutation';
import { Product } from '@prisma/client';

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] = useMutation<UploadProductMutation>('/api/products');

  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/items/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout path='/'>
      <form onSubmit={handleSubmit(onValid)} className='px-4 py-8'>
        <div>
          <label className='flex h-48 w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 '>
            <svg
              className='h-12 w-12'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'>
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <input className='hidden' type='file' />
          </label>
        </div>
        <Input
          register={register('name', { required: true })}
          label='상품명'
          type='text'
          name='name'
          required
        />
        <Input
          register={register('price', { required: true })}
          label='가격'
          type='text'
          name='name'
          kind='price'
          required
        />
        <TextArea
          register={register('description', { required: true })}
          label='상품 설명'
          name='description'
          required
        />
        <Button text={loading ? '로딩중...' : '상품 등록'} />
      </form>
    </Layout>
  );
};

export default Upload;
