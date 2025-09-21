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

test('Successful bank transfer', async ({ page }) => {
  await login(page);
  // IMPORTANT: Replace 'fromAccountID' and 'toAccountId' below with your own account numbers
  // obtained after registering and creating accounts in Parabank. These values change daily.
  // Example:
  // await makeTransfer(page, '12345', '67890', '100');
  await makeTransfer(page, 'fromAccountID', 'toAccountId', '100');

  await expect(page.getByText('Transfer Complete!')).toBeVisible();
});
