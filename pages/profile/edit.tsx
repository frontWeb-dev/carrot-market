import type { NextPage } from 'next';
import { Button, Input, Layout } from '@components';
import { useForm } from 'react-hook-form';
import { UserProps } from '@pages/profile';
import { useEffect, useState } from 'react';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface EditForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditResponse {
  ok: boolean;
  message?: string;
}

const EditProfile: NextPage = ({ user }: UserProps) => {
  const [avatarPreview, setAvatarPreview] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<EditForm>();

  const [editProfile, { data, loading }] = useMutation<EditResponse>('/api/user/me');

  const avatar = watch('avatar');
  const onValid = async ({ email, phone, name, avatar }: EditForm) => {
    if (loading) return;
    if (email === '' && phone === '') {
      return setError('formErrors', { message: '이메일이나 전화번호 중 하나가 필요합니다.' });
    }

    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      // cloudflare에 이미지 업로드 하기
      const form = new FormData();
      form.append('file', avatar[0], user?.id + '');
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: 'POST', body: form })).json();

      editProfile({ email, phone, name, avatarId: id });
    } else {
      editProfile({ email, phone, name });
    }
  };

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.avatar)
      setAvatarPreview(`https://imagedelivery.net/LWMO1sS6WZWolJI0z1rgvA/${user?.avatar}/avatar`);
  }, [user, setValue]);

  useEffect(() => {
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
    <Layout path='/profile' title='Edit Profile' seoTitle='Edit Profile'>
      <form onSubmit={handleSubmit(onValid)} className='space-y-4 py-10 px-4'>
        <div className='flex items-center space-x-3'>
          {avatarPreview ? (
            <Image
              width={56}
              height={56}
              src={avatarPreview}
              alt='사용자 프로필 이미지'
              className='h-14 w-14 rounded-full bg-slate-500'
            />
          ) : (
            <div className='h-14 w-14 rounded-full bg-slate-500' />
          )}
          <label
            htmlFor='picture'
            className='cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
            Change
            <input
              {...register('avatar')}
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
            />
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
