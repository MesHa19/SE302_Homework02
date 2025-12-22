import { Page, Locator } from '@playwright/test';

export class SweetShopPage {
  readonly page: Page;
  readonly loginNav: Locator;
  readonly sweetsNav: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly firstSweetAddBtn: Locator;
  readonly basketBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginNav = page.locator('a[href="/login"]').first();
    this.sweetsNav = page.locator('a[href="/sweets"]').first();
    this.emailInput = page.locator('#exampleInputEmail'); 
    this.passwordInput = page.locator('#exampleInputPassword');
    this.loginButton = page.locator('button:has-text("Login")');
    // More robust selector for the specific "Add to Cart" link
    this.firstSweetAddBtn = page.locator('a[data-id="1"]').first(); 
    this.basketBadge = page.locator('span.badge-success');
  }

  async goto() {
    await this.page.goto('https://sweetshop.netlify.app/');
  }

  async navigateToSweets() {
    await this.sweetsNav.click();
    // Wait for the URL to change to ensure we are on the product page
    await this.page.waitForURL('**/sweets');
  }
}