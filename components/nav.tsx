'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/icons/logo.svg';
import { useGenerationStore } from '@/store/modal';
const Nav = () => {
  const { setActive, setType } = useGenerationStore();
  return (
    <nav className='z-40 flex items-center justify-between bg-white py-[22px] drop-shadow-md'>
      <Link href='/' className='flex w-fit items-center gap-[15px]'>
        <Image src={Logo} width={44} height={35} alt='logo' />
        <p className='important text-[18px]'>Linkfolio</p>
      </Link>
      <section className='flex items-center gap-[46px]'>
        <Link href='/portfolios' className='transition-all hover:text-cta'>
          Portfolios
        </Link>
        <button
          className='rounded-[50px] bg-cta px-[31px] py-[9px] text-white'
          onClick={() => {
            setActive(true);
            setType('signup');
          }}
        >
          Sign Up
        </button>
      </section>
    </nav>
  );
};

export default Nav;
