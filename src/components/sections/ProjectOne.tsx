import ArcadeEmbed from "@/components/ArcadeEmbed";
import BounceToScrollDown from "@/components/BounceToScrollDown";
import ProjectImpact from "@/components/ProjectImpact";
import { PROJECT_IMPACT } from "@/content/impact";

export default function ProjectOne() {
  return (
    <section
      id="feature-project-one"
      className="flex h-screen flex-col justify-center lg:flex-none"
    >
      <div className="flex h-[90vh] flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center justify-center lg:w-2/5 lg:items-start">
          <p className="text-foreground/80 dark:text-foreground leading-tight font-light tracking-wide text-wrap">
            <span className="relative inline-block text-3xl font-medium tracking-widest transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:-translate-y-0.5 hover:after:w-full sm:text-4xl">
              Prediction Market
            </span>
          </p>

          <p className="mt-5 text-xl font-light tracking-widest">
            Working Title
          </p>

          <div>
            <p className="text-foreground/80 dark:text-foreground font-base text-base leading-relaxed tracking-wide sm:text-xl sm:text-wrap lg:text-2xl">
              <span className="before:bg-input text-volksmarket hidden cursor-grab font-semibold tracking-widest transition-all duration-200 before:absolute before:inset-0 before:right-0 before:left-auto before:w-full before:transition-all before:duration-500 before:ease-in-out before:content-[''] hover:before:w-0 sm:relative sm:inline-block dark:before:bg-white">
                VOLKSMARKET
              </span>
            </p>

            <p className="font-base text-volksmarket text-3xl leading-relaxed tracking-widest sm:hidden sm:text-xl sm:text-wrap lg:text-2xl">
              Volksmarket
            </p>
          </div>

          <ProjectImpact
            impact={PROJECT_IMPACT.volksmarket}
            align="left"
            accentClassName="text-volksmarket"
            className="mt-5"
          >
            <p className="font-light text-wrap">
              A prediction market only relies on true facts.
            </p>
          </ProjectImpact>
        </div>

        <div className="flex w-full items-center sm:w-1/2 lg:w-3/5">
          <ArcadeEmbed
            id="Z0LEAEHXvsMmR0S1xnkb"
            title="Volksmarket - A true prediction market"
            ratio={47.5}
          />
        </div>
      </div>

      <BounceToScrollDown
        sectionName="Second Project"
        sectionId="feature-project-two"
      />
    </section>
  );
}
