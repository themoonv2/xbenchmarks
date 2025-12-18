import gpusData from '../../data/gpus.json';

export const prerender = true;

export async function GET() {
  const baseUrl = 'https://benchmarks.thelaptops.shop';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${gpusData.map(gpu => `
  <url>
    <loc>${baseUrl}/gpus/${gpu.slug.split('-')[0]}/${gpu.slug.split('-')[1]}/${gpu.slug}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800'
    }
  });
}
