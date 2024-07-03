import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth, firestore } from '@/app/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/complete',
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios',
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12',
  // },
  // dynamicLinkDomain: 'example.page.link',
};

export const sendMagicLink = async (email: string) => {
  const response = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      console.log('did it');
      return true;
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      return false;
      // ...
    });
  return response;
};

export const updateUsersName = async (
  first_name: string,
  last_name: string,
  uid: string
) => {
  const userRef = doc(firestore, 'users', uid);

  await updateDoc(userRef, {
    displayName: first_name + ' ' + last_name,
  });
};
