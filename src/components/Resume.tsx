import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUp } from "lucide-react";

export default function Resume() {
  return (
    <>
      <section
        id="resume"
        className="flex w-full flex-col items-center justify-center gap-y-10"
      >
        <div className="mt-14 hidden text-center text-5xl font-light tracking-wide lg:block">
          <div className="dark:text-foreground text-foreground">
            <span className="perspective-500 group relative inline-block w-full cursor-col-resize text-left text-xl sm:text-right sm:text-5xl lg:text-6xl">
              <span className="inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
                <span className="block backface-hidden">PROFESSIONAL</span>
                <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center backface-hidden">
                  EXPERIENCE
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="mt-10 min-h-[10vh] text-center text-5xl font-light tracking-wide lg:hidden lg:text-left lg:text-6xl">
          PROFESSIONAL EXPERIENCE
        </div>

        <div className="flex w-1/2 flex-col gap-y-2 md:w-1/3">
          <div className="flex w-full flex-col gap-y-2 lg:flex-row lg:gap-x-3">
            <div className="hover:bg-input/30 border-chart-4 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border p-px transition-all duration-300 lg:h-16 lg:w-1/2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground h-6 w-6 bg-transparent"
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

            <div className="hover:bg-input/30 border-chart-4 flex h-10 w-full items-center justify-center gap-x-3 rounded-lg border p-px transition-all duration-300 lg:h-16 lg:w-1/2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground h-6 w-6 bg-transparent"
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
          className="lg:text-foreground mx-5 mt-2 block text-blue-600 underline underline-offset-6 transition-all duration-300 hover:text-blue-600 hover:underline dark:hover:text-blue-500"
        >
          View Résumé Externally
        </Link>

        <div className="flex flex-col items-center justify-center gap-y-3">
          <Button
            title="Back To Top"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("top")
                ?.scrollIntoView({ behavior: "smooth" });
              window.location.hash = "top";
            }}
            className="bg-muted-foreground/60 dark:bg-input h-8 w-8 animate-bounce rounded-full border border-white hover:cursor-pointer"
          >
            <MoveUp className="h-5 w-5 text-white" />
          </Button>
        </div>
      </section>
    </>
  );
}
