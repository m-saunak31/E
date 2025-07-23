/**
 * Utility functions for formatting and validating product data
 */

/**
 * Format a raw product object from Google Sheets
 * @param {Object} rawProduct - Raw product data
 * @returns {Object} Formatted product object
 */
function formatProduct(rawProduct) {
  if (!rawProduct) {
    return null;
  }

  return {
    id: parseInt(rawProduct.id) || 0,
    name: sanitizeString(rawProduct.name) || 'Unnamed Product',
    price: formatPrice(rawProduct.price),
    originalPrice: rawProduct.originalPrice ? formatPrice(rawProduct.originalPrice) : null,
    category: sanitizeString(rawProduct.category) || 'uncategorized',
    imageUrl: sanitizeUrl(rawProduct.imageUrl) || '',
    images: rawProduct.images || [rawProduct.imageUrl].filter(Boolean),
    stock: parseInt(rawProduct.stock) || 0,
    sku: sanitizeString(rawProduct.sku) || `SKU-${rawProduct.id}`,
    description: sanitizeString(rawProduct.description) || 'No description available',
    inStock: (parseInt(rawProduct.stock) || 0) > 0,
    rating: parseFloat(rawProduct.rating) || 0,
    reviews: parseInt(rawProduct.reviews) || 0,
    badge: sanitizeString(rawProduct.badge) || null,
    discount: parseInt(rawProduct.discount) || null,
    features: rawProduct.features || [],
    specifications: rawProduct.specifications || {},
    colors: rawProduct.colors || ['Default'],
    sizes: rawProduct.sizes || ['One Size'],
    createdAt: rawProduct.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Format multiple products
 * @param {Array} products - Array of raw product objects
 * @returns {Array} Array of formatted product objects
 */
function formatProducts(products) {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .map(formatProduct)
    .filter(product => product !== null);
}

/**
 * Sanitize string input
 * @param {any} input - Input to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(input) {
  if (typeof input !== 'string') {
    return String(input || '');
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

/**
 * Format price to ensure it's a valid number
 * @param {any} price - Price input
 * @returns {number} Formatted price
 */
function formatPrice(price) {
  const numPrice = parseFloat(price);
  return isNaN(numPrice) ? 0 : Math.max(0, Math.round(numPrice * 100) / 100);
}

/**
 * Sanitize URL input
 * @param {any} url - URL input
 * @returns {string} Sanitized URL
 */
function sanitizeUrl(url) {
  if (typeof url !== 'string') {
    return '';
  }

  const trimmedUrl = url.trim();
  
  // Basic URL validation
  if (!trimmedUrl) {
    return '';
  }

  // Check if it's a valid URL format
  try {
    new URL(trimmedUrl);
    return trimmedUrl;
  } catch {
    // If not a valid URL, check if it's a relative path
    if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('./')) {
      return trimmedUrl;
    }
    
    // If it doesn't start with http/https, assume it's missing protocol
    if (!trimmedUrl.startsWith('http')) {
      return `https://${trimmedUrl}`;
    }
    
    return trimmedUrl;
  }
}

/**
 * Validate product data
 * @param {Object} product - Product object to validate
 * @returns {Object} Validation result
 */
function validateProduct(product) {
  const errors = [];

  if (!product) {
    return { valid: false, errors: ['Product data is required'] };
  }

  // Required fields validation
  if (!product.name || product.name.trim().length === 0) {
    errors.push('Product name is required');
  }

  if (typeof product.price !== 'number' || product.price < 0) {
    errors.push('Valid price is required');
  }

  if (!product.category || product.category.trim().length === 0) {
    errors.push('Product category is required');
  }

  if (typeof product.stock !== 'number' || product.stock < 0) {
    errors.push('Valid stock quantity is required');
  }

  // Optional field validation
  if (product.imageUrl && !isValidUrl(product.imageUrl)) {
    errors.push('Invalid image URL format');
  }

  if (product.rating && (typeof product.rating !== 'number' || product.rating < 0 || product.rating > 5)) {
    errors.push('Rating must be a number between 0 and 5');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if a string is a valid URL
 * @param {string} string - String to check
 * @returns {boolean} Whether the string is a valid URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate product search keywords
 * @param {Object} product - Product object
 * @returns {Array} Array of search keywords
 */
function generateSearchKeywords(product) {
  if (!product) {
    return [];
  }

  const keywords = new Set();
  
  // Add name words
  if (product.name) {
    product.name.toLowerCase().split(/\s+/).forEach(word => {
      if (word.length > 2) {
        keywords.add(word);
      }
    });
  }

  // Add category
  if (product.category) {
    keywords.add(product.category.toLowerCase());
  }

  // Add badge
  if (product.badge) {
    keywords.add(product.badge.toLowerCase());
  }

  // Add features
  if (product.features && Array.isArray(product.features)) {
    product.features.forEach(feature => {
      if (typeof feature === 'string') {
        feature.toLowerCase().split(/\s+/).forEach(word => {
          if (word.length > 2) {
            keywords.add(word);
          }
        });
      }
    });
  }

  return Array.from(keywords);
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current price
 * @returns {number} Discount percentage
 */
function calculateDiscount(originalPrice, currentPrice) {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return 0;
  }

  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

module.exports = {
  formatProduct,
  formatProducts,
  sanitizeString,
  formatPrice,
  sanitizeUrl,
  validateProduct,
  isValidUrl,
  generateSearchKeywords,
  calculateDiscount
};