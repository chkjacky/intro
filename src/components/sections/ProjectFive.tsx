"use client";

import { useRef } from "react";

import BounceToScrollDown from "@/components/BounceToScrollDown";
import { FlipHeading, UnderlineTitle } from "@/components/headings";
import ProjectImpact from "@/components/ProjectImpact";
import { PROJECT_IMPACT } from "@/content/impact";
import { clamp, useScrollVars, type ScrollVars } from "@/hooks/useScrollVars";

// Same as FeaturedProjects: peaks when the section fills the viewport,
// fading in before and out after
const projectFiveVars: ScrollVars = (rect, vh) => ({
  "--p5-fade": clamp(1 - Math.abs(rect.top) / vh),
});

const YOUTUBE_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default function ProjectFive() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollVars(sectionRef, projectFiveVars);

  return (
    <section
      ref={sectionRef}
      id="feature-project-five"
      className="relative flex h-screen flex-col justify-center overflow-hidden lg:flex-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-fuchsia-100 dark:to-rose-900"
        style={{ opacity: "var(--p5-fade, 0)" }}
      />

      <div className="relative z-10 mx-2 lg:mx-20">
        <div className="flex h-[90vh] flex-col items-center justify-center lg:flex-row">
          <div className="flex w-full items-center justify-center lg:w-2/5">
            {/* lg: resets the mobile-only text styles to the page defaults */}
            <div className="text-foreground/80 dark:text-foreground text-center leading-tight font-light tracking-wide text-wrap lg:leading-normal lg:font-normal lg:tracking-normal">
              <FlipHeading
                front="Event Planner"
                back="Sneak Peek"
                className="hidden mb-6 text-center text-3xl font-medium tracking-widest sm:text-4xl lg:inline-block"
              />
              <UnderlineTitle className="mt-8 mb-6 lg:hidden">
                Event Planner
              </UnderlineTitle>

              <ProjectImpact
                impact={PROJECT_IMPACT.eventPlanner}
                accentClassName="text-fuchsia-600 dark:text-fuchsia-400"
                className="mx-auto lg:px-10"
              >
                <p className="font-light text-balance">
                  An event planner app that keeps guests, schedules and tasks in
                  one place.
                </p>
              </ProjectImpact>
            </div>
          </div>

          <div className="flex w-full items-center justify-center pt-4 max-md:min-h-0 max-md:flex-1 sm:w-1/2 lg:w-3/5">
            <iframe
              src="https://www.youtube.com/embed/4cCpFZhTDSM"
              title="Event Planner sneak peek"
              loading="lazy"
              allow={YOUTUBE_ALLOW}
              allowFullScreen
              className="hidden aspect-video w-full rounded-lg md:block"
            />

            <iframe
              src="https://www.youtube.com/embed/YHN7Tc2sdJM"
              title="Event Planner sneak peek"
              loading="lazy"
              allow={YOUTUBE_ALLOW}
              allowFullScreen
              className="aspect-9/16 h-full max-h-[50svh] rounded-lg md:hidden"
            />
          </div>
        </div>

        <BounceToScrollDown sectionName="Experience" sectionId="resume" />
      </div>
    </section>
  );
}
