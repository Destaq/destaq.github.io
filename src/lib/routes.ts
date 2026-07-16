import { legacyRedirects } from "../data/redirects";
import { postIndex } from "../data/posts";
import { workEntries } from "../data/work";

export type LegacyRedirect = (typeof legacyRedirects)[number];
export type PostIndexItem = (typeof postIndex)[number];
export type WorkEntry = (typeof workEntries)[number];

export const getWritingHref = (slug: string) => `/writing/${slug}/`;

export const getWorkHref = (slug: string) => `/work/${slug}/`;

export const getPostByLegacyPath = (legacyPath: string) =>
  postIndex.find((post) => post.legacyUrl === legacyPath);

export const getRedirectTarget = (legacyPath: string) =>
  legacyRedirects.find((redirect) => redirect.from === legacyPath)?.to;

export const workListItems = workEntries.map((entry) => ({
  href: entry.href,
  title: entry.title,
  summary: entry.summary,
  year: entry.year ?? undefined,
  role: entry.role,
  tags: [...entry.tags]
}));
