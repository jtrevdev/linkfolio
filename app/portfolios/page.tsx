'use client';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Preview from '@/components/preview';
import { SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Filter = {
  title: string;
  active: boolean;
  type: string;
};

type Filters = Filter[];

const filters = [
  {
    title: 'All',
    active: true,
    type: 'category',
  },
  {
    title: 'Software Developer',
    active: false,
    type: 'category',
  },
  {
    title: 'Front End Developer',
    active: false,
    type: 'category',
  },
  {
    title: 'Back End Developer',
    active: false,
    type: 'category',
  },
  {
    title: 'UI/UX Designer',
    active: false,
    type: 'category',
  },
  {
    title: 'Product Designer',
    active: false,
    type: 'category',
  },
  {
    title: 'UNUSED',
    active: false,
    type: 'seperator',
  },
  {
    title: 'Most Recent',
    active: false,
    type: 'time',
  },
  {
    title: 'Oldest',
    active: false,
    type: 'time',
  },
];

const page = () => {
  const [filter, setFilter] = useState<Filters>(filters);

  useEffect(() => {
    if (filter) {
    }
  }, [filter]);
  return (
    <>
      <Nav />
      <main className=''>
        <section className='mx-auto max-w-[1278px] pt-[109px]'>
          <div className='filter-menu mb-[100px] flex w-fit items-start gap-[13px] rounded-[8px] border border-border bg-white px-[25px] py-[25px]'>
            <button>
              <SlidersHorizontal
                size={42}
                className='h-[30px] w-[30px] text-important'
              />
            </button>
            <section className='flex flex-row flex-wrap items-center gap-[13px]'>
              {filter.map((filter: Filter, index: number) =>
                filter.type === 'seperator' ? (
                  <div className='bg-unactive h-[40px] w-[2px]'></div>
                ) : (
                  <button
                    className={` rounded-[8px] px-[20px] py-[11px] text-important transition-all hover:bg-cta hover:text-white ${filter.active ? 'bg-cta text-white' : 'bg-unactive text-important'}`}
                    key={index}
                  >
                    {filter.title}
                  </button>
                )
              )}
            </section>
          </div>
          <div className='grid grid-cols-1 gap-[20px] second:grid-cols-2 first:grid-cols-3'>
            <Preview />
            <Preview />
            <Preview />
            <Preview />
            <Preview />
            <Preview />
          </div>
          <div className='bg-unactive my-[200px] rounded-[20px] py-[36px] text-center text-[18px] text-important'>
            Load More
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
