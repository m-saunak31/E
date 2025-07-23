const express = require('express');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const dataService = require('../services/dataService');

const router = express.Router();

// Validation schemas
const orderItemSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).max(100).required(),
  selectedColor: Joi.string().optional(),
  selectedSize: Joi.string().optional()
});

const createOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).max(50).required(),
  customerInfo: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional()
  }).required(),
  shippingAddress: Joi.object({
    street: Joi.string().min(5).max(200).required(),
    city: Joi.string().min(2).max(100).required(),
    state: Joi.string().min(2).max(100).required(),
    zipCode: Joi.string().min(3).max(20).required(),
    country: Joi.string().min(2).max(100).default('India')
  }).required(),
  paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'upi', 'net_banking', 'cod').default('cod'),
  notes: Joi.string().max(500).optional()
});

const orderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled').required()
});

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value: orderData } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Invalid order data',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    // Generate unique order ID
    const orderId = `EYE-${Date.now()}-${uuidv4().substr(0, 8).toUpperCase()}`;

    // Validate stock availability
    console.log('🔍 Validating stock for order:', orderId);
    const stockValidation = await dataService.validateStock(orderData.items);
    
    if (!stockValidation.valid) {
      return res.status(400).json({
        error: 'Insufficient stock',
        message: 'One or more items are out of stock or have insufficient quantity',
        details: stockValidation.errors,
        stockInfo: stockValidation.stockInfo
      });
    }

    // Calculate order totals
    let totalAmount = 0;
    const processedItems = [];

    for (const item of orderData.items) {
      const product = await dataService.getProductById(item.productId);
      if (!product) {
        return res.status(400).json({
          error: 'Invalid product',
          message: `Product with ID ${item.productId} not found`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      processedItems.push({
        productId: item.productId,
        productName: product.name,
        productSku: product.sku,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: itemTotal,
        selectedColor: item.selectedColor || 'Default',
        selectedSize: item.selectedSize || 'One Size'
      });
    }

    // Add shipping cost (free for orders above ₹999)
    const shippingCost = totalAmount >= 999 ? 0 : 99;
    const finalAmount = totalAmount + shippingCost;

    // Prepare order object
    const order = {
      orderId,
      items: processedItems,
      customerEmail: orderData.customerInfo.email,
      customerName: orderData.customerInfo.name,
      customerPhone: orderData.customerInfo.phone || 'Not provided',
      shippingAddress: `${orderData.shippingAddress.street}, ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}, ${orderData.shippingAddress.country}`,
      paymentMethod: orderData.paymentMethod,
      subtotal: totalAmount,
      shippingCost,
      totalAmount: finalAmount,
      status: 'pending',
      notes: orderData.notes || '',
      createdAt: new Date().toISOString()
    };

    // Log order to Google Sheets
    console.log('📝 Logging order to Google Sheets:', orderId);
    await dataService.logOrder(order);

    // Update stock for each item
    console.log('📦 Updating stock for ordered items...');
    for (const item of orderData.items) {
      const product = await dataService.getProductById(item.productId);
      const newStock = product.stock - item.quantity;
      await dataService.updateProductStock(item.productId, newStock);
      console.log(`✅ Updated stock for product ${item.productId}: ${product.stock} → ${newStock}`);
    }

    // Prepare response
    const response = {
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.orderId,
        status: order.status,
        totalAmount: order.totalAmount,
        estimatedDelivery: getEstimatedDelivery(orderData.paymentMethod),
        items: processedItems,
        customerInfo: {
          name: order.customerName,
          email: order.customerEmail
        },
        tracking: {
          orderPlaced: true,
          paymentPending: orderData.paymentMethod !== 'cod',
          processing: false,
          shipped: false,
          delivered: false
        }
      },
      timestamp: new Date().toISOString()
    };

    console.log(`✅ Order ${orderId} created successfully`);
    res.status(201).json(response);

  } catch (error) {
    console.error('Error creating order:', error);
    
    res.status(500).json({
      error: 'Failed to create order',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/orders/:orderId
 * Get order details by order ID
 */
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId || !orderId.startsWith('EYE-')) {
      return res.status(400).json({
        error: 'Invalid order ID',
        message: 'Order ID must be in the format EYE-XXXXXXXXX'
      });
    }

    // In a real implementation, you would fetch from the Orders sheet
    // For now, we'll return a mock response
    res.json({
      success: true,
      message: 'Order tracking feature coming soon',
      data: {
        orderId,
        status: 'pending',
        message: 'Order details will be available once the order tracking system is fully implemented'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`Error fetching order ${req.params.orderId}:`, error);
    
    res.status(500).json({
      error: 'Failed to fetch order',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/orders/validate-stock
 * Validate stock availability for items before checkout
 */
router.post('/validate-stock', async (req, res) => {
  try {
    const itemsSchema = Joi.array().items(
      Joi.object({
        productId: Joi.number().integer().min(1).required(),
        quantity: Joi.number().integer().min(1).max(100).required()
      })
    ).min(1).max(50).required();

    const { error, value: items } = itemsSchema.validate(req.body.items);
    if (error) {
      return res.status(400).json({
        error: 'Invalid items data',
        details: error.details.map(detail => detail.message)
      });
    }

    // Validate stock
    const validation = await dataService.validateStock(items);

    res.json({
      success: validation.valid,
      data: {
        valid: validation.valid,
        errors: validation.errors,
        stockInfo: validation.stockInfo
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error validating stock:', error);
    
    res.status(500).json({
      error: 'Failed to validate stock',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/orders/health/check
 * Check orders system health
 */
router.get('/health/check', async (req, res) => {
  try {
    const status = await dataService.getConnectionStatus();
    
    res.json({
      success: true,
      data: {
        ...status,
        orderSystem: 'operational',
        features: {
          createOrder: true,
          stockValidation: true,
          inventoryUpdate: true,
          orderLogging: true
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking orders health:', error);
    
    res.status(503).json({
      success: false,
      error: 'Health check failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/orders/mock/list (Development only)
 * Get all orders from mock data
 */
router.get('/mock/list', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      error: 'Not allowed in production',
      message: 'Mock data access is only available in development mode'
    });
  }

  try {
    const orders = await dataService.getOrders();
    
    res.json({
      success: true,
      data: orders,
      count: orders.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/orders/mock/reset (Development only)
 * Reset mock data to initial state
 */
router.post('/mock/reset', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      error: 'Not allowed in production',
      message: 'Mock data reset is only available in development mode'
    });
  }

  try {
    await dataService.resetData();
    
    res.json({
      success: true,
      message: 'Mock data reset to initial state',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to reset mock data',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Helper function to calculate estimated delivery date
 * @param {string} paymentMethod - Payment method
 * @returns {string} Estimated delivery date
 */
function getEstimatedDelivery(paymentMethod) {
  const now = new Date();
  let deliveryDays = 5; // Default 5 days

  // Adjust based on payment method
  if (paymentMethod === 'cod') {
    deliveryDays = 7; // COD takes longer
  } else if (paymentMethod === 'upi' || paymentMethod === 'net_banking') {
    deliveryDays = 3; // Faster for digital payments
  }

  // Add delivery days
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

  return deliveryDate.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

module.exports = router;