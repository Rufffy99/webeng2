# 🔀 Branching Strategy & Protection Rules

This repository follows a strict and automated branching workflow to ensure clean code, proper reviews, and safe deployment.

---

## 🧩 Branch Overview

| Branch Pattern | Purpose                            | Merge Type | Protection Level     |
|----------------|------------------------------------|------------|-----------------------|
| `main`         | 🚀 Production                      | PR only    | 🔒 Full protection    |
| `staging`      | 🧪 Pre-release staging             | PR only    | 🔒 Full protection    |
| `dev`          | 🔧 Feature integration & testing   | PR only    | 🔒 Review + checks    |
| `feature/*`    | ✨ New features                     | direct     | 🔒 Basic protection    |
| `fix/*`        | 🐛 Minor fixes                     | direct     | 🔒 Basic protection    |
| `hotfix/*`     | 🔥 Critical production fixes       | PR only    | 🔒 Full protection    |

---

## 🛡️ Protection Rules Summary

Each protected branch uses a combination of these rules:

- ✅ Prevent force pushes (`non_fast_forward`)
- ✅ Prevent deletion
- ✅ Require Pull Requests for updates (some branches)
- ✅ Require review approvals (1)
- ✅ Require most recent push approval (no self-merge without review)
- ✅ Require resolution of all PR discussions
- ✅ Require passing status checks:
  - `validate-branch-name`
  - `validate-pr-source`
- ✅ Merge method: **Squash only**
- ✅ GitHub Copilot code review: **enabled**

---

## 📘 Detailed Branch Rules

### 🔵 `main`
- Protected as the default branch
- Only pull requests allowed (no direct pushes)
- PRs must:
  - Come from `staging` or `hotfix/*` (validated by `validate-pr-source`)
  - Be approved by **1 reviewer**
  - Resolve all open conversations
  - Pass all status checks (build/lint via `validate-*`)
- Merge method: **Squash only**
- Copilot code review: ✅ enabled
- 🔒 Deletion & force push blocked
- 👤 Admins **may bypass** restrictions

---

### 🟡 `staging`
- Acts as a pre-release environment
- Pull request required
- Requires:
  - ✅ 1 approval
  - ✅ Up-to-date push approval
  - ✅ All PR threads resolved
  - ✅ Passing status checks
- Merge method: **Squash only**
- Copilot review: ✅ enabled
- 🔒 Fully protected (no deletions, force pushes, or direct commits)

---

### 🟠 `dev`
- Central branch for integrating features and fixes
- Pull request required
- Requires:
  - ✅ 1 review
  - ✅ Last push approval
  - ✅ All discussions resolved
  - ✅ Status checks must pass
- Merge method: **Squash only**
- Copilot review: ✅ enabled
- 🔒 Fully protected

---

### ✨ `feature/*`
- For new features (e.g. `feature/map-popup`)
- Direct pushes allowed (PR not required)
- Protected from:
  - ❌ Deletion
  - ❌ Force pushes
- No review or status checks required (can be added)

---

### 🐛 `fix/*`
- For bug fixes (e.g. `fix/zoom-reset`)
- Same protection level as `feature/*`
- No enforced review or checks, but deletions and force pushes are blocked

---

### 🔥 `hotfix/*`
- Used for critical production fixes
- Requires pull request
- PRs must:
  - Be approved by 1 reviewer
  - Resolve all comments
  - Pass all checks (`validate-branch-name`, `validate-pr-source`)
  - Use squash merge only
- No direct pushes, force pushes, or deletions allowed

---

## 🧪 Enforced Status Checks

| Status Check            | Description                                   |
|-------------------------|-----------------------------------------------|
| `validate-branch-name`  | Ensures correct naming convention on branches |
| `validate-pr-source`    | Allows PRs to `main` only from `staging` or `hotfix/*` |

---

## 👮 Naming Convention

All branches must follow these prefixes (enforced via GitHub Actions):

- `feature/*` – new features
- `fix/*` – bug fixes
- `hotfix/*` – urgent production fixes
- `dev`, `staging`, `main` – reserved core branches

---

## 🤖 Copilot Review

GitHub Copilot code review is **enabled** on all protected branches that require PRs.  
Pull requests will automatically trigger AI code review suggestions.

---

## 🛠️ Merge Methods

Only **squash merges** are allowed for all protected branches.  
This ensures a clean, linear commit history.

---

## 🔗 Related Workflows

- `.github/workflows/validate-branch-name.yml`  
- `.github/workflows/enforce-main-pr-source.yml`  
- `.github/workflows/build.yml`

---

For more details, see:
- [`README.md`](../README.md)
