'use client';
import { auth, firestore } from '@/app/firebase/config';
import { UserData } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type ProfileProps = {
  photoURL: string | undefined;
  displayName: string | undefined;
  title: string | undefined;
};

const Profile = ({ photoURL, displayName, title }: ProfileProps) => {
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
          firstName: userSnapshot.data().displayName.split(' ')[0],
          lastName: userSnapshot.data().displayName.split(' ')[1],
          status: userSnapshot.data().status,
        });
      }
    }

    if (user && !isLoading) {
      handleUserDataGrab();
    }
  }, [user]);
  return (
    <section className='flex w-fit items-center gap-[10px]'>
      <div className='group relative h-[70px] w-[70px]'>
        <Image
          className='absolute h-full rounded-full object-cover'
          src={photoURL || '/images/default.png'}
          width={70}
          height={70}
          alt=''
        />
      </div>
      <section className='pb-[7px]'>
        <p className='font-semibold text-important'>
          {displayName ? displayName : 'Anonymous'}
        </p>
      </section>
    </section>
  );
};

export default Profile;
