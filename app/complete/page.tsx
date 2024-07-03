'use client';
import { useEffect, useState } from 'react';
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import Nav from '@/components/nav';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { updateUsersName } from '@/lib/auth';

const page = () => {
  const [newUser, setNewUser] = useState<boolean | null>(true);
  const [timer, setTimer] = useState<number | null>(3);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [user] = useAuthState(auth);
  const router = useRouter();

  console.log(user);
  // Confirm the link is a sign-in with email link.
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
        console.log(email);
      }
      if (!email) return;

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');

          if (getAdditionalUserInfo(result)?.isNewUser) {
            setNewUser(true);
          } else {
            setNewUser(false);
          }
          console.log(result);
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);
  useEffect(() => {
    if (!newUser && timer !== null && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer !== null) {
            return prevTimer - 1;
          } else {
            return null;
          }
        });
      }, 1000); // Update timer state every second

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [newUser, timer]);

  useEffect(() => {
    if (timer === 0) {
      router.push('/settings');
    }
  }, [timer]);

  return (
    <>
      <Nav />
      <div className='relative mt-[198px] flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 1, y: 0, display: 'block' }}
          animate={newUser ? { opacity: 0, y: 20, display: 'hidden' } : {}}
          transition={{ delay: 2, duration: 0.5 }}
          className='absolute h-[28px]'
        >
          <h1 className='flex h-[28px] justify-center gap-1 overflow-hidden text-center text-[19px] font-medium'>
            <motion.div
              initial={{ opacity: 0, y: '100px' }}
              animate={{ opacity: 1, y: '0px' }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            >
              Verification Complete 🎉
            </motion.div>{' '}
          </h1>
          <AnimatePresence>
            {!newUser && (
              <h1 className='flex h-[28px] justify-center gap-1 overflow-hidden text-center text-[14px] font-light'>
                <motion.div
                  initial={{ opacity: 0, y: '100px' }}
                  animate={{ opacity: 1, y: '0px' }}
                  transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
                >
                  Redirecting you in {timer}
                </motion.div>{' '}
              </h1>
            )}
          </AnimatePresence>
        </motion.div>
        {newUser && (
          <motion.div
            initial={{ opacity: 0, display: 'none' }}
            animate={{ opacity: 1, display: 'block' }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className='absolute mx-auto h-[28px] w-[490px] space-y-[21px]'
          >
            <h1 className='flex items-center gap-2 text-[19px] font-semibold'>
              Complete Registration
            </h1>
            <p>Please fill in your first and last name below to get started</p>
            <div className='grid grid-cols-2 gap-5'>
              <span className='text-[14px]'>
                <label className='block' htmlFor='first_name'>
                  First Name
                </label>
                <input
                  type='text'
                  id='first_name'
                  className='w-full rounded-[10px] border border-[color:#BFC5C5] px-[15px] py-[10px]'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </span>
              <span className='text-[14px]'>
                <label className='block' htmlFor='last_name'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='last_name'
                  className='w-full rounded-[10px] border border-[color:#BFC5C5] px-[15px] py-[10px]'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </span>
            </div>
            {user && (
              <button
                className='flex w-full justify-center gap-2 rounded-[10px] bg-[color:#6DAFFE] py-[5px] text-white transition-all hover:bg-[color:#4784D9] disabled:bg-gray-500'
                disabled={!firstName || !lastName ? true : false}
                onClick={() => {
                  {
                    updateProfile(auth.currentUser!, {
                      displayName: firstName + ' ' + lastName,
                    });
                    updateUsersName(firstName, lastName, user.uid);
                    router.push('/settings');
                  }
                }}
              >
                Complete Registration
              </button>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default page;
