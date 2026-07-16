import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const manifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "tests", "legacy-route-manifest.json"), "utf8")
);

const visualRoutes = manifest.routes
  .filter((route) => route.critical && route.type !== "asset")
  .map((route) => route.targetPath);

test.describe("responsive visual smoke audit", () => {
  for (const routePath of visualRoutes) {
    test(`${routePath} has stable desktop/mobile layout`, async ({ page }, testInfo) => {
      const consoleErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error" && !message.text().includes("compute-pressure is not allowed")) {
          consoleErrors.push(message.text());
        }
      });

      const response = await page.goto(routePath, { waitUntil: "networkidle" });
      expect(response, `${routePath} should return a response`).not.toBeNull();
      expect(response.status(), `${routePath} should not 404`).toBeLessThan(400);

      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("main").first()).toBeVisible();

      const layout = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const images = Array.from(document.images);
        const brokenImages = images
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src || image.alt || "unknown image");

        return {
          title: document.title,
          scrollWidth: Math.max(doc.scrollWidth, body?.scrollWidth || 0),
          clientWidth: doc.clientWidth,
          bodyTextLength: body?.innerText.trim().length || 0,
          brokenImages
        };
      });

      expect(layout.title, `${routePath} should set a document title`).not.toEqual("");
      expect(layout.bodyTextLength, `${routePath} should render meaningful text`).toBeGreaterThan(80);
      expect(layout.scrollWidth, `${routePath} should not horizontally overflow`).toBeLessThanOrEqual(
        layout.clientWidth + 2
      );
      expect(layout.brokenImages, `${routePath} should not render broken images`).toEqual([]);
      expect(consoleErrors, `${routePath} should not log console errors`).toEqual([]);

      await testInfo.attach(`visual-${testInfo.project.name}-${routePath.replace(/\W+/g, "-")}.png`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png"
      });
    });
  }
});
