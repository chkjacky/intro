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
  Python: "AI agents & automation: hours of manual work saved",
  Typescript: "Type-safe code: fewer bugs and an easier handover",
  PHP: "Legacy modernisation: upgrade your system, no full rebuild",
  Javascript: "Interactive web apps: visitors stay engaged longer",
  Solidity: "Smart contracts: safe payments and digital ownership",
  Ruby: "Reliable backends: systems built to last for years",
  NextJS: "SEO-friendly websites: fast and easy to find on Google",
  "Ruby On Rails": "Rapid MVPs: a working product to be delivered in weeks",
  NestJS: "Scalable APIs: systems that grow with your business",
  Shadcn: "Accessible UI components: clean screens anyone can use",
  Tailwind: "Responsive design: your brand right on every screen",
  Jira: "Agile sprints: clear updates on what's shipping",
  PostgreSQL: "Secure databases: financial records kept accurate",
  MySQL: "Cost-effective databases: everyday data stored reliably",
  Postman: "Tested API integrations: your partners' systems connected",
  Retool: "Custom internal tools: ready for your staff in days",
};

export type ProjectImpactCopy = {
  problem: string;
  built: string;
  /** Shown highlighted in the project's accent colour */
  outcome: string;
  role: string;
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
  },
  aiAgent: {
    problem: "Accountants lose hours sorting and keying in documents by hand.",
    built: "An AI agent that reads, sorts and manages accounting documents.",
    outcome: "~80% less manual data entry",
    role: "Fullstack Engineer · Consultant",
  },
  web3Games: {
    problem:
      "Game rewards stay locked in the game, and paying across borders is slow.",
    built:
      "Web3 rewards that players truly own, plus borderless in-game payments.",
    outcome:
      "US $1,000+ organic revenue in the MVP's first week · Client costs and operational workload cut by 70%",
    role: "Fullstack Engineer · Product Manager",
  },
  rwa: {
    problem:
      "Real-world, non-financial assets are hard to split, trade or prove ownership of.",
    built:
      "A marketplace that turns those assets into tradeable digital tokens.",
    outcome: "In design, launch date to be announced",
    role: "Founder · Fullstack Engineer · Product Manager",
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
