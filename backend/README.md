# EyeLura Backend API

A Node.js + Express backend for the EyeLura eyewear ecommerce website with Google Sheets integration for dynamic product management and inventory tracking.

## Features

- 🔄 **Dynamic Product Sync**: Fetch products from Google Sheets in real-time
- 📦 **Inventory Management**: Automatic stock updates when orders are placed
- 🛒 **Order Processing**: Complete order handling with stock validation
- 📊 **Google Sheets Integration**: Seamless integration with Google Sheets API
- 🔒 **Security**: Rate limiting, CORS, and input validation
- 📝 **Logging**: Comprehensive logging and error handling
- 🚀 **Performance**: Caching and optimized queries

## Quick Start

### 1. Installation

```bash
cd backend
npm install
```

### 2. Google Sheets Setup

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

### 3. Environment Configuration

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Update the following in `.env`:
- `GOOGLE_SHEETS_SPREADSHEET_ID`: Your Google Sheet ID (from the URL)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Private key from the JSON file (keep the quotes and \n)

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `inStock` - Filter by stock availability (true/false)
- `search` - Search in name, description, category
- `limit` - Number of products per page (default: 50)
- `offset` - Pagination offset (default: 0)
- `sortBy` - Sort field (name, price, stock, createdAt)
- `sortOrder` - Sort order (asc, desc)

**Example:**
```bash
curl "http://localhost:5000/api/products?category=sunglasses&inStock=true&limit=10"
```

#### Get Single Product
```http
GET /api/products/:id
```

**Example:**
```bash
curl "http://localhost:5000/api/products/1"
```

#### Get Categories
```http
GET /api/products/categories/list
```

#### Search Suggestions
```http
GET /api/products/search/suggestions?q=aviator
```

### Orders

#### Create Order
```http
POST /api/orders
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "selectedColor": "Gold",
      "selectedSize": "Medium"
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210"
  },
  "shippingAddress": {
    "street": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "paymentMethod": "upi",
  "notes": "Please handle with care"
}
```

#### Validate Stock
```http
POST /api/orders/validate-stock
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

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