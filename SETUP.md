# Quick Setup Guide for Food Delivery App

## 🚀 Quick Start (5 minutes)

### Step 1: Configure MongoDB
1. Open `backend/.env`
2. Replace `your_username`, `your_password`, and cluster URL with your MongoDB Atlas credentials
3. Generate a random JWT secret (you can use: https://randomkeygen.com/)

### Step 2: Install Dependencies
```bash
# Install frontend dependencies
npm install --legacy-peer-deps

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Run the Application

**Option A - Separate Terminals:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm start
```

**Option B - Single Command (Requires concurrently):**
```bash
npm install -g concurrently
npm run dev
```

### Step 4: Access the App
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📝 Initial Database Setup

Your MongoDB database needs two collections with sample data:

### Collection: `food_items`
Example document structure:
```json
{
  "_id": "ObjectId",
  "CategoryName": "Pizza",
  "name": "Margherita Pizza",
  "img": "image_url",
  "options": [
    {
      "half": "150",
      "full": "250"
    }
  ],
  "description": "Classic Italian pizza"
}
```

### Collection: `Categories`
Example document structure:
```json
{
  "_id": "ObjectId",
  "CategoryName": "Pizza"
}
```

## 🔑 Environment Variables Explained

**backend/.env:**
- `MONGO_URI` - Your MongoDB connection string
- `PORT` - Backend server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT authentication
- `FRONTEND_URL` - React app URL for CORS (default: http://localhost:3000)

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created with read/write permissions
- [ ] IP address whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for testing)
- [ ] `backend/.env` file configured
- [ ] Dependencies installed (frontend & backend)
- [ ] Collections created in MongoDB (food_items, Categories)
- [ ] Sample data added to collections
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000

## 🛠️ Useful Commands

```bash
# Frontend only
npm start

# Backend only (with auto-restart)
cd backend && npm run dev

# Backend only (production)
cd backend && npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🐛 Quick Fixes

**Can't connect to MongoDB?**
- Check your connection string format
- Whitelist your IP in MongoDB Atlas
- Verify database user credentials

**Port already in use?**
- Change `PORT` in `backend/.env`
- Or kill the process using that port

**Dependencies error?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install --legacy-peer-deps` again

## 📚 Next Steps

1. Create sample food items in your database
2. Create user accounts via the Signup page
3. Start customizing the app for your needs
4. Update styling and branding
5. Add more features!

---

**Need Help?** Check the main README.md for detailed information.
