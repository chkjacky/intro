# <img src="https://c.tenor.com/xS_t2ANBv9UAAAAi/elsalla.gif" width="25px"> Guten Tag! I'm Jacky

This repo is my personal intro page: a single scrolling page that says who I am, what I work with and what I've built. I'm a software engineer working across **AI, Fintech, RWA and Web3**, and I wanted something more interesting than a PDF résumé.

## 🌇 Overview

- **Intro**: a quick hello, with a photo that changes between light and dark mode.
- **Tech stacks**: the languages, frameworks and tools I use day to day. On desktop, hover over a word and its letters magnify like the macOS Dock.
- **Featured projects**:
  - **Volksmarket**: a prediction market that only relies on true facts.
  - **AI Accounting Agent**: an agent that manages accounting documents so accountants don't have to.
  - **Web3 Games & Payment**: a traditional game rebuilt with web3. Play the game, own the rewards, pay without borders. (Click anywhere in this section for a surprise.)
  - **RWA**: a marketplace for tokenizing non-financial real world assets. Coming soon.
- **Experience & Contacts**: where I've worked and how to reach me.

The project sections include interactive Arcade demos you can click through, and most of the motion is driven by scroll, so the page works best when you scroll through it slowly.

## 🏗️ Why I Built It

Partly to have one link I can send people, and partly as a playground. Most of the effects here (scroll-driven animations, the dock magnifier, the flip cards, the emoji burst) were me trying out ideas I wanted to see in a real page. They all respect `prefers-reduced-motion`, and dark mode follows your system setting by default.

## 💻 Under The Hood

Built with Next.js, React, Tailwind CSS and shadcn/ui, exported as static files and hosted on GitHub Pages. Every push to `main` redeploys it.

To run it locally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Code style notes, including how imports are ordered, are in [CODE_STYLE.md](CODE_STYLE.md).
