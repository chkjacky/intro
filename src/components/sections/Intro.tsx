"use client";

import { Mouse, MousePointer2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import BounceToScrollDown from "@/components/BounceToScrollDown";
import Contacts from "@/components/Contacts";
import { Button } from "@/components/ui/button";
import { INTRO, type ProofStat } from "@/content/impact";
import { basePath } from "@/lib/basePath";

/**
 * CLAUDE
 */
/**
 * Counts from 0 up to `value` once, on page load. The static HTML already holds
 * the final number, so it reads correctly before JS loads and with reduced
 * motion. Screen readers get the final number only, not every step.
 */
function CountUp({ value, prefix = "", suffix = "" }: ProofStat) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const DURATION_MS = 1200;
    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      // ease-out cubic: fast at first, settling onto the final number
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {display}
        {suffix}
      </span>

      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </>
  );
}
/**
 * END OF CLAUDE
 */

/**
 * CLAUDE
 */
function ProofStats() {
  return (
    <dl className="divide-border my-1 grid w-full grid-cols-3 divide-x sm:max-w-md">
      {INTRO.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse px-2">
          <dt className="text-foreground/85 text-[0.65rem] leading-tight tracking-widest uppercase sm:text-xs">
            {stat.label}
          </dt>

          <dd className="text-2xl font-medium tracking-wider sm:text-3xl">
            <CountUp {...stat} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
/**
 * END OF CLAUDE
 */

export default function Intro() {
  return (
    <section id="intro">
      <div className="flex h-[80vh] flex-col items-center justify-center lg:flex-row">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="mx-16 hidden dark:block">
            <Image
              src={`${basePath}/images/dark.webp`}
              width={380}
              height={507}
              alt="Illustrated portrait of Jacky"
              loading="eager"
              className="w-64 rounded-lg lg:w-95"
            />
          </div>

          <div className="mx-16 block dark:hidden">
            <Image
              src={`${basePath}/images/light.webp`}
              width={380}
              height={507}
              alt="Illustrated portrait of Jacky"
              loading="eager"
              className="w-64 rounded-lg lg:w-95"
            />
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-center justify-center gap-y-1.5 text-center lg:w-1/2 lg:gap-y-3">
          <p className="text-3xl font-medium tracking-widest lg:text-4xl">
            Hi! I&apos;m Jacky
          </p>

          <p className="text-base font-light tracking-[.35em]">
            Software Engineer
            <br />
            AI · Fintech · RWA · Web3
          </p>

          <ProofStats />

          <p className="text-foreground/95 text-sm font-light tracking-[.04em] italic sm:max-w-md sm:text-base">
            {INTRO.valueLine}
          </p>

          <div className="hidden lg:mt-7 lg:block lg:min-w-full">
            <Contacts />
          </div>

          <div className="mb-0.5 flex items-center gap-x-1 lg:hidden">
            <div className="flex flex-col items-center justify-center">
              <Mouse className="animate-scroll-flick text-foreground size-4 motion-reduce:animate-none" />
            </div>

            <span className="text-foreground text-sm font-medium tracking-wide">
              Scroll to view more OR
            </span>

            <Button
              asChild
              className="text-foreground border-muted-foreground dark:border-chart-4 dark:active:text-foreground hover:text-link active:border-link active:bg-link border bg-transparent px-2 underline underline-offset-6 transition-all duration-300 hover:cursor-pointer hover:bg-transparent hover:underline hover:underline-offset-6 active:text-white sm:border-0 sm:px-1 sm:active:bg-transparent"
            >
              <a href="#contacts" title="View Contacts">
                Let&apos;s Talk!
                <span aria-hidden="true" className="relative inline-flex">
                  <span className="animate-tap-ripple absolute -top-1 -left-0.5 size-3 rounded-full border border-current opacity-0 motion-reduce:hidden" />
                  <MousePointer2 className="animate-tap-click size-4 motion-reduce:animate-none" />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <BounceToScrollDown sectionName="Tech Stacks" sectionId="tech-stacks" />
    </section>
  );
}
