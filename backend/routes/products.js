const express = require('express');
const Joi = require('joi');
const googleSheetService = require('../services/googleSheetService');
const { formatProducts, formatProduct, validateProduct } = require('../utils/formatProduct');

const router = express.Router();

// Validation schemas
const productQuerySchema = Joi.object({
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  inStock: Joi.boolean().optional(),
  search: Joi.string().max(100).optional(),
  limit: Joi.number().integer().min(1).max(100).default(50),
  offset: Joi.number().integer().min(0).default(0),
  sortBy: Joi.string().valid('name', 'price', 'stock', 'createdAt').default('name'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc')
});

const productIdSchema = Joi.object({
  id: Joi.number().integer().min(1).required()
});

/**
 * GET /api/products
 * Fetch all products with optional filtering and pagination
 */
router.get('/', async (req, res) => {
  try {
    // Validate query parameters
    const { error, value: query } = productQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: error.details.map(detail => detail.message)
      });
    }

    // Fetch products from Google Sheets
    const rawProducts = await googleSheetService.getProducts();
    let products = formatProducts(rawProducts);

    // Apply filters
    if (query.category) {
      products = products.filter(product => 
        product.category.toLowerCase() === query.category.toLowerCase()
      );
    }

    if (query.minPrice !== undefined) {
      products = products.filter(product => product.price >= query.minPrice);
    }

    if (query.maxPrice !== undefined) {
      products = products.filter(product => product.price <= query.maxPrice);
    }

    if (query.inStock !== undefined) {
      products = products.filter(product => product.inStock === query.inStock);
    }

    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.badge && product.badge.toLowerCase().includes(searchTerm))
      );
    }

    // Sort products
    products.sort((a, b) => {
      let aValue = a[query.sortBy];
      let bValue = b[query.sortBy];

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (query.sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    // Apply pagination
    const totalProducts = products.length;
    const paginatedProducts = products.slice(query.offset, query.offset + query.limit);

    // Prepare response
    const response = {
      success: true,
      data: paginatedProducts,
      pagination: {
        total: totalProducts,
        limit: query.limit,
        offset: query.offset,
        hasMore: query.offset + query.limit < totalProducts
      },
      filters: {
        category: query.category || null,
        minPrice: query.minPrice || null,
        maxPrice: query.maxPrice || null,
        inStock: query.inStock !== undefined ? query.inStock : null,
        search: query.search || null
      },
      sorting: {
        sortBy: query.sortBy,
        sortOrder: query.sortOrder
      },
      timestamp: new Date().toISOString()
    };

    // Add cache headers for better performance
    res.set({
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      'ETag': `"${Buffer.from(JSON.stringify(paginatedProducts)).toString('base64')}"`
    });

    res.json(response);

  } catch (error) {
    console.error('Error fetching products:', error);
    
    res.status(500).json({
      error: 'Failed to fetch products',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/products/:id
 * Fetch a single product by ID
 */
router.get('/:id', async (req, res) => {
  try {
    // Validate product ID
    const { error, value } = productIdSchema.validate({ id: parseInt(req.params.id) });
    if (error) {
      return res.status(400).json({
        error: 'Invalid product ID',
        message: 'Product ID must be a positive integer'
      });
    }

    // Fetch product from Google Sheets
    const rawProduct = await googleSheetService.getProductById(value.id);
    
    if (!rawProduct) {
      return res.status(404).json({
        error: 'Product not found',
        message: `Product with ID ${value.id} does not exist`,
        productId: value.id
      });
    }

    // Format product data
    const product = formatProduct(rawProduct);
    
    // Validate product data
    const validation = validateProduct(product);
    if (!validation.valid) {
      console.warn(`Product ${value.id} has validation issues:`, validation.errors);
    }

    const response = {
      success: true,
      data: product,
      timestamp: new Date().toISOString()
    };

    // Add cache headers
    res.set({
      'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
      'ETag': `"product-${product.id}-${product.updatedAt}"`
    });

    res.json(response);

  } catch (error) {
    console.error(`Error fetching product ${req.params.id}:`, error);
    
    res.status(500).json({
      error: 'Failed to fetch product',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      productId: req.params.id,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/products/categories/list
 * Get list of all available categories
 */
router.get('/categories/list', async (req, res) => {
  try {
    const products = await googleSheetService.getProducts();
    const categories = [...new Set(products.map(product => product.category))].sort();

    const categoriesWithCounts = categories.map(category => ({
      name: category,
      count: products.filter(product => product.category === category).length,
      inStockCount: products.filter(product => 
        product.category === category && product.stock > 0
      ).length
    }));

    res.json({
      success: true,
      data: categoriesWithCounts,
      total: categories.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    
    res.status(500).json({
      error: 'Failed to fetch categories',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/products/search/suggestions
 * Get search suggestions based on query
 */
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || query.length < 2) {
      return res.json({
        success: true,
        data: [],
        message: 'Query too short for suggestions'
      });
    }

    const products = await googleSheetService.getProducts();
    const searchTerm = query.toLowerCase();
    
    // Get product name suggestions
    const suggestions = new Set();
    
    products.forEach(product => {
      // Add matching product names
      if (product.name.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.name);
      }
      
      // Add matching categories
      if (product.category.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.category);
      }
      
      // Add matching badges
      if (product.badge && product.badge.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.badge);
      }
    });

    const suggestionArray = Array.from(suggestions).slice(0, 10); // Limit to 10 suggestions

    res.json({
      success: true,
      data: suggestionArray,
      query: query,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    
    res.status(500).json({
      error: 'Failed to fetch search suggestions',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/products/health/check
 * Check Google Sheets connection health
 */
router.get('/health/check', async (req, res) => {
  try {
    const status = await googleSheetService.getConnectionStatus();
    
    res.json({
      success: status.connected,
      data: status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking products health:', error);
    
    res.status(503).json({
      success: false,
      error: 'Health check failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;