---
title: "cat -vet For Confusing Diffs"
subtitle: "When a regular vet won't do"
date: "2026-03-03"
tags: ["git","bash"]
slug: "2026-03-03-cat-vet-for-confusing-diffs"
---
Been deep in Claude stuff for a couple months there and didn't get a chance to post anything. But today I had a `git diff` with something like these lines:
```
-        if (!foo || bar) {
+        if (!foo || bar) {
```
and added whitespace was showing in other parts of the diff as red blocks, so I thought this couldn't be whitespace. ChatGPT said to try `git diff | cat -vet`  and it outputted something like
```
-        if (!foo || bar) { $
+        if (!foo || bar) {$
```
where `$` is end-of-line. So I think I deleted the whitespace and that's why it wasn't showing up as a red block--that was only added whitespace.

So the `-vet` flag for `cat` is three flags:
- `v`: ("visible") Show non-printing characters visibly (except tab and newline).
- `e`: ("end-of-line") Show end-of-line as `$`.
- `t`: ("tab") Show tabs as `^I`

Pretty handy! And definitely illuminating, especially after that quite suspect diff. 😒

Aside: This is my first non-test post written and published in [Xin](https://github.com/mark-mcdermott/xin). It's alive!