import { Button } from "@/components/ui/button";
import { Mouse, MoveDown } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import AIAgentArcade from "./AIAgentArcade";
import Contacts from "./Contacts";
import ScrollableLogos from "./ScrollableLogos";
import VolksmarketArcade from "./VolksmarketArcade";

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

  return `${width} ${textSizes[size]} ${paddingTypes[padding]} text-center cursor-zoom-in transition-transform duration-300 ease-in-out hover:scale-110`;
};

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

      <div className="mx-2 lg:mx-20">
        <FeatureProjects />

        <ProjectOne />

        <ProjectTwo />
      </div>

      <ProjectThree />
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

function TechStacks() {
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

        <div className="hidden lg:block">
          <div className="flex w-full flex-col items-center justify-center gap-x-3 px-5 lg:flex-row">
            <div className={magnifierEffect("3xl", 4, false)}>Python</div>
            <div className={magnifierEffect("7xl", 8)}>Typescript</div>
            <div className={magnifierEffect("3xl", 2)}>PHP</div>
            <div className={magnifierEffect("5xl", 4)}>Javascript</div>
            <div className={magnifierEffect("4xl", 2)}>Solidity</div>
            <div className={magnifierEffect("3xl", 4, false)}>Ruby</div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-x-3 px-5 lg:flex-row">
            <div className={magnifierEffect("7xl", 8, false)}>NextJS</div>
            <div className={magnifierEffect("3xl", 2)}>Ruby On Rails</div>
            <div className={magnifierEffect("7xl", 8)}>NestJS</div>
            <div className={magnifierEffect("5xl", 4)}>Shadcn</div>
            <div className={magnifierEffect("5xl", 4, false)}>Tailwind</div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-x-3 px-5 lg:flex-row">
            <div className={magnifierEffect("3xl", 4)}>Jira</div>
            <div className={magnifierEffect("7xl", 8)}>PostgreSQL</div>
            <div className={magnifierEffect("3xl", 2)}>MySQL</div>
            <div className={magnifierEffect("7xl", 8)}>Postman</div>
            <div className={magnifierEffect("5xl", 4)}>Retool</div>
          </div>
        </div>
      </div>

      <BounceToScrollDown
        sectionName="Feature Projects"
        sectionId="feature-projects"
      />
    </section>
  );
}

function FeatureProjects() {
  return (
    <section
      id="feature-projects"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex h-[90vh] flex-col items-center justify-center text-center lg:flex-row">
        <span className="group relative inline-block cursor-text text-5xl font-light tracking-widest transition-all duration-300 lg:text-6xl lg:tracking-[.45rem]">
          FEATURE PROJECTS
          <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full lg:h-0.75" />
        </span>
      </div>

      <BounceToScrollDown
        sectionName="First Project"
        sectionId="feature-project-one"
      />
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
            Play the Game.
            <br />
            Own the Rewards.
            <br />
            Pay Without Borders.
          </p>
        </div>
      </div>

      <BounceToScrollDown sectionName="Experience" sectionId="resume" />
    </section>
  );
}
