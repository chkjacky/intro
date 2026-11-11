"use client";

import { useRef } from "react";

import BounceToScrollDown from "@/components/BounceToScrollDown";
import { clamp, useScrollVars, type ScrollVars } from "@/hooks/useScrollVars";

const featuredProjectsVars: ScrollVars = (rect, vh, reduceMotion) => ({
  // 0 when the section enters from the bottom, 1 when it leaves at the top
  "--fp-progress": reduceMotion
    ? 0.5
    : clamp((vh - rect.top) / (vh + rect.height)),
  // Peaks when the section fills the viewport, fading in before and out after
  "--fp-fade": clamp(1 - Math.abs(rect.top) / vh),
});

export default function FeaturedProjects() {
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
