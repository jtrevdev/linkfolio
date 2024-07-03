import React from 'react';

const Loading = () => {
  return (
    <section className='translate-y-[10px]'>
      <div className='skeleton aspect-video w-full border-b border-border bg-border object-cover '></div>
      <div className='mt-[8px] flex w-full items-center justify-between'>
        <div className='flex w-full items-center gap-[10px]'>
          <div className='relative h-[35px] w-[35px]'>
            <div className='skeleton h-full  rounded-full bg-border'></div>
          </div>

          <span className='skeleton h-[15px] w-1/2 bg-border'></span>
        </div>
        <div className='flex w-full justify-between gap-[10px]'>
          <div className='flex w-full justify-end gap-5'>
            <span className='skeleton h-[15px] w-1/3 bg-border'></span>

            <span className='skeleton h-[15px] w-1/3 bg-border'></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
