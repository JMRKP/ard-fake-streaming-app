---
name: distribute
description: Build the Android APK, bump the version, generate release notes from git history, and distribute via Firebase App Distribution.
allowed-tools: Bash(pnpm build:android *) Bash(cd */android && ./gradlew assembleDebug *) Bash(npx firebase appdistribution:distribute *) Bash(git log *) Bash(git tag *) Read Edit Grep Glob AskUserQuestion
---

Distribute the Android app via Firebase App Distribution. Follow every step below in order.

## Step 1: Determine version bump

Read the current version from `pwa/android/app/build.gradle` (look for `versionCode` and `versionName`).

Ask the user what kind of version bump they want:

- **Major** (e.g. 1.1 → 2.0)
- **Minor** (e.g. 1.1 → 1.2)
- **Patch** (e.g. 1.1 → 1.1.1)

Then update both `versionCode` (increment by 1) and `versionName` accordingly in `pwa/android/app/build.gradle`.

## Step 2: Generate release notes

Find the commit where the version was last bumped:

```bash
git log --all --oneline --grep="versionCode" -- pwa/android/app/build.gradle
```

Use that commit as the boundary. List all commits since then:

```bash
git log --oneline <last-bump-commit>..HEAD
```

Generate a release note in this format:

```
v<versionName>

- <human-readable summary of each meaningful change>
```

Collapse related commits (e.g. a refactor + fix in the same area) into a single bullet. Skip chore/CI-only commits unless they affect the app. Show the draft to the user and let them confirm or edit.

## Step 3: Build

Run these sequentially:

1. `pnpm build:android` — builds web assets with production WS URL and syncs to Capacitor
2. `cd pwa/android && ./gradlew assembleDebug` — builds the debug APK

Verify both commands succeed before continuing.

## Step 4: Distribute

Run Firebase App Distribution with the release notes:

```bash
npx firebase appdistribution:distribute \
  pwa/android/app/build/outputs/apk/debug/app-debug.apk \
  --app 1:881863467694:android:e4bec967f86651b594033f \
  --groups 3-minuten-dreh \
  --release-notes "<release notes from step 2>"
```

## Step 5: Report

Show the user:

- The new version (versionName + versionCode)
- The Firebase console link from the output
- Remind them to commit the version bump if they haven't already
