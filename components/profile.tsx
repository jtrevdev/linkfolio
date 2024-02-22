import Image from 'next/image';
import React from 'react';

const Profile = () => {
  return (
    <section className='flex items-end gap-[10px] px-[17px] py-[23px]'>
      <Image
        className=''
        src='/images/face.png'
        width={68}
        height={68}
        alt=''
      />
      <section className='pb-[7px]'>
        <p className='font-semibold text-important'>Jonathan Trevino</p>
        <p className='font-light text-general'>Front End Developer</p>
      </section>
    </section>
  );
};

export default Profile;
