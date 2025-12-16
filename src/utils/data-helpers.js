export function getBrand(name) {
    if (!name) return 'Unknown';
    // Simple heuristic: First word is the brand.
    // Adjust specific cases if needed (e.g. "MSI", "HP", "LG" are single words, works fine)
    return name.split(' ')[0];
}

export function getSeries(name) {
    if (!name) return 'Other';
    const parts = name.split(' ');
    // Heuristic: Second word is often the series (e.g. "Lenovo ThinkPad", "HP Pavilion")
    // But sometimes it's longer.
    if (parts.length >= 2) {
        return parts[1];
    }
    return 'Other';
}

export function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export function getImageUrl(imagePath, baseUrl = '') {
    if (!imagePath) return '/images/placeholder.png';
    // If it's already an absolute URL, return as-is
    if (imagePath.startsWith('http')) return imagePath;
    // If path starts with /, prepend base URL if available
    if (imagePath.startsWith('/')) {
        return baseUrl ? baseUrl + imagePath : imagePath;
    }
    // Otherwise, prepend slash and base URL if available
    return baseUrl ? baseUrl + '/' + imagePath : '/' + imagePath;
}
