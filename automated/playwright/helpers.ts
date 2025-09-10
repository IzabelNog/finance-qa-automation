import { Page } from '@playwright/test';
//É necessario fazer registro no site todos os dias, pois os usuarios sao resetados
export async function login(
  page: Page,
  username = 'usertest',
  password = 'password'
) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.getByRole('button', { name: 'Log In' }).click();
  // Garante que login foi feito
  await page.getByRole('link', { name: 'Log Out' }).waitFor();
}
