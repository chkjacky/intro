/**
 * CLAUDE
 */
/**
 * Business-facing copy for the site. Every number here is shown to visitors,
 * so replace each `TODO` with your real figure (a rough estimate is fine)
 * before pushing to `main`.
 */

export type ProofStat = {
  /** Number the stat counts up to */
  value: number;
  /** Shown before the number, e.g. "~" for an estimate */
  prefix?: string;
  /** Shown after the number, e.g. "+" */
  suffix?: string;
  /** Keep to 2–3 words so three stats fit side by side on a phone */
  label: string;
};

export const INTRO = {
  valueLine: "I turn business problems into shipped products.",

  stats: [
    { value: 6, suffix: "+", label: "Years building" },
    { value: 7, suffix: "+", label: "Products" },
    { value: 6, prefix: "~", label: "Weeks to MVP" },
  ] satisfies ProofStat[],
};

/**
 * TechStacks captions: what each tool means for a business, shown under the
 * grid when a word is hovered (desktop) or tapped (mobile). Keys must match
 * the `text` in `TECH_STACK_ROWS` (v2.tsx). Keep each under ~60 characters
 * so it fits on one line on desktop.
 */
export const TECH_VALUES: Record<string, string> = {
  Python: "AI agents & automation: repetitive work handled for you",
  Typescript: "Type-safe code: fewer bugs, easier for any team to maintain",
  PHP: "Legacy modernisation: upgrade old systems without a rebuild",
  Javascript: "Interactive UIs: smooth pages that keep visitors engaged",
  Solidity: "Smart contracts: secure payments and provable ownership",
  Ruby: "Reliable backends: dependable systems built to last",
  NextJS: "Fast, SEO-ready websites: easy to find on Google",
  "Ruby On Rails": "Rapid MVPs: a working product in weeks, not months",
  NestJS: "Scalable APIs: back-ends that grow with your business",
  Shadcn: "Accessible UI components: clean screens anyone can use",
  Tailwind: "Responsive design: your brand looks right on every screen",
  Jira: "Agile sprints: clear progress you can track every week",
  PostgreSQL: "Vector-ready database: AI search and business data in one",
  MySQL: "Proven SQL database: everyday data, stored reliably",
  Postman: "API testing: partner integrations that just work",
  Retool: "Internal tools: custom dashboards for your team in days",
};

export type ProjectImpactCopy = {
  problem: string;
  built: string;
  /** Shown highlighted in the project's accent colour */
  outcome: string;
  role: string;
  /**
   * One short line on the FRONT of the card, so the result is visible
   * without flipping. Keep it under ~35 characters.
   */
  highlight: string;
  /** True for unreleased projects: `highlight` shows as a status pill */
  isUnreleasedProject?: boolean;
};

/**
 * Back of each project's flip card: Problem → What I built → Outcome + role.
 * Anything in [square brackets] is a placeholder, and it shows on the site as
 * written. Replace every one with a real answer before pushing to `main`.
 */
export const PROJECT_IMPACT = {
  volksmarket: {
    problem:
      "Prediction markets are easy to sway with rumours and fake results.",
    built: "A prediction market where every outcome settles on verified facts.",
    outcome: "Finalising, launching soon",
    role: "Independent Fullstack Engineer",
    highlight: "Launching soon",
    isUnreleasedProject: true,
  },
  aiAgent: {
    problem: "Accountants lose hours sorting and keying in documents by hand.",
    built: "An AI agent that reads, sorts and manages accounting documents.",
    outcome: "~80% less manual data entry",
    role: "Fullstack Engineer · Consultant",
    highlight: "80% manual data entry reduced",
  },
  web3Games: {
    problem:
      "Game rewards stay locked in the game, and paying across borders is slow.",
    built:
      "Web3 rewards that players truly own, plus borderless in-game payments.",
    outcome:
      "US $1,000+ organic revenue in the MVP's first week · Client costs and operational workload cut by 70%",
    role: "Fullstack Engineer · Product Manager",
    highlight: "US $1,000+ revenue in week one",
  },
  rwa: {
    problem:
      "Real-world, non-financial assets are hard to split, trade or prove ownership of.",
    built:
      "A marketplace that turns those assets into tradeable digital tokens.",
    outcome: "In design, launch date to be announced",
    role: "Founder · Fullstack Engineer · Product Manager",
    highlight: "In design",
    isUnreleasedProject: true,
  },
} satisfies Record<string, ProjectImpactCopy>;

/** Resume: "How I work" steps, in order. Keep each detail to one short line */
export const HOW_I_WORK = [
  { title: "Understand", detail: "Business problems come first" },
  {
    title: "Prototype",
    detail: "A clickable version that we can hypothesize first",
  },
  { title: "Develop & Ship", detail: "Live, tested and ready for real users" },
  { title: "Measure & iterate", detail: "Improve with real feedback and data" },
];

/**
 * Resume CTA: how people can work with me, shown above "Let's talk".
 * Keep offers to 1–3 words each so the row wraps neatly on phones.
 */
export const WORK_WITH_ME = {
  availability: "Open to full-time roles, project work and consulting.",
  offers: [
    "MWPs in weeks",
    "AI Automation",
    "Payments & Web3",
    "Product & Tech Consulting",
  ],
};

/**
 * END OF CLAUDE
 */
