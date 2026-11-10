/**
 * CLAUDE
 */
import { useEffect, useRef, useState } from "react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";
import { HOW_I_WORK } from "@/content/impact";
import { clamp } from "@/hooks/useScrollVars";

function useScrollStep(
  ref: React.RefObject<HTMLElement | null>,
  steps: number,
) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred so the state update isn't synchronous inside the effect
      const frame = requestAnimationFrame(() => setStep(steps));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top } = element.getBoundingClientRect();
      const vh = window.innerHeight;
      setStep(Math.round(clamp((vh - top) / (vh * 0.6)) * steps));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, steps]);

  return step;
}

function Steps({
  orientation,
  activeStep,
  className,
}: {
  orientation: "horizontal" | "vertical";
  activeStep: number;
  className?: string;
}) {
  return (
    <Timeline
      value={activeStep}
      orientation={orientation}
      className={className}
    >
      {HOW_I_WORK.map((step, i) => (
        <TimelineItem
          key={step.title}
          step={i + 1}
          className="has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-foreground min-w-0 opacity-40 transition-opacity duration-500 group-data-[orientation=horizontal]/timeline:items-center group-data-[orientation=horizontal]/timeline:px-3 group-data-[orientation=horizontal]/timeline:text-center group-data-[orientation=horizontal]/timeline:not-last:pe-3 data-completed:opacity-100 has-[+[data-completed]]:**:data-[slot=timeline-separator]:shadow-[0_0_8px_1px_color-mix(in_oklch,var(--foreground)_80%,transparent)] motion-reduce:transition-none"
        >
          <TimelineHeader>
            {/* Horizontal: starts at this column's centre (just past the dot) and
                spans one column, ending just before the next dot */}
            <TimelineSeparator className="bg-foreground/15 transition-[background-color,box-shadow] duration-500 group-data-[orientation=horizontal]/timeline:left-1/2 group-data-[orientation=horizontal]/timeline:translate-x-2.5" />
            
            <TimelineDate asChild>
              <span className="tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
            </TimelineDate>

            <TimelineTitle className="tracking-widest uppercase">
              {step.title}
            </TimelineTitle>

            {/* Reached: filled + soft glow */}
            <TimelineIndicator className="border-foreground/20 group-data-completed/timeline-item:border-foreground group-data-completed/timeline-item:bg-foreground transition-[border-color,background-color,box-shadow] duration-500 group-data-completed/timeline-item:shadow-[0_0_14px_4px_color-mix(in_oklch,var(--foreground)_75%,transparent)] group-data-[orientation=horizontal]/timeline:left-1/2 group-data-[orientation=horizontal]/timeline:-translate-x-1/2">
              {/* Newest reached step: a ring that keeps pulsing outward */}
              {i + 1 === activeStep && (
                <span className="bg-foreground absolute -inset-0.5 animate-ping rounded-full opacity-75 motion-reduce:hidden" />
              )}
            </TimelineIndicator>
          </TimelineHeader>

          <TimelineContent className="text-foreground font-light">
            {step.detail}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

/**
 * Four steps that light up one after another as you scroll: vertical on
 * mobile, horizontal on desktop. Both layouts are rendered and swapped with
 * CSS, so the right one shows from the first paint with no layout flash.
 */
export default function HowIWork() {
  const ref = useRef<HTMLDivElement>(null);
  const activeStep = useScrollStep(ref, HOW_I_WORK.length);

  return (
    <div ref={ref} className="flex w-full max-w-4xl flex-col gap-y-6 px-8">
      <p className="text-muted-foreground pl-[.35em] text-center text-xs tracking-[.35em]">
        HOW I WORK
      </p>

      <Steps
        orientation="vertical"
        activeStep={activeStep}
        className="lg:hidden"
      />
      <Steps
        orientation="horizontal"
        activeStep={activeStep}
        className="hidden lg:flex"
      />
    </div>
  );
}
/**
 * END OF CLAUDE
 */
