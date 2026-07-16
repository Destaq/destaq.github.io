import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const manifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "tests", "legacy-route-manifest.json"), "utf8")
);

const linkAuditRoutes = manifest.routes
  .filter((route) => route.critical && route.type !== "asset")
  .map((route) => route.targetPath);

test.describe("internal link audit", () => {
  for (const routePath of linkAuditRoutes) {
    test(`${routePath} links resolve`, async ({ page, request, baseURL }) => {
      await page.goto(routePath, { waitUntil: "domcontentloaded" });

      const hrefs = await page.$$eval("a[href]", (anchors) =>
        Array.from(
          new Set(
            anchors
              .map((anchor) => anchor.getAttribute("href"))
              .filter(Boolean)
              .filter((href) => {
                if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
                  return false;
                }
                try {
                  const url = new URL(href, window.location.href);
                  return url.origin === window.location.origin;
                } catch {
                  return false;
                }
              })
              .map((href) => new URL(href, window.location.href).pathname)
          )
        ).slice(0, 40)
      );

      for (const href of hrefs) {
        const response = await request.get(new URL(href, baseURL).toString(), { maxRedirects: 2 });
        expect(response.status(), `${routePath} links to unavailable ${href}`).toBeLessThan(400);
      }
    });
  }
});
