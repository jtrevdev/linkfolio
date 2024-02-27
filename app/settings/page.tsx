'use client';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Profile from '@/components/profile';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/config';
import Authenticate from '@/components/authenticate';
import { doc, getDoc } from 'firebase/firestore';
import { UserData } from '@/types';
import { Edit, Edit2, Edit3 } from 'lucide-react';

const page = () => {
  // User Data
  const [user, isLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Edit Actions
  const [profile, setProfile] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<boolean>(false);

  // Grab Additional User Data
  useEffect(() => {
    async function handleUserDataGrab() {
      if (!user) return;
      const userDoc = doc(firestore, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setUserData({
          displayName: userSnapshot.data().displayName,
          email: userSnapshot.data().email,
          emailVisible: userSnapshot.data().emailVisible,
          newsletter: userSnapshot.data().newsletter,
          photoURL: userSnapshot.data().photoURL,
          portfolioURL: userSnapshot.data().portfolioURL,
          setup: userSnapshot.data().setup,
          title: userSnapshot.data().title,
          uid: userSnapshot.data().uid,
        });
      }
    }

    if (user && !isLoading) {
      handleUserDataGrab();
    }
  }, [user]);

  if (!user && !isLoading) {
    return <Authenticate />;
  } else if (user && !isLoading) {
    return (
      <>
        <Nav />
        <main>
          <section className='mx-auto mb-[200px] mt-[109px] max-w-[1278px] space-y-[20px]'>
            <section className='flex w-full items-center justify-between rounded-[8px] border border-border bg-white'>
              <Profile />
              <Edit2 size={28} className='mx-[17px]' />
            </section>
            <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between'>
                <span className=''>
                  <h2 className=''>Account Settings</h2>
                  <p className='text-unimportant'>
                    Here you can change your account information
                  </p>
                </span>
                <Edit2 size={28} className='' />
              </div>

              <div className='mt-[31px] flex flex-col justify-between gap-[20px] second:flex-row'>
                <section className='flex flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    value={userData?.email}
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-unimportant'
                    placeholder='Your Email Address'
                    type='email'
                    disabled
                  />
                </section>
                <section className='flex flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='fullname'>Full Name</label>
                  <input
                    id='fullname'
                    value={userData?.displayName || ''}
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-important disabled:text-unimportant'
                    placeholder='Your Full Name'
                    type='text'
                    disabled={userData?.displayName ? true : false}
                  />
                </section>
              </div>
            </section>
            <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between'>
                <span>
                  <h2 className=''>Account Preferences</h2>
                  <p className='text-unimportant'>
                    Here you can change your account preferences
                  </p>
                </span>
                <Edit2 size={28} className='' />
              </div>
              <div className='mt-[31px] flex flex-col justify-between gap-[20px]'>
                <section className='flex justify-between'>
                  <label className='select-none' htmlFor='emailpref'>
                    Allow others to email you
                  </label>
                  <input
                    type='checkbox'
                    id='emailpref'
                    checked={userData?.emailVisible}
                  />
                </section>
                <section className='flex justify-between'>
                  <label className='select-none' htmlFor='subscribe'>
                    Subscribe to newsletter
                  </label>

                  <input
                    type='checkbox'
                    id='subscribe'
                    checked={userData?.newsletter}
                    onChange={(e) =>
                      setUserData((userData) =>
                        userData
                          ? { ...userData, newsletter: !userData.newsletter }
                          : null
                      )
                    }
                  />
                </section>
              </div>
            </section>
            <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
              <h2 className=''>Change Password</h2>
              <p className='text-unimportant'>
                Here you can set your new password
              </p>
              <div className='mt-[31px] flex flex-col justify-end gap-[20px]'>
                <section className='flex flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='old'>Old Password</label>
                  <input
                    id='old'
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                    placeholder='Old Password'
                    type='password'
                  />
                </section>
                <section className='flex flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='new'>New Password</label>
                  <input
                    id='new'
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                    placeholder='New Password'
                    type='password'
                  />
                </section>
                <section className='flex flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='confirm'>New Password Confirmation</label>
                  <input
                    id='confirm'
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                    placeholder='New Password Confirmation'
                    type='password'
                  />
                </section>
                <button className='w-fit self-end rounded-[8px] bg-cta px-[25px] py-[13px] text-white'>
                  Change Password
                </button>
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default page;
