# How to Run Playwright

This guide contains the minimal steps to install dependencies and run the Playwright tests included in this project.

Prerequisites:

- Node.js (LTS) installed
- Git (for cloning the repo if needed)

Install project dependencies (PowerShell):

```powershell
cd <path-to-repo>
npm install
# Install Playwright browsers (first time only)
npx playwright install
```

Run Playwright tests (all tests):

```powershell
npx playwright test
```

Run a specific test file:

```powershell
npx playwright test tests/automated/playwright/login_test.js
```

Run with headed browser for debugging:

```powershell
npx playwright test --headed
```

Notes:

- Tests that require Parabank account IDs must have those IDs provided (see `docs/README.md` for account retrieval steps).
- Playwright configuration is in `playwright.config.*` if present; otherwise default CLI options apply.
