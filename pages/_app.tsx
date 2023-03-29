import '@styles/globals.css';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((response) => response.json()) }}>
      <div className='mx-auto  w-full max-w-md'>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
