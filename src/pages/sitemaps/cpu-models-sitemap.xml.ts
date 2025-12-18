import cpusData from '../../data/cpus.json';

export const prerender = true;

export async function GET() {
  const baseUrl = 'https://benchmarks.thelaptops.shop';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${cpusData.map(cpu => `
  <url>
    <loc>${baseUrl}/cpus/${cpu.slug.split('-')[0]}/${cpu.slug.split('-')[1]}/${cpu.slug}/</loc>
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
