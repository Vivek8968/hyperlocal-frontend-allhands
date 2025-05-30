#!/bin/bash

# Script to start all backend services for the hyperlocal marketplace

echo "🚀 Starting Hyperlocal Marketplace Backend Services..."

# Check if backend directory exists
BACKEND_DIR="../backend-analysis"
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ Backend directory not found. Please clone the backend repository first:"
    echo "git clone https://github.com/Vivek8968/hyperlocalbymanus.git ../backend-analysis"
    exit 1
fi

cd $BACKEND_DIR

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file..."
    cat > .env << EOL
# Database
DB_TYPE=sqlite
DB_PATH=/workspace/localmarket/hyperlocal.db

# JWT
JWT_SECRET_KEY=your-super-secret-jwt-key-here

# Firebase (get from Firebase Console)
FIREBASE_CREDENTIALS=path/to/firebase-credentials.json

# AWS S3 (optional for image uploads)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET_NAME=your-bucket-name

# Service Ports
USER_SERVICE_PORT=8001
SELLER_SERVICE_PORT=8002
CUSTOMER_SERVICE_PORT=8003
CATALOG_SERVICE_PORT=8004
ADMIN_SERVICE_PORT=8005
EOL
fi

# Create database directory
mkdir -p /workspace/localmarket

# Function to start a service in background
start_service() {
    local service_name=$1
    local port=$2
    echo "🌐 Starting $service_name service on port $port..."
    python run_service.py $service_name > logs/${service_name}_service.log 2>&1 &
    echo $! > logs/${service_name}_service.pid
}

# Create logs directory
mkdir -p logs

# Start API Gateway (with mock data)
echo "🌐 Starting API Gateway on port 12000..."
python api_gateway.py > logs/api_gateway.log 2>&1 &
echo $! > logs/api_gateway.pid

# Start individual services
start_service "user" 8001
start_service "customer" 8003
start_service "seller" 8002
start_service "catalog" 8004
start_service "admin" 8005

echo "✅ All services started successfully!"
echo ""
echo "📋 Service Status:"
echo "   API Gateway:      http://localhost:12000"
echo "   User Service:     http://localhost:8001"
echo "   Customer Service: http://localhost:8003"
echo "   Seller Service:   http://localhost:8002"
echo "   Catalog Service:  http://localhost:8004"
echo "   Admin Service:    http://localhost:8005"
echo ""
echo "📝 Logs are available in the logs/ directory"
echo "🛑 To stop all services, run: ./scripts/stop-backend.sh"