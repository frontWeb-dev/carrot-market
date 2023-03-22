import type { NextPage } from 'next';

const ChatDetail: NextPage = () => {
  return (
    <div className='flex flex-col'>
      <div className=' h-[90vh] space-y-4 overflow-scroll py-10 px-4'>
        {/* chat bubbles */}
        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>

        <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>I want ￦20,000</p>
          </div>
        </div>

        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>미쳤어</p>
          </div>
        </div>
        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>

        <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>I want ￦20,000</p>
          </div>
        </div>

        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>미쳤어</p>
          </div>
        </div>
        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>

        <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>I want ￦20,000</p>
          </div>
        </div>

        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>미쳤어</p>
          </div>
        </div>
        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>

        <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>I want ￦20,000</p>
          </div>
        </div>

        <div className='flex items-start space-x-2'>
          <div className='h-8 w-8 rounded-full border bg-slate-400' />
          <div className='w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700'>
            <p>미쳤어</p>
          </div>
        </div>
      </div>

      {/* input */}
      <div className='fixed inset-x-0 bottom-0 mx-auto w-full max-w-md py-4 px-2 pt-4 '>
        <div className='relative flex items-center'>
          <input
            type='text'
            className=' w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
          />
          <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5 '>
            <button className='flex cursor-pointer items-center justify-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
              <svg
                className='w-6'
                fill='none'
                stroke='currentColor'
                stroke-width='1.5'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
