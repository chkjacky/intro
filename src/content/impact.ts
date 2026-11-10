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
 * END OF CLAUDE
 */
