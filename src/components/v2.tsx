import { Button } from "@/components/ui/button";
import { Mouse, MoveDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AIAgentArcade from "./AIAgentArcade";
import ScrollableLogos from "./ScrollableLogos";
import VolksmarketArcade from "./VolksmarketArcade";
import { useEffect } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/intro" : "";

export default function V2() {
  return (
    <main>
      <div className="mx-2 lg:mx-20">
        <Intro />

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
      <div className="mt-20 flex flex-col items-center justify-center lg:h-[77vh] lg:flex-row">
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

        <div className="mt-4 flex w-full flex-col items-center justify-center text-center lg:w-1/2">
          <p className="text-3xl font-medium tracking-widest lg:text-4xl">
            Hi! I'm Jacky
          </p>

          <p className="text-base font-light tracking-widest">
            Software Engineer
            <br />
            AI · Fintech · RWA · Web3
          </p>

          <div className="mt-1 flex w-full flex-col gap-y-5">
            <div className="mx-3 flex flex-row gap-x-4 lg:mx-24">
              <div className="hover:bg-input/30 border-muted-foreground dark:border-chart-4 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border transition-all duration-300">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-full bg-[#25D366] fill-white"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>

                <Link
                  href="https://wa.me/60165684228"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect with WhatsApp"
                  className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
                >
                  WhatsApp
                </Link>
              </div>

              <div className="hover:bg-input/30 border-muted-foreground dark:border-chart-4 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border transition-all duration-300">
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-xs bg-white fill-[#0A66C2]"
                >
                  <title>LinkedIn</title>
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>

                <Link
                  href="https://www.linkedin.com/in/jackychk/"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect with LinkedIn"
                  className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
                >
                  @jackychk
                </Link>
              </div>
            </div>

            <div className="mx-3 flex flex-row gap-x-4 lg:mx-24">
              <div className="hover:bg-input/30 border-muted-foreground dark:border-chart-4 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border transition-all duration-300">
                <svg
                  role="img"
                  viewBox="0 0 24 24.5"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-full bg-black fill-white"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>

                <Link
                  href="https://github.com/chkjacky"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Browse my GitHub"
                  className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
                >
                  @chkjacky
                </Link>
              </div>

              <div className="hover:bg-input/30 border-muted-foreground dark:border-chart-4 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border transition-all duration-300">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-background fill-foreground h-6 w-6"
                >
                  <title>Notion</title>
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
                </svg>

                <Link
                  href="https://app.notion.com/p/Public-Case-Studies-2bd6b6df6ec8800e9d6aedafb12dabeb"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View project ideas in Notion"
                  className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
                >
                  Notion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-3 pt-10">
        <Button
          title="View Feature Project"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("feature-projects")
              ?.scrollIntoView({ behavior: "smooth" });
            window.location.hash = "feature-projects";
          }}
          className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
        >
          <MoveDown className="h-5 w-5 text-white" />
        </Button>
      </div>
    </section>
  );
}

function FeatureProjects() {
  return (
    <section id="feature-projects">
      <div className="flex h-[77vh] flex-col items-center justify-center text-center lg:flex-row">
        <span className="group relative inline-block cursor-text text-5xl font-light tracking-wide transition-all duration-300 lg:text-6xl">
          FEATURE PROJECTS
          <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full lg:h-0.75" />
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-3 pt-10">
        <Button
          title="View First Project"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("feature-project-one")
              ?.scrollIntoView({ behavior: "smooth" });
            window.location.hash = "feature-project-one-two";
          }}
          className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
        >
          <MoveDown className="h-5 w-5 text-white" />
        </Button>
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
      <div className="flex flex-col lg:h-[77vh] lg:flex-row">
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
              <span className="before:bg-input hidden cursor-grab font-semibold tracking-widest text-[#D1B200] transition-all duration-200 before:absolute before:inset-0 before:right-0 before:left-auto before:w-full before:transition-all before:duration-500 before:ease-in-out before:content-[''] hover:before:w-0 sm:relative sm:inline-block dark:text-[#FFD700] dark:before:bg-white">
                Volksmarket
              </span>
            </p>

            <p className="font-base text-3xl leading-relaxed tracking-widest text-[#D1B200] sm:hidden sm:text-xl sm:text-wrap lg:text-2xl dark:text-[#D1B200]">
              Volksmarket
            </p>
          </div>
        </div>

        <div className="flex w-full items-center lg:w-3/5">
          <VolksmarketArcade />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-3 pt-10">
        <Button
          title="View Second Project"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("feature-project-two")
              ?.scrollIntoView({ behavior: "smooth" });
            window.location.hash = "feature-project-two";
          }}
          className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
        >
          <MoveDown className="h-5 w-5 text-white" />
        </Button>
      </div>
    </section>
  );
}

function ProjectTwo() {
  return (
    <section
      id="feature-project-two"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex flex-col lg:h-[77vh] lg:flex-row-reverse">
        <div className="flex w-full justify-center not-last:items-center lg:w-2/5">
          <div className="dark:text-foreground text-foreground/80 mb-5 hidden lg:block">
            <span className="perspective-500 group relative inline-block w-full cursor-col-resize text-center text-3xl font-medium tracking-widest sm:text-4xl">
              <span className="inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
                <span className="block backface-hidden">AI Agent</span>
                <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center backface-hidden">
                  Accounting Agent
                </span>
              </span>
            </span>
          </div>

          <p className="text-foreground/80 dark:text-foreground mb-5 text-center leading-tight font-light tracking-wide text-wrap lg:hidden">
            <span className="relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              AI Accounting Agent
            </span>
          </p>
        </div>

        <div className="flex w-full items-center lg:w-3/5">
          <AIAgentArcade />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-3 pt-10">
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
      <div className="flex flex-col gap-y-20 lg:h-[77vh]">
        <div className="w-full">
          <ScrollableLogos />
        </div>

        <div className="w-full text-center">
          <p className="text-foreground/80 dark:text-foreground leading-tight font-light tracking-wide text-wrap">
            <span className="relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              WEB3 GAMES & PAYMENT
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-3 pt-10">
        <Button
          title="View Experience"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("resume")
              ?.scrollIntoView({ behavior: "smooth" });
            window.location.hash = "resume";
          }}
          className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
        >
          <MoveDown className="h-5 w-5 text-white" />
        </Button>
      </div>
    </section>
  );
}
