import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const dist = path.join(process.cwd(), "dist");
const fallbackRoutes = ["/", "/work/", "/writing/", "/photos/", "/about/", "/resume/", "/contact/", "/404.html"];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry);
    return fs.statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function routeFromHtml(filePath) {
  const rel = path.relative(dist, filePath);
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404.html";
  return `/${rel.replace(/index\.html$/, "").replace(/\\/g, "/")}`;
}

const currentRoutes = (fs.existsSync(dist)
  ? walk(dist)
      .filter((file) => file.endsWith(".html"))
      .map(routeFromHtml)
      .filter((route) =>
        route === "/" ||
        route === "/404.html" ||
        ["/work/", "/writing/", "/photos/", "/about/", "/resume/", "/contact/"].includes(route) ||
        route.startsWith("/work/") ||
        route.startsWith("/writing/")
      )
  : fallbackRoutes
).sort((a, b) => a.localeCompare(b));

test.describe("comprehensive current page audit", () => {
  test.describe.configure({ mode: "parallel" });

  for (const routePath of currentRoutes) {
    test(`${routePath} renders refined responsive layout`, async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (message) => {
        const text = message.text();
        const expected404Log =
          routePath === "/404.html" && text.includes("server responded with a status of 404");
        const externalResourceAbort =
          text.includes("net::ERR_NETWORK_IO_SUSPENDED") || text.includes("net::ERR_SOCKET_NOT_CONNECTED");
        if (
          message.type() === "error" &&
          !message.text().includes("compute-pressure is not allowed") &&
          !expected404Log &&
          !externalResourceAbort
        ) {
          consoleErrors.push(message.text());
        }
      });

      const response = await page.goto(routePath, { waitUntil: "networkidle" });
      expect(response, `${routePath} should respond`).not.toBeNull();
      if (routePath === "/404.html") {
        expect(response.status(), `${routePath} should return the intentional 404 status`).toBe(404);
      } else {
        expect(response.status(), `${routePath} should not 404`).toBeLessThan(400);
      }

      const audit = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const viewportWidth = doc.clientWidth;
        const textSelector = [
          "main h1",
          "main h2",
          "main h3",
          "main p",
          "main a",
          "main li",
          "main dt",
          "main dd",
          "main summary",
          "footer a",
          "footer p",
          "button",
        ].join(",");

        const visible = (element) => {
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
        };

        const textElements = Array.from(document.querySelectorAll(textSelector)).filter((element) => {
          if (!visible(element)) return false;
          if (element.closest(".skip-link")) return false;
          if (viewportWidth < 768 && element.closest(".photo-rail")) return false;
          return true;
        });

        const rectsFor = (element) => {
          const rects = Array.from(element.getClientRects()).filter((rect) => rect.width > 0 && rect.height > 0);
          return rects.length > 0 ? rects : [element.getBoundingClientRect()];
        };

        const outOfBoundsText = textElements
          .flatMap((element) =>
            rectsFor(element).map((rect) => ({
              label: element.textContent?.trim().slice(0, 80) || element.tagName,
              left: rect.left,
              right: rect.right,
            }))
          )
          .filter((item) => item.left < -2 || item.right > viewportWidth + 2);

        const rectsOverlap = (firstRects, secondRects) => {
          for (const aRect of firstRects) {
            for (const bRect of secondRects) {
              const xOverlap = Math.max(0, Math.min(aRect.right, bRect.right) - Math.max(aRect.left, bRect.left));
              const yOverlap = Math.max(0, Math.min(aRect.bottom, bRect.bottom) - Math.max(aRect.top, bRect.top));
              if (xOverlap * yOverlap > 12) return xOverlap * yOverlap;
            }
          }
          return 0;
        };

        const overlapIssues = [];
        for (let index = 0; index < textElements.length; index += 1) {
          const a = textElements[index];
          const aRects = rectsFor(a);
          for (let next = index + 1; next < textElements.length; next += 1) {
            const b = textElements[next];
            if (a.contains(b) || b.contains(a)) continue;
            const overlapArea = rectsOverlap(aRects, rectsFor(b));
            if (overlapArea > 12) {
              overlapIssues.push({
                first: a.textContent?.trim().slice(0, 48) || a.tagName,
                second: b.textContent?.trim().slice(0, 48) || b.tagName,
                overlapArea,
              });
            }
          }
        }

        const brokenImages = Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src || image.alt || "unknown image");

        return {
          title: document.title,
          bodyTextLength: body?.innerText.trim().length || 0,
          scrollWidth: Math.max(doc.scrollWidth, body?.scrollWidth || 0),
          clientWidth: viewportWidth,
          brokenImages,
          outOfBoundsText,
          overlapIssues: overlapIssues.slice(0, 5),
        };
      });

      expect(audit.title, `${routePath} should have a title`).not.toEqual("");
      expect(audit.bodyTextLength, `${routePath} should have meaningful copy`).toBeGreaterThan(80);
      expect(audit.scrollWidth, `${routePath} should not horizontally scroll`).toBeLessThanOrEqual(
        audit.clientWidth + 2
      );
      expect(audit.brokenImages, `${routePath} should not have broken images`).toEqual([]);
      expect(audit.outOfBoundsText, `${routePath} should keep text inside viewport`).toEqual([]);
      expect(audit.overlapIssues, `${routePath} should not have obvious text overlap`).toEqual([]);
      expect(consoleErrors, `${routePath} should not log console errors`).toEqual([]);
    });
  }
});
