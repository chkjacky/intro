"use client";

import ThemeSwitch from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowDown, MoveDown, MoveUp } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined,
  );
  const [showBottomBar, setShowBottomBar] = useState(false);

  useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      // Get the height of the first section
      const firstSection = document.getElementById("main");

      if (firstSection) {
        const sectionBottom =
          firstSection.offsetTop + firstSection.offsetHeight;
        // Show when scrolled past the first section
        setShowBottomBar(window.scrollY > sectionBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="absolute flex w-full items-center justify-center p-8 md:justify-end lg:p-10">
        <div className="hidden space-x-3 text-sm md:block">
          <span>
            Eyes need {currentTheme === "light" ? "to rest?" : "some light?"}
          </span>
          <ThemeSwitch isMediumAndLarger={true} />
        </div>

        <div className="block text-sm md:hidden">
          <ThemeSwitch isMediumAndLarger={false} />
        </div>
      </nav>

      <section
        id="main"
        className="flex h-screen w-full flex-col items-center justify-center gap-y-5"
      >
        <p className="text-lg font-light sm:text-2xl lg:text-4xl">
          Welcome To The Profile Of
        </p>
        <p className="text-xl font-light sm:text-4xl lg:text-6xl">
          Khaw Chi Hun
        </p>

        <div className="flex w-1/2 flex-col gap-y-2 md:w-1/3">
          <div className="hover:bg-input/30 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border">
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
              className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
            >
              +60 16 568 4228
            </Link>
          </div>

          <div className="hover:bg-input/30 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border">
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
              className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
            >
              @jackychk
            </Link>
          </div>

          <div className="hover:bg-input/30 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border">
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
              className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
            >
              @chkjacky
            </Link>
          </div>

          <div className="hover:bg-input/30 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border">
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
              className="underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
            >
              Notion Case
            </Link>
          </div>

          <div className="hover:bg-input/30 flex w-full flex-col gap-y-2 lg:flex-row lg:gap-x-3">
            <div className="flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border p-px lg:h-16 lg:w-1/2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-background fill-foreground h-6 w-6"
              >
                <title>Udemy</title>
                <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z" />
              </svg>

              <Link
                href="https://www.udemy.com/certificate/UC-08e8e3b3-5cd9-4411-8e0d-dd27bf64c369/"
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
              >
                <span className="hidden sm:block">
                  Product Management Cert 1
                </span>
                <span className="sm:hidden">PM Cert (1)</span>
              </Link>
            </div>

            <div className="flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border p-px lg:h-16 lg:w-1/2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-background fill-foreground h-6 w-6"
              >
                <title>Udemy</title>
                <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z" />
              </svg>

              <Link
                href="https://www.udemy.com/certificate/UC-511fc898-dd30-42a8-93cd-3d1f7bc3705c/"
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-500"
              >
                <span className="hidden sm:block">
                  Product Management Cert 2
                </span>
                <span className="sm:hidden">PM Cert (2)</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-3 pt-10">
          <Button
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

          <span className="text-foreground/80 dark:text-foreground before:bg-input dark:before:bg-muted-foreground hidden font-semibold transition-all duration-300 before:absolute before:-inset-1 before:right-0 before:left-auto before:flex before:h-7.5 before:w-full before:cursor-pointer before:items-center before:justify-center before:rounded-sm before:text-sm before:text-black before:opacity-100 before:transition-all before:duration-700 before:ease-in-out before:content-['Scratch'] hover:before:w-0 hover:before:opacity-0 sm:relative sm:inline-block">
            <Link
              href="#resume"
              passHref
              className=""
              title="Click to view Résumé"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" });
                window.location.hash = "resume";
              }}
            >
              &middot;&nbsp;Won A Talent's Résumé&nbsp;&middot;&nbsp;
            </Link>
          </span>
        </div>
      </section>

      <section
        id="resume"
        className="flex w-full flex-col items-center gap-y-5"
      >
        <div className="mt-6 text-center text-4xl">
          Hooray! <br />
          You have just won a talent for your company!
        </div>

        <div className="relative h-auto w-full overflow-hidden rounded-sm bg-white pb-86 shadow-[0_2px_8px_0_rgba(63,69,81,0.16)] will-change-transform sm:pb-122 md:w-1/2 md:pb-152 lg:pb-222">
          <iframe
            loading="lazy"
            className="absolute top-0 left-0 m-0 h-100 w-full border-2 p-0 sm:h-130 md:h-160 lg:h-250" // Adjust the iframe size
            // src="https://www.canva.com/design/DAHKKlM9seI/3Gpsyi6MLvd8XZCI7ka5Zw/view?embed"
            src="https://www.canva.com/design/DAHRViysJv0/MLvT85SVggV3UsWe_VNhKQ/view?embed"
            allowFullScreen
            allow="fullscreen"
          />

          {/** Adjusting iframe bottom space */}
          <div className="mt-14 block sm:mt-8 md:mt-8 lg:mt-28"></div>
        </div>

        <Link
          href="https://www.canva.com/design/DAHRViysJv0/MLvT85SVggV3UsWe_VNhKQ/view?utm_content=DAHRViysJv0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h61157b8fd4"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block underline-offset-4 transition-all duration-300 hover:text-blue-600 hover:underline dark:hover:text-blue-500"
        >
          Resume v2.7.2 - Khaw Chi Hun (As of 04 Aug 2026)
        </Link>

        <div
          className={cn(
            "fixed right-0 bottom-0 left-0 z-50 flex justify-end bg-transparent p-4 shadow-lg",
            showBottomBar ? "" : "hidden",
          )}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("main")
                ?.scrollIntoView({ behavior: "smooth" });
              window.location.hash = "resume";
            }}
            className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
          >
            <MoveUp className="h-5 w-5 text-white" />
          </Button>
        </div>
      </section>

      <footer className="mt-30"></footer>
    </>
  );
}
