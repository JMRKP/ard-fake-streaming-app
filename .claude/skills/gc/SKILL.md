---
name: gc
description: Stage and commit changes using conventional commits. Checks for large or multimedia files and gitignores them unless the user explicitly confirms.
disable-model-invocation: true
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git log *) Bash(git add *) Bash(git commit *) Read Edit Write Grep Glob
---

Create a git commit for the current changes. Follow every step below in order.

## Step 1: Gather context

Run these in parallel:

- `git status` (never use `-uall`)
- `git diff` and `git diff --cached` to see staged + unstaged changes
- `git log --oneline -5` for recent commit style reference

## Step 2: Check for large or multimedia files

Inspect every **untracked or modified binary file** in the status output.
Flag a file if it matches ANY of these criteria:

- File size > 10 kB (`wc -c` or `stat`)
- Multimedia extension: `.webm`, `.mp4`, `.mov`, `.avi`, `.mkv`, `.mp3`, `.wav`, `.ogg`, `.flac`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.tiff`, `.svg`, `.webp`, `.ico`, `.pdf`, `.psd`, `.ai`, `.eps`

For every flagged file:

1. Tell the user the filename and size.
2. Ask whether to **commit** it or **gitignore** it.
3. If the user says gitignore (or does not explicitly confirm committing): append the path to `.gitignore` and do NOT stage the file.
4. If the user explicitly confirms: stage it normally.

Do NOT silently skip or silently commit these files.

## Step 3: Draft a conventional commit message

Use the **Conventional Commits** format:

```
<type>(<optional scope>): <short summary>

<optional body>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Type must be one of:

| Type       | When to use                                  |
|------------|----------------------------------------------|
| `feat`     | A new feature                                |
| `fix`      | A bug fix                                    |
| `refactor` | Code restructuring, no behaviour change      |
| `chore`    | Build, config, dependencies, tooling         |
| `docs`     | Documentation only                           |
| `style`    | Formatting, whitespace, semicolons           |
| `test`     | Adding or updating tests                     |
| `perf`     | Performance improvement                      |
| `ci`       | CI/CD configuration                          |

### Rules:

- Summary line: imperative mood, lowercase, no period, max 72 chars.
- Scope is optional but encouraged when changes are scoped to a package (e.g., `pwa`, `server`, `controller`, `shared`).
- Body is optional; use it only when the "why" isn't obvious from the summary.
- Do NOT commit files that likely contain secrets (`.env`, credentials, tokens). Warn the user instead.

## Step 4: Stage and commit

1. Stage the relevant files by name (avoid `git add -A` or `git add .`).
2. Commit using a HEREDOC for proper formatting:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <summary>

<optional body>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

3. Run `git status` after the commit to verify success.

## Step 5: Report

Show the user the commit hash and message. If there are remaining unstaged changes, mention them.

Do NOT push unless the user explicitly asks.
