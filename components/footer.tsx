import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='my-[17px] flex h-[60px] items-center justify-between rounded-[20px] bg-[color:#F5F6F7] px-[40px]'>
      <div className='flex items-center gap-3'>
        Built by{' '}
        <a href='https://yeahimjt.me' target='_blank'>
          <Image
            className='rounded-full'
            src='/images/jonathan-trevino.png'
            width={35}
            height={35}
            alt='Jonathan Trevino'
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
