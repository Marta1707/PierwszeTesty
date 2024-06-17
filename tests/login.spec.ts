import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

  test('successful login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  //await page.getByTestId('login-input').click(); ta linia nie jest potrzebna
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('password-input').fill('12345678');
  await page.getByTestId('login-button').click();
  //await page.getByTestId('user-name').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
}); 
  test('unsuccessful login with with too short username', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  //await page.getByTestId('login-input').click(); niepotrzebne
  await page.getByTestId('login-input').fill('tester');
  await page.getByTestId('password-input').click();
  await page.getByTestId('error-login-id').click();

  await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
});

test('unsuccessful login with with too short password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  //await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerLO');
  //await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('1234');
  //await page.locator('#login_password_container label').click(); wyrzucamy ta lininke poniewaz to jest tylko odkliknięcie i nie zawsze moze działać bo np cos sie zmieni na stronie, dlatego w razie takich zmian zabiezpieczymy to blurem(utrata fokusu)
  await page.getByTestId('password-input').blur();

  await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
});




})