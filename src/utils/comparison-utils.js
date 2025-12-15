import cpusData from '../data/cpus.json';
import gpusData from '../data/gpus.json';
import laptopsData from '../data/laptops.json';

/**
 * Seeded random number generator for deterministic results
 */
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}

/**
 * Generate random comparison pairs with seeded randomness
 * @param {Array} items - Array of items to compare
 * @param {number} count - Number of comparisons to generate
 * @returns {Array} Array of comparison pairs
 */
export function generateRandomComparisons(items, count = 500) {
    const comparisons = [];
    const seen = new Set();
    
    // Use a fixed seed so comparisons are deterministic
    const rng = new SeededRandom(12345);

    while (comparisons.length < count && comparisons.length < items.length * (items.length - 1) / 2) {
        const idx1 = Math.floor(rng.next() * items.length);
        let idx2 = Math.floor(rng.next() * items.length);

        // Ensure different items
        while (idx2 === idx1) {
            idx2 = Math.floor(rng.next() * items.length);
        }

        // Create a normalized key to avoid duplicates
        const key = [idx1, idx2].sort().join('-');
        
        if (!seen.has(key)) {
            seen.add(key);
            const item1 = items[idx1];
            const item2 = items[idx2];
            comparisons.push({
                model1: item1,
                model2: item2,
                slug1: item1.slug,
                slug2: item2.slug,
                id: `${item1.slug}-vs-${item2.slug}`
            });
        }
    }

    return comparisons.slice(0, count);
}

/**
 * Get CPU comparisons
 */
export function getCPUComparisons() {
    return generateRandomComparisons(cpusData, 500);
}

/**
 * Get GPU comparisons
 */
export function getGPUComparisons() {
    return generateRandomComparisons(gpusData, 500);
}

/**
 * Get Laptop comparisons
 */
export function getLaptopComparisons() {
    return generateRandomComparisons(laptopsData, 500);
}

/**
 * Find a single item by slug
 */
export function findItemBySlug(slug, dataSource) {
    return dataSource.find(item => item.slug === slug);
}

/**
 * Determine the winner of a spec comparison
 * Returns: 1 (model1 wins), 2 (model2 wins), 0 (tie)
 */
export function determineWinner(value1, value2, metric) {
    if (!value1 || !value2) return 0;
    
    const isHigherBetter = [
        'gaming', 'workstation', 'ai/ml', 'score', 'fps', 'tflops', 'clock',
        'cores', 'threads', 'memory', 'bandwidth', 'cache', 'compute'
    ].some(term => metric.toLowerCase().includes(term));

    const isLowerBetter = [
        'power', 'tgp', 'tdp', 'weight', 'thermal', 'temp', 'temperature', 'price'
    ].some(term => metric.toLowerCase().includes(term));

    const num1 = parseFloat(value1.toString().replace(/[^0-9.-]/g, ''));
    const num2 = parseFloat(value2.toString().replace(/[^0-9.-]/g, ''));

    if (isNaN(num1) || isNaN(num2)) return 0;

    if (isHigherBetter) {
        if (num1 > num2) return 1;
        if (num1 < num2) return 2;
    } else if (isLowerBetter) {
        if (num1 < num2) return 1;
        if (num1 > num2) return 2;
    }

    return 0;
}

/**
 * Extract numeric value from spec string
 */
export function extractNumericValue(value) {
    if (!value) return null;
    const match = value.toString().match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[0]) : null;
}

/**
 * Format spec value for display
 */
export function formatSpecValue(value) {
    if (!value) return 'N/A';
    return value.toString();
}

/**
 * Get score category color
 */
export function getScoreCategoryColor(category) {
    const colors = {
        'Gaming': '#ff6b6b',
        'Workstation': '#4ecdc4',
        'AI/ML': '#45b7d1',
        'Energy Efficiency': '#96ceb4',
        'NanoReview Final Score': '#ffeaa7'
    };
    return colors[category] || '#cccccc';
}

/**
 * Get winner class for styling
 */
export function getWinnerClass(winner) {
    if (winner === 1) return 'winner-left';
    if (winner === 2) return 'winner-right';
    return 'winner-tie';
}

/**
 * Get image URL with BASE_URL prefix
 */
export function getImageUrl(imagePath, baseUrl = '') {
    if (!imagePath) return '/images/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return baseUrl + imagePath;
    return baseUrl + '/' + imagePath;
}
