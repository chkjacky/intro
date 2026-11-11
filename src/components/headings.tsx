import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Project title that lifts slightly and grows an underline from the centre on hover */
export function UnderlineTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Heading that flips in 3D on hover to show `back`. `className` sets the
 * text size and alignment; the back face is laid over the front, so the
 * heading keeps the front's size.
 */
export function FlipHeading({
  front,
  back,
  className,
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "perspective-500 group relative inline-block w-full cursor-col-resize",
        className,
      )}
    >
      <span className="inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
        <span className="block backface-hidden">{front}</span>
        <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center backface-hidden">
          {back}
        </span>
      </span>
    </span>
  );
}
