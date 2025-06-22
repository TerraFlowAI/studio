
// src/lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';


// Ensure you have the GOOGLE_APPLICATION_CREDENTIALS environment variable set
// pointing to your service account key file.

const serviceAccount = JSON.parse(
    process.env.FIREBASE_ADMIN_SDK_CONFIG as string
);


if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const firestore = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export { FieldValue };
