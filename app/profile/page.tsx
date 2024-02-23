import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Profile from '@/components/profile';
import React from 'react';

const page = () => {
  return (
    <>
      <Nav />
      <main>
        <section className='mx-auto mb-[200px] mt-[109px] max-w-[1278px] space-y-[20px]'>
          <section className='w-full rounded-[8px] border border-border bg-white'>
            <Profile />
          </section>
          <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
            <h2 className=''>Account Settings</h2>
            <p className='text-unimportant'>
              Here you can change your account information
            </p>
            <div className='mt-[31px] flex justify-between gap-[20px]'>
              <section className='flex flex-[0.5] flex-col gap-[4px]'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                  placeholder='Your Email Address'
                  type='email'
                  disabled
                />
              </section>
              <section className='flex flex-[0.5] flex-col gap-[4px]'>
                <label htmlFor='fullname'>Full Name</label>
                <input
                  id='fullname'
                  className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                  placeholder='Your Full Name'
                  type='password'
                  disabled
                />
              </section>
            </div>
          </section>
          <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
            <h2 className=''>Account Preferences</h2>
            <p className='text-unimportant'>
              Here you can change your account preferences
            </p>
            <div className='mt-[31px] flex flex-col justify-between gap-[20px]'>
              <section className='flex justify-between'>
                <label className='select-none' htmlFor='emailpref'>
                  Allow others to email you
                </label>
                <input type='checkbox' id='emailpref' />
              </section>
              <section className='flex justify-between'>
                <label className='select-none' htmlFor='subscribe'>
                  Subscribe to newsletter
                </label>
                <input type='checkbox' id='subscribe' />
              </section>
            </div>
          </section>
          <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
            <h2 className=''>Change Passowrd</h2>
            <p className='text-unimportant'>
              Here you can set your new password
            </p>
            <div className='mt-[31px] flex flex-col justify-end gap-[20px]'>
              <section className='flex flex-[0.5] flex-col gap-[4px]'>
                <label htmlFor='old'>Old Password</label>
                <input
                  id='old'
                  className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                  placeholder='Old Password'
                  type='password'
                />
              </section>
              <section className='flex flex-[0.5] flex-col gap-[4px]'>
                <label htmlFor='new'>New Password</label>
                <input
                  id='new'
                  className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                  placeholder='New Password'
                  type='password'
                />
              </section>
              <section className='flex flex-[0.5] flex-col gap-[4px]'>
                <label htmlFor='confirm'>New Password Confirmation</label>
                <input
                  id='confirm'
                  className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                  placeholder='New Password Confirmation'
                  type='password'
                />
              </section>
              <button className='w-fit self-end rounded-[8px] bg-cta px-[25px] py-[13px] text-white'>
                Change Password
              </button>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
