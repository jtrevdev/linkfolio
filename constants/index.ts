interface FirebaseErrors {
  [key: string]: string;
}

export const firebaseErrors: FirebaseErrors = {
  'Firebase: Error (auth/email-already-in-use).':
    'Email is already in use. Try another email',
};
