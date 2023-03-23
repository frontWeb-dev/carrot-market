import React from 'react';

export default function ChatInput() {
  return (
    <form className='fixed inset-x-0 bottom-0  bg-white pt-2 pb-6'>
      <div className='relative mx-auto flex w-full max-w-md items-center px-4'>
        <input
          type='text'
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
  );
}
