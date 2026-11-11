"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import BounceToScrollDown from "@/components/BounceToScrollDown";
import { TECH_VALUES } from "@/content/impact";

/**
 * CLAUDE
 */
/**
 * Dock-style fish-eye: the item under the cursor grows, its neighbours grow
 * less the further away they are, and they slide apart so nothing overlaps.
 * Groups are the `[data-dock]` elements inside `ref` (each needs `relative`),
 * and their items are the `[data-dock-item]` elements inside each group.
 * Only the hovered group reacts. Used by `DockWord` to magnify letters.
 */
function useDockMagnify(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Size of the letter right under the cursor (1.6 = 160%)
    const MAX_SCALE = 1.6;

    /**
     * How far the lens reaches, in multiples of the word's font size.
     * Bigger = more letters grow, smaller = tighter lens.
     */
    const RADIUS_IN_EM = 1.5;

    const cleanups: (() => void)[] = [];

    container.querySelectorAll<HTMLElement>("[data-dock]").forEach((group) => {
      const items = Array.from(
        group.querySelectorAll<HTMLElement>("[data-dock-item]"),
      );
      let frame = 0;
      let cursorX = 0;

      const update = () => {
        frame = 0;

        // Scales with the text, so small and large words feel the same
        const RADIUS =
          parseFloat(getComputedStyle(group).fontSize) * RADIUS_IN_EM;

        /**
         *  offsetLeft/offsetWidth ignore transforms, so measuring while
         * items are scaled doesn't make the effect jitter
         */
        const scales = items.map((item) => {
          const centre = item.offsetLeft + item.offsetWidth / 2;
          const distance = Math.abs(cursorX - centre);
          const falloff =
            distance < RADIUS
              ? (1 + Math.cos((Math.PI * distance) / RADIUS)) / 2
              : 0;
          return 1 + (MAX_SCALE - 1) * falloff;
        });

        // Extra width each item gained by scaling
        const growth = items.map(
          (item, i) => (scales[i] - 1) * item.offsetWidth,
        );
        const total = growth.reduce((sum, g) => sum + g, 0);

        /**
         * Each letter moves right by half of what grew on its left and left
         * by half of what grew on its right, keeping the gaps between them
         */
        let grownLeft = 0;
        items.forEach((item, i) => {
          const grownRight = total - grownLeft - growth[i];
          const shift = (grownLeft - grownRight) / 2;
          item.style.transform = `translateX(${shift}px) scale(${scales[i]})`;
          grownLeft += growth[i];
        });
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        cursorX = e.clientX - group.getBoundingClientRect().left;
        if (!frame) frame = requestAnimationFrame(update);
      };

      // The CSS transition on each letter in `DockWord` eases them back
      const onLeave = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        items.forEach((item) => (item.style.transform = ""));
      };

      group.addEventListener("pointermove", onMove);
      group.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        group.removeEventListener("pointermove", onMove);
        group.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(frame);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [ref]);
}

/**
 * A word whose letters get the fish-eye from `useDockMagnify`.
 * Screen readers read `text` once; the split letters are hidden from them.
 */
