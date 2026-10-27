import { Button } from "@/components/ui/button";
import { Mouse, MoveDown } from "lucide-react";
import Image from "next/image";
import { type RefObject, useEffect, useRef } from "react";
import AIAgentArcade from "./arcades/AIAgentArcade";
import VolksmarketArcade from "./arcades/VolksmarketArcade";
import Contacts from "./Contacts";
import ScrollableLogos from "./ScrollableLogos";

const basePath = process.env.NODE_ENV === "production" ? "/intro" : "";

const magnifierEffect = (
  size: string,
  padding: number,
  widthFull: boolean = true,
) => {
  const textSizes: Record<string, string> = {
    "1xl": "text-1xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
  };

  const paddingTypes: Record<number, string> = {
    2: "py-2",
    4: "py-4",
    8: "py-8",
  };

  const width = widthFull ? "w-full" : "w-fit";

  return `${width} ${textSizes[size]} ${paddingTypes[padding]} text-center cursor-zoom-in`;
};

/**
 * CLAUDE
 */
const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

type ScrollVars = (
  rect: DOMRect,
  vh: number,
  reduceMotion: boolean,
) => Record<string, number>;

/**
 * Writes scroll-driven CSS variables onto the element, without re-rendering.
 * `compute` must be stable (defined outside the component).
 */
