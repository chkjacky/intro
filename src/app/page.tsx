"use client";

import Resume from "@/components/Resume";
import ThemeSwitch from "@/components/ThemeSwitch";
import V2 from "@/components/v2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      <nav id="top" className="absolute flex w-full items-center justify-center p-8 md:justify-end lg:p-10">
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
