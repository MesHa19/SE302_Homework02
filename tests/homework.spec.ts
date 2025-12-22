import { test, expect } from '@playwright/test';
import { SweetShopPage } from '../pages/SweetShopPage';

test.describe('SE302 Homework 02 - Web Automation', () => {
  let shop: SweetShopPage;

  test.beforeEach(async ({ page }) => {
    shop = new SweetShopPage(page);
    await shop.goto();
  });

  test('TC 04: Verify navigation menu functionality', async ({ page }) => {
    await shop.loginNav.click();
    await expect(page).toHaveURL(/.*login/); 
  });

 test('TC 01: Verify login with invalid password', async () => {
    await shop.loginNav.click();
    await shop.emailInput.fill('test@example.com');
    await shop.passwordInput.fill('wrongpassword');
    await shop.loginButton.click();
    
    // The site redirects to a Netlify error page on failure.
    // We check that the URL is NOT the home page/dashboard to confirm rejection.
    await expect(shop.page).not.toHaveURL('https://sweetshop.netlify.app/'); 
  });

  test('TC 02: Add product to cart', async () => {
    await shop.navigateToSweets(); // Go to the sweets page first
    await shop.firstSweetAddBtn.click();
    await expect(shop.basketBadge).toHaveText('1', { timeout: 10000 }); 
  });

  test('TC 07: Login with invalid email format', async () => {
    await shop.loginNav.click();
    await shop.emailInput.fill('testemail.com'); 
    await shop.passwordInput.fill('password123');
    await shop.loginButton.click();
    const isValid = await shop.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test('TC 08: Cart persistence during navigation', async ({ page }) => {
    await shop.navigateToSweets();
    await shop.firstSweetAddBtn.click();
    await expect(shop.basketBadge).toHaveText('1');
    
    // Navigate away and check if it stays
    await page.goto('https://sweetshop.netlify.app/about');
    await expect(shop.basketBadge).toHaveText('1'); 
  });
});