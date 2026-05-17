---
title: "/model coding-by-hand-again"
subtitle: "Progression Through Unlearning"
date: "2026-05-17"
tags: ["apps", "react", "tailwind", "design", "mockups"]
---

Every once in a while, I take a weekend off from childrearing, dog training, and general-adulting and go to a nearby Airbnb for the weekend and just code, [John Carmack style](https://www.facebook.com/permalink.php?story_fbid=2110408722526967&id=100006735798590) . This weekend I stayed in what my wife called a "hellbnb" (hot, musty, and roaches for roommates, but hey—solid wifi!) and I (95%) finished [https://mockingboard.design](https://mockingboard.design) and got a WIP version of [https://floating.is](https://floating.is) live. React, TypeScript, Tailwind and Mountain Dew. Good times were had by all.

I spent nearly every day for the past six months vibe coding my heart out. I learned a lot about LLM workflows, but actually wasn't learning how to build the apps I was building. I decided going forward I'd split my time fifty-fifty on frameworks/fundamentals and the new-fangled AI stuff.

Is coding without Claude/Codex even useful still? Are we already on the vertical part of AI acceleration graph? [METR](https://metr.org/)  said a few months ago that AI task capacity is basically [doubling every three months](https://metr.org/blog/2026-1-29-time-horizon-1-1#comparison-of-old-and-new-estimates). That's like Moore's Law on crack.

I typed every single line of Mockingboard and floating.is. In a way, it's regression to pre-AI days where we followed tutorials, except now the tutorial is accurate and it's written by Claude on the fly.

Things I learned while working on Mockingboard and floating.is:
- React:
    - useState pattern (`const [val, setVal] = useState())` for managing component and app UI state
    - lots of js module style imports, both named and default.
    - handling all state logic at the top level (in this case `src/pages/HomePage.tsx`), passing state and handlers down into components and bubbling events back up through callback functions
    - basic React `tsx` structure with imports at the top then `export function HomePage() {}` and inside that towards the bottom, `return ( )` with HTML markup with `{ }` for ts expressions in the markup.
- TypeScript:
    - defining react props with `type` at the top of component files.
    - defining shared app-wide TypeScript types in `src/types.ts`
    - `!` as non-null assertion operator, saying don't warn me about null here
- Tailwind:
    -  `grid` `grid-cols-2` to create a two-column grid layout
    -    `grid grid-cols-[300px_1fr]` for a custom column with second column as remaining fraction
    -    the `px-4 md:px-8` pattern for setting mobile-first styles and then desktop
    -    `hidden md:block` pattern for hiding things at mobile sizes
    -    `mx-auto max-w-2xl` pattern for centered content
    -    `max-w-xl md:max-w-none` to set a mobile max width but none on wider widths
-    git:
    -    worked on my Conventional Commits commit messages using project scopes and commit messages that don't just say what was done, but also why it was done
      - worked on my muscle memory for various git syntaxes:
          - `git reset HEAD~1` uncommits and unstages while keeping working tree changes.
          - `git reset --soft HEAD~1` to undo commit but keep staged
          - `git reset --hard HEAD~1` undo commit and delete from working tree
          - `git reset --cached <file>` remove file from git tracking while keeping it locally
          - to add my current unstaged changes to two commits back:
              - `git stash`
              - `git rebase -i HEAD~2`
              - set commit `A` to `edit`
              - `git stash pop`
              - `git add .`
              - `git commit --amend --no-edit`
              - `git rebase --continue`