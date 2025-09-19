import { test, expect } from "@playwright/test";

test.describe("Sign In Page", () => {
  test.describe("English (Default)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/sign-in");
    });

    test("should display sign in form elements", async ({ page }) => {
      await expect(page.getByRole("heading", { name: /welcome back 👋/i })).toBeVisible();
      await expect(page.getByText(/sign in to connect, learn, and grow together./i)).toBeVisible();

      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

      const forgotPasswordLink = page.getByRole("link", { name: /forgot password\?/i });
      await expect(forgotPasswordLink).toBeVisible();
      await expect(forgotPasswordLink).toHaveAttribute("href", "/en/forgot-password/");

      const signUpLink = page.getByRole("link", { name: /sign up/i });
      await expect(signUpLink).toBeVisible();
      await expect(signUpLink).toHaveAttribute("href", "/en/sign-up/");
    });
  });
});
