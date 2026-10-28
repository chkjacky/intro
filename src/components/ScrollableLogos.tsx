import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef } from "react";

type RotatingFlagProps = {
  flagImage: string;
  initialX: number;
  rotationSpeed?: number;
  translationFactor?: number;
};

const CircularLogo: React.FC<RotatingFlagProps> = ({
  flagImage,
  initialX,
  rotationSpeed = 100,
  translationFactor = 2,
}) => {
  const flagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flag = flagRef.current;
    if (!flag) return;

    /**
     * Kept in plain variables instead of state and written straight to the
     * DOM, so scrolling never re-renders React (the cause of lag on mobile)
     */
    let lastScrollY = 0;
    let rotation = 0;

    // 1 - Important: Set the initial position of the first circle before scrolling happen
    flag.style.transform = `translate(${initialX}px, 0) rotate(0deg)`;

    // 2 - Determine self rotation when user scrolls
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate scroll rotation and translation
      /**
       * Determining the scroll rotation
       *
       * Formula:
       * 		scrollY = the current scroll Y position
       * 		rotationSpeed = as is
       * 		k = the factor or val to determine the speed
       * 					the higher the value, the slower the self rotation
       */
      const scrollRotation = scrollY / (rotationSpeed * 7);

      const updatedTranslateX = initialX + scrollY / translationFactor;

      if (scrollY > lastScrollY) {
        rotation += scrollRotation; // Clockwise
      } else if (scrollY < lastScrollY) {
        rotation -= scrollRotation; // Counterclockwise
      }

      lastScrollY = scrollY;

      // Apply the transform style for the flag
      flag.style.transform = `translate(${updatedTranslateX}px, 0) rotate(${rotation}deg)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialX, rotationSpeed, translationFactor]);

  return (
    <div
      ref={flagRef}
      className="aspect-square w-32 rounded-full bg-cover bg-center shadow-md will-change-transform sm:w-36 md:w-44 lg:w-52 pointer-fine:transition-transform pointer-fine:duration-75 pointer-fine:ease-out"
      style={{ backgroundImage: `url(${flagImage})` }}
    />
  );
};

const LongPill: React.FC = () => {
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    /**
     * Written straight to the DOM, so scrolling never re-renders React.
     * The pill is always 200vw wide and slides right until `width` of it
     * shows, which looks the same as growing but skips layout and repaint.
     */
    const setWidth = (width: number) => {
      pill.style.transform = `translateX(${width - pill.offsetWidth}px)`;
    };

    // 1 - Important: Set the default width of pill when screen loads based on screen size
    if (window.innerWidth <= 640) {
      setWidth(0);
    } else if (window.innerWidth <= 768) {
      setWidth(100);
    } else if (window.innerWidth <= 1024) {
      setWidth(170);
    } else {
      // setWidth(300);
      setWidth(100);
    }

    // 2 - Determine pill growth when user scrolls
    const handleScroll = () => {
      let newWidth: number;
      const scrollY = window.scrollY;
      /**
       * Important: Set the pill growing speed, also the space between the pill and circles
       *
       * Formula:
       * 		width = the initial position of the pill when on loads
       * 		scrollY = the current scroll Y position
       * 		k = the val to determine to slow down or increase the growing speed
       * 					the smaller the value, the faster the growing speed
       */
      if (window.innerWidth <= 640) {
        newWidth = (scrollY + 50) / 17.5;
      } else if (window.innerWidth <= 768) {
        newWidth = 100 + (scrollY - 100) / 20.5;
      } else if (window.innerWidth <= 1024) {
        newWidth = 100 + (scrollY - 100) / 15.5;
      } else {
        // 300 is the pill's starting width, before the screen-size default above
        // newWidth = 300 + (scrollY - 30) / 2.95;
        newWidth = 300 + (scrollY - 30) / 7.95;
      }

      setWidth(newWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={pillRef}
      className="relative h-32 rounded-r-full bg-[#9ae9fa] will-change-transform sm:h-36 md:h-44 lg:h-52"
      style={{ width: "200vw", transform: "translateX(calc(300px - 200vw))" }}
    >
      <div className="absolute right-2.5 my-3.5 flex h-24 w-24 items-center justify-center rounded-full bg-blue-900 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-44 lg:w-44">
        <span className="text-8xl text-[#9ae9fa]">
          <ArrowRight className="h-20 w-20" />
        </span>
      </div>
    </div>
  );
};

const basePath = process.env.NODE_ENV === "production" ? "/intro" : "";

export default function ScrollableLogos() {
  const usdcFlag = `${basePath}/images/usdc.png`;
  const polygonFlag = `${basePath}/images/polygon.png`;
  const reownFlag = `${basePath}/images/reown.png`;
  const metamaskFlag = `${basePath}/images/metamask.png`;

  // 1 - Adjust initialX based on screen size
  const getInitialX = (x: number) => {
    if (typeof window === "undefined") return 0; // Avoid accessing window during SSR

    /**
     * Important: Set the space between circles
     *
     * The smaller the value, the smaller the gap
     */
    if (window.innerWidth <= 640) {
      return x - 45;
    } else if (window.innerWidth <= 768) {
      return 5 + x * 2;
    } else if (window.innerWidth <= 1024) {
      return 50 + x * 4;
    } else {
      // return 100 + x * 4;
      return 50 + x * 4;
    }
  };

  // 2 - Adjust translationFactor based on screen size
  const getTranslationFactor = () => {
    if (typeof window === "undefined") return 1; // Avoid accessing window during SSR

    /**
     * Important: Set the speed of circle movement from left to right
     *
     * The smaller the value, the faster the movement
     */
    if (window.innerWidth <= 640) {
      return 15.5;
    } else if (window.innerWidth <= 768) {
      return 23;
    } else if (window.innerWidth <= 1024) {
      return 29.5;
    } else {
      // return 3;
      return 6.6;
    }
  };

  return (
    <div className="bg-background relative w-full">
      <div className="flex w-full items-center justify-start gap-4 overflow-hidden px-0">
        <div className="h-32 w-10 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52">
          <LongPill />
        </div>

        <div className="h-32 w-32 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52">
          <CircularLogo
            flagImage={usdcFlag}
            initialX={getInitialX(10)}
            rotationSpeed={100}
            translationFactor={getTranslationFactor()}
          />
        </div>
        <div className="h-32 w-32 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52">
          <CircularLogo
            flagImage={polygonFlag}
            initialX={getInitialX(20)}
            rotationSpeed={100}
            translationFactor={getTranslationFactor()}
          />
        </div>
        <div className="h-32 w-32 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52">
          <CircularLogo
            flagImage={reownFlag}
            initialX={getInitialX(30)}
            rotationSpeed={100}
            translationFactor={getTranslationFactor()}
          />
        </div>
        <div className="h-32 w-32 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52">
          <CircularLogo
            flagImage={metamaskFlag}
            initialX={getInitialX(40)}
            rotationSpeed={100}
            translationFactor={getTranslationFactor()}
          />
        </div>
      </div>
    </div>
  );
}
