# 🧪 Complete Testing Guide

## ✅ Pre-Testing Checklist

Before testing, ensure:
- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 5173
- [ ] Database has been seeded (run `node seeder.js`)

---

## 🎯 Test 1: Browse Products on Homepage

### Steps:
1. Open browser: `http://localhost:5173`
2. You should see:
   - Hero section with banner
   - Gender collection section
   - New arrivals
   - Product grid with items

### Expected Result:
- Products display with images
- Prices show correctly
- Can click on products

### If Not Working:
```bash
# Check backend logs
cd backend
npm run dev

# Check if products exist in database
mongo
use ecommerce
db.products.find()
```

---

## 🎯 Test 2: Register New User Account

### Steps:
1. Click "Register" in navbar
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Sign Up"

### Expected Result:
- Success toast notification
- Redirected to homepage
- User logged in automatically

### If Not Working:
- Check browser console (F12)
- Check backend terminal for errors
- Verify API_URL in frontend/.env

---

## 🎯 Test 3: Login as Admin

### Steps:
1. Click "Login" in navbar
2. Enter credentials:
   - Email: `admin@ecommerce.com`
   - Password: `admin123`
3. Click "Sign In"

### Expected Result:
- Success toast notification
- Redirected to homepage
- User menu shows admin options

### Admin Panel Access:
1. Go to: `http://localhost:5173/admin`
2. Should see dashboard

---

## 🎯 Test 4: Add Products to Cart

### Steps:
1. Browse products on homepage
2. Click on any product
3. Select size and color
4. Click "Add to Cart"
5. Click cart icon in navbar

### Expected Result:
- Cart drawer opens
- Product appears in cart
- Quantity can be updated
- Total price calculates

### If Not Working:
- Login first (cart requires authentication)
- Check browser console
- Check network tab for API errors

---

## 🎯 Test 5: Manage Products in Admin Panel

### Steps:
1. Login as admin
2. Go to: `http://localhost:5173/admin/products`
3. View all products
4. Click "Edit" on any product
5. Toggle "Featured" status

### Expected Result:
- Products list displays
- Can edit product details
- Can delete products
- Can toggle featured status

---

## 🎯 Test 6: View Analytics Dashboard

### Steps:
1. Login as admin
2. Go to: `http://localhost:5173/admin`
3. View dashboard

### Expected Result:
- Total revenue displayed
- Total orders count
- Total products count
- Total users count
- Recent orders table
- Top products list
- Category statistics

---

## 🎯 Test 7: AI Features

### 7.1 Smart Search
**Steps:**
1. Use search bar in navbar
2. Try searches:
   - "cheap red shirt"
   - "blue jeans"
   - "women top"

**Expected Result:**
- Relevant products appear
- Understands color keywords
- Understands price keywords

**Test API Directly:**
```bash
# Using curl or Postman
POST http://localhost:5000/api/ai/search
Body: {
  "query": "cheap red shoes"
}
```

### 7.2 Personalized Recommendations
**Steps:**
1. Login as user
2. Browse several products
3. Go to homepage
4. Look for "Recommended for You" section

**Test API:**
```bash
GET http://localhost:5000/api/ai/recommendations
Authorization: Bearer YOUR_TOKEN
```

### 7.3 AI Chatbot
**Test API:**
```bash
POST http://localhost:5000/api/ai/chatbot
Body: {
  "message": "How can I track my order?"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "response": "To track your order, please go to 'My Orders' section..."
  }
}
```

---

## 🔧 Common Issues & Fixes

### Issue 1: Products Not Showing
**Fix:**
```bash
cd backend
node seeder.js
```

### Issue 2: Login Not Working
**Fix:**
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET in backend/.env
- Restart backend server

### Issue 3: Cart Not Working
**Fix:**
- Must be logged in
- Check AuthContext is wrapped in App.jsx
- Check CartContext is wrapped in App.jsx

### Issue 4: Admin Panel 403 Error
**Fix:**
- Login with admin credentials
- Check user role in database:
```bash
mongo
use ecommerce
db.users.find({ email: "admin@ecommerce.com" })
```

### Issue 5: AI Features Not Working
**Fix:**
- Check backend routes are registered
- Test API endpoints with Postman
- Check backend logs for errors

---

## 🧪 API Testing with Postman/Thunder Client

### 1. Test Authentication
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@ecommerce.com",
  "password": "admin123"
}
```

### 2. Test Products
```
GET http://localhost:5000/api/products
```

### 3. Test AI Search
```
POST http://localhost:5000/api/ai/search
Body: {
  "query": "red shirt"
}
```

### 4. Test Recommendations
```
GET http://localhost:5000/api/ai/recommendations
Authorization: Bearer YOUR_TOKEN
```

### 5. Test Admin Dashboard
```
GET http://localhost:5000/api/admin/dashboard
Authorization: Bearer YOUR_TOKEN
```

---

## 📊 Verification Checklist

After all tests:
- [ ] Can browse products
- [ ] Can register new account
- [ ] Can login as admin
- [ ] Can add to cart
- [ ] Can view cart
- [ ] Can access admin panel
- [ ] Dashboard shows stats
- [ ] Can manage products
- [ ] Can manage orders
- [ ] Can manage users
- [ ] Smart search works
- [ ] Recommendations work
- [ ] Chatbot responds

---

## 🚨 Emergency Reset

If everything breaks:
```bash
# 1. Stop all servers (Ctrl+C)

# 2. Clear database
mongo
use ecommerce
db.dropDatabase()
exit

# 3. Reseed database
cd backend
node seeder.js

# 4. Clear browser data
# Open browser console (F12)
localStorage.clear()
sessionStorage.clear()

# 5. Restart servers
cd backend
npm run dev

cd frontend
npm run dev
```

---

## 📞 Need Help?

1. Check browser console (F12)
2. Check backend terminal logs
3. Check MongoDB is running
4. Verify .env files are correct
5. Try emergency reset above

---

**Happy Testing! 🎉**
