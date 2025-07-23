const { google } = require('googleapis');

class GoogleSheetService {
  constructor() {
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    this.productsSheetName = process.env.PRODUCTS_SHEET_NAME || 'Products';
    this.ordersSheetName = process.env.ORDERS_SHEET_NAME || 'Orders';
    
    this.initializeAuth();
  }

  /**
   * Initialize Google Sheets authentication
   */
  initializeAuth() {
    try {
      // Validate required environment variables
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        throw new Error('Missing Google Service Account credentials in environment variables');
      }

      if (!this.spreadsheetId) {
        throw new Error('Missing Google Sheets Spreadsheet ID in environment variables');
      }

      // Create JWT client for service account authentication
      const auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        null,
        process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newlines in private key
        ['https://www.googleapis.com/auth/spreadsheets'] // Scope for Google Sheets
      );

      // Initialize Google Sheets API
      this.sheets = google.sheets({ version: 'v4', auth });
      
      console.log('✅ Google Sheets service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Google Sheets service:', error.message);
      throw error;
    }
  }

  /**
   * Fetch all products from Google Sheets
   * @returns {Promise<Array>} Array of product objects
   */
  async getProducts() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.productsSheetName}!A:H`, // Columns A-H (ProductID to Description)
      });

      const rows = response.data.values;
      
      if (!rows || rows.length === 0) {
        console.log('No product data found in Google Sheets');
        return [];
      }

      // First row contains headers, skip it
      const headers = rows[0];
      const dataRows = rows.slice(1);

      // Map rows to product objects
      const products = dataRows.map((row, index) => {
        try {
          return {
            id: parseInt(row[0]) || index + 1, // ProductID
            name: row[1] || 'Unnamed Product',
            price: parseFloat(row[2]) || 0,
            category: row[3] || 'uncategorized',
            imageUrl: row[4] || '',
            stock: parseInt(row[5]) || 0,
            sku: row[6] || `SKU-${index + 1}`,
            description: row[7] || 'No description available',
            // Additional computed fields
            inStock: parseInt(row[5]) > 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        } catch (error) {
          console.error(`Error processing product row ${index + 1}:`, error);
          return null;
        }
      }).filter(product => product !== null); // Remove any failed products

      console.log(`📦 Fetched ${products.length} products from Google Sheets`);
      return products;
    } catch (error) {
      console.error('Error fetching products from Google Sheets:', error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  /**
   * Get a single product by ID
   * @param {number} productId - The product ID to fetch
   * @returns {Promise<Object|null>} Product object or null if not found
   */
  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === parseInt(productId));
      
      if (!product) {
        console.log(`Product with ID ${productId} not found`);
        return null;
      }

      return product;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Update product stock in Google Sheets
   * @param {number} productId - Product ID to update
   * @param {number} newStock - New stock quantity
   * @returns {Promise<boolean>} Success status
   */
  async updateProductStock(productId, newStock) {
    try {
      // First, find the row number for this product
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.productsSheetName}!A:A`, // Get all ProductIDs
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        throw new Error('No products found in sheet');
      }

      // Find the row index (skip header row)
      let rowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (parseInt(rows[i][0]) === parseInt(productId)) {
          rowIndex = i + 1; // +1 because sheets are 1-indexed
          break;
        }
      }

      if (rowIndex === -1) {
        throw new Error(`Product with ID ${productId} not found in sheet`);
      }

      // Update the stock value (column F, which is index 5)
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${this.productsSheetName}!F${rowIndex}`, // Column F (Stock)
        valueInputOption: 'RAW',
        resource: {
          values: [[newStock]]
        }
      });

      console.log(`✅ Updated stock for product ${productId} to ${newStock}`);
      return true;
    } catch (error) {
      console.error(`Error updating stock for product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Log an order to Google Sheets
   * @param {Object} orderData - Order information
   * @returns {Promise<boolean>} Success status
   */
  async logOrder(orderData) {
    try {
      // Prepare order row data
      const orderRow = [
        orderData.orderId,
        orderData.customerEmail || 'guest@example.com',
        orderData.customerName || 'Guest Customer',
        JSON.stringify(orderData.items), // Store items as JSON string
        orderData.totalAmount,
        orderData.status || 'pending',
        new Date().toISOString(), // Order date
        orderData.shippingAddress || 'Not provided',
        orderData.paymentMethod || 'Not specified'
      ];

      // Check if Orders sheet exists, if not create headers
      try {
        await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: `${this.ordersSheetName}!A1:I1`,
        });
      } catch (error) {
        // If sheet doesn't exist or is empty, create headers
        console.log('Creating Orders sheet headers...');
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${this.ordersSheetName}!A1:I1`,
          valueInputOption: 'RAW',
          resource: {
            values: [['OrderID', 'CustomerEmail', 'CustomerName', 'Items', 'TotalAmount', 'Status', 'OrderDate', 'ShippingAddress', 'PaymentMethod']]
          }
        });
      }

      // Append the order data
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.ordersSheetName}!A:I`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [orderRow]
        }
      });

      console.log(`📝 Order ${orderData.orderId} logged to Google Sheets`);
      return true;
    } catch (error) {
      console.error('Error logging order to Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Validate stock availability for multiple products
   * @param {Array} items - Array of {productId, quantity} objects
   * @returns {Promise<Object>} Validation result with available stock info
   */
  async validateStock(items) {
    try {
      const products = await this.getProducts();
      const validation = {
        valid: true,
        errors: [],
        stockInfo: []
      };

      for (const item of items) {
        const product = products.find(p => p.id === parseInt(item.productId));
        
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
    } catch (error) {
      console.error('Error validating stock:', error);
      throw error;
    }
  }

  /**
   * Get sheet connection status
   * @returns {Promise<Object>} Connection status and info
   */
  async getConnectionStatus() {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
        fields: 'properties.title,sheets.properties.title'
      });

      return {
        connected: true,
        spreadsheetTitle: response.data.properties.title,
        sheets: response.data.sheets.map(sheet => sheet.properties.title),
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error checking Google Sheets connection:', error);
      return {
        connected: false,
        error: error.message,
        lastChecked: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
module.exports = new GoogleSheetService();