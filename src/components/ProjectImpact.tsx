"use client";

import { RotateCcw, RotateCw } from "lucide-react";
import { useState, type ReactNode } from "react";

import type { ProjectImpactCopy } from "@/content/impact";

/**
 * CLAUDE
 */
/**
 * Flip card for a project's description. Front: the description as before.
 * Back: Problem → What I built → Outcome, plus my role. Click or tap flips it
 * (no hover flip: the text is meant to be read, not to spin under the mouse).
 * Both faces share one grid cell, so the card is as tall as the longer face
 * and the page doesn't jump when it turns.
 */
export default function ProjectImpact({
  impact,
  children,
  align = "center",
  accentClassName = "text-foreground",
  className = "",
}: {
  impact: ProjectImpactCopy;
  /** Front face: the project's existing description */
  children: ReactNode;
  align?: "left" | "center";
  /** Colour for the outcome line, e.g. Volksmarket gold */
  accentClassName?: string;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={`block w-full max-w-md perspective-distant hover:cursor-pointer ${className}`}
    >
      <span
        className={`grid transition-transform duration-700 ease-in-out transform-3d motion-reduce:transition-none ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
      >
        <span
          inert={flipped}
          className={`col-start-1 row-start-1 mx-5 flex flex-col justify-center gap-y-3 backface-hidden lg:mx-0 ${alignment}`}
        >
          {children}

          {impact.isUnreleasedProject ? (
            <span className="border-foreground/30 text-foreground/90 rounded-full border px-2.5 py-0.5 text-xs tracking-[.2em] uppercase">
              {impact.highlight}
            </span>
          ) : (
            <span
              className={`text-sm font-medium tracking-wide uppercase lg:text-base ${accentClassName}`}
            >
              {impact.highlight}
            </span>
          )}

          <span className="text-foreground flex items-center text-[0.65rem] font-medium tracking-[.25em] uppercase">
            See the impact&nbsp;
            <RotateCw className="h-3 w-3" />
          </span>
        </span>

        <span
          inert={!flipped}
          className={`col-start-1 row-start-1 mx-5 flex transform-[rotateY(180deg)] flex-col justify-center gap-y-2 backface-hidden lg:mx-0 ${alignment}`}
        >
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-left text-xs lg:text-sm">
            <dt className="text-foreground/95 pt-0.5 text-[0.6rem] font-bold tracking-[.2em] uppercase lg:text-[0.65rem]">
              Problem
            </dt>
            <dd className="font-light">{impact.problem}</dd>

            <dt className="text-foreground/95 pt-0.5 text-[0.6rem] font-bold tracking-[.2em] uppercase lg:text-[0.65rem]">
              Built
            </dt>
            <dd className="font-light">{impact.built}</dd>

            <dt className="text-foreground/95 pt-0.5 text-[0.6rem] font-bold tracking-[.2em] uppercase lg:text-[0.65rem]">
              Outcome
            </dt>
            <dd className={`font-medium ${accentClassName}`}>
              {impact.outcome}
            </dd>
          </dl>

          <span className="text-foreground my-3 text-sm tracking-wider">
            My Role <br /> {impact.role}
          </span>

          <span className="text-foreground flex items-center text-[0.65rem] tracking-[.25em] uppercase">
            <RotateCcw className="h-3 w-3" />
            &nbsp;Back
          </span>
        </span>
      </span>
    </button>
  );
}
/**
 * END OF CLAUDE
 */
