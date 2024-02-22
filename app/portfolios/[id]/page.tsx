import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Preview from '@/components/preview';
import Profile from '@/components/profile';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <>
      <Nav />
      <main className=''>
        <section className='mx-auto max-w-[1278px] pt-[109px]'>
          <div className='flex flex-col items-center justify-between gap-[40px] second:flex-row second:gap-[0px]'>
            <section className='flex w-full items-center justify-between rounded-[8px] border border-border bg-white pr-[31px] second:flex-[0.7]'>
              <Profile />
              <button className='flex h-[55px] w-[55px] items-center justify-center rounded-full bg-gray-500'>
                <Mail />
              </button>
            </section>
            <button className='h-fit rounded-[8px] bg-cta px-[42px] py-[11px] text-white'>
              Visit Portfolio
            </button>
          </div>
        </section>
        <section className='relative mx-auto mb-[81px] mt-[50px] aspect-auto aspect-video w-full  max-w-[1278px] bg-gray-50 first:h-[709px]'>
          <Image
            className='w-full object-contain'
            src='/images/big-portfolio.png'
            // sizes='700px'
            fill
            alt=''
          />
        </section>
        <section className='mx-auto mb-[204px] max-w-[1278px]'>
          <h1 className='heading'>Similar Portfolios</h1>
          <section className='mt-[18px] grid grid-cols-1 gap-[20px] second:grid-cols-2 first:grid-cols-3'>
            <Preview />
            <Preview />
            <Preview />
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
