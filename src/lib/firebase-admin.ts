
// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

// Ensure you have the GOOGLE_APPLICATION_CREDENTIALS environment variable set
// pointing to your service account key file.

const serviceAccount = JSON.parse(
    process.env.FIREBASE_ADMIN_SDK_CONFIG as string
);


if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const firestore = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
export const FieldValue = admin.firestore.FieldValue;
