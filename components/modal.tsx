'use client';
import Image from 'next/image';
import React from 'react';
import Logo from '@/public/icons/logo.svg';
import { Lock, X } from 'lucide-react';
import { useGenerationStore } from '@/store/modal';
const Modal = () => {
  const { active, setActive, type, setType } = useGenerationStore();
  return (
    <>
      {active && (
        <div className='fixed z-50 flex h-screen  w-full items-center justify-center overflow-visible bg-black/50'>
          <span className='relative mx-[20px] rounded-[8px] border-border  bg-white py-[24px] third:mx-0'>
            <button
              className='absolute right-4'
              onClick={() => setActive(false)}
            >
              <X />
            </button>
            <span className='mb-[21px] flex flex-col items-center px-[91px]'>
              <Image src={Logo} width={43} height={35} alt='' />
              <h2 className='mt-[11px] font-semibold'>
                {type === 'signup'
                  ? `Let's Get Started`
                  : type === 'signin'
                    ? `Let's Get Back To It`
                    : 'Almost There'}
              </h2>
              <p className='text-center text-general'>
                {type === 'signup'
                  ? `Join our community! Create an account.`
                  : type === 'signin'
                    ? `Welcome back! Please enter your details.`
                    : 'Finish creating your account by setting up your preferences!'}
              </p>
            </span>
            {type === 'signin' || type === 'signup' ? (
              <section className='space-y-[27px] px-[61px]'>
                <section className='flex flex-col gap-[4px]'>
                  <label className='text-[14px] text-important'>Email</label>
                  <input
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-general placeholder:text-unimportant'
                    placeholder='Your Email address'
                  />
                </section>
                <section className='flex flex-col gap-[4px]'>
                  <label className='text-[14px] text-important'>Password</label>
                  <input
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-general placeholder:text-unimportant'
                    placeholder={'Your Password'}
                  />
                </section>
                {type === 'signup' ? (
                  <section className='flex flex-col gap-[11px]'>
                    <button className='rounded-[8px] bg-cta py-[9px] text-[14px] text-white'>
                      Sign Up
                    </button>
                    <button className='rounded-[8px] border border-border bg-white py-[9px] text-[14px]'>
                      Sign up with Google
                    </button>
                    <span className='mt-[15px] select-none text-center text-[12px] text-important'>
                      Already have an account?{' '}
                      <button
                        className='text-cta'
                        onClick={() => setType('signin')}
                      >
                        Sign in
                      </button>
                    </span>
                  </section>
                ) : (
                  <section className='flex flex-col gap-[11px]'>
                    <button className='rounded-[8px] bg-cta py-[9px] text-[14px] text-white'>
                      Sign In
                    </button>
                    <button className='rounded-[8px] border border-border bg-white py-[9px] text-[14px]'>
                      Sign in with Google
                    </button>
                    <span className='mt-[15px] select-none text-center text-[12px] text-important'>
                      Don't have an account?{' '}
                      <button
                        className='text-cta '
                        onClick={() => setType('signup')}
                      >
                        Sign up
                      </button>
                    </span>
                  </section>
                )}
              </section>
            ) : (
              <section className='space-y-[27px] px-[61px]'>
                <section className='flex flex-col gap-[4px]'>
                  <label className='text-[14px] text-important'>
                    Full Name
                  </label>
                  <input
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-general placeholder:text-unimportant'
                    placeholder='Your Email address'
                  />
                </section>
                <section className='flex flex-row justify-between gap-[4px]'>
                  <label className='text-[14px] text-important'>
                    Allow other users to email you
                  </label>
                  <input type='checkbox' />
                </section>
                <section className='flex flex-col gap-[11px]'>
                  <button className='rounded-[8px] bg-cta py-[9px] text-[14px] text-white'>
                    Save Preferences
                  </button>
                </section>
              </section>
            )}
          </span>
        </div>
      )}
    </>
  );
};

export default Modal;
