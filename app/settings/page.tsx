'use client';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Profile from '@/components/profile';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore } from '@/app/firebase/config';
import { auth } from '@/app/firebase/config';
import Authenticate from '@/components/authenticate';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { UserData } from '@/types';
import { FileWarning, Folders } from 'lucide-react';
import Image from 'next/image';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { uploadPortfolio } from '@/lib/portfolio';
import { updateUserSettings } from '@/lib/user';

const page = () => {
  // User Data
  const [user, isLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null); // User Data That Can Be Edited
  const [userTemp, setUserTemp] = useState<UserData | null>(null); // Back Up For User Data
  const [profilePicture, setProfilePicture] = useState<Blob | null>(null); // Hold Users Uploaded Picture
  const router = useRouter();

  // User Actions
  const [edit, setEdit] = useState<{
    portfolio: boolean;
    settings: boolean;
    preferences: boolean;
  }>({
    portfolio: true,
    settings: true,
    preferences: true,
  });

  // Loading States
  const [loading, setLoading] = useState<{
    settings: boolean;
    preferences: boolean;
    portfolio: boolean;
  }>({
    settings: false,
    preferences: false,
    portfolio: false,
  });

  // Grab Detailed User Data
  useEffect(() => {
    async function handleUserGrab() {
      if (!user) return;
      const userDoc = doc(firestore, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setUserData({
          displayName: userSnapshot.data().displayName,
          email: userSnapshot.data().email,
          emailVisible: userSnapshot.data().emailVisible,
          newsletter: userSnapshot.data().newsletter,
          photoURL: userSnapshot.data().photoURL,
          portfolioURL: userSnapshot.data().portfolioURL,
          setup: userSnapshot.data().setup,
          title: userSnapshot.data().title,
          uid: userSnapshot.data().uid,
          firstName: userSnapshot.data().displayName.split(' ')[0],
          lastName: userSnapshot.data().displayName.split(' ')[1],
          status: userSnapshot.data().status,
        });

        // Create Duplicate User Data For User To Alter Freely
        setUserTemp({
          displayName: userSnapshot.data().displayName,
          email: userSnapshot.data().email,
          emailVisible: userSnapshot.data().emailVisible,
          newsletter: userSnapshot.data().newsletter,
          photoURL: userSnapshot.data().photoURL,
          portfolioURL: userSnapshot.data().portfolioURL,
          setup: userSnapshot.data().setup,
          title: userSnapshot.data().title,
          uid: userSnapshot.data().uid,
          firstName: userSnapshot.data().displayName.split(' ')[0],
          lastName: userSnapshot.data().displayName.split(' ')[1],

          status: userSnapshot.data().status,
        });
      }
    }

    if (user && !isLoading) {
      handleUserGrab();
    }
  }, [user]);

  // Change Selected Value For Select Input On Users Title
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserData(() =>
      userData ? { ...userData, title: e.target.value } : null
    );
  }

  // Update Portfolio By Recording GIF at URL User Provides
  async function updatePortfolio() {
    if (!user || !userData || !userTemp) return;
    setLoading({ ...loading, portfolio: true });

    if (!userData.portfolioURL) return;

    await uploadPortfolio(userData, router);

    setLoading({ ...loading, portfolio: false });
  }

  // Update Approrpriate Data Changed From User Settings
  async function updateSettings() {
    if (!user || !userData || !userTemp) return;
    setLoading({ ...loading, settings: true });

    await updateUserSettings(userData, profilePicture, user);

    // Change Loading State For User Feedback
    setLoading({ ...loading, settings: false });

    setUserTemp(() =>
      userTemp
        ? {
            ...userTemp,
            email: userData.email,
            displayName: userData.firstName + ' ' + userData.lastName,
            title: userData.title,
          }
        : null
    );

    setEdit({ ...edit, settings: true });
  }

  function handlePictureUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  }

  // Display Authentication Required Message For Non-Logged In Users
  if (!user && !isLoading) {
    return <Authenticate />;
  } else if (user && !isLoading) {
    return (
      <>
        <Nav />
        <main className='min-h-screen'>
          <section className='mx-auto mb-[200px]  space-y-[20px] pt-[150px]'>
            <section className='border-[color:#BFC5C5]/50 flex w-full flex-wrap items-center justify-between gap-5 rounded-[10px] border bg-white px-[20px] py-[15px]'>
              <Profile
                title={userData?.title ? userData?.title : 'No Title Set'}
                displayName={
                  userData?.displayName ? userData?.displayName : 'No Name Set'
                }
                photoURL={user?.photoURL ? user?.photoURL : ''}
              />
              <div className='flex w-full flex-wrap justify-end gap-5 md:w-fit'>
                {userTemp?.portfolioURL ? (
                  <button
                    onClick={() => router.push(`/portfolios/${userData?.uid}`)}
                    className={` group flex w-fit items-center gap-2 rounded-[10px] border border-[color:#8BBFFC] px-[15px] py-[10px] text-[color:#8BBFFC] transition-all hover:border-[color:#4784D9] hover:text-[color:#4784D9] disabled:bg-gray-500`}
                  >
                    <Folders className='transition-all ease-in-out group-hover:-translate-y-[1px]' />
                    My Portfolio
                  </button>
                ) : (
                  <div
                    className={` flex w-fit cursor-default items-center gap-2 rounded-[10px] border border-orange-500 px-[15px] py-[10px] text-orange-500 transition-all`}
                  >
                    <FileWarning />
                    Add Portfolio URL
                  </div>
                )}
                <button
                  onClick={() => signOut(auth)}
                  className={` w-fit rounded-[10px] bg-[color:#FF6961] px-[15px] py-[10px] text-white transition-all hover:bg-[color:#e65f57] disabled:bg-gray-500`}
                >
                  Sign Out
                </button>
              </div>
            </section>
            <section className='border-[color:#BFC5C5]/50 w-full rounded-[10px] border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between gap-2'>
                <span className=''>
                  <h2 className='text-[19px]'>Upload Your Portfolio</h2>
                  <p className='text-gray-500'>
                    Enter your full portfolio URL below. We&apos;ll take care of
                    the rest
                  </p>
                </span>
                {edit.portfolio ? (
                  <button
                    className='text-[14px] hover:underline'
                    onClick={() =>
                      setEdit({
                        settings: true,
                        preferences: true,
                        portfolio: false,
                      })
                    }
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className='text-[14px] hover:underline'
                    onClick={() => {
                      setUserData(userTemp);
                      setEdit({ ...edit, portfolio: !edit.portfolio });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className='mt-[31px] flex flex-col justify-start gap-[20px] '>
                <div className='flex gap-5'>
                  <section className='flex w-full flex-col gap-[4px] text-[14px]'>
                    <label htmlFor='portfolioURL'>Full Portfolio URL</label>
                    <input
                      id='portfolioURL'
                      value={
                        userData?.portfolioURL ? userData?.portfolioURL : ''
                      }
                      className='rounded-[10px] border border-border px-[15px] py-[11px] text-[12px] text-important disabled:bg-gray-100 disabled:text-unimportant'
                      placeholder='Example: https://yeahimjt.me'
                      type='text'
                      disabled={edit.portfolio ? true : false}
                      onChange={(e) =>
                        setUserData((prevData) =>
                          prevData
                            ? { ...prevData, portfolioURL: e.target.value }
                            : null
                        )
                      }
                    />
                  </section>
                </div>
                {!edit.portfolio && (
                  <div className='flex w-full justify-end'>
                    <button
                      className={` w-full rounded-[10px] bg-[color:#8BBFFC] px-[15px] py-[10px] text-white transition-all hover:bg-[color:#4784D9] disabled:bg-gray-500`}
                      onClick={() => updatePortfolio()}
                      disabled={loading.portfolio}
                    >
                      {loading.portfolio
                        ? 'Updating Portfolio... (Approx. 1 min)'
                        : 'Update Portfolio'}
                    </button>
                  </div>
                )}
              </div>
            </section>
            <section className='border-[color:#BFC5C5]/50 w-full rounded-[10px] border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between'>
                <span className=''>
                  <h2 className='text-[19px]'>Account Settings</h2>
                  <p className='text-gray-500'>
                    Here you can change your account information
                  </p>
                </span>
                {edit.settings ? (
                  <button
                    className='text-[14px] hover:underline'
                    onClick={() =>
                      setEdit({
                        settings: false,
                        preferences: true,
                        portfolio: true,
                      })
                    }
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className='text-[14px] hover:underline'
                    onClick={() => {
                      setUserData(userTemp);
                      setEdit({ ...edit, settings: !edit.settings });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className='mt-[31px] flex flex-col justify-start gap-[20px] '>
                <section className='flex flex-[0.5] flex-col gap-[4px] text-[14px]'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    value={userData ? userData.email : ''}
                    className='rounded-[10px] border border-border px-[15px] py-[11px] text-[12px] text-unimportant disabled:bg-gray-100'
                    placeholder='Your Email Address'
                    type='email'
                    disabled
                    onChange={(e) =>
                      setUserData((prevData) =>
                        prevData ? { ...prevData, email: e.target.value } : null
                      )
                    }
                  />
                </section>

                <div className='flex gap-5'>
                  <section className='flex  flex-[0.5] flex-col gap-[4px] text-[14px]'>
                    <label htmlFor='firstname'>First Name</label>
                    <input
                      id='firstname'
                      value={userData?.firstName ? userData?.firstName : ''}
                      className='rounded-[10px] border border-border px-[15px] py-[11px] text-[12px] text-important disabled:bg-gray-100 disabled:text-unimportant'
                      placeholder='Your First Name'
                      type='text'
                      disabled={edit.settings ? true : false}
                      onChange={(e) =>
                        setUserData((prevData) =>
                          prevData
                            ? { ...prevData, firstName: e.target.value }
                            : null
                        )
                      }
                    />
                  </section>

                  <section className='flex flex-[0.5] flex-col gap-[4px] text-[14px]'>
                    <label htmlFor='fullname'>Last Name</label>
                    <input
                      id='lastname'
                      value={userData?.lastName ? userData?.lastName : ''}
                      className='rounded-[10px] border border-border px-[15px] py-[11px] text-[12px] text-important disabled:bg-gray-100 disabled:text-unimportant'
                      placeholder='Your Last Name'
                      type='text'
                      disabled={edit.settings ? true : false}
                      onChange={(e) =>
                        setUserData((prevData) =>
                          prevData
                            ? { ...prevData, lastName: e.target.value }
                            : null
                        )
                      }
                    />
                  </section>
                </div>
                {/* <section className='flex flex-[0.5] flex-col gap-[4px]  text-[14px]'> */}
                {/*   <label htmlFor='title'>Status</label> */}
                {/*   <select */}
                {/*     className='rounded-[10px] border border-border px-[15px] py-[11px] text-[12px] text-general disabled:bg-gray-100' */}
                {/*     value={userData?.title || ''} */}
                {/*     onChange={handleSelectChange} */}
                {/*     disabled={edit.settings ? true : false} */}
                {/*   > */}
                {/*     <option */}
                {/*       value='' */}
                {/*       className='text-unimportant' */}
                {/*       disabled */}
                {/*       hidden */}
                {/*     ></option> */}
                {/*     <option value='swe' className='text-unimportant'> */}
                {/*       Available for Work */}
                {/*     </option> */}
                {/*     <option value='fe' className='text-unimportant'> */}
                {/*       Busy with Projects */}
                {/*     </option> */}
                {/*     <option value='be' className='text-unimportant'> */}
                {/*       Open to Collaborations */}
                {/*     </option> */}
                {/*     <option value='ui' className='text-unimportant'> */}
                {/*       Taking a Break */}
                {/*     </option> */}
                {/*     <option value='pd' className='text-unimportant'> */}
                {/*       Networking Mode */}
                {/*     </option> */}
                {/*     <option value='pd' className='text-unimportant'> */}
                {/*       Seeking Feedback */}
                {/*     </option> */}
                {/*   </select> */}
                {/* </section> */}
                {/**/}
                {/* <section className='flex flex-[0.5] flex-col gap-[4px] text-[14px]'> */}
                {/*   <label htmlFor='title'>Title</label> */}
                {/*   <select */}
                {/*     className='rounded-[10px] border border-border px-[15px] py-[11px] text-[12px] text-general disabled:bg-gray-100' */}
                {/*     value={userData?.title || ''} */}
                {/*     onChange={handleSelectChange} */}
                {/*     disabled={edit.settings ? true : false} */}
                {/*   > */}
                {/*     <option */}
                {/*       value='' */}
                {/*       className='text-unimportant' */}
                {/*       disabled */}
                {/*       hidden */}
                {/*     ></option> */}
                {/*     <option value='swe' className='text-unimportant'> */}
                {/*       Software Engineer */}
                {/*     </option> */}
                {/*     <option value='fe' className='text-unimportant'> */}
                {/*       Front End Developer */}
                {/*     </option> */}
                {/*     <option value='be' className='text-unimportant'> */}
                {/*       Back End Developer */}
                {/*     </option> */}
                {/*     <option value='ui' className='text-unimportant'> */}
                {/*       UI/UX Designer */}
                {/*     </option> */}
                {/*     <option value='pd' className='text-unimportant'> */}
                {/*       Product Designer */}
                {/*     </option> */}
                {/*   </select> */}
                {/* </section> */}
                <section className='flex  flex-[0.5] flex-col gap-[4px]'>
                  <label className='select-none' htmlFor=''>
                    Profile Picture
                  </label>
                  {profilePicture && !edit.settings && (
                    <div className='relative my-6  h-[100px] w-[100px]'>
                      <Image
                        className='absolute  h-full rounded-full object-cover'
                        src={
                          (profilePicture &&
                            URL.createObjectURL(profilePicture)) ||
                          ''
                        }
                        width={100}
                        height={100}
                        alt=''
                      />
                    </div>
                  )}
                  <input
                    type='file'
                    className='flex gap-2 rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-general placeholder:text-unimportant disabled:bg-gray-100 disabled:text-unimportant'
                    placeholder='Upload Your Profile Picture'
                    disabled={edit.settings ? true : false}
                    onChange={handlePictureUpload}
                  />
                </section>
                {!edit.settings && (
                  <div className='flex w-full justify-end'>
                    <button
                      className={` w-full rounded-[10px] bg-[color:#8BBFFC] px-[15px] py-[10px] text-white transition-all hover:bg-[color:#4784D9] disabled:bg-gray-500`}
                      onClick={() => updateSettings()}
                      disabled={loading.settings}
                    >
                      {loading.settings
                        ? 'Updating Settings...'
                        : 'Update Settings'}
                    </button>
                  </div>
                )}
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default page;
