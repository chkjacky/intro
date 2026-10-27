"use client";

import { useEffect } from "react";

const IDLE_MS = 5000; // how long the user must sit at the top untouched before each peek
const NUDGE_PX = 300; // how far down to peek
const HOLD_MS = 700; // pause at the bottom of the peek before returning
const MAX_HINTS = 60; // stop after this many peeks

/**
 * CLAUDE
 */
/**
 * Mobile-only scroll hint: while the user stays at the top of the page without
 * interacting, periodically scroll down a bit and back up so they can see
 * there's more content (Chrome's bottom toolbar can hide the scroll cue).
 * Stops on the first interaction or after MAX_HINTS, and is skipped for
 * reduced-motion users.
 */
export default function IdleScrollHint() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isMobile || reducedMotion) return;

    const events = ["touchstart", "wheel", "keydown", "pointerdown"] as const;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let hints = 0;

    const cancel = () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, cancel));
    };

    const scheduleHint = () => {
      timer = setTimeout(() => {
        if (window.scrollY > 0) return cancel();

        hints++;
        window.scrollTo({ top: NUDGE_PX, behavior: "smooth" });
        timer = setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (hints < MAX_HINTS) scheduleHint();
          else cancel();
        }, HOLD_MS);
      }, IDLE_MS);
    };

    events.forEach((e) =>
      window.addEventListener(e, cancel, { passive: true, once: true }),
    );
    scheduleHint();

    return cancel;
  }, []);

  return null;
}
/**
 * END OF CLAUDE
 */
