import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Profile from './profile';

type PreviewProps = {
  redirect: string;
  image: string;
  owner_displayName: string;
  owner_title: string;
  owner_photoURL: string;
};

const Preview = ({
  redirect,
  image,
  owner_displayName,
  owner_title,
  owner_photoURL,
}: PreviewProps) => {
  return (
    <Link
      href={redirect}
      className='flex flex-col justify-between rounded-[20px]  border border-border bg-white hover:shadow-md second:min-h-[390px]'
    >
      <Image
        className='w-full rounded-[8px] border-[1px] border-border object-cover p-[17px]'
        src={image}
        width={379}
        height={210}
        alt=''
      />
      <Profile
        photoURL={owner_photoURL}
        displayName={owner_displayName}
        title={owner_title}
      />
    </Link>
  );
};

export default Preview;
