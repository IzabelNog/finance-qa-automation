# How to Run Cypress

This guide contains the minimal steps to install dependencies and run the Cypress tests included in this project.

Prerequisites:

- Node.js (LTS) installed
- Git (for cloning the repo if needed)

Install project dependencies (PowerShell):

```powershell
cd <path-to-repo>
npm install
```

Open Cypress interactive runner:

```powershell
npx cypress open
```

Run all Cypress tests in headless mode:

```powershell
npx cypress run
```

Notes:

- If you need to run a single spec file, use the `--spec` flag:

```powershell
npx cypress run --spec "tests/automated/cypress/finance_calculations.cy.js"
```

- Browser selection and configuration can be adjusted in `cypress.config.js`.
- Tests that require external data (Parabank account IDs) must be updated manually or supplied via environment variables before running those specs.
