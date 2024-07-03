'use client';
import Nav from '@/components/nav';
import { sendMagicLink } from '@/lib/auth';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [emailAddress, setEmailAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!emailAddress) return;

    const success = await sendMagicLink(emailAddress);
    if (success) {
      router.push('/verify');
    }
    setLoading(false);
  }

  return (
    <>
      <Nav />

      <div className='relative mx-auto mt-[198px] w-full max-w-[400px] space-y-[21px]'>
        <h1 className=' h-[28px] overflow-hidden  text-[19px] font-medium'>
          Sign In
        </h1>
        <p className=' text-[14px]'>
          Enter your email below to sign in to your account
        </p>
        <form className='space-y-[21px]' onSubmit={handleSubmit}>
          <input
            type='email'
            required
            className='w-full rounded-[10px] border border-[color:#BFC5C5] px-[15px] py-[10px]'
            placeholder='enter email address'
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <button
            disabled={emailAddress ? false : true}
            className={` w-full rounded-[10px] bg-[color:#8BBFFC] px-[15px] py-[10px] text-white transition-all hover:bg-[color:#4784D9] disabled:bg-gray-500`}
          >
            {loading ? 'Continuing...' : 'Continue'}
          </button>
        </form>
        <p className='text-[14px] font-light'>
          By clicking continue, you agree to our{' '}
          <span className='underline'>Terms of Service</span> and{' '}
          <span className='underline'>Privacy Policy</span>
        </p>
      </div>
    </>
  );
};

export default page;
