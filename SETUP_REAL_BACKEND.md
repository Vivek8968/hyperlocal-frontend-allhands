# 🔗 Complete Backend Integration Setup Guide

This guide will help you connect the frontend to the **real FastAPI backend** instead of using mock data.

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **Python** (v3.8 or higher)
3. **Git**
4. **Firebase Account** (for authentication)

## 🚀 Quick Setup (5 Steps)

### Step 1: Clone and Setup Backend

```bash
# Clone the backend repository
git clone https://github.com/Vivek8968/hyperlocalbymanus.git ../backend-analysis
cd ../backend-analysis

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Configure Backend Environment

Create `.env` file in the backend directory:

```bash
# In backend-analysis directory
cat > .env << EOL
# Database
DB_TYPE=sqlite
DB_PATH=/workspace/localmarket/hyperlocal.db

# JWT
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Firebase (optional - for server-side verification)
FIREBASE_CREDENTIALS=

# Service Ports
USER_SERVICE_PORT=8001
SELLER_SERVICE_PORT=8002
CUSTOMER_SERVICE_PORT=8003
CATALOG_SERVICE_PORT=8004
ADMIN_SERVICE_PORT=8005

# CORS
CORS_ORIGINS=["http://localhost:3000", "https://work-2-eygayldkgafvhrut.prod-runtime.all-hands.dev"]
EOL

# Create database directory
mkdir -p /workspace/localmarket
```

### Step 3: Setup Firebase Authentication

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Create a new project** or use existing
3. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable **Google** and **Phone** providers
4. **Get Firebase config**:
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Click "Web app" icon to create/view web app
   - Copy the config object

### Step 4: Configure Frontend Environment

Create `.env.local` in the frontend directory:

```bash
# In hyperlocal-marketplace directory
cat > .env.local << EOL
# Backend URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:12000
NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8001
NEXT_PUBLIC_CUSTOMER_SERVICE_URL=http://localhost:8003
NEXT_PUBLIC_SELLER_SERVICE_URL=http://localhost:8002
NEXT_PUBLIC_CATALOG_SERVICE_URL=http://localhost:8004
NEXT_PUBLIC_ADMIN_SERVICE_URL=http://localhost:8005

# Firebase Configuration (replace with your values)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Set to false to use real backend
NEXT_PUBLIC_USE_MOCK_DATA=false
EOL
```

### Step 5: Start Services

```bash
# Start backend services (from frontend directory)
./scripts/start-backend.sh

# In a new terminal, start frontend
npm run dev
```

## 🔄 Switch to Real Backend

To use the real backend instead of mock data, you have two options:

### Option A: Use the New Real API Files

1. **Replace the API client**:
```bash
# Backup current API file
mv src/lib/api.ts src/lib/api-mock.ts

# Use the real API client
mv src/lib/api-real.ts src/lib/api.ts
```

2. **Replace Firebase config**:
```bash
# Backup current Firebase file
mv src/lib/firebase.ts src/lib/firebase-mock.ts

# Use the real Firebase config
mv src/lib/firebase-real.ts src/lib/firebase.ts
```

3. **Replace Auth Context**:
```bash
# Backup current auth context
mv src/contexts/AuthContext.tsx src/contexts/AuthContext-mock.tsx

# Use the real auth context
mv src/contexts/AuthContextReal.tsx src/contexts/AuthContext.tsx
```

### Option B: Environment Variable Toggle

Set `NEXT_PUBLIC_USE_MOCK_DATA=false` in your `.env.local` and modify the existing files to check this variable.

## 🧪 Testing the Integration

1. **Start all services** using the script above
2. **Open the frontend** at http://localhost:3000
3. **Test the following flows**:

   ✅ **Authentication**:
   - Google login
   - Phone OTP login
   - User registration

   ✅ **Shop Discovery**:
   - Location-based shop search
   - Nearby shops display
   - Shop details page

   ✅ **Product Browsing**:
   - Product search
   - Category filtering
   - Product details

   ✅ **Seller Dashboard**:
   - Shop management
   - Product inventory
   - Add/edit products

## 🔍 API Endpoint Mapping

| Frontend Function | Backend Service | Endpoint | Port |
|------------------|----------------|----------|------|
| User Login | User Service | `POST /auth/login` | 8001 |
| User Registration | User Service | `POST /auth/register` | 8001 |
| Get Nearby Shops | Customer Service | `GET /shops/nearby` | 8003 |
| Search Shops | Customer Service | `GET /shops/search` | 8003 |
| Get Shop Details | Customer Service | `GET /shops/{id}` | 8003 |
| Get Shop Products | Customer Service | `GET /shops/{id}/products` | 8003 |
| Seller Dashboard | Seller Service | `GET /shops/my-shop` | 8002 |
| Add Product | Seller Service | `POST /inventory/products` | 8002 |
| Get Categories | Catalog Service | `GET /categories` | 8004 |

## 🐛 Troubleshooting

### Backend Services Won't Start

```bash
# Check if ports are in use
lsof -i :8001 -i :8002 -i :8003 -i :8004 -i :8005 -i :12000

# Kill processes if needed
pkill -f "run_service.py"
pkill -f "api_gateway.py"

# Restart services
./scripts/start-backend.sh
```

### CORS Errors

Add your frontend URL to the backend CORS configuration:

```python
# In backend common/config/settings.py
CORS_ORIGINS: list = [
    "http://localhost:3000",
    "https://work-2-eygayldkgafvhrut.prod-runtime.all-hands.dev",
    "*"  # Remove in production
]
```

### Firebase Authentication Errors

1. **Check Firebase config** in `.env.local`
2. **Verify domain** is added to Firebase authorized domains
3. **Check browser console** for detailed error messages

### Database Errors

```bash
# Create database directory
mkdir -p /workspace/localmarket

# Check database permissions
ls -la /workspace/localmarket/

# Reset database (if needed)
rm /workspace/localmarket/hyperlocal.db
```

## 📊 Service Status Check

```bash
# Check if all services are running
curl http://localhost:12000/health  # API Gateway
curl http://localhost:8001/health   # User Service
curl http://localhost:8003/health   # Customer Service
curl http://localhost:8002/health   # Seller Service
curl http://localhost:8004/health   # Catalog Service
curl http://localhost:8005/health   # Admin Service
```

## 🛑 Stop Services

```bash
# Stop all backend services
./scripts/stop-backend.sh

# Or manually kill processes
pkill -f "python"
```

## 🔄 Switch Back to Mock Data

If you need to switch back to mock data:

```bash
# Restore mock files
mv src/lib/api-mock.ts src/lib/api.ts
mv src/lib/firebase-mock.ts src/lib/firebase.ts
mv src/contexts/AuthContext-mock.tsx src/contexts/AuthContext.tsx

# Or set environment variable
echo "NEXT_PUBLIC_USE_MOCK_DATA=true" >> .env.local
```

## 🚀 Production Deployment

For production deployment:

1. **Update environment variables** with production URLs
2. **Configure proper CORS** settings
3. **Set up SSL certificates**
4. **Use production Firebase config**
5. **Set up proper database** (MySQL/PostgreSQL)
6. **Configure load balancers** for microservices

## 📝 Next Steps

1. **Populate real data** in the backend database
2. **Implement image upload** functionality
3. **Add error handling** and loading states
4. **Set up monitoring** and logging
5. **Optimize API calls** and add caching
6. **Write integration tests**

---

🎉 **Congratulations!** You now have a fully integrated hyperlocal marketplace with real backend data!