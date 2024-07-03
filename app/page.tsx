import Accordion from '@/components/accordion';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Newsletter from '@/components/newsletter';
import Preview from '@/components/preview';
import Recents from '@/components/recents';
import Register from '@/components/register';
import Unique from '@/components/unique';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Nav />
      <main className='min-h-screen'>
        <header className='flex flex-col items-center space-y-[10px] pb-[150px] pt-[109px]'>
          {/* <Unique /> */}
          <h1 className='gradient inline-block bg-gradient-to-r from-[color:#07233D] via-[color:#6DAFFE] to-[color:#07233D] bg-clip-text text-[33px] font-semibold text-transparent'>
            Your portfolio, linked.
          </h1>
          <h2 className='max-w-[398px] text-center text-[19px]'>
            Fuel your creative journey. Inspire yourself and others with
            real-world portfolios.
          </h2>
          <span className='flex flex-col items-center justify-between gap-5 pt-[50px] lg:flex-row'>
            <div>
              <h3 className='text-[18px]'>Upload your portfolio in minutes.</h3>
              <p className='text-[12px]'>
                All it takes is your email address, and portfolio URL. We handle
                the rest.
              </p>
            </div>
            <Register />
          </span>
        </header>
        <div className='mx-auto '>
          <Recents />
        </div>
        <div className='mt-[100px]'>
          {/* <h1 className='text-[27px] font-medium'>You Reached The Bottom?</h1> */}
          {/* <p className='text-[19px]'> */}
          {/*   Here are some actions you can take to help fix this. */}
          {/* </p> */}
          {/* <div className='mt-[32px] flex gap-5'> */}
          {/*   <span className='border-[color:#BFC5C5]/50 flex-[0.5] border p-4'> */}
          {/*     <h3 className='text-[19px] font-medium'>Share</h3> */}
          {/*     <p>We will give you a link to share on all platforms</p> */}
          {/*   </span> */}
          {/*   <span className='border-[color:#BFC5C5]/50 flex-[0.5] border p-4'> */}
          {/*     <h3 className='text-[19px] font-medium'>Upload your portfolio</h3> */}
          {/*     <p> */}
          {/*       Stealing the spotlight will only take minutes, to showcase your */}
          {/*       portfolio forever */}
          {/*     </p> */}
          {/*   </span> */}
          {/* </div> */}
        </div>
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </div>
  );
}
