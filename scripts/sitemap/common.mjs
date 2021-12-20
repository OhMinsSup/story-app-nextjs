import fs from 'fs';
import { globby } from 'globby';

export async function buildSitemapForCommon({ siteUrl, formatted, time }) {
  const pages = await globby([
    // include
    '../pages/**/*.tsx',
    '../pages/*.tsx',
    // exclude
    '!../pages/_*.tsx',
  ]);

  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace('../pages/', '')
          .replace('.tsx', '')
          .replace(/\/index/g, '');
        const routePath = path === 'index' ? '' : path;
        return `
          <url>
            <loc>${siteUrl}/${routePath}</loc>
            <lastmod>${time}</lastmod>
          </url>
        `;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
    <url>
      <loc>${siteUrl}</loc>
        <lastmod>${time}</lastmod>
      </url>
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    './public/sitemap/sitemap-common.xml',
    formattedSitemap,
    'utf8',
  );

  return true;
}
