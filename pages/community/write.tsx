import type { NextPage } from 'next';
import { Layout, TextArea, Button } from '@components';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}
const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');

  const onValid = (data: WriteForm) => {
    if (loading) return; // 더블 클릭 방지
    post(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout path='/community' title='Write Post'>
      <form onSubmit={handleSubmit(onValid)} className='space-y-4 p-4'>
        <TextArea
          register={register('question', {
            required: true,
            minLength: 5,
          })}
          placeholder='Ask a question!'
          required
        />
        <Button text={loading ? 'Loading' : 'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
