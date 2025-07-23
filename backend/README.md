# EyeLura Backend API

A Node.js + Express backend for the EyeLura eyewear ecommerce website with **automatic Google Sheets integration** and **mock data fallback** for easy development.

## Features

- 🔄 **Smart Data Source**: Automatically uses Google Sheets if configured, otherwise uses mock data
- 📦 **Mock Data Included**: Works out-of-the-box with sample products for testing
- 📦 **Inventory Management**: Automatic stock updates when orders are placed
- 🛒 **Order Processing**: Complete order handling with stock validation
- 📊 **Optional Google Sheets**: Easy Google Sheets integration when you're ready
- 🔒 **Security**: Rate limiting, CORS, and input validation
- 📝 **Logging**: Comprehensive logging and error handling
- 🚀 **Performance**: Caching and optimized queries

## 🚀 Quick Start (No Google Sheets Required!)

### 1. Installation

```bash
cd backend
npm install
npm run dev
```

**That's it!** The backend will start with mock data and you can test everything immediately.

### 2. Test the API

```bash
# Check if it's running
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/1

# Check data source
curl http://localhost:5000/api/products/data-source/info
```

## 📊 **Mock Data vs Google Sheets**

### **Mock Data (Default)**
- ✅ **Works immediately** - No setup required
- ✅ **6 sample products** included
- ✅ **Full functionality** - Orders, stock updates, etc.
- ✅ **Perfect for development** and testing
- ❌ **Data resets** when server restarts
- ❌ **Not persistent** across sessions

### **Google Sheets (Optional)**
- ✅ **Persistent data** - Survives server restarts
- ✅ **Real-time sync** - Update products in sheets
- ✅ **Easy management** - Non-technical users can update
- ✅ **Order logging** - All orders saved to sheets
- ⚙️ **Requires setup** - Google Service Account needed

## 🔧 **Google Sheets Setup (Optional)**

When you're ready to use Google Sheets instead of mock data:

#### Create a Google Sheet
1. Create a new Google Sheet with the following structure:

**Products Sheet (Sheet 1):**
| ProductID | Name | Price | Category | ImageURL | Stock | SKU | Description |
|-----------|------|-------|----------|----------|-------|-----|-------------|
| 1 | Aviator Prestige | 1329 | sunglasses | https://example.com/image1.jpg | 45 | AVT-001 | Premium aviator sunglasses |
| 2 | Metropolitan Frame | 1289 | frames | https://example.com/image2.jpg | 32 | MET-002 | Modern prescription frames |

**Orders Sheet (Sheet 2):**
| OrderID | CustomerEmail | CustomerName | Items | TotalAmount | Status | OrderDate | ShippingAddress | PaymentMethod |
|---------|---------------|--------------|-------|-------------|--------|-----------|-----------------|---------------|

#### Create Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create a Service Account:
   - Go to IAM & Admin > Service Accounts
   - Click "Create Service Account"
   - Fill in details and create
   - Generate a JSON key file
5. Share your Google Sheet with the service account email

#### Environment Configuration

Update the following in your `.env` file:
- `GOOGLE_SHEETS_SPREADSHEET_ID`: Your Google Sheet ID (from the URL)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Private key from the JSON file (keep the quotes and \n)

The backend will automatically detect the configuration and switch to Google Sheets!

## 🎯 **Development Workflow**

### **Phase 1: Start with Mock Data**
```bash
npm run dev  # Uses mock data automatically
```

### **Phase 2: Test Your Frontend**
- Connect your React frontend to `http://localhost:5000`
- Test all functionality with the 6 sample products
- Place test orders and see stock updates

### **Phase 3: Add Google Sheets (When Ready)**
- Set up Google Service Account
- Update `.env` with credentials
- Restart server - it automatically switches to Google Sheets!

## 📋 **API Endpoints**

### **Products**
```bash
GET /api/products                    # All products with filtering
GET /api/products/:id               # Single product
GET /api/products/categories/list   # All categories
GET /api/products/data-source/info  # Check current data source
```

### **Orders**
```bash
POST /api/orders                    # Create order
POST /api/orders/validate-stock     # Validate stock
GET /api/orders/mock/list          # View orders (dev only)
POST /api/orders/mock/reset        # Reset data (dev only)
```

### **Development Tools**
```bash
GET /health                         # Server health
GET /api/products/health/check     # Products health
GET /api/orders/health/check       # Orders health
```

## 🧪 **Testing the Backend**

### **1. Basic Health Check**
```bash
curl http://localhost:5000/health
```

### **2. Get Products**
```bash
# All products
curl http://localhost:5000/api/products

# Filter by category
curl "http://localhost:5000/api/products?category=sunglasses"

# Search products
curl "http://localhost:5000/api/products?search=aviator"
```

### **3. Create Test Order**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"productId": 1, "quantity": 2}],
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001"
    }
  }'
```

### **4. Check Stock Updates**
```bash
# Check product stock after order
curl http://localhost:5000/api/products/1
```

## 🔄 **Data Source Switching**

In development, you can switch between data sources:

```bash
# Check current source
curl http://localhost:5000/api/products/data-source/info

# Switch to mock data
curl -X POST http://localhost:5000/api/products/data-source/switch \
  -H "Content-Type: application/json" \
  -d '{"source": "mock"}'

# Switch to Google Sheets (if configured)
curl -X POST http://localhost:5000/api/products/data-source/switch \
  -H "Content-Type: application/json" \
  -d '{"source": "google-sheets"}'
