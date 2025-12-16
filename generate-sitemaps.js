import fs from 'fs';
import path from 'path';
import { readFileSync } from 'fs';

const cpusData = JSON.parse(readFileSync('./src/data/cpus.json', 'utf8'));
const gpusData = JSON.parse(readFileSync('./src/data/gpus.json', 'utf8'));
const laptopsData = JSON.parse(readFileSync('./src/data/laptops.json', 'utf8'));

const baseUrl = 'https://benchmarks.thelaptops.shop';
const publicDir = './public/sitemaps';

// Ensure directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const today = new Date().toISOString().split('T')[0];

// Helper to generate sitemap XML
function generateSitemapXml(urls) {
  const urlEntries = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// 1. CPU Brands Sitemap
const cpuBrands = [...new Set(cpusData.map(cpu => cpu.slug.split('-')[0]))];
const cpuBrandsUrls = cpuBrands.map(brand => ({
  loc: `${baseUrl}/cpus/${brand}/`,
  lastmod: today,
  changefreq: 'weekly',
  priority: '0.7'
}));
fs.writeFileSync(path.join(publicDir, 'cpu-brands-sitemap.xml'), generateSitemapXml(cpuBrandsUrls));
console.log('✓ cpu-brands-sitemap.xml created');

// 2. CPU Series Sitemap
const cpuSeries = [...new Set(cpusData.map(cpu => {
  const parts = cpu.slug.split('-');
  return `${parts[0]}-${parts[1]}`;
}))];
const cpuSeriesUrls = cpuSeries.map(serie => {
  const parts = serie.split('-');
  return {
    loc: `${baseUrl}/cpus/${parts[0]}/${parts[1]}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.7'
  };
});
fs.writeFileSync(path.join(publicDir, 'cpu-series-sitemap.xml'), generateSitemapXml(cpuSeriesUrls));
console.log('✓ cpu-series-sitemap.xml created');

// 3. CPU Models Sitemap
const cpuModelsUrls = cpusData.map(cpu => ({
  loc: `${baseUrl}/cpus/${cpu.slug.split('-')[0]}/${cpu.slug.split('-')[1]}/${cpu.slug}/`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.8'
}));
fs.writeFileSync(path.join(publicDir, 'cpu-models-sitemap.xml'), generateSitemapXml(cpuModelsUrls));
console.log('✓ cpu-models-sitemap.xml created');

// 4. GPU Brands Sitemap
const gpuBrands = [...new Set(gpusData.map(gpu => gpu.slug.split('-')[0]))];
const gpuBrandsUrls = gpuBrands.map(brand => ({
  loc: `${baseUrl}/gpus/${brand}/`,
  lastmod: today,
  changefreq: 'weekly',
  priority: '0.7'
}));
fs.writeFileSync(path.join(publicDir, 'gpu-brands-sitemap.xml'), generateSitemapXml(gpuBrandsUrls));
console.log('✓ gpu-brands-sitemap.xml created');

// 5. GPU Series Sitemap
const gpuSeries = [...new Set(gpusData.map(gpu => {
  const parts = gpu.slug.split('-');
  return `${parts[0]}-${parts[1]}`;
}))];
const gpuSeriesUrls = gpuSeries.map(serie => {
  const parts = serie.split('-');
  return {
    loc: `${baseUrl}/gpus/${parts[0]}/${parts[1]}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.7'
  };
});
fs.writeFileSync(path.join(publicDir, 'gpu-series-sitemap.xml'), generateSitemapXml(gpuSeriesUrls));
console.log('✓ gpu-series-sitemap.xml created');

// 6. GPU Models Sitemap
const gpuModelsUrls = gpusData.map(gpu => ({
  loc: `${baseUrl}/gpus/${gpu.slug.split('-')[0]}/${gpu.slug.split('-')[1]}/${gpu.slug}/`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.8'
}));
fs.writeFileSync(path.join(publicDir, 'gpu-models-sitemap.xml'), generateSitemapXml(gpuModelsUrls));
console.log('✓ gpu-models-sitemap.xml created');

// 7. Laptops Brands Sitemap
const laptopBrands = [...new Set(laptopsData.map(laptop => laptop.slug.split('-')[0]))];
const laptopBrandsUrls = laptopBrands.map(brand => ({
  loc: `${baseUrl}/laptop-brands/${brand}/`,
  lastmod: today,
  changefreq: 'weekly',
  priority: '0.7'
}));
fs.writeFileSync(path.join(publicDir, 'laptops-brands-sitemap.xml'), generateSitemapXml(laptopBrandsUrls));
console.log('✓ laptops-brands-sitemap.xml created');

// 8. Laptops Series Sitemap
const laptopSeries = [...new Set(laptopsData.map(laptop => {
  const parts = laptop.slug.split('-');
  return `${parts[0]}-${parts[1]}`;
}))];
const laptopSeriesUrls = laptopSeries.map(serie => {
  const parts = serie.split('-');
  return {
    loc: `${baseUrl}/laptop-brands/${parts[0]}/${parts[1]}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.7'
  };
});
fs.writeFileSync(path.join(publicDir, 'laptops-series-sitemap.xml'), generateSitemapXml(laptopSeriesUrls));
console.log('✓ laptops-series-sitemap.xml created');

// 9. Laptops Models Sitemap
const laptopModelsUrls = laptopsData.map(laptop => ({
  loc: `${baseUrl}/laptop-brands/${laptop.slug.split('-')[0]}/${laptop.slug.split('-')[1]}/${laptop.slug}/`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.8'
}));
fs.writeFileSync(path.join(publicDir, 'laptops-models-sitemap.xml'), generateSitemapXml(laptopModelsUrls));
console.log('✓ laptops-models-sitemap.xml created');

// 10. CPU Comparisons Sitemap
// Using seeded random function for consistent comparisons
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

function generateRandomComparisons(items, count = 500) {
  const comparisons = [];
  const seen = new Set();
  const rng = new SeededRandom(12345);

  while (comparisons.length < count && comparisons.length < items.length * (items.length - 1) / 2) {
    const idx1 = Math.floor(rng.next() * items.length);
    let idx2 = Math.floor(rng.next() * items.length);

    while (idx2 === idx1) {
      idx2 = Math.floor(rng.next() * items.length);
    }

    const key = [idx1, idx2].sort().join('-');
    
    if (!seen.has(key)) {
      seen.add(key);
      const item1 = items[idx1];
      const item2 = items[idx2];
      comparisons.push({
        id: `${item1.slug}-vs-${item2.slug}`
      });
    }
  }

  return comparisons.slice(0, count);
}

const cpuComparisons = generateRandomComparisons(cpusData, 500);
const cpuComparisonUrls = cpuComparisons.map(comp => ({
  loc: `${baseUrl}/compare/cpu/${comp.id}/`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.6'
}));
fs.writeFileSync(path.join(publicDir, 'cpu-compare.xml'), generateSitemapXml(cpuComparisonUrls));
console.log('✓ cpu-compare.xml created');

// 11. GPU Comparisons Sitemap
const gpuComparisons = generateRandomComparisons(gpusData, 500);
const gpuComparisonUrls = gpuComparisons.map(comp => ({
  loc: `${baseUrl}/compare/gpu/${comp.id}/`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.6'
}));
fs.writeFileSync(path.join(publicDir, 'gpu-compare.xml'), generateSitemapXml(gpuComparisonUrls));
console.log('✓ gpu-compare.xml created');

// 12. Laptops Comparisons Sitemap
const laptopComparisons = generateRandomComparisons(laptopsData, 500);
const laptopComparisonUrls = laptopComparisons.map(comp => ({
  loc: `${baseUrl}/compare/laptop/${comp.id}/`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.6'
}));
fs.writeFileSync(path.join(publicDir, 'laptops-compare.xml'), generateSitemapXml(laptopComparisonUrls));
console.log('✓ laptops-compare.xml created');

console.log('\n✅ All sitemaps generated successfully!');
console.log(`Total URLs across all sitemaps: ${
  cpuBrandsUrls.length + cpuSeriesUrls.length + cpuModelsUrls.length +
  gpuBrandsUrls.length + gpuSeriesUrls.length + gpuModelsUrls.length +
  laptopBrandsUrls.length + laptopSeriesUrls.length + laptopModelsUrls.length +
  cpuComparisonUrls.length + gpuComparisonUrls.length + laptopComparisonUrls.length
}`);
