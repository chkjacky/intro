"use client";

import { useEffect } from "react";

import BounceToScrollDown from "@/components/BounceToScrollDown";
import ProjectImpact from "@/components/ProjectImpact";
import ScrollableLogos from "@/components/ScrollableLogos";
import { PROJECT_IMPACT } from "@/content/impact";
import { basePath } from "@/lib/basePath";

export default function ProjectThree() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const splashTarget = target.closest(".emoji-splash");
      if (!splashTarget) return; // Skip if classname without .emoji-splash

      const emojis = ["🎮", "🕹️", "👾", "🪙", "💫", "🌉", "🤝"];
      const numEmojis = 16;

      for (let i = 0; i < numEmojis; i++) {
        const emoji = document.createElement("div");
        const size = 18 + Math.random() * 30; // Adjust this range to control the variation
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = Math.random() * 2 * Math.PI;
        const distance = 300 + Math.random() * 200; // Fly farther

        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        const duration = 1000 + Math.random() * 300; // 1s – 1.6s duration
        const fadeDuration = 400; // Adjust the fade lasts
        const fadeDelay = duration - fadeDuration; // Await before fading

        emoji.style.position = "fixed";
        emoji.style.left = `${e.clientX}px`;
        emoji.style.top = `${e.clientY}px`;
        emoji.style.pointerEvents = "none";
        emoji.style.fontSize = `${size}px`;
        emoji.style.opacity = "1";
        emoji.style.transition = `transform ${duration}ms ease-out, opacity ${fadeDuration}ms ease-in ${fadeDelay}ms`;
        emoji.style.transform = `translate(0px, 0px)`;
        emoji.style.zIndex = "9999";
        emoji.style.willChange = "transform, opacity";

        document.body.appendChild(emoji);

        requestAnimationFrame(() => {
          emoji.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.5) rotate(${Math.random() * 360}deg)`;
          emoji.style.opacity = "0";
        });

        setTimeout(() => {
          emoji.remove();
        }, duration + 200); // small buffer to ensure fade is done
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <section
      id="feature-project-three"
      className="emoji-splash flex h-screen flex-col justify-center lg:flex-none"
      style={{
        cursor: `url('${basePath}/lighter.svg') 20 2, pointer`,
      }}
    >
      <div className="flex h-[90vh] flex-col items-center justify-center gap-y-10">
        <div className="w-full">
          <ScrollableLogos />
        </div>

        <div className="w-full text-center">
          <p className="text-foreground/80 dark:text-foreground leading-tight font-light tracking-wide text-wrap">
            <span className="relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              WEB3
              <br />
              GAMES & PAYMENT
            </span>
          </p>

          <ProjectImpact
            impact={PROJECT_IMPACT.web3Games}
            accentClassName="text-volksmarket"
            className="mx-auto mt-5"
          >
            <p className="font-light text-wrap">
              <i>
                Transforming a traditional game with the aid of web3
                technologies.
              </i>
              <br />
              <br />
              Play the Game.
              <br />
              Own the Rewards.
              <br />
              Pay Without Borders.
            </p>
          </ProjectImpact>
        </div>
      </div>

      <BounceToScrollDown
        sectionName="Fourth Project"
        sectionId="feature-project-four"
      />
    </section>
  );
}
