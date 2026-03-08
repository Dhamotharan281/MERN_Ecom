# 📡 API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### Register User
```
POST /auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

### Login User
```
POST /auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

### Get Current User
```
GET /auth/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

### Update Profile
```
PUT /auth/profile
Authorization: Bearer {token}
```

**Body:**
```json
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "phone": "+1234567890"
}
```

---

### Logout
```
GET /auth/logout
```

---

## 📦 Product Endpoints

### Get All Products
```
GET /products?page=1&limit=12&category=Top Wear&gender=Men&minPrice=10&maxPrice=100&search=shirt&sort=price-asc
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category
- `gender` - Filter by gender
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search query
- `sort` - Sort option (price-asc, price-desc, rating, newest)

**Response:**
```json
{
  "success": true,
  "count": 12,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product description",
      "price": 39.99,
      "discountPrice": 34.99,
      "category": "Top Wear",
      "images": [
        {
          "url": "image_url",
          "altText": "Image description"
        }
      ],
      "rating": 4.5,
      "numReviews": 12
    }
  ]
}
```

---

### Get Single Product
```
GET /products/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "Product Name",
    "description": "Detailed description",
    "price": 39.99,
    "discountPrice": 34.99,
    "countInStock": 20,
    "category": "Top Wear",
    "brand": "Brand Name",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Red", "Blue"],
    "images": [],
    "rating": 4.5,
    "numReviews": 12,
    "reviews": []
  }
}
```

---

### Get Featured Products
```
GET /products/featured
```

---

### Get Recommended Products
```
GET /products/recommended
Authorization: Bearer {token}
```

---

### Create Product (Admin)
```
POST /products
Authorization: Bearer {token}
Role: ADMIN
```

**Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "discountPrice": 44.99,
  "countInStock": 30,
  "sku": "PROD-001",
  "category": "Top Wear",
  "brand": "Brand Name",
  "sizes": ["S", "M", "L"],
  "colors": ["Black", "White"],
  "gender": "Men",
  "images": [
    {
      "url": "image_url",
      "altText": "Image description"
    }
  ]
}
```

---

### Update Product (Admin)
```
PUT /products/:id
Authorization: Bearer {token}
Role: ADMIN
```

---

### Delete Product (Admin)
```
DELETE /products/:id
Authorization: Bearer {token}
Role: ADMIN
```

---

### Add Product Review
```
POST /products/:id/reviews
Authorization: Bearer {token}
```

**Body:**
```json
{
  "rating": 5,
  "comment": "Great product!"
}
```

---

## 🛒 Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "item_id",
        "product": {
          "_id": "product_id",
          "name": "Product Name",
          "price": 39.99,
          "images": []
        },
        "quantity": 2,
        "size": "M",
        "color": "Blue",
        "price": 39.99
      }
    ],
    "totalPrice": 79.98
  }
}
```

---

### Add to Cart
```
POST /cart
Authorization: Bearer {token}
```

**Body:**
```json
{
  "productId": "product_id",
  "quantity": 1,
  "size": "M",
  "color": "Blue"
}
```

---

### Update Cart Item
```
PUT /cart
Authorization: Bearer {token}
```

**Body:**
```json
{
  "itemId": "item_id",
  "quantity": 3
}
```

---

### Remove from Cart
```
DELETE /cart/:itemId
Authorization: Bearer {token}
```

---

### Clear Cart
```
DELETE /cart
Authorization: Bearer {token}
```

---

## 📋 Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer {token}
```

**Body:**
```json
{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "size": "M",
      "color": "Blue",
      "price": 39.99,
      "image": "image_url"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "PayPal",
  "itemsPrice": 79.98,
  "taxPrice": 7.99,
  "shippingPrice": 5.00,
  "totalPrice": 92.97
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "user": "user_id",
    "orderItems": [],
    "shippingAddress": {},
    "paymentMethod": "PayPal",
    "totalPrice": 92.97,
    "orderStatus": "Pending",
    "estimatedDelivery": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-08T00:00:00.000Z"
  }
}
```

---

### Get My Orders
```
GET /orders/myorders
Authorization: Bearer {token}
```

---

### Get Order by ID
```
GET /orders/:id
Authorization: Bearer {token}
```

---

### Get All Orders (Admin)
```
GET /orders
Authorization: Bearer {token}
Role: ADMIN
```

---

### Update Order Status (Admin)
```
PUT /orders/:id/status
Authorization: Bearer {token}
Role: ADMIN
```

**Body:**
```json
{
  "orderStatus": "Shipped"
}
```

**Status Options:**
- Pending
- Processing
- Shipped
- Delivered
- Cancelled
- Refunded

---

### Update Order to Paid
```
PUT /orders/:id/pay
Authorization: Bearer {token}
```

**Body:**
```json
{
  "id": "payment_id",
  "status": "COMPLETED",
  "update_time": "2024-01-08T12:00:00Z",
  "email_address": "payer@example.com"
}
```

---

## 👨💼 Admin Endpoints

### Get Dashboard Stats
```
GET /admin/dashboard
Authorization: Bearer {token}
Role: ADMIN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalProducts": 50,
    "totalOrders": 300,
    "totalRevenue": 15000.00,
    "recentOrders": [],
    "topProducts": [],
    "monthlyRevenue": [],
    "categoryStats": []
  }
}
```

---

### Get All Users
```
GET /admin/users
Authorization: Bearer {token}
Role: ADMIN
```

---

### Update User Role
```
PUT /admin/users/:id/role
Authorization: Bearer {token}
Role: ADMIN
```

**Body:**
```json
{
  "role": "ADMIN"
}
```

**Role Options:**
- USER
- ADMIN
- SUPER_ADMIN

---

### Ban User
```
PUT /admin/users/:id/ban
Authorization: Bearer {token}
Role: ADMIN
```

---

### Unban User
```
PUT /admin/users/:id/unban
Authorization: Bearer {token}
Role: ADMIN
```

---

## 🤖 AI Endpoints

### Get Personalized Recommendations
```
GET /ai/recommendations
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "Recommended Product",
      "price": 39.99,
      "images": []
    }
  ]
}
```

---

### Smart Search
```
POST /ai/search
```

**Body:**
```json
{
  "query": "cheap red shoes"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "Red Shoes",
      "price": 29.99
    }
  ]
}
```

---

### AI Chatbot
```
POST /ai/chatbot
```

**Body:**
```json
{
  "message": "How can I track my order?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "To track your order, please go to 'My Orders' section in your profile."
  }
}
```

---

## 💳 PayPal Endpoints

### Create PayPal Order
```
POST /paypal/create-order
```

**Body:**
```json
{
  "amount": "92.97"
}
```

---

### Capture PayPal Payment
```
POST /paypal/capture-payment
```

**Body:**
```json
{
  "orderID": "paypal_order_id"
}
```

---

## 📊 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

Or token can be sent via cookies.

---

## 📝 Notes

1. All dates are in ISO 8601 format
2. Prices are in USD
3. Pagination starts at page 1
4. Default limit is 12 items per page
5. All responses include a `success` boolean
6. Errors include a `message` field

---

## 🧪 Testing with Postman/Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. For protected routes, add token to Authorization header
4. Test each endpoint individually

---

**API Version**: 1.0.0  
**Last Updated**: 2024
