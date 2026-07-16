import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const manifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "tests", "legacy-route-manifest.json"), "utf8")
);

const keyRoutes = manifest.routes.filter((route) => route.critical);

test.describe("legacy route parity", () => {
  for (const route of keyRoutes) {
    test(`${route.legacyPath} serves`, async ({ page, baseURL }) => {
      const response = await page.goto(route.legacyPath, { waitUntil: "domcontentloaded" });
      expect(response, `${route.legacyPath} should return a response`).not.toBeNull();
      expect(response.status(), `${route.legacyPath} should not 404`).toBeLessThan(400);

      if (route.type !== "asset") {
        await expect(page.locator("body")).toBeVisible();
        await expect(page.locator("body")).not.toHaveText(/404|not found/i);
        expect(page.url()).toMatch(new RegExp(`^${baseURL?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") || "https?://[^/]+"}`));
      }
    });
  }
});
