import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { useScrollVars, type ScrollVars } from "@/hooks/useScrollVars";
import { basePath } from "@/lib/basePath";

const LOGOS = ["usdc", "polygon", "reown", "metamask"].map(
  (name) => `${basePath}/images/${name}.png`,
);

/**
 * Per screen size (first match by max width):
 *
 * - circleX: where the first circle starts, in px. Each next one starts `gap` further
 * - gap: space between circles. The smaller the value, the smaller the gap
 * - speed: px of page scroll per 1px the circles move right.
 *          The smaller the value, the faster the movement
 * - pill: width = start + (scrollY - offset) / divisor, in px. Sets the pill's
 *         growing speed (smaller divisor = faster), and so the space between
 *         the pill and the circles
 */
const BREAKPOINTS = [
  { maxWidth: 640, circleX: -45, gap: 10, speed: 15.5, pill: [0, -50, 17.5] },
  { maxWidth: 768, circleX: 5, gap: 20, speed: 23, pill: [100, 100, 20.5] },
  { maxWidth: 1024, circleX: 50, gap: 40, speed: 29.5, pill: [100, 100, 15.5] },
  {
    maxWidth: Infinity,
    circleX: 50,
    gap: 40,
    speed: 6.6,
    pill: [300, 30, 7.95],
  },
];

// Degrees the circles spin per px of page scroll; clockwise down, back up
const SPIN_DEG_PER_PX = 0.3;

/**
 * Computed from the page's scroll position (not the row's), so the circles
 * and pill are already in place wherever the page loads
 */
const logoVars: ScrollVars = () => {
  const y = window.scrollY;
  const { circleX, gap, speed, pill } = BREAKPOINTS.find(
    (b) => window.innerWidth <= b.maxWidth,
  )!;
  const [start, offset, divisor] = pill;

  return {
    "--logo-x": circleX + y / speed,
    "--logo-gap": gap,
    "--logo-spin": y * SPIN_DEG_PER_PX,
    "--pill-width": start + (y - offset) / divisor,
  };
};

export default function ScrollableLogos() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVars(ref, logoVars);

  return (
    <div ref={ref} className="bg-background relative w-full">
      <div className="flex w-full items-center justify-start gap-4 overflow-hidden px-0">
        <div className="h-32 w-10 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52">
          {/* Always 200vw wide, slid right until `--pill-width` of it shows:
              looks like growing but skips layout and repaint */}
          <div
            className="relative h-32 w-[200vw] rounded-r-full bg-[#9ae9fa] will-change-transform sm:h-36 md:h-44 lg:h-52"
            style={{
              transform:
                "translateX(calc(var(--pill-width, 300) * 1px - 200vw))",
            }}
          >
            <div className="absolute right-2.5 my-3.5 flex h-24 w-24 items-center justify-center rounded-full bg-blue-900 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-44 lg:w-44">
              <span className="text-8xl text-[#9ae9fa]">
                <ArrowRight className="h-20 w-20" />
              </span>
            </div>
          </div>
        </div>

        {LOGOS.map((src, i) => (
          <div
            key={src}
            className="h-32 w-32 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52"
          >
            <div
              className="aspect-square w-32 rounded-full bg-cover bg-center will-change-transform sm:w-36 md:w-44 lg:w-52 pointer-fine:transition-transform pointer-fine:duration-75 pointer-fine:ease-out"
              style={{
                backgroundImage: `url(${src})`,
                transform: `translateX(calc((var(--logo-x, 0) + var(--logo-gap, 0) * ${i + 1}) * 1px)) rotate(calc(var(--logo-spin, 0) * 1deg))`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
