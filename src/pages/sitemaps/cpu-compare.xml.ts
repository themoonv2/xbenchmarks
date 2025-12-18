import { getCPUComparisons } from '../../utils/comparison-utils';

export const prerender = true;

export async function GET() {
  const baseUrl = 'https://benchmarks.thelaptops.shop';
  const comparisons = getCPUComparisons();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${comparisons.map(comp => `
  <url>
    <loc>${baseUrl}/compare/cpu/${comp.id}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800'
    }
  });
}
