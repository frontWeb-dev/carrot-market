import type { NextPage } from 'next';
import { Layout, Message } from '@components';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';
import { UserProps } from '@pages/profile';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';

interface StreamMessage {
  id: number;
  message: string;
  user: {
    avatar: string | null;
    id: number;
  };
}

interface StreamWithMessage extends Stream {
  message: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessage;
}

interface MessageForm {
  message: string;
}

const Live: NextPage = ({ user }: UserProps) => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/stream/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/stream/${router.query.id}/message`
  );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            message: [
              ...prev.stream.message,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );
    // sendMessage(form);
  };
  return (
    <Layout path='/live'>
      <div className='space-y-4 py-5  px-4'>
        <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm' />
        <div className='mt-5'>
          <h1 className='text-3xl font-bold text-gray-900'>{data?.stream?.name}</h1>
          <span className='mt-3 block text-2xl text-gray-900'>${data?.stream?.price}</span>
          <p className=' my-6 text-gray-700'>{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Live Chat</h2>
          <div className='h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16'>
            {data?.stream.message.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={user?.id === message.user.id}
              />
            ))}
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className='fixed inset-x-0 bottom-0  bg-white pt-2 pb-6'>
            <div className='relative mx-auto flex w-full max-w-md items-center px-4'>
              <input
                {...register('message', {
                  required: true,
                })}
                type='text'
                name='message'
                className='w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
              />
              <div className='absolute inset-y-0 right-4 flex py-1.5 pr-1.5'>
                <button
                  type='submit'
                  className='flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                  &rarr;
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Live;
