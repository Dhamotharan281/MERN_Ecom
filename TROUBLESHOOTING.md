# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions**:
- Make sure MongoDB is installed and running
- Windows: Start MongoDB service from Services
- Mac/Linux: Run `mongod` in terminal
- Check if MongoDB is running on port 27017
- Verify MONGODB_URI in backend/.env

```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB (Mac/Linux)
mongod

# Windows - Start as service
net start MongoDB
```

---

### 2. Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
- Change PORT in backend/.env to different port (e.g., 5001)
- Kill the process using the port:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

### 3. CORS Error

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions**:
- Check FRONTEND_URL in backend/.env matches your frontend URL
- Make sure backend server is running
- Clear browser cache
- Try in incognito mode

---

### 4. JWT Token Error

**Error**: `JsonWebTokenError: invalid token`

**Solutions**:
- Clear localStorage in browser
- Logout and login again
- Check JWT_SECRET in backend/.env
- Make sure token is being sent in headers

```javascript
// Clear localStorage
localStorage.clear();
```

---

### 5. Module Not Found

**Error**: `Cannot find module 'express'`

**Solutions**:
- Install dependencies:

```bash
cd backend
npm install

cd frontend
npm install
```

---

### 6. Seeder Error

**Error**: `Error seeding database`

**Solutions**:
- Make sure MongoDB is running
- Check MONGODB_URI connection string
- Delete existing data:

```bash
# In MongoDB shell
use ecommerce
db.dropDatabase()

# Then run seeder again
node seeder.js
```

---

### 7. PayPal Integration Issues

**Error**: PayPal button not showing

**Solutions**:
- Check VITE_PAYPAL_CLIENT_ID in frontend/.env
- Verify PayPal credentials are correct
- Make sure @paypal/react-paypal-js is installed
- Check browser console for errors

---

### 8. Images Not Loading

**Error**: Images showing broken icon

**Solutions**:
- Check image URLs in database
- Verify internet connection (using external images)
- Check browser console for 404 errors
- Use placeholder images for testing

---

### 9. Admin Panel Not Accessible

**Error**: 403 Forbidden or redirected

**Solutions**:
- Make sure you're logged in as admin
- Check user role in database
- Use seeded admin account:
  - Email: admin@ecommerce.com
  - Password: admin123
- Clear cookies and login again

---

### 10. Build Errors

**Error**: Build fails with various errors

**Solutions**:
- Delete node_modules and reinstall:

```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd frontend
rm -rf node_modules
npm install
```

- Clear npm cache:
```bash
npm cache clean --force
```

---

### 11. Environment Variables Not Working

**Error**: undefined environment variables

**Solutions**:
- Make sure .env file exists
- Check file name is exactly `.env` (not .env.txt)
- Restart server after changing .env
- For frontend, variables must start with `VITE_`

---

### 12. Database Seeding Issues

**Error**: Duplicate key error

**Solutions**:
- Drop the database first:

```bash
# MongoDB shell
use ecommerce
db.dropDatabase()
```

- Or delete specific collections:
```bash
db.products.deleteMany({})
db.users.deleteMany({})
```

---

### 13. Cart Not Updating

**Error**: Cart items not showing

**Solutions**:
- Check if user is logged in
- Clear localStorage
- Check browser console for errors
- Verify API endpoints are working
- Test with Postman/Thunder Client

---

### 14. Login/Register Not Working

**Error**: Authentication fails

**Solutions**:
- Check backend server is running
- Verify API_URL in frontend/.env
- Check network tab in browser DevTools
- Ensure password meets requirements (min 6 characters)
- Check MongoDB connection

---

### 15. Styling Issues

**Error**: Tailwind classes not working

**Solutions**:
- Make sure Tailwind is installed
- Check tailwind.config.js exists
- Restart frontend server
- Clear browser cache
- Check if CSS is being imported in main.jsx

---

## 🔍 Debugging Tips

### 1. Check Backend Logs
```bash
cd backend
npm run dev
# Watch console for errors
```

### 2. Check Frontend Console
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

### 3. Test API with Postman
- Import API endpoints
- Test each endpoint individually
- Check response status and data

### 4. Verify Database
```bash
# MongoDB shell
mongo
use ecommerce
db.users.find()
db.products.find()
db.orders.find()
```

### 5. Check Environment Variables
```bash
# Backend
cd backend
cat .env

# Frontend
cd frontend
cat .env
```

---

## 📞 Still Having Issues?

1. **Check the logs** - Both backend and frontend console
2. **Verify all services are running** - MongoDB, Backend, Frontend
3. **Test step by step** - Isolate the problem
4. **Check documentation** - README.md and SETUP.md
5. **Review code** - Look for typos or missing imports

---

## ✅ Quick Health Check

Run these commands to verify everything is working:

```bash
# 1. Check MongoDB
mongo --version

# 2. Check Node.js
node --version

# 3. Check npm
npm --version

# 4. Test backend
curl http://localhost:5000

# 5. Test frontend
curl http://localhost:5173
```

---

## 🎯 Prevention Tips

1. Always check environment variables first
2. Keep dependencies updated
3. Use consistent Node.js version
4. Don't commit .env files
5. Test after each major change
6. Keep MongoDB running
7. Clear cache when in doubt
8. Use version control (Git)

---

**Remember**: Most issues are related to:
- MongoDB not running
- Wrong environment variables
- Missing dependencies
- Port conflicts

Check these first! 🚀
