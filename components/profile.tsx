'use client';
import { auth, firestore } from '@/app/firebase/config';
import { UserData } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Profile = () => {
  const [user, isLoading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
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
  return (
    <section className='flex items-end gap-[10px] px-[17px] py-[23px]'>
      <Image
        className='rounded-full'
        src={userData?.photoURL || '/images/default.png'}
        width={68}
        height={68}
        alt=''
      />
      <section className='pb-[7px]'>
        <p className='font-semibold text-important'>{userData?.displayName}</p>
        <p className={`font-light text-general `}>
          {userData?.title ? userData.title : 'No Title Declared'}
        </p>
      </section>
    </section>
  );
};

export default Profile;
