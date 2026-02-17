---
title: "Notes on Distributed Systems"
subtitle: "Key takeaways from DDIA Chapter 5"
date: "2026-02-15"
tags: ["distributed-systems", "reading-notes"]
---

Replication is the core challenge of distributed databases.

**Leader-based replication** is the most common approach:
- One replica is the leader (accepts writes)
- Others are followers (replicate the log)
- Reads can go to any replica