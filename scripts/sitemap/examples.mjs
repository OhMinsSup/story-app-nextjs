import fs from 'fs';
import axios from 'axios';

export async function buildSitemapForExamples({
  siteUrl,
  apiHost,
  formatted,
  time,
}) {
  const result = await axios(apiHost)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const list = [];
  result.forEach((post) => list.push(post.id));

  const sitemap = `
    ${list
      .map((id) => {
        return `
          <url>
            <loc>${`${siteUrl}/example/${id}`}</loc>
            <lastmod>${time}</lastmod>
          </url>`;
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
      ${sitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    './public/sitemap/sitemap-examples.xml',
    formattedSitemap,
    'utf8',
  );
}
