# How to Run Postman Collection

This guide shows how to import and run the Postman collection included in this repository.

Prerequisites:

- Postman desktop app (or Postman web with a workspace)

Steps:

1. Open Postman.
2. Import the collection file: `tests/automated/api/api_test_postman/Parabank API test.postman_collection.json`.
3. Import the environment file: `tests/automated/api/api_test_postman/ApiParabankBase.postman_environment.json` (optional — copy values into your local environment).
4. Register and Login:
   - Go to ParaBank and register a new user (use fictitious data): https://parabank.parasoft.com/parabank/index.htm
   - After successful registration you will be redirected to your account dashboard. Use the dashboard to create accounts and capture the account IDs.
5. Update environment variables (baseUrl, account IDs, credentials) with the User and Account IDs you obtained after registering on Parabank. Remember the site data resets daily.
6. Run the collection using the Collection Runner or via the UI -> Run.

Notes:

- For CI, export the collection runner config and run with Newman (optional):

```powershell
# Install newman (global or workspace)
npm install -g newman

# Run the collection with environment
newman run "tests/automated/api/api_test_postman/Parabank API test.postman_collection.json" -e "tests/automated/api/api_test_postman/ApiParabankBase.postman_environment.json"
```

- Replace `baseUrl`, `fromAccountId`, `toAccountId` and credentials in environment variables before running.
- For security, never commit secrets into the repository.
