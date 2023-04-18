import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next/dist';
import { NextPageContext } from 'next';
import { withSsrSession } from '@libs/server/withSession';

interface ProfileResponse {
  ok: boolean;
  profile: User;
}
// 유저 정보 확인 -> 로그인 화면으로 redirect
export default function useUser() {
  const router = useRouter();

  const { data, error } = useSWR<ProfileResponse>(
    router.pathname === '/enter' ? null : '/api/user/me'
  );

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
