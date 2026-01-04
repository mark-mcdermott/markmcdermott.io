---
title: "Deleting Blank Lines (VSCode)"
subtitle: "A quick regex"
date: "2025-10-04"
tags: ["VS Code", "Regex"]
---
I had a textfile today in VSCode where every other line was a blank line and I needed to delete all the blank lines. Turns out there's a quick regex you can use for this in VSCode search and replace:
```
^\s*\n
```
- `^`: line start
- `\s`: space (which apparently js & vscode interpret liberally)
- `*`: 0 or more
- `\n`: line break
The `\s*` is clever and a little confusing because it's matching "zero whitespaces" in this case. But in theory it seems like something like "a" could be zero whitespaces. But apparently that's not how regex works. It's best to think of it like a little pacman machine or something chomping from left to right. In this case, `\s*` matches the initial position ("zero spaces", or "stay in place").

I believe for Windows it would be:
```
^\s*\r\n
```

So if you want to cover Unix/Windows, you could do:
```
^\s*\r?\n
```

The Windows `\r\n` was new to me and I had to look it up. I had seen `LF` and `CRLF`, but never knew what they meant. Turns out it's:
- `\n` = LF (Line Feed), the Unix/macOS newline.
- `\r\n` = CRLF (Carriage Return + Line Feed), the Windows newline.

So now you know. And knowing is half the battle.





