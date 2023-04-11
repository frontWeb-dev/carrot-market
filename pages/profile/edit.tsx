import type { NextPage } from 'next';
import { Button, Input, Layout } from '@components';
import { useForm } from 'react-hook-form';
import { UserProps } from '@pages/profile';
import { useEffect } from 'react';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';

interface EditForm {
  name?: string;
  email?: string;
  phone?: string;
  formErrors?: string;
}

interface EditResponse {
  ok: boolean;
  message?: string;
}

const EditProfile: NextPage = ({ user }: UserProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditForm>();

  const [editProfile, { data, loading }] = useMutation<EditResponse>('/api/user/me');

  const onValid = ({ email, phone, name }: EditForm) => {
    if (loading) return;
    if (email === '' && phone === '') {
      return setError('formErrors', { message: '이메일이나 전화번호 중 하나가 필요합니다.' });
    }

    editProfile({ email, phone, name });
  };

  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
  }, [user, setValue]);

  useEffect(() => {
    console.log(data);
    if (data && !data.ok) {
      return setError('formErrors', { message: data.message });
    }
  }, [data, setError]);

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`);
    }
  }, [data, router]);

  return (
    <Layout path='/profile' title='Edit Profile'>
      <form onSubmit={handleSubmit(onValid)} className='space-y-4 py-10 px-4'>
        <div className='flex items-center space-x-3'>
          <div className='h-14 w-14 rounded-full bg-slate-500' />
          <label
            htmlFor='picture'
            className='cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
            Change
            <input id='picture' type='file' className='hidden' accept='image/*' />
          </label>
        </div>
        <Input register={register('name')} label='Name' name='name' type='text' required={false} />
        <Input
          register={register('email')}
          label='Email address'
          name='email'
          type='email'
          required={false}
        />
        <Input
          register={register('phone')}
          label='Phone number'
          name='phone'
          type='number'
          kind='phone'
          required={false}
        />
        {errors.formErrors && (
          <p className='mt-3 mb-2 pl-2 text-center text-sm text-red-500'>
            {errors.formErrors.message}
          </p>
        )}

        <Button text={loading ? 'Loading' : 'Update profile'} onClick={() => clearErrors()} />
      </form>
    </Layout>
  );
};

export default EditProfile;
