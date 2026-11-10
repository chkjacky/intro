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

/**
 * END OF CLAUDE
 */
