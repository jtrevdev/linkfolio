'use client';
import { PortfolioData } from '@/types';
import React, { useEffect, useState } from 'react';
import Preview from './preview';
import Loading from './loading';
import { paginatePortfolios } from '@/lib/portfolio';

const Recents = () => {
  let n = 6;
  const [recentPortfolios, setRecentPortfolios] = useState<
    PortfolioData[] | null
  >(null);
  useEffect(() => {
    getPortfolios();
  }, []);
  async function getPortfolios() {
    const response = await paginatePortfolios(null);
    if (response) {
      setRecentPortfolios(response.portfolios);
    }
  }
  console.log(recentPortfolios);
  return (
    <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3'>
      {recentPortfolios
        ? recentPortfolios.map((portfolio, index) => (
            <Preview
              key={index}
              redirect={portfolio.id}
              image={portfolio.photoURL}
              owner_displayName={portfolio.owner_displayName}
              owner_photoURL={portfolio.owner_photoURL}
              owner_title={portfolio.owner_title}
            />
          ))
        : [...Array(n)].map((element, index) => <Loading key={index} />)}
    </div>
  );
};

export default Recents;
