/**
 * CLAUDE
 */
import { useSyncExternalStore } from "react";

// The query string never changes after load, so there's nothing to subscribe to
const subscribe = () => () => {};

/**
 * True when the page was opened with `?from=linkedin` (any case).
 * Always false in the static build, so the exported HTML shows the default
 * content (WhatsApp, the full résumé) and LinkedIn visitors see it swap
 * (Telegram, the résumé without the link) once the page hydrates.
 */
export function useFromLinkedIn() {
  return useSyncExternalStore(
    subscribe,
    () =>
      new URLSearchParams(window.location.search).get("from")?.toLowerCase() ===
      "linkedin",
    () => false,
  );
}
/**
 * END OF CLAUDE
 */
