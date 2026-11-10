/**
 * CLAUDE
 */
import { useEffect, type RefObject } from "react";

export const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export type ScrollVars = (
  rect: DOMRect,
  vh: number,
  reduceMotion: boolean,
) => Record<string, number>;

/**
 * Writes scroll-driven CSS variables onto the element, without re-rendering.
 * `compute` must be stable (defined outside the component).
 */
export function useScrollVars(
  ref: RefObject<HTMLElement | null>,
  compute: ScrollVars,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vars = compute(
        element.getBoundingClientRect(),
        window.innerHeight,
        reduceMotion,
      );
      for (const [name, value] of Object.entries(vars)) {
        element.style.setProperty(name, String(value));
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, compute]);
}
/**
 * END OF CLAUDE
 */