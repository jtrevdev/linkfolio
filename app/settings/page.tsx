'use client';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import Profile from '@/components/profile';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/config';
import Authenticate from '@/components/authenticate';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserData } from '@/types';
import { Edit, Edit2, Edit3, X } from 'lucide-react';

const page = () => {
  // User Data
  const [user, isLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null); // User Data That Can Be Edited
  const [userTemp, setUserTemp] = useState<UserData | null>(null); // Back Up For User Data

  // Edit Actions
  const [profile, setProfile] = useState<boolean>(true);
  const [settings, setSettings] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<boolean>(true);
  const [password, setPassword] = useState<boolean>(true);
  const [edit, setEdit] = useState<{
    settings: boolean;
    preferences: boolean;
    password: boolean;
  }>({
    settings: true,
    preferences: true,
    password: true,
  });

  // Loading States
  const [loading, setLoading] = useState<{
    settings: boolean;
    preferences: boolean;
    password: boolean;
  }>({
    settings: false,
    preferences: false,
    password: false,
  });

  // Grab Additional User Data
  useEffect(() => {
    async function handleUserDataGrab() {
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
        });
      }
    }

    if (user && !isLoading) {
      handleUserDataGrab();
    }
  }, [user]);
  console.log(userData);
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserData(() =>
      userData ? { ...userData, title: e.target.value } : null
    );
  }

  async function updateSettings() {
    if (!user || !userData) return;
    setLoading({ ...loading, settings: true });
    const userDoc = doc(firestore, 'users', user.uid);
    await updateDoc(userDoc, {
      email: userData.email,
      displayName: userData.displayName,
      title: userData.title,
    });
    setLoading({ ...loading, settings: false });
    setUserTemp(() =>
      userTemp
        ? {
            ...userTemp,
            email: userData.email,
            displayName: userData.displayName,
            title: userData.title,
          }
        : null
    );
    setEdit({ ...edit, settings: true });
  }

  async function updatePreferences() {
    if (!user || !userData) return;
    setLoading({ ...loading, preferences: true });
    const userDoc = doc(firestore, 'users', user.uid);
    await updateDoc(userDoc, {
      emailVisible: userData.emailVisible,
      newsletter: userData?.newsletter,
    });
    setLoading({ ...loading, preferences: false });
    setUserTemp(() =>
      userTemp
        ? {
            ...userTemp,
            emailVisible: userData.emailVisible,
            newsletter: userData.newsletter,
          }
        : null
    );
    setEdit({ ...edit, preferences: true });
  }

  async function updatePassword() {}

  if (!user && !isLoading) {
    return <Authenticate />;
  } else if (user && !isLoading) {
    return (
      <>
        <Nav />
        <main>
          <section className='mx-auto mb-[200px] mt-[109px] max-w-[1278px] space-y-[20px]'>
            <section className='flex w-full items-center justify-between rounded-[8px] border border-border bg-white'>
              <Profile
                photoURL={user.photoURL ? user.photoURL : ''}
                displayName={user?.displayName ? user.displayName : ''}
                title={userData?.title ? userData.title : ''}
              />
            </section>
            <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between'>
                <span className=''>
                  <h2 className=''>Account Settings</h2>
                  <p className='text-unimportant'>
                    Here you can change your account information
                  </p>
                </span>
                {edit.settings ? (
                  <button
                    onClick={() =>
                      setEdit({ ...edit, settings: !edit.settings })
                    }
                  >
                    <Edit2 size={28} className='' />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUserData(userTemp);
                      setEdit({ ...edit, settings: !edit.settings });
                    }}
                  >
                    <X size={28} className='' />
                  </button>
                )}
              </div>

              <div className='mt-[31px] flex flex-col flex-wrap justify-between gap-[20px] second:flex-row'>
                <section className='flex min-w-[608px] flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    value={userData ? userData.email : ''}
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-unimportant'
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
                <section className='flex min-w-[608px] flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='fullname'>Full Name</label>
                  <input
                    id='fullname'
                    value={userData?.displayName ? userData?.displayName : ''}
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-important disabled:text-unimportant'
                    placeholder='Your Full Name'
                    type='text'
                    disabled={edit.settings ? true : false}
                    onChange={(e) =>
                      setUserData((prevData) =>
                        prevData
                          ? { ...prevData, displayName: e.target.value }
                          : null
                      )
                    }
                  />
                </section>
                <section className='flex min-w-[608px] flex-[0.5] flex-col gap-[4px]'>
                  <label htmlFor='title'>Title</label>
                  <select
                    className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] text-general'
                    value={userData?.title || ''}
                    onChange={handleSelectChange}
                    disabled={edit.settings ? true : false}
                  >
                    <option
                      value=''
                      className='text-unimportant'
                      disabled
                      hidden
                    ></option>
                    <option value='swe' className='text-unimportant'>
                      Software Engineer
                    </option>
                    <option value='fe' className='text-unimportant'>
                      Front End Developer
                    </option>
                    <option value='be' className='text-unimportant'>
                      Back End Developer
                    </option>
                    <option value='ui' className='text-unimportant'>
                      UI/UX Designer
                    </option>
                    <option value='pd' className='text-unimportant'>
                      Product Designer
                    </option>
                  </select>
                </section>
                {!edit.settings && (
                  <button
                    className='w-fit self-end rounded-[8px] bg-cta px-[25px] py-[13px] text-white'
                    onClick={() => updateSettings()}
                    disabled={loading.settings}
                  >
                    {loading.settings
                      ? 'Updating Settings...'
                      : 'Update Settings'}
                  </button>
                )}
              </div>
            </section>
            <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between'>
                <span>
                  <h2 className=''>Account Preferences</h2>
                  <p className='text-unimportant'>
                    Here you can change your account preferences
                  </p>
                </span>
                {edit.preferences ? (
                  <button
                    onClick={() =>
                      setEdit({ ...edit, preferences: !edit.preferences })
                    }
                  >
                    <Edit2 size={28} className='' />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdit({ ...edit, preferences: !edit.preferences });
                      setUserData(userTemp);
                    }}
                  >
                    <X size={28} className='' />
                  </button>
                )}
              </div>
              <div className='mt-[31px] flex flex-col justify-between gap-[20px]'>
                <section className='flex justify-between'>
                  <label className='select-none' htmlFor='emailpref'>
                    Allow others to email you
                  </label>
                  <input
                    type='checkbox'
                    id='emailpref'
                    checked={userData ? userData.emailVisible : false}
                    disabled={edit.preferences}
                    onChange={(e) =>
                      setUserData((prevData) =>
                        prevData
                          ? {
                              ...prevData,
                              emailVisible: !prevData.emailVisible,
                            }
                          : null
                      )
                    }
                  />
                </section>
                <section className='flex justify-between'>
                  <label className='select-none' htmlFor='subscribe'>
                    Subscribe to newsletter
                  </label>

                  <input
                    type='checkbox'
                    id='subscribe'
                    checked={userData ? userData.newsletter : false}
                    onChange={(e) =>
                      setUserData((prevData) =>
                        prevData
                          ? { ...prevData, newsletter: !prevData.newsletter }
                          : null
                      )
                    }
                    disabled={edit.preferences}
                  />
                </section>
                {!edit.preferences && (
                  <button
                    className='w-fit self-end rounded-[8px] bg-cta px-[25px] py-[13px] text-white'
                    onClick={() => updatePreferences()}
                  >
                    Update Preferences
                  </button>
                )}
              </div>
            </section>
            <section className='w-full rounded-[8px] border border-border bg-white  px-[20px] py-[31px]'>
              <div className='flex justify-between'>
                <span>
                  <h2 className=''>Change Password</h2>
                  <p className='text-unimportant'>
                    Here you can change your password
                  </p>
                </span>
                {password ? (
                  <button onClick={() => setPassword(!password)}>
                    <Edit2 size={28} className='' />
                  </button>
                ) : (
                  <button onClick={() => setPassword(!password)}>
                    <X size={28} className='' />
                  </button>
                )}
              </div>
              {!password && (
                <div className='mt-[31px] flex flex-col justify-end gap-[20px]'>
                  <section className='flex flex-[0.5] flex-col gap-[4px]'>
                    <label htmlFor='old'>Old Password</label>
                    <input
                      id='old'
                      className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                      placeholder='Old Password'
                      type='password'
                      disabled={password}
                    />
                  </section>
                  <section className='flex flex-[0.5] flex-col gap-[4px]'>
                    <label htmlFor='new'>New Password</label>
                    <input
                      id='new'
                      className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                      placeholder='New Password'
                      type='password'
                      disabled={password}
                    />
                  </section>
                  <section className='flex flex-[0.5] flex-col gap-[4px]'>
                    <label htmlFor='confirm'>New Password Confirmation</label>
                    <input
                      id='confirm'
                      className='rounded-[8px] border border-border px-[15px] py-[11px] text-[12px] placeholder:text-unimportant'
                      placeholder='New Password Confirmation'
                      type='password'
                      disabled={password}
                    />
                  </section>
                  <button
                    className='w-fit self-end rounded-[8px] bg-cta px-[25px] py-[13px] text-white'
                    onClick={() => updatePassword()}
                  >
                    Update Password
                  </button>
                </div>
              )}
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default page;
