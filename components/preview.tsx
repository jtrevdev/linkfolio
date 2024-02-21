import Image from 'next/image';
import React from 'react';

const Preview = () => {
  return (
    <div className='border-border second:min-h-[390px]  flex  flex-col justify-between rounded-[20px] border'>
      <Image
        className='w-full rounded-[8px] object-cover p-[17px]'
        src='/images/portfolio.png'
        width={379}
        height={210}
        alt=''
      />
      <section className='flex items-end gap-[10px] px-[17px] py-[23px]'>
        <Image
          className=''
          src='/images/face.png'
          width={68}
          height={68}
          alt=''
        />
        <section className='pb-[7px]'>
          <p className='font-semibold text-important'>Jonathan Trevino</p>
          <p className='font-light text-general'>Front End Developer</p>
        </section>
      </section>
    </div>
  );
};

export default Preview;
