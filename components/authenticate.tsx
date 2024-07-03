'use client';
import React from 'react';
import Nav from './nav';

const Authenticate = () => {
  return (
    <>
      <Nav />
      <main className=' mt-[109px] '>
        <section>
          <h2 className='text-center'>Authentication Required</h2>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Authenticate;
