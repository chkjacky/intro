/**
 * CLAUDE
 */
"use client";

import { useEffect, useState } from "react";

// Set once this browser has been counted, so repeat visits skip the write
const STORAGE_KEY = "visitor-counted";

/**
 * If storage is blocked (some private modes), report "already counted": that
 * browser would otherwise try to count itself on every visit.
 */
function alreadyCounted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markCounted() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage blocked: the Firestore rules still stop a second count
  }
}

/**
 * "👀 1,234 visitors". Each browser gets an anonymous Firebase ID and, on its
 * first visit, creates `visitors/{uid}`; the number is how many such docs
 * exist. The rules in `firestore.rules` allow each ID one doc and no edits,
 * so reloads never add to the count.
 *
 * Firebase is loaded with dynamic imports after the page appears, so it isn't
 * part of the first page load. On any problem (not configured, offline,
 * blocked) it renders nothing rather than an error.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Ignore results after unmount (also covers StrictMode's double effect)
    let cancelled = false;

    (async () => {
      try {
        const { getFirebase, isFirebaseConfigured } =
          await import("@/lib/firebase");
        if (!isFirebaseConfigured) throw new Error("Firebase not configured");

        const [
          { signInAnonymously },
          { collection, doc, getCount, serverTimestamp, setDoc },
        ] = await Promise.all([
          import("firebase/auth"),
          import("firebase/firestore/lite"),
        ]);
        const { auth, db } = getFirebase();

        // Returns the same anonymous user on later visits (kept in IndexedDB)
        const { user } = await signInAnonymously(auth);

        // Count only real visits: never from `npm run dev`
        if (process.env.NODE_ENV === "production" && !alreadyCounted()) {
          try {
            await setDoc(doc(db, "visitors", user.uid), {
              at: serverTimestamp(),
            });
          } catch (error) {
            // The doc already exists (rules forbid updates): already counted
            if ((error as { code?: string }).code !== "permission-denied") {
              throw error;
            }
          }
          markCounted();
        }

        const snapshot = await getCount(collection(db, "visitors"));
        if (!cancelled) setCount(snapshot.data().count);
      } catch (error) {
        if (!cancelled) setFailed(true);
        if (process.env.NODE_ENV !== "production") {
          console.warn("Visitor counter:", error);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return null;

  return (
    // Fixed height, so the footer doesn't jump when the number arrives
    <p className="text-muted-foreground h-4 text-xs tracking-widest tabular-nums">
      {count !== null && (
        <>
          <span aria-hidden="true">👀 </span>
          {count.toLocaleString()} {count === 1 ? "visitor" : "visitors"}
        </>
      )}
    </p>
  );
}
/**
 * END OF CLAUDE
 */