function DockWord({
  text,
  className,
  onHover,
}: TechStack & { onHover: (text: string) => void }) {
  return (
    <div
      data-dock
      className={`relative cursor-zoom-in text-center ${className}`}
      // Mouse only, like the magnify: touch uses the mobile grid's tap instead
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(text)}
    >
      <span className="sr-only">{text}</span>
      {/* nowrap: each letter is its own inline-block, which the browser may
          otherwise break between, stacking narrow words one letter per line */}
      <span aria-hidden="true" className="whitespace-nowrap">
        {Array.from(text).map((letter, i) => (
          <span
            key={i}
            data-dock-item
            // origin-bottom: letters grow upward from the baseline, like the Dock
            className="inline-block origin-bottom whitespace-pre transition-transform duration-150 ease-out"
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
/**
 * END OF CLAUDE
 */

type TechStack = {
  text: string;
  /** Width (`w-full` fills the gap, `w-fit` hugs the word), padding and text size */
  className: string;
};

// Desktop tech list, one inner array per row
const TECH_STACK_ROWS: TechStack[][] = [
  [
    { text: "Python", className: "w-fit py-4 text-3xl" },
    { text: "Typescript", className: "w-full py-6 text-7xl" },
    { text: "PHP", className: "w-full py-2 text-3xl" },
    { text: "Javascript", className: "w-full py-4 text-5xl" },
    { text: "Solidity", className: "w-full py-2 text-4xl" },
    { text: "Ruby", className: "w-fit py-4 text-3xl" },
  ],
  [
    { text: "NextJS", className: "w-fit py-6 text-7xl" },
    { text: "Ruby On Rails", className: "w-full py-2 text-3xl" },
    { text: "NestJS", className: "w-full py-6 text-7xl" },
    { text: "Shadcn", className: "w-full py-4 text-5xl" },
    { text: "Tailwind", className: "w-fit py-2 text-4xl" },
  ],
  [
    { text: "Jira", className: "w-full py-4 text-3xl" },
    { text: "PostgreSQL", className: "w-full py-6 text-7xl" },
    { text: "MySQL", className: "w-full py-2 text-3xl" },
    { text: "Postman", className: "w-full py-6 text-7xl" },
    { text: "Retool", className: "w-full py-4 text-5xl" },
  ],
];

/**
 * CLAUDE
 */
/**
 * Says what the hovered (desktop) or tapped (mobile) tool means for a
 * business. Keeps showing the last tool, so moving the cursor across the
 * gaps between words doesn't flicker back to the hint.
 */
function TechCaption({ tech }: { tech: string | null }) {
  return (
    <div
      aria-live="polite"
      className="mx-4 mt-5 flex flex-col items-center justify-start text-center text-lg font-light tracking-wide lg:mt-0 lg:justify-center lg:text-xl"
    >
      {tech ? (
        <div key={tech} className="flex flex-col items-center">
          <span className="overflow-hidden py-0.5">
            <span className="animate-in slide-in-from-bottom-full fade-in fill-mode-backwards block font-medium tracking-widest delay-300 duration-400 ease-out">
              {tech}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="bg-foreground/40 animate-in zoom-in-0 fill-mode-backwards my-2 block h-px w-16 delay-150 duration-400 ease-out"
          />

          <span className="animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards block capitalize delay-300 duration-400 ease-out">
            {TECH_VALUES[tech]}
          </span>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-1 flex flex-col items-center duration-400">
          <span aria-hidden="true" className="invisible py-0.5">
            <span className="block font-medium tracking-widest">Tech</span>
          </span>

          <span
            aria-hidden="true"
            className="bg-foreground/20 my-2 block h-px w-16"
          />

          <span className="text-muted-foreground block italic">
            <span className="lg:hidden">Tap</span>
            <span className="hidden lg:inline">Hover</span> a tool to see what
            it does <br /> for your business
          </span>
        </div>
      )}
    </div>
  );
}
/**
 * END OF CLAUDE
 */

export default function TechStacks() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  useDockMagnify(dockRef);

  return (
    <section
      id="tech-stacks"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex h-[10vh] flex-col items-center justify-center pt-20 text-center lg:flex-row">
        <div className="hidden text-center text-5xl font-light tracking-wide lg:block">
          <div className="dark:text-background text-background">
            <span className="perspective-500 group relative inline-block w-full cursor-col-resize text-left text-xl sm:text-right sm:text-5xl lg:text-6xl">
              <span className="dark:bg-foreground relative inline-block w-full rounded-full bg-emerald-500 px-10 py-4">
                <span
                  className="invisible block whitespace-nowrap"
                  aria-hidden="true"
                >
                  BUILT FOR BUSINESS
                </span>

                <span className="absolute inset-0 inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
                  <span className="flex h-full w-full items-center justify-center whitespace-nowrap backface-hidden">
                    TECH STACKS
                  </span>

                  <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center whitespace-nowrap backface-hidden">
                    BUILT FOR BUSINESS
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="text-center text-5xl font-light tracking-wide lg:hidden lg:text-left lg:text-6xl">
          TECH STACKS <br />
          <span className="text-[2.06rem] font-normal">BUILT FOR BUSINESS</span>
        </div>
      </div>

      <div className="flex h-[80vh] flex-col items-center justify-center lg:items-stretch">
        <div className="block lg:hidden">
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-center text-xl tracking-widest">
            {TECH_STACK_ROWS.flat().map(({ text }) => (
              <button
                key={text}
                type="button"
                aria-pressed={activeTech === text}
                onClick={() =>
                  // Tap / click again to go back to the hint
                  setActiveTech((current) => (current === text ? null : text))
                }
                className="aria-pressed:bg-input/70 dark:aria-pressed:bg-input rounded-md px-2 py-1 transition-colors hover:cursor-pointer"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div ref={dockRef} className="hidden lg:mt-3 lg:block">
          {TECH_STACK_ROWS.map((row, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center justify-center gap-x-3 px-5 lg:flex-row"
            >
              {row.map((tech) => (
                <DockWord key={tech.text} {...tech} onHover={setActiveTech} />
              ))}
            </div>
          ))}
        </div>

        <TechCaption tech={activeTech} />
      </div>

      <BounceToScrollDown
        sectionName="Featured Projects"
        sectionId="featured-projects"
      />
    </section>
  );
}
