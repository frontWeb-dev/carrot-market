import '@styles/globals.scss';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';
import { User } from '@prisma/client';
import { useState } from 'react';
import Auth from '@components/auth';

interface MyAppProps extends AppProps {
  user: User;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const [user, setUser] = useState<User | undefined>();

  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((response) => response.json()) }}>
      <Auth setUser={setUser}>
        <Component {...pageProps} user={user} />
      </Auth>
    </SWRConfig>
  );
}
