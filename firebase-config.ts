import { applicationDefault, initializeApp } from 'firebase-admin/app';

export function InitializeFirebaseAdmin() {
  initializeApp({
    credential: applicationDefault(),
  });
}
