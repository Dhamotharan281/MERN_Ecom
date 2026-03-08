# 🛍️ AI-Powered E-Commerce System (MERN Stack)

## 🚀 Full-Stack E-Commerce Platform with AI Features

### Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payments**: PayPal Integration
- **AI Features**: Smart Search, Recommendations, Fraud Detection

---

## 📋 Features

### Customer Features
✅ User Registration & Login with JWT  
✅ Product Browsing with Filters  
✅ AI-Powered Smart Search  
✅ Personalized Product Recommendations  
✅ Shopping Cart Management  
✅ Secure Checkout with PayPal  
✅ Order Tracking  
✅ Product Reviews & Ratings  
✅ User Profile Management  

### Admin Features
✅ Admin Dashboard with Analytics  
✅ Product Management (CRUD)  
✅ Order Management  
✅ User Management  
✅ Sales Analytics  
✅ Fraud Detection Scoring  
✅ Category Statistics  

### AI Features
🤖 Smart Search (NLP-based)  
🤖 Personalized Recommendations  
🤖 Fraud Detection  
🤖 Sentiment Analysis on Reviews  
🤖 Delivery Time Prediction  
🤖 AI Chatbot Assistant  

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
PAYPAL_API=https://api-m.sandbox.paypal.com

FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Seed the database** (Optional - adds sample products and admin user)
```bash
node seeder.js
```

This will create:
- Admin User: `admin@ecommerce.com` / `admin123`
- Sample products

6. **Start the backend server**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

### Frontend Setup

1. **Navigate to frontend folder**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

4. **Start the frontend server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📁 Project Structure

```
English/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── paypal.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── adminRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   └── jwt.js
│   ├── .env
│   ├── server.js
│   └── seeder.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminProducts.jsx
│   │   │   │   ├── AdminOrders.jsx
│   │   │   │   ├── AdminUsers.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   └── AdminSidebar.jsx
│   │   │   ├── Cart/
│   │   │   ├── Common/
│   │   │   ├── Layout/
│   │   │   └── Products/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/ban` - Ban user

### AI
- `GET /api/ai/recommendations` - Get personalized recommendations
- `POST /api/ai/search` - Smart search
- `POST /api/ai/chatbot` - AI chatbot

---

## 👤 Default Admin Credentials

After running the seeder:
- **Email**: `admin@ecommerce.com`
- **Password**: `admin123`

---

## 🎨 Design Features

- Responsive design for all devices
- Modern UI with Tailwind CSS
- Smooth animations with Framer Motion
- Toast notifications with Sonner
- Loading states and error handling

---

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet.js for security headers
- Input validation
- Role-based authorization

---

## 📊 Database Schema

### User
- name, email, password (hashed)
- role (USER, ADMIN, SUPER_ADMIN)
- addresses, phone, avatar
- behavior tracking (viewed products, purchases, search history)
- fraud score

### Product
- name, description, price, discountPrice
- category, brand, sizes, colors
- images, rating, reviews
- stock management
- AI embedding vector

### Order
- user, orderItems, shippingAddress
- payment details
- order status tracking
- fraud detection score
- estimated delivery

### Cart
- user, items (product, quantity, size, color)
- total price calculation

---

## 🚀 Deployment

### Backend Deployment (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update MONGODB_URI in backend .env

---

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- Update PayPal credentials for payment integration
- For production, change JWT_SECRET and use strong passwords
- Enable CORS for your frontend domain in production

---

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using MERN Stack + AI**
