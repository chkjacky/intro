/**
 * CLAUDE
 */
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseOptions,
} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// "lite": a much smaller Firestore build (no realtime listeners or offline
// cache), which is all the visitor counter needs
import { getFirestore, type Firestore } from "firebase/firestore/lite";

/**
 * Public web config from Firebase console → Project settings → General →
 * Your apps. It isn't a secret: it ends up in the published page anyway, and
 * the Firestore security rules (`firestore.rules`) are what protect the data.
 *
 * Paste the values in below. Until then `isFirebaseConfigured` is false and
 * the visitor counter renders nothing.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCgJCC-bUYadivncv1KSR1Ucv7ID6MnaJI",
  authDomain: "intro-29ba5.firebaseapp.com",
  projectId: "intro-29ba5",
  storageBucket: "intro-29ba5.firebasestorage.app",
  messagingSenderId: "562304737291",
  appId: "1:562304737291:web:3ebc4a99111e55200ba70e"
};


export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

let instance: { auth: Auth; db: Firestore } | null = null;

/**
 * Initialises Firebase once and returns the Auth and Firestore (lite)
 * instances. Import this module with a dynamic `import()` from client code,
 * so Firebase stays out of the first page load.
 */
export function getFirebase() {
  if (!instance) {
    // getApps(): reuse the app if it already exists (e.g. after a dev
    // hot reload), instead of throwing "app already exists"
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    instance = { auth: getAuth(app), db: getFirestore(app) };
  }
  return instance;
}
/**
 * END OF CLAUDE
 */
