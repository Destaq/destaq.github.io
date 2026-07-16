import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "@lib/site";

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection("writing", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: `${site.name} Writing`,
    description: site.description,
    site: context.site ?? new URL(site.url),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/writing/${post.id.replace(/\.(md|mdx)$/i, "")}/`
    }))
  });
}
