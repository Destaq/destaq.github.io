import { expect, test } from "@playwright/test";

test.describe("theme switcher and touch targets", () => {
  test("theme toggle changes, persists, and updates browser theme color", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const html = page.locator("html");
    const toggle = page.locator("[data-theme-toggle]");
    await expect(toggle).toBeVisible();

    const initialTheme = await html.getAttribute("data-theme");
    expect(["paper", "dusk"]).toContain(initialTheme);

    await toggle.click();
    const nextTheme = await html.getAttribute("data-theme");
    expect(["paper", "dusk"]).toContain(nextTheme);
    expect(nextTheme).not.toEqual(initialTheme);

    await expect(toggle).toHaveAttribute("aria-pressed", nextTheme === "dusk" ? "true" : "false");
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute("content");
    expect(themeColor).toBe(nextTheme === "dusk" ? "#181818" : "#fbfaf7");

    await page.reload({ waitUntil: "networkidle" });
    await expect(html).toHaveAttribute("data-theme", nextTheme);
  });

  for (const routePath of ["/", "/work/", "/writing/", "/resume/", "/contact/"]) {
    test(`${routePath} primary controls meet minimum touch target size`, async ({ page }) => {
      await page.goto(routePath, { waitUntil: "networkidle" });
      const mobileMenu = page.locator("[data-site-menu] summary");
      if (await mobileMenu.isVisible()) {
        await mobileMenu.click();
      }
      const failures = await page.evaluate(() => {
        const selectors = [
          ".site-header__link",
          "[data-theme-toggle]",
          ".home-rail summary",
          ".article-toc__drawer summary",
          ".home-current a",
          ".section-link a",
          ".action-row a",
          ".detail-links a",
          ".taxonomy-strip a",
          ".site-footer__link",
          ".redirect-notice__action"
        ];

        return Array.from(document.querySelectorAll(selectors.join(",")))
          .filter((element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              label: element.textContent?.trim() || element.getAttribute("aria-label") || element.tagName,
              width: rect.width,
              height: rect.height
            };
          })
          .filter((target) => target.width < 24 || target.height < 24);
      });

      expect(failures).toEqual([]);
    });
  }
});
