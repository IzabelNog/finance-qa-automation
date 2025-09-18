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
  await makeTransfer(page, '17007', '17229', '100');

  await expect(page.getByText('Transfer Complete!')).toBeVisible();
});
