import { Button } from '@components';

const Detail = () => {
  return (
    <div className='p-4'>
      <div className='mb-4'>
        <div className='h-72 animate-skeleton bg-slate-300' />
        <div className='flex cursor-pointer items-center space-x-3 border-t border-b py-3'>
          <div className='h-12 w-12 rounded-full bg-slate-300' />
          <div className='w-24 space-y-2'>
            <div className='bg-slate-200 p-2'></div>
            <div className='bg-slate-200 p-2'></div>
          </div>
        </div>
        <div className='mt-5'>
          <div className='t w-1/2 bg-slate-200 p-4'></div>
          <div className='mt-3 w-1/3 bg-slate-200 p-2'></div>
          <p className=' my-6 text-gray-700'></p>
          <div className='flex items-center justify-between space-x-2'>
            <Button large text='Talk to seller' />
            <button className='flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500'>
              <svg
                className='h-6 w-6 '
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
