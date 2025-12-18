import gpusData from '../../data/gpus.json';

export const prerender = true;

export async function GET() {
  const baseUrl = 'https://benchmarks.thelaptops.shop';
  
  // Get unique brands
  const brands = [...new Set(gpusData.map(gpu => gpu.slug.split('-')[0]))];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${brands.map(brand => `
  <url>
    <loc>${baseUrl}/gpus/${brand}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800'
    }
  });
}
