'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';

const Nav = () => {
  const [user] = useAuthState(auth);
  return (
    <nav className='mt-[17px] flex h-[60px] items-center justify-between rounded-[20px] bg-[color:#F5F6F7] px-[40px]'>
      <Link
        href='/'
        className='flex items-center gap-3 transition-all ease-in-out hover:scale-[1.05]'
      >
        <span>
          <Image
            className='transition-all ease-in-out hover:scale-[1.055]'
            src='/icons/logo.svg'
            width={25}
            height={25}
            alt='linkfolio logo'
            draggable={false}
          />
        </span>
        <h3 className='text-[16px] font-semibold transition-all ease-in-out hover:scale-[1.055]'>
          Linkfolio
        </h3>
      </Link>
      <div className='relative'>
        {user ? (
          <Link href='/settings'>
            <div className='relative h-[35px] w-[35px] transition-all ease-in-out hover:scale-[1.1]'>
              <Image
                className='absolute h-full rounded-full object-cover'
                src={user?.photoURL ? user?.photoURL : '/images/default.png'}
                width={35}
                height={35}
                alt={user?.displayName ? user?.displayName : 'profile'}
              />
            </div>
          </Link>
        ) : (
          <Link
            href='/signin'
            className='rounded-[10px] bg-[color:#6DAFFE] px-[15px] py-[5px] text-white transition-all hover:bg-[color:#4784D9]'
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
