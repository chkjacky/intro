"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Resume from "@/components/Resume";
import ThemeSwitch from "@/components/ThemeSwitch";
import V2 from "@/components/v2";

export default function Home() {
  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);

  return (
    <>
      <nav
        id="top"
        className="flex h-[10vh] w-full items-center justify-center md:justify-end lg:px-10"
      >
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

      <V2 />

      <Resume />

      <footer className="mt-10"></footer>
    </>
  );
}
