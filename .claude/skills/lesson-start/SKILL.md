# Lesson Start Skill

Full session initialization workflow for learning sessions.

## Workflow

1. **Check current state** from @docs/learning-progress.md
2. **Verify development environment** (`npm run dev` works)
3. **Prepare git branch** (delegate to git-manager if needed)
4. **Set session objectives** (1-3 specific goals)
5. **Load topic context** from curriculum and relevant docs

## Topic-Specific Initialization

### astro-fundamentals
- Review project structure and .astro file format
- Check current component patterns in codebase
- Identify learning gaps in Astro knowledge

### content-collections
- Review current content schemas and queries
- Check blog post and project frontmatter patterns
- Prepare examples from the portfolio site's actual content

### scss-architecture
- Review current SCSS file organization
- Identify patterns and areas for improvement
- Prepare examples of 7-1 architecture

### css3-deep-dive
- Review current CSS usage in the codebase
- Identify layout patterns (flexbox, grid) in use
- Prepare examples for specificity, cascade, box model

### responsive-design
- Review current responsive patterns in the site
- Check media query usage and breakpoints
- Prepare examples at different viewport widths

### testing-e2e
- Review current Playwright tests
- Identify untested pages and user flows
- Prepare test writing exercises

## Session Greeting Format

```
Session initialized.

Current phase: [phase from learning-progress.md]
Today's focus: [topic]
Objectives:
1. [specific goal]
2. [specific goal]
3. [specific goal]

Ready to begin. What would you like to start with?
```
