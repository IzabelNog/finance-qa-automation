const { test, expect } = require('@playwright/test');

test('Login no ParaBank com sucesso', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await page.fill('input[name="username"]', 'userteste');
  await page.fill('input[name="password"]', 'password');

  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('text=Log Out')).toBeVisible();
});

test('Falha no login com credenciais inválidas', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', 'usuario_invalido');
  await page.fill('input[name="password"]', 'senha_errada');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(
    page.locator('text=The username and password could not be verified.')
  ).toBeVisible();
});
