/**
 * Data Service Router
 * Automatically switches between Google Sheets and Mock Data based on configuration
 */

const googleSheetService = require('./googleSheetService');
const mockDataService = require('./mockDataService');

class DataService {
  constructor() {
    this.useGoogleSheets = this.shouldUseGoogleSheets();
    this.activeService = this.useGoogleSheets ? googleSheetService : mockDataService;
    
    console.log(`📊 Data Service initialized with: ${this.useGoogleSheets ? 'Google Sheets' : 'Mock Data'}`);
  }

  /**
   * Determine if Google Sheets should be used based on environment variables
   * @returns {boolean} Whether to use Google Sheets
   */
  shouldUseGoogleSheets() {
    const requiredEnvVars = [
      'GOOGLE_SHEETS_SPREADSHEET_ID',
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY'
    ];

    const hasAllEnvVars = requiredEnvVars.every(envVar => {
      const value = process.env[envVar];
      return value && value.trim() !== '' && value !== 'your_value_here';
    });

    if (!hasAllEnvVars) {
      console.log('⚠️  Google Sheets credentials not configured, using mock data');
      console.log('💡 To use Google Sheets, configure these environment variables:');
      requiredEnvVars.forEach(envVar => {
        const isConfigured = process.env[envVar] && process.env[envVar] !== 'your_value_here';
        console.log(`   ${isConfigured ? '✅' : '❌'} ${envVar}`);
      });
      return false;
    }

    return true;
  }

  /**
   * Get data source info
   * @returns {Object} Data source information
   */
  getDataSourceInfo() {
    return {
      type: this.useGoogleSheets ? 'Google Sheets' : 'Mock Data',
      service: this.useGoogleSheets ? 'Google Sheets API' : 'In-Memory Mock Service',
      realTime: this.useGoogleSheets,
      persistent: this.useGoogleSheets
    };
  }

  /**
   * Switch to Google Sheets (if credentials are available)
   * @returns {boolean} Success status
   */
  switchToGoogleSheets() {
    if (this.shouldUseGoogleSheets()) {
      this.useGoogleSheets = true;
      this.activeService = googleSheetService;
      console.log('🔄 Switched to Google Sheets service');
      return true;
    }
    console.log('❌ Cannot switch to Google Sheets - credentials not configured');
    return false;
  }

  /**
   * Switch to Mock Data
   */
  switchToMockData() {
    this.useGoogleSheets = false;
    this.activeService = mockDataService;
    console.log('🔄 Switched to Mock Data service');
  }

  // Proxy all methods to the active service
  async getProducts() {
    return this.activeService.getProducts();
  }

  async getProductById(productId) {
    return this.activeService.getProductById(productId);
  }

  async updateProductStock(productId, newStock) {
    return this.activeService.updateProductStock(productId, newStock);
  }

  async validateStock(items) {
    return this.activeService.validateStock(items);
  }

  async logOrder(orderData) {
    return this.activeService.logOrder(orderData);
  }

  async getConnectionStatus() {
    const status = await this.activeService.getConnectionStatus();
    return {
      ...status,
      dataSource: this.getDataSourceInfo()
    };
  }

  // Mock data specific methods
  async getOrders() {
    if (this.activeService.getOrders) {
      return this.activeService.getOrders();
    }
    return [];
  }

  async resetData() {
    if (this.activeService.resetData) {
      return this.activeService.resetData();
    }
    return false;
  }
}

module.exports = new DataService();