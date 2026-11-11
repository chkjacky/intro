import FeaturedProjects from "./sections/FeaturedProjects";
import Intro from "./sections/Intro";
import ProjectFour from "./sections/ProjectFour";
import ProjectOne from "./sections/ProjectOne";
import ProjectThree from "./sections/ProjectThree";
import ProjectTwo from "./sections/ProjectTwo";
import TechStacks from "./sections/TechStacks";

export default function V2() {
  return (
    <main>
      <div className="mx-2 lg:mx-20">
        <Intro />
      </div>

      <TechStacks />

      <FeaturedProjects />

      <div className="mx-2 lg:mx-20">
        <ProjectOne />

        <ProjectTwo />
      </div>

      <ProjectThree />

      <ProjectFour />
    </main>
  );
}
