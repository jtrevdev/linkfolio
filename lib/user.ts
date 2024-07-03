import { firestore, storage } from '@/app/firebase/config';
import { UserData } from '@/types';
import { User, updateProfile } from 'firebase/auth';
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function grabUniqueUsers() {
  const userCollection = collection(firestore, 'users');

  try {
    const userSnapshot = await getCountFromServer(userCollection);
    return userSnapshot.data().count;
  } catch (e: any) {
    console.log(e);
    return null;
  }
}
export async function updateUserSettings(
  userData: UserData,
  profilePicture: Blob | null,
  user: User
) {
  let photoURL;

  const userDoc = doc(firestore, 'users', userData.uid);
  // Update user profile picture
  if (profilePicture) {
    const fileRef = ref(storage, '/profile/' + userData.uid);

    try {
      const snapshot = await uploadBytes(fileRef, profilePicture).then(() => {
        return getDownloadURL(fileRef);
      });
      photoURL = snapshot;

      await setDoc(
        userDoc,
        {
          photoURL: photoURL,
        },
        { merge: true }
      );
    } catch (e: any) {
      console.log('error occured here', e);
      return;
    }
  }

  await setDoc(
    userDoc,
    {
      displayName:
        userData.firstName && userData.lastName
          ? userData.firstName + ' ' + userData.lastName
          : null,
      title: userData.title || null,
      status: userData.status || null,
    },
    { merge: true }
  );
  await updateProfile(user, {
    displayName: userData.firstName + ' ' + userData.lastName,
    photoURL: photoURL,
  });
  return true;
}
