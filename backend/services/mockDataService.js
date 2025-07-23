/**
 * Mock Data Service for EyeLura Backend
 * Provides sample product and order data for testing without Google Sheets
 */

class MockDataService {
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Aviator Prestige',
        price: 1329,
        originalPrice: 1599,
        category: 'sunglasses',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stock: 45,
        sku: 'AVT-001',
        description: 'Premium aviator sunglasses with UV protection and lightweight titanium frame.',
        rating: 4.8,
        reviews: 248,
        badge: 'Bestseller',
        discount: 17,
        features: ['100% UV Protection', 'Titanium Frame', 'Polarized Lenses'],
        colors: ['Gold', 'Silver', 'Black'],
        sizes: ['Small', 'Medium', 'Large'],
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Metropolitan Frame',
        price: 1289,
        originalPrice: 1489,
        category: 'frames',
        imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stock: 32,
        sku: 'MET-002',
        description: 'Modern prescription frames with blue light protection for digital screens.',
        rating: 4.7,
        reviews: 192,
        badge: 'New',
        discount: 13,
        features: ['Blue Light Protection', 'Prescription Ready', 'Lightweight'],
        colors: ['Black', 'Tortoise', 'Clear'],
        sizes: ['Small', 'Medium', 'Large'],
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Artisan Round',
        price: 1459,
        originalPrice: 1699,
        category: 'sunglasses',
        imageUrl: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stock: 28,
        sku: 'ART-003',
        description: 'Handcrafted round sunglasses with vintage-inspired design.',
        rating: 4.9,
        reviews: 312,
        badge: 'Student Fav',
        discount: 14,
        features: ['Handcrafted', 'Vintage Style', 'Premium Lenses'],
        colors: ['Brown', 'Green', 'Blue'],
        sizes: ['Small', 'Medium'],
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Executive Titan',
        price: 1599,
        originalPrice: 1899,
        category: 'frames',
        imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stock: 15,
        sku: 'EXE-004',
        description: 'Executive-level frames with titanium construction for professionals.',
        rating: 4.6,
        reviews: 176,
        badge: 'Limited',
        discount: 16,
        features: ['Titanium Frame', 'Professional Design', 'Lifetime Warranty'],
        colors: ['Gunmetal', 'Silver', 'Black'],
        sizes: ['Medium', 'Large'],
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Classic Wayfarer',
        price: 1199,
        originalPrice: 1399,
        category: 'sunglasses',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stock: 67,
        sku: 'WAY-005',
        description: 'Timeless wayfarer design perfect for any occasion.',
        rating: 4.5,
        reviews: 89,
        badge: 'Classic',
        discount: 14,
        features: ['Classic Design', 'UV Protection', 'Durable Frame'],
        colors: ['Black', 'Brown', 'Navy'],
        sizes: ['Small', 'Medium', 'Large'],
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 6,
        name: 'Sport Vision Pro',
        price: 1799,
        originalPrice: 2099,
        category: 'sunglasses',
        imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stock: 23,
        sku: 'SPT-006',
        description: 'High-performance sports eyewear for active lifestyles.',
        rating: 4.8,
        reviews: 134,
        badge: 'Sport',
        discount: 14,
        features: ['Impact Resistant', 'Sweat Resistant', 'Secure Fit'],
        colors: ['Black', 'Red', 'Blue'],
        sizes: ['Medium', 'Large'],
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.orders = [];
  }

  /**
   * Get all products
   * @returns {Promise<Array>} Array of products
   */
  async getProducts() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.products];
  }

  /**
   * Get product by ID
   * @param {number} productId - Product ID
   * @returns {Promise<Object|null>} Product or null
   */
  async getProductById(productId) {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.products.find(p => p.id === parseInt(productId)) || null;
  }

  /**
   * Update product stock
   * @param {number} productId - Product ID
   * @param {number} newStock - New stock quantity
   * @returns {Promise<boolean>} Success status
   */
  async updateProductStock(productId, newStock) {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const productIndex = this.products.findIndex(p => p.id === parseInt(productId));
    if (productIndex === -1) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    this.products[productIndex].stock = newStock;
    this.products[productIndex].inStock = newStock > 0;
    this.products[productIndex].updatedAt = new Date().toISOString();

    console.log(`✅ Updated stock for product ${productId} to ${newStock}`);
    return true;
  }

  /**
   * Validate stock for multiple items
   * @param {Array} items - Array of {productId, quantity}
   * @returns {Promise<Object>} Validation result
   */
  async validateStock(items) {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const validation = {
      valid: true,
      errors: [],
      stockInfo: []
    };

    for (const item of items) {
      const product = await this.getProductById(item.productId);
      
      if (!product) {
        validation.valid = false;
        validation.errors.push(`Product with ID ${item.productId} not found`);
        continue;
      }

      const stockInfo = {
        productId: item.productId,
        productName: product.name,
        requestedQuantity: item.quantity,
        availableStock: product.stock,
        sufficient: product.stock >= item.quantity
      };

      validation.stockInfo.push(stockInfo);

      if (!stockInfo.sufficient) {
        validation.valid = false;
        validation.errors.push(
          `Insufficient stock for ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`
        );
      }
    }

    return validation;
  }

  /**
   * Log order
   * @param {Object} orderData - Order data
   * @returns {Promise<boolean>} Success status
   */
  async logOrder(orderData) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.orders.push({
      ...orderData,
      loggedAt: new Date().toISOString()
    });

    console.log(`📝 Order ${orderData.orderId} logged to mock database`);
    return true;
  }

  /**
   * Get connection status
   * @returns {Promise<Object>} Status info
   */
  async getConnectionStatus() {
    return {
      connected: true,
      dataSource: 'Mock Data Service',
      productsCount: this.products.length,
      ordersCount: this.orders.length,
      lastChecked: new Date().toISOString()
    };
  }

  /**
   * Get all orders (for testing)
   * @returns {Promise<Array>} Array of orders
   */
  async getOrders() {
    return [...this.orders];
  }

  /**
   * Reset data to initial state
   * @returns {Promise<boolean>} Success status
   */
  async resetData() {
    this.orders = [];
    // Reset stock to original values
    this.products.forEach(product => {
      switch(product.id) {
        case 1: product.stock = 45; break;
        case 2: product.stock = 32; break;
        case 3: product.stock = 28; break;
        case 4: product.stock = 15; break;
        case 5: product.stock = 67; break;
        case 6: product.stock = 23; break;
      }
      product.inStock = product.stock > 0;
      product.updatedAt = new Date().toISOString();
    });
    
    console.log('🔄 Mock data reset to initial state');
    return true;
  }
}

module.exports = new MockDataService();