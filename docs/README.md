# Finance QA Automation

This project provides examples of automated tests for financial systems, including UI automation (Cypress, Playwright), API tests (Postman), SQL queries for data validation, and instructions for manual testing.

---

## Technologies Used

- **Cypress**: Automated UI and financial calculation tests.
- **Playwright**: End-to-end navigation and banking transaction tests.
- **Postman**: API tests for banking services.
- **SQL**: Queries for financial data validation.
- **Node.js**: Environment for running automated tests.

---

## Project Structure

```
finance-qa-automation/
│
├── assets/
│   └── fluxogram_test.png           # Flowchart illustrating test process
├── docs/
│   └── README.md                    # Project documentation
│
├── tests/
│   ├── automated/
│   │   ├── api/
│   │   │    └── api_test_postman/
│   │   │         ├── ApiParabankBase.postman_environment.json  # Postman environment config
│   │   │         └── Parabank API test.postman_collection.json # Postman API test collection
│   │   ├── cypress/
│   │   │   └── finance_calculations.cy.js # Compound interest and balance calculation tests
│   │   └── playwright/
│   │       ├── helpers.ts                # Utility functions for Playwright
│   │       ├── login_test.js             # Login tests
│   │       └── transactions.test.ts      # Transaction and balance tests
│   └── database/
│   │    ├── sql_tests/
│   │       ├── queries/
│   │       │   ├── per_capita_pib.sql     # Per capita GDP query
│   │       │   ├── projection.sql         # Financial projection query
│   │       │   ├── ranking_continent.sql  # Continent GDP ranking
│   │       │   └── ranking_pib.sql        # Country GDP ranking
│   │       └── results/
│   │           ├── per_capita_pib.md
│   │           ├── projection.md
│   │           ├── ranking_continent.md
│   │           └── ranking_pib.md
│   └── manual/
│        └── parabank_manual_tests.ipynb   # Manual test instructions
└── .gitignore                            # Ignore files/folders
```

---

## How to (single source-of-truth)

Under Project Structure we maintain single-page guides for running the main automation tools. Link to the guides below so updates are made in one place and reused across documentation pages.

- How to Run Cypress - docs/guide/run_cypress.md
- How to Run Playwright - docs/guide/run_playwright.md
- How to Run Postman - docs/guide/run_postman.md

---

## Example Test Cases

### Cypress Example

Validate compound interest and balance after transactions:

```javascript
describe('Financial Calculations Validation', () => {
  it('Validates compound interest', () => {
    const principal = 1000;
    const rate = 0.05;
    const time = 12;

    const calculatedAmount = principal * Math.pow(1 + rate, time);
    const expectedAmount = 1795.86; // Expected value based on manual calculation

    expect(calculatedAmount.toFixed(2)).to.equal(expectedAmount.toFixed(2));
  });

  it('Validates balance after multiple transactions and maintenance fee', () => {
    const initialBalance = 5000;

    // Transactions performed
    const transactions = [+200, -150, +300, -50, -100];

    // Monthly maintenance fee
    const maintenanceFee = 0.02;

    // Calculate balance after transactions
    let finalBalance = initialBalance;
    transactions.forEach((amount) => {
      finalBalance += amount;
    });

    // Apply the maintenance fee
    finalBalance -= finalBalance * maintenanceFee;

    const expectedBalance = 5096; // Expected value based on manual calculation
    expect(finalBalance.toFixed(2)).to.equal(expectedBalance.toFixed(2));
  });
});
```

---

## Parabank Simulation Platform

