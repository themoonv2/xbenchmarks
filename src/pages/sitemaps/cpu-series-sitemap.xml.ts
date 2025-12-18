import cpusData from '../../data/cpus.json';

export const prerender = true;

export async function GET() {
  const baseUrl = 'https://benchmarks.thelaptops.shop';
  
  // Get unique series (brand-series combinations)
  const series = [...new Set(cpusData.map(cpu => {
    const parts = cpu.slug.split('-');
    return `${parts[0]}-${parts[1]}`;
  }))];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${series.map(serie => {
    const parts = serie.split('-');
    return `
  <url>
    <loc>${baseUrl}/cpus/${parts[0]}/${parts[1]}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=604800'
    }
  });
}
