import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Profile from './profile';

const Preview = () => {
  return (
    <Link
      href='/portfolios/aed'
      className='flex flex-col justify-between rounded-[20px]  border border-border hover:shadow-md second:min-h-[390px]'
    >
      <Image
        className='w-full rounded-[8px] object-cover p-[17px]'
        src='/images/portfolio.png'
        width={379}
        height={210}
        alt=''
      />
      <Profile
        photoURL={'/images/default.png'}
        displayName={'Default Name'}
        title={'Default'}
      />
    </Link>
  );
};

export default Preview;
