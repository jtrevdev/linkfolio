'use client';
import { grabUniqueUsers } from '@/lib/user';
import React, { useEffect, useState } from 'react';

const Unique = () => {
  const [count, setCount] = useState<number | boolean | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await grabUniqueUsers();
      setCount(result);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <span className='flex items-center gap-4 rounded-[10px] bg-[color:#EDF6FF] px-[15px] py-[5px]'>
        {`${count ? count : ''} Users`}
      </span>
    </>
  );
};

export default Unique;
