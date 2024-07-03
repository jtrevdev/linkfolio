'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Profile from './profile';
import Loading from './loading';
import { Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

type PreviewProps = {
  redirect: string;
  image: string[];
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
  const [loaded, setLoaded] = useState<boolean>(false);
  function handleLoaded() {
    setLoaded(true);
  }
  return (
    <motion.div
      initial={{ y: 10, opacity: 0.7 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut' }}
    >
      <Link
        href={`/portfolios/${redirect}`}
        className={`flex flex-col justify-between  transition-all duration-500 `}
      >
        {image ? (
          <div className='relative aspect-video'>
            <Image
              onLoad={handleLoaded}
              className={`delay-50 border-[color:#BFC5C5]/50 w-full rounded-[8px] border object-cover  transition-opacity`}
              src={image[0]}
              fill
              alt=''
              draggable={false}
            />
          </div>
        ) : (
          ''
        )}
      </Link>
      <span className='mt-[8px] flex items-center justify-between'>
        <div className='flex items-center gap-[5px]'>
          <div className='relative h-[35px] w-[35px]'>
            <Image
              className='absolute h-full rounded-full object-cover'
              src={`${owner_photoURL ? owner_photoURL : '/images/default.png'}`}
              width={35}
              height={35}
              alt={owner_displayName}
            />
          </div>
          <p className='text-[12px]'>{owner_displayName}</p>
        </div>
        {/* <div className='flex gap-5'> */}
        {/*   <span> */}
        {/*     <button className='flex cursor-pointer items-center gap-[5px]'> */}
        {/*       <Heart className='text-red-500' size={14} fill={'red'} /> */}
        {/*       <p className='text-[14px]'>3</p> */}
        {/*     </button> */}
        {/*   </span> */}
        {/*   <span> */}
        {/*     <div className='flex cursor-pointer items-center gap-[5px]'> */}
        {/*       <Eye size={14} /> */}
        {/*       <p className='text-[14px]'>3</p> */}
        {/*     </div> */}
        {/*   </span> */}
        {/* </div> */}
      </span>
    </motion.div>
  );
};

export default Preview;
