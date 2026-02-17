---
title: "Building a CLI Tool in Rust"
subtitle: "From zero to a working binary in 30 minutes"
date: "2026-02-15"
tags: ["rust", "cli", "tutorial"]
---

Today I built a small CLI tool in Rust using `clap` for argument parsing.

## Getting Started

First, scaffold the project with `cargo init`. Then add clap to your dependencies.

The whole thing compiles to a **single static binary** — no runtime needed.