This project uses the [Parabank](https://parabank.parasoft.com/parabank/index.htm) banking simulation platform for API and UI tests. To use Parabank, you must register a new user with fictitious data. The platform resets all data daily, so you will need to re-register and create new accounts each day. Account numbers and login credentials will change after each reset.

**How to Register (Example Fictitious Data):**

**Tip:** Always update your test scripts and Postman endpoints with the latest account IDs after registration and account creation, as Parabank resets all data daily.
| Field | Example Value |
|--------------|-------------------|
| First Name | John Doe |
| Last Name | Smith |
| Address | 123 Main St |
| City | Springfield |
| State | CA |
| Zip Code | 90210 |
| Phone | 555-123-4567 |
| SSN | 1234567 |
| Username | johndoe |
| Password | password123 |

You can use any fictitious values for these fields. For SSN, simply enter a random number (e.g., 1234567).

**How to find your User and Account IDs in Parabank (for API and Playwright tests):**

To perform API and Playwright tests, you need at least two account IDs and your user ID. Follow these practical QA steps:

1. **Register and Login:**

- Register a new user on Parabank with fictitious data.
- After registration, you will be automatically redirected to your account dashboard.

2. **Open Developer Tools:**

- Press `F12` or right-click and select `Inspect` to open your browser's Developer Tools.
- Go to the `Network` tab.

3. **Create a Second Account:**

- In Parabank, click on `Open New Account` and follow the steps to create a new account (choose account type and initial deposit).
- This step is essential for testing transfers between accounts.

4. **Capture User and Account IDs:**

- After creating the new account, look in the `Network` tab for requests named `accounts` or similar.
- Click on these requests and check the response data. You will see your user ID and the IDs of all your accounts.
- Note these IDs; you will use them in your API endpoints and Playwright test scripts.

5. **Learning Outcomes:**

- By following these steps, you learn how to inspect web applications, understand how APIs communicate, and extract dynamic data for automated tests.
- This process develops your skills in browser debugging, API analysis, and manual test setup—key abilities for any QA professional.

**Important:**

- All user and account data is deleted at the end of each day. You must re-register and use new account numbers for tests.
- Account numbers and login credentials must be entered manually by the user before running Playwright and API tests. Always update your scripts or environment variables with the new data after registration.
- Do not hardcode account numbers or login credentials in your scripts.

---

### Playwright Example

Test successful bank transfer (use your own account numbers after registration):

```typescript
import { test, expect, Page } from '@playwright/test';
import { login } from './helpers';

async function makeTransfer(
  page: Page,
  fromAccount: string,
  toAccount: string,
  amount: string
) {
  await page.getByRole('link', { name: 'Transfer Funds' }).click();
  await expect(page).toHaveURL(/.transfer.htm/);

  await page.locator('input[type="text"]').fill(amount);
  await page.locator('select#fromAccountId').selectOption(fromAccount);
  await page.locator('select#toAccountId').selectOption(toAccount);

  await page.getByRole('button', { name: 'TRANSFER' }).click();
}

test('Transferência bancária com sucesso', async ({ page }) => {
  await login(page);
  // IMPORTANT: Replace 'fromAccountID' and 'toAccountId' below with your own account numbers

  await makeTransfer(page, 'fromAccountID', 'toAccountId', '100');

  await expect(page.getByText('Transfer Complete!')).toBeVisible();
});
```

### Postman Example

Test API transfer and validate balances:

**Request:**

> **Note:** Replace `fromAccountId` and `toAccountId` below with your own account numbers obtained after registering and creating accounts in Parabank. These values change daily.

```http
POST {{baseUrl}}/transfer?fromAccountId=yourFromAccountId&toAccountId=yourToAccountId&amount=100
```

**Test Script:**

```javascript
pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});
pm.test('Transaction successful', function () {
  pm.expect(pm.response.text().toLowerCase()).to.include('success');
});
```

**Balance Validation:**

```javascript
var jsonData = xml2Json(responseBody);
var balanceAfter = parseFloat(jsonData.account.balance);
var balanceBefore = parseFloat(pm.globals.get('your_account_balance'));
pm.test('Source account balance decreased', function () {
  pm.expect(balanceAfter).to.be.below(balanceBefore);
});
```

### SQL Example

> **Note:**
>
> The SQL queries included in this project were sourced and adapted from [SQLZoo](https://sqlzoo.net/wiki/SELECT_basics), an educational website for learning and practicing SQL. You can use SQLZoo to explore the database structure, run these queries, and experiment with different SQL techniques. This approach helps reinforce SQL concepts and provides a hands-on environment for testing and learning.

Validate per capita GDP and rank countries:

```sql
-- Top 10 countries by per capita GDP
SELECT TOP 10 name, ROUND(gdp/population,2) AS per_capita_gdp
FROM world
ORDER BY per_capita_gdp DESC;

-- Top 15 countries by GDP
SELECT TOP 15 name, ROUND(gdp/1000000000, 2) AS gdp_in_billion
FROM world
ORDER BY gdp DESC;
```

---

## How to Run

1. **Install dependencies**:

```bash
npm install
```

2. **Run Cypress tests**:

```bash
npx cypress open
```

3. **Run Playwright tests**:

```bash
npx playwright test
```

4. **API tests**:
   Import the Postman collection and environment, then run tests in Postman.

5. **SQL tests**:
   Run the queries in your database to validate financial data integrity.

6. **Manual tests**:
   Follow instructions in `tests/manual/parabank_manual_tests.ipynb`.

---

## Contribution

Feel free to contribute with improvements, new tests, or suggestions.

---

## License

This project is licensed under the [MIT License](LICENSE).