function useScrollVars(
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
function DockWord({ text, size, padding, widthFull }: TechStack) {
  return (
    <div
      data-dock
      className={`relative ${magnifierEffect(size, padding, widthFull)}`}
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

function BounceToScrollDown({
  sectionName,
  sectionId,
}: {
  sectionName: string;
  sectionId: string;
}) {
  return (
    <div className="flex h-[10vh] flex-col items-center justify-center">
      <Button
        title={`View ${sectionName}`}
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById(`${sectionId}`)
            ?.scrollIntoView({ behavior: "smooth" });
          window.location.hash = `${sectionId}`;
        }}
        className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
      >
        <MoveDown className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}

export default function V2() {
  return (
    <main>
      <div className="mx-2 lg:mx-20">
        <Intro />
      </div>

      <TechStacks />

      <FeaturedProjects />

      <div className="mx-2 lg:mx-20">
        <ProjectOne />

        <ProjectTwo />
      </div>

      <ProjectThree />

      <ProjectFour />
    </main>
  );
}

function Intro() {
  return (
    <section id="intro">
      <div className="flex h-[80vh] flex-col items-center justify-center lg:flex-row">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="mx-16 hidden dark:block">
            <Image
              src={`${basePath}/images/dark.png`}
              width={380}
              height={480}
              alt={"dark"}
              loading="eager"
              className="rounded-lg"
            />
          </div>

          <div className="mx-16 block dark:hidden">
            <Image
              src={`${basePath}/images/light.png`}
              width={380}
              height={480}
              alt={"dark"}
              loading="eager"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-center justify-center gap-y-1.5 text-center lg:w-1/2">
          <p className="text-3xl font-medium tracking-widest lg:text-4xl">
            Hi! I'm Jacky
          </p>

          <p className="text-base font-light tracking-[.35em]">
            Software Engineer
            <br />
            AI · Fintech · RWA · Web3
          </p>

          <Contacts />
        </div>
      </div>

      <BounceToScrollDown sectionName="Tech Stacks" sectionId="tech-stacks" />
    </section>
  );
}

type TechStack = {
  text: string;
  size: string;
  padding: number;
  widthFull?: boolean;
};

// Desktop tech list, one inner array per row (see `magnifierEffect`)
const TECH_STACK_ROWS: TechStack[][] = [
  [
    { text: "Python", size: "3xl", padding: 4, widthFull: false },
    { text: "Typescript", size: "7xl", padding: 8 },
    { text: "PHP", size: "3xl", padding: 2 },
    { text: "Javascript", size: "5xl", padding: 4 },
    { text: "Solidity", size: "4xl", padding: 2 },
    { text: "Ruby", size: "3xl", padding: 4, widthFull: false },
  ],
  [
    { text: "NextJS", size: "7xl", padding: 8, widthFull: false },
    { text: "Ruby On Rails", size: "3xl", padding: 2 },
    { text: "NestJS", size: "7xl", padding: 8 },
    { text: "Shadcn", size: "5xl", padding: 4 },
    { text: "Tailwind", size: "5xl", padding: 4, widthFull: false },
  ],
  [
    { text: "Jira", size: "3xl", padding: 4 },
    { text: "PostgreSQL", size: "7xl", padding: 8 },
    { text: "MySQL", size: "3xl", padding: 2 },
    { text: "Postman", size: "7xl", padding: 8 },
    { text: "Retool", size: "5xl", padding: 4 },
  ],
];

function TechStacks() {
  const dockRef = useRef<HTMLDivElement>(null);

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
              <span className="dark:bg-foreground relative inline-block w-full rounded-full bg-emerald-500 px-10 py-5">
                <span
                  className="invisible block whitespace-nowrap"
                  aria-hidden="true"
                >
                  STACKS
                </span>

                <span className="absolute inset-0 inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
                  <span className="flex h-full w-full items-center justify-center whitespace-nowrap backface-hidden">
                    TECH
                  </span>

                  <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center whitespace-nowrap backface-hidden">
                    STACKS
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="text-center text-5xl font-light tracking-wide lg:hidden lg:text-left lg:text-6xl">
          TECH STACKS
        </div>
      </div>

      <div className="flex h-[80vh] flex-col items-center justify-center lg:items-stretch">
        <div className="block lg:hidden">
          <div className="w-ful grid grid-cols-2 gap-y-3 text-center text-xl tracking-widest">
            <div> Python </div>
            <div> Typescript </div>
            <div> Javascript </div>
            <div> PHP </div>
            <div> Solidity </div>
            <div> Ruby </div>
            <div> NextJS </div>
            <div> Ruby On Rails </div>
            <div> NestJS </div>
            <div> Shadcn </div>
            <div> Tailwind </div>
            <div> Jira </div>
            <div> PostgreSQL </div>
            <div> MySQL </div>
            <div> Postman </div>
            <div> Retool </div>
          </div>
        </div>

        <div ref={dockRef} className="hidden lg:block">
          {TECH_STACK_ROWS.map((row, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center justify-center gap-x-3 px-5 lg:flex-row"
            >
              {row.map((tech) => (
                <DockWord key={tech.text} {...tech} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <BounceToScrollDown
        sectionName="Featured Projects"
        sectionId="featured-projects"
      />
    </section>
  );
}

const featuredProjectsVars: ScrollVars = (rect, vh, reduceMotion) => ({
  // 0 when the section enters from the bottom, 1 when it leaves at the top
  "--fp-progress": reduceMotion
    ? 0.5
    : clamp((vh - rect.top) / (vh + rect.height)),
  // Peaks when the section fills the viewport, fading in before and out after
  "--fp-fade": clamp(1 - Math.abs(rect.top) / vh),
});

function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollVars(sectionRef, featuredProjectsVars);

  return (
    <section
      ref={sectionRef}
      id="featured-projects"
      className="relative flex h-screen flex-col justify-center overflow-hidden lg:flex-none"
    >
      <div
        aria-hidden="true"
        className="bg-input/55 dark:bg-input/30 pointer-events-none absolute inset-0"
        style={{ opacity: "var(--fp-fade, 0)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center select-none"
        style={{ opacity: "var(--fp-fade, 0)" }}
      >
        <span
          className="text-background dark:text-foreground/10 shrink-0 text-[18vw] leading-none font-semibold tracking-tighter whitespace-nowrap will-change-transform"
          style={{
            transform: "translateX(calc(-70% + var(--fp-progress, 0.5) * 80%))",
          }}
        >
          FEATURED PROJECTS
        </span>
      </div>

      <div className="relative z-10 mx-2 lg:mx-20">
        <div className="flex h-[90vh] flex-col items-center justify-center text-center lg:flex-row">
          <span className="group relative inline-block cursor-text text-5xl font-light tracking-widest transition-all duration-300 lg:text-6xl lg:tracking-[.45rem]">
            FEATURED PROJECTS
            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full lg:h-0.75" />
          </span>
        </div>

        <BounceToScrollDown
          sectionName="First Project"
          sectionId="feature-project-one"
        />
      </div>
    </section>
  );
}

function ProjectOne() {
  return (
    <section
      id="feature-project-one"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex h-[90vh] flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center justify-center lg:w-2/5 lg:items-start">
          <p className="text-foreground/80 dark:text-foreground leading-tight font-light tracking-wide text-wrap">
            <span className="relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              Prediction Market
            </span>
          </p>

          <p className="mt-5 text-xl font-light tracking-widest">
            Temporarily Titled
          </p>

          <div>
            <p className="text-foreground/80 dark:text-foreground font-base text-base leading-relaxed tracking-wide sm:text-xl sm:text-wrap lg:text-2xl">
              <span className="before:bg-input hidden cursor-grab font-semibold tracking-widest text-[#D1B200] transition-all duration-200 before:absolute before:inset-0 before:right-0 before:left-auto before:w-full before:transition-all before:duration-500 before:ease-in-out before:content-[''] hover:before:w-0 sm:relative sm:inline-block dark:text-[#f1d537] dark:before:bg-white">
                VOLKSMARKET
              </span>
            </p>

            <p className="font-base text-3xl leading-relaxed tracking-widest text-[#D1B200] sm:hidden sm:text-xl sm:text-wrap lg:text-2xl dark:text-[#f1d537]">
              Volksmarket
            </p>
          </div>

          <p className="mt-5 font-light text-wrap">
            A prediction market only relies on true facts.
          </p>
        </div>

        <div className="flex w-full items-center lg:w-3/5">
          <VolksmarketArcade />
        </div>
      </div>

      <BounceToScrollDown
        sectionName="Second Project"
        sectionId="feature-project-two"
      />
    </section>
  );
}

function ProjectTwo() {
  return (
    <section
      id="feature-project-two"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex h-[90vh] flex-col items-center justify-center lg:flex-row-reverse">
        <div className="flex w-full justify-center not-last:items-center lg:w-2/5">
          <div className="dark:text-foreground text-foreground/80 mb-5 hidden lg:block">
            <span className="perspective-500 group relative mb-10 inline-block w-full cursor-col-resize text-center text-3xl font-medium tracking-widest sm:text-4xl">
              <span className="inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
                <span className="block backface-hidden">AI Agent</span>
                <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center backface-hidden">
                  Accounting Agent
                </span>
              </span>
            </span>

            <p className="px-10 text-justify font-light text-wrap">
              An AI accounting agent manages accounting documents, simplifying
              life for accountants.
            </p>
          </div>

          <div className="text-foreground/80 dark:text-foreground mb-5 text-center leading-tight font-light tracking-wide text-wrap lg:hidden">
            <span className="relative mb-10 inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              AI Accounting Agent
            </span>

            <p className="font-light text-wrap">
              An AI accounting agent manages accounting documents, simplifying
              life for accountants.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center lg:w-3/5">
          <AIAgentArcade />
        </div>
      </div>

      <div className="flex h-[10vh] flex-col items-center justify-center">
        <span className="relative flex h-9 w-9">
          <span className="bg-muted-foreground/60 dark:bg-bg-muted-foreground/30 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <Button
            title="Scroll to View Third Project"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("feature-project-three")
                ?.scrollIntoView({ behavior: "smooth" });
              window.location.hash = "feature-project-three";
            }}
            className="bg-muted-foreground/60 dark:bg-input relative inline-flex h-9 w-9 rounded-full border border-white p-2 text-white hover:cursor-pointer"
          >
            <Mouse className="animate-bounce text-white" />
          </Button>
        </span>
      </div>
    </section>
  );
}

function ProjectThree() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const splashTarget = target.closest(".emoji-splash");
      if (!splashTarget) return; // Skip if classname without .emoji-splash

      const emojis = ["🎮", "🕹️", "👾", "🪙", "💫", "🌉", "🤝"];
      const numEmojis = 16;

      for (let i = 0; i < numEmojis; i++) {
        const emoji = document.createElement("div");
        const size = 18 + Math.random() * 30; // Adjust this range to control the variation
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = Math.random() * 2 * Math.PI;
        const distance = 300 + Math.random() * 200; // Fly farther

        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        const duration = 1000 + Math.random() * 300; // 1s – 1.6s duration
        const fadeDuration = 400; // Adjust the fade lasts
        const fadeDelay = duration - fadeDuration; // Await before fading

        emoji.style.position = "fixed";
        emoji.style.left = `${e.clientX}px`;
        emoji.style.top = `${e.clientY}px`;
        emoji.style.pointerEvents = "none";
        emoji.style.fontSize = `${size}px`;
        emoji.style.opacity = "1";
        emoji.style.transition = `transform ${duration}ms ease-out, opacity ${fadeDuration}ms ease-in ${fadeDelay}ms`;
        emoji.style.transform = `translate(0px, 0px)`;
        emoji.style.zIndex = "9999";
        emoji.style.willChange = "transform, opacity";

        document.body.appendChild(emoji);

        requestAnimationFrame(() => {
          emoji.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.5) rotate(${Math.random() * 360}deg)`;
          emoji.style.opacity = "0";
        });

        setTimeout(() => {
          emoji.remove();
        }, duration + 200); // small buffer to ensure fade is done
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <section
      id="feature-project-three"
      className="emoji-splash flex h-screen flex-col justify-center lg:flex-none"
      style={{
        cursor: `url('${basePath}/lighter.svg') 20 2, url('${basePath}/lighter-32.png') 20 2, pointer`,
      }}
    >
      <div className="flex h-[90vh] flex-col items-center justify-center gap-y-10">
        <div className="w-full">
          <ScrollableLogos />
        </div>

        <div className="w-full text-center">
          <p className="text-foreground/80 dark:text-foreground leading-tight font-light tracking-wide text-wrap">
            <span className="relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              WEB3
              <br />
              GAMES & PAYMENT
            </span>
          </p>

          <p className="mt-5 font-light text-wrap">
            <i>
              Transforming a traditional game with the aid of web3 technologies.
            </i>
            <br />
            <br />
            Play the Game.
            <br />
            Own the Rewards.
            <br />
            Pay Without Borders.
          </p>
        </div>
      </div>

      <BounceToScrollDown
        sectionName="Fourth Project"
        sectionId="feature-project-four"
      />
    </section>
  );
}

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

function ProjectFour() {
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
            className="inline-block pt-42 pl-4 text-5xl font-light tracking-widest lg:pt-30 lg:text-8xl lg:tracking-widest"
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

          <span
            className="mt-10 inline-block font-light lg:mt-5"
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
            A non-financial product based Real World Asset Tokenization
            Marketplace. <br />
            (Coming Soon)
          </span>
        </div>

        <BounceToScrollDown sectionName="Experience" sectionId="resume" />
      </div>
    </section>
  );
}
