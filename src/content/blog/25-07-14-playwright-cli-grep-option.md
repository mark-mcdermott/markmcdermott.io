---
title: "Playwright CLI Grep Option"
subtitle: "grep & grep-invert"
date: "2025-07-14"
tags: ["Playwright", "Testing"]
---
Playwright has some interesting CLI options for the regular `npx playwright test` command. Today I learned about the `--grep` and `--grep-invert` options. They both search for a regex in the test names and test tags. the `--grep` runs all tests matching the regex and `--grep-invert` runs all tests that don't match the regex. Pretty cool!