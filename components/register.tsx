'use client';
import { sendMagicLink } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React, { FormEvent, FormEventHandler, useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [email, setEmailAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    const success = await sendMagicLink(email);
    if (success) {
      router.push('/verify');
    }
    setLoading(false);
  }
  return (
    <form className='relative w-fit' onSubmit={handleSubmit}>
      <input
        type='email'
        required
        className='w-[274px] rounded-l-[10px] border border-r-0 border-[color:#BFC5C5] px-[15px] py-[10px]'
        placeholder='enter email address'
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <button
        disabled={email ? false : true}
        className={`  rounded-r-[10px] border border-l-0 border-[color:#BFC5C5] bg-[color:#8BBFFC] px-[15px] py-[10px] text-white transition-all hover:bg-[color:#4784D9] disabled:bg-gray-500`}
      >
        {loading ? 'Signing Up...' : 'Sign up'}
      </button>
    </form>
  );
};

export default Register;
