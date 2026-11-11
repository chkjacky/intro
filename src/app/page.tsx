"use client";

import Resume from "@/components/Resume";
import ThemeSwitch from "@/components/ThemeSwitch";
import V2 from "@/components/v2";
import VisitorCounter from "@/components/VisitorCounter";

export default function Home() {
  return (
    <>
      <nav
        id="top"
        className="flex h-[10vh] w-full items-center justify-center lg:justify-end lg:px-10"
      >
        <div className="hidden space-x-3 text-sm lg:block">
          <span>
            Eyes need <span className="dark:hidden">to rest?</span>
            <span className="hidden dark:inline">some light?</span>
          </span>
          <ThemeSwitch isMediumAndLarger={true} />
        </div>

        <div className="block text-sm lg:hidden">
          <ThemeSwitch isMediumAndLarger={false} />
        </div>
      </nav>

      <V2 />

      <Resume />

      <footer className="mt-10 flex justify-center pb-6">
        <VisitorCounter />
      </footer>
    </>
  );
}
