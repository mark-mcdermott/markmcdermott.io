# CLAUDE.md

**Educational portfolio site project**: Astro 5 + SCSS + vanilla TypeScript

## Context Loading (On-Demand Only)
**Status**: @docs/learning-progress.md
**Curriculum**: @docs/lessons/00-curriculum-outline.md
**Git Guide**: @docs/git-complete-guide.md

## Agents (Delegate via Task tool)
**Index**: @.claude/agents/README.md (selection guide)
**Git**: @.claude/agents/git-manager.md (complex: conflicts, rebase, PRs)
**Docs**: @.claude/agents/documentation.md (progress updates)

## Consultants (Load inline for advice)
**Astro Expert**: @.claude/agents/astro-expert.md (components, content collections, routing, islands, deployment)
**CSS Expert**: @.claude/agents/css-expert.md (CSS3, SCSS, layout, responsive, animations, C64 aesthetic)

## Always Active
**Output Style**: @.claude/output-styles/teaching-mentor.md
**Teaching Rules**: @.claude/rules/learning-workflow.md

## Skills (Claude can invoke proactively or user can request)
**Index**: @.claude/skills/README.md (skill discovery)

| Command | Purpose |
|---------|---------|
| `/lesson-start` | Full session initialization |
| `/app-test` | Test the site for errors (Playwright) |
| `/progress-review` | Spaced repetition review |
| `/commit` | Quick git commits with conversation context |
| `/educational-workflow` | Session structure and checkpoint patterns |
| `/docs-audit` | Audit documentation architecture |

## Stack & Patterns
**Tech**: Astro 5 + SCSS + vanilla TypeScript + Playwright
**Site**: Portfolio/blog with C64-inspired retro aesthetic
**Workflow**: Subagent delegation + educational commits

## MCP Servers
1. **Context7** - For up-to-date library documentation. Use before writing code with Astro or SCSS APIs.
2. **Playwright** - For browser automation and testing. Use to verify features, debug UI issues, run E2E tests.

## Context Management
- Use subagents liberally to preserve main context
- **Git routing** (see rules/learning-workflow.md):
  - Read-only (status/log/diff) -> Direct execution
  - Simple commits -> `/commit` skill (has conversation context)
  - Complex (conflicts/rebase/PRs) -> git-manager agent
- Documentation -> documentation agent
- Teaching protocols -> rules (learning-workflow.md, always active)
- Load context modules only as needed

### Automated Workflow
1. **Session start**: Progress auto-loaded via SessionStart hook
2. **Code edits**: Test reminder injected after Astro/SCSS file edits
3. **Commits**: Checklist injected before git commits
4. **Skills**: Claude can invoke proactively based on context

### Recovery
If overloaded: checkpoint via git-manager, fresh session with minimal context

## Detailed Context Modules
**Index**: @docs/context-modules/README.md (module selection)
- @docs/context-modules/progress-tracking.md - Spaced repetition tracking
- @docs/context-modules/learning-phases.md - Phase definitions
- @docs/context-modules/platform-specs.md - Architecture + tech specs

## Session Behavior
**Rules**: @.claude/rules/learning-workflow.md (teaching protocols, note-taking, lesson delivery)
**Lessons**: @docs/lessons/README.md (lesson navigation and structure)

## Student Profile
**Background**: ~15 years QA, ~5 years light frontend, MS in Software Engineering
**Goal**: QA-to-dev role transition, deeply understand every piece of the portfolio site
**Approach**: Started from Astro template, now wants to master CSS/SCSS and web fundamentals
**Strengths**: Testing instincts, theoretical CS background, systematic thinker
**Growth areas**: Deep CSS3/SCSS, Astro internals, responsive design, accessibility
