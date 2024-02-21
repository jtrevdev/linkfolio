import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/icons/logo.svg';
const Nav = () => {
  return (
    <nav className='py-[22px] bg-white drop-shadow-md flex justify-between items-center'>
      <Link href="/" className='flex w-fit items-center gap-[15px]'>
        <Image src={Logo} width={44} height={35} alt="logo" />
        <p className='text-[18px] important'>Linkfolio</p>
      </Link>
      <section className='flex gap-[46px] items-center'>
        <Link href='/porfolios'>Portfolios</Link>
        <button className='bg-cta text-white px-[31px] py-[9px] rounded-[50px]'>Sign Up</button>
      </section>
    </nav>
  )
}

export default Nav