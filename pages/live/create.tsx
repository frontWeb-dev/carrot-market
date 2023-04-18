import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Layout, Input, TextArea, Button } from '@components';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}
const Create: NextPage = () => {
  const router = useRouter();
  const [createLive, { loading, data }] = useMutation<CreateResponse>('/api/stream');
  const { register, handleSubmit } = useForm<CreateForm>();

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createLive(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/live/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout path='/live' title='Go Live' seoTitle='Create Live'>
      <form onSubmit={handleSubmit(onValid)} className=' space-y-4 py-10 px-4'>
        <Input
          register={register('name', { required: true })}
          label='Name'
          name='name'
          type='text'
          required
        />
        <Input
          register={register('price', { required: true, valueAsNumber: true })}
          label='Price'
          placeholder='0.00'
          name='price'
          type='text'
          kind='price'
          required
        />
        <TextArea
          register={register('description', { required: true })}
          name='description'
          label='Description'
        />
        <Button text={loading ? 'Loading' : 'Go Live'} />
      </form>
    </Layout>
  );
};

export default Create;
