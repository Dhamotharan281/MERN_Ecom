# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

Or use MongoDB Atlas (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update MONGODB_URI in backend/.env

### 4. Seed Database (Optional but Recommended)
```bash
cd backend
node seeder.js
```

This creates:
- Admin user: admin@ecommerce.com / admin123
- Sample products

### 5. Start Backend Server
```bash
cd backend
npm run dev
```

Server runs on: http://localhost:5000

### 6. Start Frontend Server
```bash
cd frontend
npm run dev
```

Frontend runs on: http://localhost:5173

---

## 🎯 Quick Test

1. Open http://localhost:5173
2. Register a new account or login with admin credentials
3. Browse products
4. Add items to cart
5. Test checkout flow
6. Access admin panel at http://localhost:5173/admin

---

## ⚠️ Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in .env file
- For Windows: Start MongoDB service

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Change port in vite.config.js

### CORS Error
- Check FRONTEND_URL in backend/.env
- Make sure it matches your frontend URL

---

## 📦 Required Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Environment variables configured
- [ ] Database seeded
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access homepage
- [ ] Can register/login
- [ ] Can view products
- [ ] Can access admin panel

---

## 🎉 You're Ready!

Your e-commerce platform is now running with:
- User authentication
- Product management
- Shopping cart
- Order processing
- Admin dashboard
- AI features

Happy coding! 🚀
