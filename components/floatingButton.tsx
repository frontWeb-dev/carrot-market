import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  const router = useRouter();

  const onclick = () => {
    router.push(href);
  };

  return (
    <div className='fixed bottom-24 z-0 flex w-full max-w-md justify-end border-transparent px-4'>
      <button
        onClick={onclick}
        className=' flex aspect-square w-14 cursor-pointer  items-center justify-center rounded-full border-0 border-transparent bg-orange-400 text-white shadow-xl transition-colors hover:bg-orange-500'>
        {children}
      </button>
    </div>
  );
}
