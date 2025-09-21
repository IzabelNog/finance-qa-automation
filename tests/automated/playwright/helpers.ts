import { Page } from '@playwright/test';
// You must register on the site every day, as users are reset daily
export async function login(
  page: Page,
  username = 'your_testuser',
  password = 'your_password'
) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.getByRole('button', { name: 'Log In' }).click();
  // Ensures login was successful
  await page.getByRole('link', { name: 'Log Out' }).waitFor();
}
