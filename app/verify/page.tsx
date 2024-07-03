'use client';
import Nav from '@/components/nav';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { sendMagicLink } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const page = () => {
  const string = `let's get started`;
  const [timer, setTimer] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('emailForSignIn')) {
      router.push('/');
    }
    const intervalId = setInterval(() => {
      const lastClickedTime = localStorage.getItem('lastButtonClickedTime');
      if (lastClickedTime) {
        const currentTime = new Date().getTime();
        const elapsedTimeInSeconds = Math.floor(
          (currentTime - parseInt(lastClickedTime)) / 1000
        );
        const remainingTime = 30 - elapsedTimeInSeconds;
        setTimer(remainingTime);
      } else {
        // No localStorage item found (e.g., button hasn't been clicked yet)
        // Reset timer state
        setTimer(0);
      }
    }, 1000); // Update timer state every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    if (timer === 0) {
      localStorage.removeItem('lastButtonClickedTime');
    }
  }, [timer]);

  function handleClick() {
    // TODO: Call send magiclink again
    setLoading(true);
    if (localStorage.getItem('emailForSignIn')) {
      sendMagicLink(localStorage.getItem('emailForSignIn')!);
    }
    const currentTime = new Date().getTime();
    localStorage.setItem('lastButtonClickedTime', String(currentTime));
    setLoading(false);
  }
  return (
    <>
      <Nav />
      <div className='relative mt-[198px] flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 1, y: 0, display: 'block' }}
          animate={{ opacity: 0, y: 20, display: 'hidden' }}
          transition={{ delay: 2, duration: 0.5 }}
          className='absolute h-[28px]'
        >
          <h1 className='flex h-[28px] justify-center gap-1 overflow-hidden text-center text-[19px] font-medium'>
            <motion.div
              initial={{ opacity: 0, y: '100px' }}
              animate={{ opacity: 1, y: '0px' }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            >
              Welcome,
            </motion.div>{' '}
            <div className='flex gap-1'>
              {string.split(' ').map((str, index) => (
                <motion.p
                  key={index}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 1.2 }}
                >
                  {str}
                </motion.p>
              ))}
            </div>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, display: 'none' }}
          animate={{ opacity: 1, display: 'block' }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className='absolute mx-auto h-[28px] w-[490px] space-y-[21px]'
        >
          <h1 className='flex items-center gap-2 text-[19px] font-semibold'>
            Verification Sent <BadgeCheck className='text-[color:#6DAFFE]' />
          </h1>
          <div className='space-y-[10px]'>
            <p>
              A link has been sent to{' '}
              <span className='font-medium'>
                {localStorage.getItem('emailForSignIn')}
              </span>{' '}
              to sign you in.
            </p>
            <p className='text-[14px] font-extralight italic'>
              Please check your spam folder as well.
            </p>
          </div>
          <button
            className='flex w-full justify-center gap-2 rounded-[10px] bg-[color:#6DAFFE] py-[5px] text-white transition-all hover:bg-[color:#4784D9] disabled:bg-gray-500'
            disabled={timer && timer > 0 ? true : false}
            onClick={() => {
              setLoading(true);
              handleClick();
            }}
          >
            {loading ? 'Resending Verification...' : 'Resend Verification'}
            <p>{timer && timer > 0 ? `(Try again in ${timer}s)` : ''}</p>
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default page;
