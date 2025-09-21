const { test, expect } = require('@playwright/test');

test('Successful login to ParaBank', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await page.fill('input[name="username"]', 'your_testuser');
  await page.fill('input[name="password"]', 'your_password');

  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('text=Log Out')).toBeVisible();
});

test('Login failure with invalid credentials', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', 'invalid_user');
  await page.fill('input[name="password"]', 'wrong_password');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(
    page.locator('text=The username and password could not be verified.')
  ).toBeVisible();
});
