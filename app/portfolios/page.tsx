'use client';
import Footer from '@/components/footer';
import Modal from '@/components/modal';
import Nav from '@/components/nav';
import Preview from '@/components/preview';
import { PortfolioData } from '@/types';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '../firebase/config';

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
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [portfolios, setPortfolios] = useState<PortfolioData[] | null>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (isIntersecting && fetched) {
      setLoading(true);
      handlePortfolio();
    }
    setLoading(false);
  }, [isIntersecting]);

  function handleFilter(selectedTitle: string, selectedType: string) {
    let updatedFilter = filter.map((item) => {
      let active = item.active;
      if (item.title === selectedTitle) {
        active = !item.active;
      } else if (item.title !== selectedTitle && item.type === selectedType) {
        active = false;
      }
      return {
        ...item,
        active,
      };
    });

    // Deactivate "All" filter if another filter is selected
    if (
      selectedTitle !== 'All' &&
      selectedTitle !== 'Most Recent' &&
      selectedTitle !== 'Oldest'
    ) {
      const allFilterIndex = updatedFilter.findIndex(
        (item) => item.title === 'All'
      );
      if (allFilterIndex !== -1) {
        updatedFilter[allFilterIndex].active = false;
      }
    }

    // Check if all filters are inactive and set "All" filter to active
    if (
      updatedFilter.every((item) =>
        item.title !== 'Most Recent' && item.title !== 'Oldest'
          ? !item.active
          : item.active || !item.active
      )
    ) {
      const allFilterIndex = updatedFilter.findIndex(
        (item) => item.title === 'All'
      );
      if (allFilterIndex !== -1) {
        updatedFilter[allFilterIndex].active = true;
      }
    }

    setFilter([...updatedFilter]);
  }

  async function handlePortfolio() {
    const collectionRef = collection(firestore, 'portfolios');
    // Appended Conditions That For Category, And Potential Time

    let conditions = [];
    const activeFilters = filter.filter((item) => {
      if (item.active) {
        return item.title;
      }
    });

    let category;
    let time;

    // Get active category filter
    category = activeFilters.filter((active) => {
      if (active.type === 'category') {
        return active;
      }
    });

    // Append Category Where Condition
    if (category) {
      conditions.push(where('category', '==', category));
    }

    // Get active time filter
    time = activeFilters.filter((active) => {
      if (active.type === 'time') {
        return active;
      }
    });

    // Append Appropriate Time Condition
    if (time[0] && time[0].title === 'Most Recent') {
      // conditions.push(where('category', '==', category))
    } else if (time[0] && time[0].title === 'Oldest') {
    }

    console.log(category);
    console.log(time);

    let q;

    // If Category Is Default, All, Avoid Using Where Condition, Simply Query As Normal
    if (category.every((item) => item.title === 'All')) {
      q = query(
        collectionRef,
        orderBy('owner_displayName'),
        limit(1),
        startAfter(lastVisible)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const combinedPosts: {
          photoURL: any;
          portfolioURL: any;
          views: any;
          owner_displayName: any;
          owner_photoURL: any;
          owner_title: any;
        }[] = [];
        snapshot.docs.forEach((doc) => {
          combinedPosts.push({
            photoURL: doc.data().photoURL,
            portfolioURL: doc.data().portfolioURL,
            views: doc.data().views,
            owner_displayName: doc.data().owner_displayName,
            owner_photoURL: doc.data().owner_photoURL,
            owner_title: doc.data().owner_title,
          });
        });
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        console.log(combinedPosts);
        if (portfolios) {
          setPortfolios([...portfolios, ...combinedPosts]);
        } else {
          setPortfolios(combinedPosts);
        }
        setFetched(true);
      } else {
        setLimitReached(true);
      }
    }
    // If Category Happens To Not Be Default, Use Where Condition To Utilize Appropriate Filter
    else {
    }
  }
  useEffect(() => {
    handlePortfolio();
  }, [filter]);

  return (
    <>
      <Modal />

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
                  <div
                    className='h-[40px] w-[2px] bg-unactive'
                    key={index}
                  ></div>
                ) : (
                  <button
                    className={` rounded-[8px] px-[20px] py-[11px] text-important transition-all hover:bg-cta/50 hover:text-white ${filter.active ? 'bg-cta text-white' : 'bg-unactive text-important'}`}
                    key={index}
                    onClick={() => handleFilter(filter.title, filter.type)}
                  >
                    {filter.title}
                  </button>
                )
              )}
            </section>
          </div>

          <div className='grid  grid-cols-1 gap-[20px] second:grid-cols-2 first:grid-cols-3'>
            {portfolios?.map((portfolio, index) => (
              <Preview
                key={index}
                redirect={portfolio.portfolioURL}
                image={portfolio.photoURL}
                owner_displayName={portfolio.owner_displayName}
                owner_photoURL={portfolio.owner_photoURL}
                owner_title={portfolio.owner_title}
              />
            ))}
          </div>

          <div
            ref={ref}
            className={`${portfolios ? 'mb-[200px] mt-[35vh]' : 'mb-[200px]'} rounded-[20px] bg-unactive py-[36px] text-center text-[18px] text-important`}
          >
            {loading
              ? 'Loading'
              : limitReached
                ? 'No More Portfolios'
                : 'Load More'}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
