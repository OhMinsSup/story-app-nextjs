import fs from 'fs';
import { globby } from 'globby';

export async function buildSitemapForIndex({ siteUrl, formatted, time }) {
  const pages = await globby(['./public/sitemap/*.gz']);

  const sitemapIndex = `
    ${pages
      .map((page) => {
        const path = page.replace('./public/', '');
        return `
          <sitemap>
            <loc>${`${siteUrl}/${path}`}</loc>
            <lastmod>${time}</lastmod>
          </sitemap>`;
      })
      .join('')}
  `;

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

  const formattedSitemap = formatted(sitemap);

  fs.writeFileSync('./public/sitemap.xml', formattedSitemap, 'utf8');
}
