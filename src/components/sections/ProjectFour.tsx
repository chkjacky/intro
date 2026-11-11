"use client";

import { useRef } from "react";

import BounceToScrollDown from "@/components/BounceToScrollDown";
import ProjectImpact from "@/components/ProjectImpact";
import { PROJECT_IMPACT } from "@/content/impact";
import { clamp, useScrollVars, type ScrollVars } from "@/hooks/useScrollVars";

const projectFourVars: ScrollVars = (rect, vh, reduceMotion) => ({
  /**
   * Drives the "RWA" shrink.
   *
   * 0 as the section enters from the bottom, 1 once it fills the viewport.
   * Divide by a smaller number (e.g. `vh * 0.7`) to finish shrinking sooner.
   */
  "--p4-enter": reduceMotion ? 1 : clamp((vh - rect.top) / vh),

  /**
   * Drives the "<>" glyph and the colour fill behind it.
   * Spans the section's whole trip through the viewport (about two screens of
   * scrolling), so it moves at half the speed of the shrink:
   * 0 when the section enters at the bottom, 0.5 when it fills the viewport
   * (glyph in the middle), 1 when it leaves at the top.
   */
  "--p4-pull": reduceMotion ? 1 : clamp((vh - rect.top) / (vh + rect.height)),
});

export default function ProjectFour() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollVars(sectionRef, projectFourVars);

  return (
    <section
      ref={sectionRef}
      id="feature-project-four"
      className="relative flex h-screen flex-col justify-center overflow-hidden lg:flex-none"
    >
      {/* Colour fill, pulled in from the left by the "<>" glyph.
          Its right edge follows the glyph, so at the middle of the section
          the left half is coloured. To fill the whole width by the time the
          section fills the viewport (separate from the glyph), use
          `var(--p4-enter, 1)` here instead. */}
      <div
        aria-hidden="true"
        className="bg-input/30 pointer-events-none absolute inset-0 origin-left"
        style={{ transform: "scaleX(var(--p4-pull, 1))" }}
      />

      {/* "<>" glyph: moves from the left edge (pull 0) through the middle
          (pull 0.5) to the right edge (pull 1). Change the speed in
          `projectFourVars` above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={{ transform: "translateX(calc(var(--p4-pull, 1) * 100%))" }}
      >
        {/* Glyph size: text-[40vh]. Colour: text-foreground/10 */}
        <span className="text-foreground/10 absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-[40vh] leading-none font-light">
          &lt;&gt;
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex h-[90vh] flex-col items-center justify-center text-center">
          {/* FINAL size of "RWA" (where it settles): the text-* classes below,
              text-5xl on mobile and lg:text-6xl on large screens. */}
          <span
            className="inline-block pt-76 pl-4 text-5xl font-light tracking-widest lg:pt-72 lg:text-8xl lg:tracking-widest"
            style={{
              /**
               * INITIAL size of "RWA": the `5` is how much bigger it starts
               * than the final size. Starting scale = 1 + 5 = 6x.
               * e.g. `* 3` starts at 4x, `* 9` starts at 10x.
               */
              transform: "scale(calc(1 + (1 - var(--p4-enter, 1)) * 5))",
            }}
          >
            RWA
          </span>

          <div
            className="mt-3 flex w-full justify-center px-4 font-light lg:mt-5"
            style={{
              /**
               * Hidden while "RWA" is shrinking, then fades in and rises 1rem
               * over the last 30% of the shrink (--p4-enter 0.7 → 1).
               * Lower `0.7` (and set `0.3` to 1 minus it) to start sooner.
               */
              opacity: "calc((var(--p4-enter, 1) - 0.7) / 0.3)",
              transform:
                "translateY(calc(min(1, (1 - var(--p4-enter, 1)) / 0.3) * 1rem))",
            }}
          >
            <ProjectImpact
              impact={PROJECT_IMPACT.rwa}
              accentClassName="text-red-500"
            >
              <p>
                A marketplace to trade shares of real-world assets.
                <br />
                (Coming Soon)
              </p>
            </ProjectImpact>
          </div>
        </div>

        <BounceToScrollDown sectionName="Experience" sectionId="resume" />
      </div>
    </section>
  );
}
