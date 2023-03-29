import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useEffect } from 'react';

// 유저 정보 확인 -> 로그인 화면으로 redirect
export default function useUser() {
  const { data, error } = useSWR('/api/user/me');
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
