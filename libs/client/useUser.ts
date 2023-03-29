import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// 유저 정보 확인 -> 로그인 화면으로 redirect
export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/api/user/me')
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace('/enter');
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}