```

## 📦 **Sample Products Included**

The mock data includes 6 realistic products:
1. **Aviator Prestige** - Premium sunglasses (₹1,329)
2. **Metropolitan Frame** - Modern prescription frames (₹1,289)
3. **Artisan Round** - Vintage sunglasses (₹1,459)
4. **Executive Titan** - Professional frames (₹1,599)
5. **Classic Wayfarer** - Timeless sunglasses (₹1,199)
6. **Sport Vision Pro** - Athletic eyewear (₹1,799)

Each product includes:
- Multiple colors and sizes
- Realistic pricing with discounts
- Stock quantities
- Product features and descriptions
- Customer ratings and reviews

## 🚀 **Production Deployment**

For production, simply:
1. Set up Google Sheets with your real product data
2. Configure environment variables
3. Deploy to your hosting platform

The backend automatically uses Google Sheets in production for persistent data.

## 💡 **Why This Approach?**

1. **Instant Development**: Start coding immediately without external dependencies
2. **Realistic Testing**: Mock data mirrors real product structure
3. **Gradual Migration**: Add Google Sheets when you need persistence
4. **Flexible Deployment**: Works in any environment
5. **Team Friendly**: Developers can work without shared credentials

## 🛠️ **Troubleshooting**

### **Backend Won't Start**
```bash
# Check if port 5000 is available
lsof -i :5000

# Try different port
PORT=3001 npm run dev
```

### **No Products Returned**
```bash
# Check data source
curl http://localhost:5000/api/products/data-source/info

# Reset mock data
curl -X POST http://localhost:5000/api/orders/mock/reset
```

### **Google Sheets Not Working**
- Check environment variables are set correctly
- Verify service account has access to the sheet
- Check the spreadsheet ID in the URL
- The backend will automatically fall back to mock data if Google Sheets fails

## 🎉 **Ready to Go!**

Your backend is now ready with:
- ✅ **6 sample products** ready to use
- ✅ **Full order processing** with stock management
- ✅ **Easy Google Sheets upgrade** path
- ✅ **Production-ready** security and performance
- ✅ **Comprehensive API** for your React frontend

Start your React frontend and connect it to `http://localhost:5000` - everything will work immediately! 🚀

### Health Checks

#### General Health
```http
GET /health
```

#### Products Health
```http
GET /api/products/health/check
```

#### Orders Health
```http
GET /api/orders/health/check
```

## Project Structure

```
backend/
├── index.js                 # Main server file
├── routes/
│   ├── products.js          # Product routes
│   └── orders.js            # Order routes
├── services/
│   └── googleSheetService.js # Google Sheets integration
├── utils/
│   └── formatProduct.js     # Product formatting utilities
├── package.json
├── .env.example
├── .env
└── README.md
```

## Google Sheets Integration

### How It Works

1. **Product Sync**: The API fetches product data from your Google Sheet in real-time
2. **Stock Management**: When orders are placed, stock quantities are automatically updated
3. **Order Logging**: All orders are logged to a separate sheet for tracking

### Sheet Structure

#### Products Sheet Columns:
- **A**: ProductID (integer)
- **B**: Name (string)
- **C**: Price (number)
- **D**: Category (string)
- **E**: ImageURL (string)
- **F**: Stock (integer)
- **G**: SKU (string)
- **H**: Description (string)

#### Orders Sheet Columns:
- **A**: OrderID (string)
- **B**: CustomerEmail (string)
- **C**: CustomerName (string)
- **D**: Items (JSON string)
- **E**: TotalAmount (number)
- **F**: Status (string)
- **G**: OrderDate (ISO string)
- **H**: ShippingAddress (string)
- **I**: PaymentMethod (string)

## Error Handling

The API includes comprehensive error handling:

- **400**: Bad Request (validation errors)
- **404**: Not Found (product/order not found)
- **500**: Internal Server Error
- **503**: Service Unavailable (Google Sheets connection issues)

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domains
- **Input Validation**: All inputs validated with Joi
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data in environment variables

## Performance Optimizations

- **Caching**: Response caching with ETags
- **Pagination**: Efficient data loading
- **Connection Pooling**: Optimized Google Sheets connections
- **Error Recovery**: Graceful handling of API failures

## Development

### Adding New Features

1. **New Routes**: Add to `routes/` directory
2. **Business Logic**: Add to `services/` directory
3. **Utilities**: Add to `utils/` directory
4. **Validation**: Use Joi schemas for input validation

### Testing

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test products endpoint
curl http://localhost:5000/api/products

# Test with filters
curl "http://localhost:5000/api/products?category=sunglasses&limit=5"
```

## Deployment

### Environment Variables for Production

```bash
NODE_ENV=production
PORT=5000
GOOGLE_SHEETS_SPREADSHEET_ID=your_production_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="your_production_private_key"
FRONTEND_URL=https://your-frontend-domain.com
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues

1. **Google Sheets Connection Failed**
   - Check service account email and private key
   - Ensure sheet is shared with service account
   - Verify spreadsheet ID

2. **CORS Errors**
   - Update `FRONTEND_URL` in `.env`
   - Check allowed origins in `index.js`

3. **Rate Limiting**
   - Adjust limits in environment variables
   - Implement caching on frontend

### Logs

The server logs important events:
- ✅ Successful operations
- ❌ Errors and failures
- 📦 Stock updates
- 📝 Order logging

## Support

For issues and questions:
1. Check the logs for error details
2. Verify Google Sheets setup
3. Test API endpoints with curl
4. Check environment variables

## License

MIT License - see LICENSE file for details.