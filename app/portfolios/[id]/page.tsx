'use client';
import { firestore } from '@/app/firebase/config';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Preview from '@/components/preview';
import Profile from '@/components/profile';
import { PortfolioData } from '@/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Play, Pause, ExternalLink } from 'lucide-react';

const page = () => {
  const uid = usePathname().split('/')[2];
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [extraPortfolios, setExtraPortfolios] = useState<
    PortfolioData[] | [] | null
  >(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  console.log(portfolio);
  useEffect(() => {
    handlePortfolio();
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (portfolio) {
      handleExtraPortfolios();
    }
    if (
      portfolio &&
      portfolio.photoURL &&
      portfolio.photoURL.length > 0 &&
      !clicked
    ) {
      setImageSrc(portfolio.photoURL[currentPhotoIndex]);

      const intervalId = setInterval(() => {
        setCurrentPhotoIndex(
          (prevIndex) => (prevIndex + 1) % portfolio.photoURL.length
        );
        setProgress(0); // Reset progress for the new image
      }, 4000);

      const progressIntervalId = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 101); // Increment progress every second
      }, 40); // Adjust the interval to match the desired smoothness of the progress bar

      return () => {
        clearInterval(intervalId);
        clearInterval(progressIntervalId);
      };
    }
  }, [portfolio, currentPhotoIndex, clicked]);
  async function handlePortfolio() {
    const portfolioDocRef = doc(firestore, 'portfolios', uid);
    const portfolioDocSnap = await getDoc(portfolioDocRef);
    if (portfolioDocSnap.exists()) {
      setPortfolio({
        owner_displayName: portfolioDocSnap.data().owner_displayName,
        owner_photoURL: portfolioDocSnap.data().owner_photoURL,
        owner_title: portfolioDocSnap.data().owner_title,
        photoURL: portfolioDocSnap.data().photoURL,
        portfolioURL: portfolioDocSnap.data().portfolioURL,
        timestamp: portfolioDocSnap.data().timestamp,
        views: portfolioDocSnap.data().views,
        uid: uid,
        likes: portfolioDocSnap.data().likes,
        videoURL: portfolioDocSnap.data().videoURL,
        id: portfolioDocSnap.id,
      });
    }
  }

  async function handleExtraPortfolios() {
    const portfolioCollectionRef = collection(firestore, 'portfolios');
    let q;
    if (portfolio?.owner_title) {
      q = query(
        portfolioCollectionRef,
        limit(3),
        where('owner_title', '==', portfolio.owner_title),
        where('timestamp', '!=', portfolio.timestamp)
      );
    } else {
      q = query(
        portfolioCollectionRef,
        limit(3),
        where('timestamp', '!=', portfolio?.timestamp)
      );
    }
    const portfolioSnapshot = await getDocs(q);
    if (!portfolioSnapshot.empty) {
      portfolioSnapshot.forEach((portfolio) => {
        if (extraPortfolios) {
          setExtraPortfolios([
            ...extraPortfolios,
            {
              photoURL: portfolio.data().photoURL,
              portfolioURL: portfolio.data().portfolioURL,
              owner_displayName: portfolio.data().owner_displayName,
              owner_photoURL: portfolio.data().owner_photoURL,
              owner_title: portfolio.data().owner_title,
              views: portfolio.data().views,
              timestamp: portfolio.data().timestamp,
              uid: portfolio.id,
              likes: portfolio.data().likes,
              videoURL: portfolio.data().videoURL,
              id: portfolio.id,
            },
          ]);
        } else {
          setExtraPortfolios([
            {
              photoURL: portfolio.data().photoURL,
              portfolioURL: portfolio.data().portfolioURL,
              owner_displayName: portfolio.data().owner_displayName,
              owner_photoURL: portfolio.data().owner_photoURL,
              owner_title: portfolio.data().owner_title,
              views: portfolio.data().views,
              timestamp: portfolio.data().timestamp,
              uid: portfolio.id,
              likes: portfolio.data().likes,
              videoURL: portfolio.data().videoURL,
              id: portfolio.id,
            },
          ]);
        }
      });
    } else {
      setExtraPortfolios([]);
    }
  }
  return (
    <>
      <Nav />
      <main className='min-h-screen'>
        <section className='mx-auto pt-[109px]'>
          <section className='flex w-full flex-col items-center justify-between gap-5 bg-white md:flex-row'>
            {portfolio ? (
              <Profile
                photoURL={portfolio?.owner_photoURL}
                displayName={portfolio?.owner_displayName}
                title={portfolio?.owner_title}
              />
            ) : (
              <div className='flex w-full flex-col items-center justify-between gap-5 md:flex-row'>
                <div className='flex items-center gap-[10px]'>
                  <div className='relative h-[70px] w-[70px]'>
                    <div className='skeleton h-full  rounded-full bg-border'></div>
                  </div>
                  <div className='flex w-fit flex-col gap-1'>
                    <span className='skeleton h-[24px] w-[143px]  bg-border'></span>
                    <span className='skeleton h-[20px] w-[143px]  bg-border'></span>
                  </div>
                </div>
                <div className='skeleton h-[46px] w-[186px] bg-border'></div>
              </div>
            )}
            {portfolio && (
              <a
                href={portfolio?.portfolioURL}
                target='_blank'
                className='flex h-fit items-center gap-2 rounded-[8px] bg-[color:#8BBFFC] px-[42px] py-[11px] text-white hover:bg-[color:#4784D9]'
              >
                <ExternalLink />
                Visit Portfolio
              </a>
            )}
          </section>
        </section>
        <section className='relative mx-auto mb-[40px] mt-[50px] aspect-video w-full  first:h-[709px]'>
          {portfolio && imageSrc ? (
            <div>
              <Image
                src={imageSrc}
                className='border-[color:#BFC5C5]/50 z-[2] select-none rounded-2xl border shadow-lg'
                fill
                alt='highlight'
                draggable={false}
              />
              <div
                className='radial-progress absolute bottom-2 right-2 z-[5] cursor-pointer'
                style={{ '--value': progress, '--size': '2rem' }}
                role='progressbar'
                onClick={() => {
                  setClicked(!clicked);
                  setProgress(0);
                }}
              >
                {clicked ? <Play size={16} /> : <Pause size={16} />}
              </div>
            </div>
          ) : (
            <div className='skeleton aspect-video w-full border-b border-border bg-border object-cover '></div>
          )}
        </section>
        <section className='mb-[81px]'>
          {portfolio && imageSrc && portfolio.photoURL ? (
            <div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
              {portfolio.photoURL.map((src, index) => (
                <div
                  className=' relative aspect-video cursor-pointer rounded-2xl shadow-md transition-all ease-in-out hover:scale-[1.01] hover:shadow-lg'
                  onClick={() => {
                    setClicked(true);
                    setImageSrc(src);
                    setCurrentPhotoIndex(index);
                  }}
                >
                  <Image
                    src={src}
                    fill
                    alt='smaller portfolio'
                    draggable={false}
                    className='border-[color:#BFC5C5]/50 rounded-2xl border'
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
              <div className='skeleton relative aspect-video w-full'></div>
              <div className='skeleton relative aspect-video w-full'></div>
              <div className='skeleton relative aspect-video w-full'></div>
              <div className='skeleton relative aspect-video w-full'></div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
