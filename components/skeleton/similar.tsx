const Similar = () => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold text-gray-900'>Similar items</h2>
      <div className='mt-6 grid grid-cols-2 gap-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className=' mb-4 h-52 w-full animate-skeleton bg-slate-300' />
            <div className='mb-1 w-2/3 bg-slate-200 p-2' />
            <div className='w-1/2 bg-slate-200 p-2' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Similar;
