import { firestore, storage } from '@/app/firebase/config';
import { UserData } from '@/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const uploadPortfolio = async (userData: UserData, router: any) => {
  const response = await fetch(
    'https://vqa37eeoahmezfx6loxgsliijy0wppbf.lambda-url.us-east-1.on.aws/record',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: userData.portfolioURL }), // Pass the URL to record
    }
  );

  const data = await response.json();
  if (data.screenshotData) {
    let screenshots = data.screenshotData;
    let screenshotPhotoLocations = [];

    console.log('screenshots: ', screenshots);
    for (const screenshot of screenshots) {
      console.log('screenshot: ', screenshot);

      // Convert Uint8Array to a Blob
      const blob = new Blob([Uint8Array.from(screenshot.data)], {
        type: 'image/png',
      });

      console.log(blob);
      if (blob) {
        // Upload the Blob to Firestore Storage
        const storageRef = ref(
          storage,
          '/users/' + userData.uid + '/' + Date.now() + '.png'
        );

        // Store URL of uploaded file
        screenshotPhotoLocations.push(
          await uploadBytesResumable(storageRef, blob).then(() => {
            return getDownloadURL(storageRef);
          })
        );
      }
    }
    // let screenshot = new Uint8Array(data.screenshotData.data);
    const portfolioDocRef = doc(firestore, 'portfolios', userData.uid);
    const portfolioSnapshot = await getDoc(portfolioDocRef);

    let views = 0;
    let likes = 0;

    // Check if portfolio document already exists
    if (portfolioSnapshot.exists()) {
      const existingData = portfolioSnapshot.data();
      views = existingData.views;
      likes = existingData.likes;
    }
    await setDoc(
      portfolioDocRef,
      {
        portfolioURL: userData.portfolioURL,
        photoURL: screenshotPhotoLocations,
        videoURL: null,
        owner_displayName: userData.firstName + ' ' + userData.lastName,
        owner_photoURL: userData.photoURL || null,
        owner_title: userData.title || null,
        timestamp: serverTimestamp(),
        views: views,
        likes: likes,
      },
      { merge: true }
    );
    const userDocRef = doc(firestore, 'users', userData.uid);
    await setDoc(
      userDocRef,
      {
        portfolioURL: userData.portfolioURL,
      },
      { merge: true }
    );
    router.push(`/portfolios/${userData.uid}`);
  }
};

export const paginatePortfolios = async (lastVisible: any) => {
  if (!lastVisible) {
    // Get first portfolios
    const first = query(
      collection(firestore, 'portfolios'),
      orderBy('timestamp'),
      limit(25)
    );
    const documentSnapshots = await getDocs(first);

    // Get last portfolio fetched
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log('last', lastVisible);
    let portfolios: any = [];

    documentSnapshots.docs.forEach((doc) =>
      portfolios.push({ ...doc.data(), id: doc.id })
    );
    return { lastVisible, portfolios };
  }
};
