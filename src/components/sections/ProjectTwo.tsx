"use client";

import { Mouse } from "lucide-react";

import AIAgentArcade from "@/components/arcades/AIAgentArcade";
import ProjectImpact from "@/components/ProjectImpact";
import { Button } from "@/components/ui/button";
import { PROJECT_IMPACT } from "@/content/impact";

export default function ProjectTwo() {
  return (
    <section
      id="feature-project-two"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex h-[90vh] flex-col items-center justify-center lg:flex-row-reverse">
        <div className="flex w-full justify-center not-last:items-center lg:w-2/5">
          <div className="dark:text-foreground text-foreground/80 mb-5 hidden lg:block">
            <span className="perspective-500 group relative mb-10 inline-block w-full cursor-col-resize text-center text-3xl font-medium tracking-widest sm:text-4xl">
              <span className="inline-block transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
                <span className="block backface-hidden">AI Agent</span>
                <span className="absolute inset-0 flex transform-[rotateY(180deg)] items-center justify-center backface-hidden">
                  Accounting Agent
                </span>
              </span>
            </span>

            <ProjectImpact
              impact={PROJECT_IMPACT.aiAgent}
              className="mx-auto px-10"
            >
              <p className="text-justify font-light text-wrap">
                An AI accounting agent manages accounting documents, simplifying
                life for accountants.
              </p>
            </ProjectImpact>
          </div>

          <div className="text-foreground/80 dark:text-foreground mb-5 text-center leading-tight font-light tracking-wide text-wrap lg:hidden">
            <span className="relative mb-10 inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              AI Accounting Agent
            </span>

            <ProjectImpact impact={PROJECT_IMPACT.aiAgent} className="mx-auto">
              <p className="font-light text-wrap">
                An AI accounting agent manages accounting documents, simplifying
                life for accountants.
              </p>
            </ProjectImpact>
          </div>
        </div>

        <div className="flex w-full items-center sm:w-1/2 lg:w-3/5">
          <AIAgentArcade />
        </div>
      </div>

      <div className="flex h-[10vh] flex-col items-center justify-center">
        {/* PULSING EFFECT */}
        {/* <span className="relative flex h-9 w-9"> 
        <span className="bg-muted-foreground/60 dark:bg-bg-muted-foreground/30 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span> */}

        <Button
          title="Scroll to View Third Project"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("feature-project-three")
              ?.scrollIntoView({ behavior: "smooth" });
            history.replaceState(null, "", "#feature-project-three");
          }}
          className="bg-muted-foreground/60 dark:bg-input relative inline-flex h-9 w-9 rounded-full text-white hover:cursor-pointer"
        >
          <Mouse className="animate-scroll-flick size-5 text-white motion-reduce:animate-none" />
        </Button>

        {/* </span> */}
      </div>
    </section>
  );
}
