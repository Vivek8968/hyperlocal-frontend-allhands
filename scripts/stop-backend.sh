#!/bin/bash

# Script to stop all backend services for the hyperlocal marketplace

echo "🛑 Stopping Hyperlocal Marketplace Backend Services..."

BACKEND_DIR="../backend-analysis"
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ Backend directory not found."
    exit 1
fi

cd $BACKEND_DIR

# Function to stop a service
stop_service() {
    local service_name=$1
    local pid_file="logs/${service_name}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat $pid_file)
        if ps -p $pid > /dev/null; then
            echo "🛑 Stopping $service_name (PID: $pid)..."
            kill $pid
            rm $pid_file
        else
            echo "⚠️ $service_name process not found"
            rm $pid_file
        fi
    else
        echo "⚠️ $service_name PID file not found"
    fi
}

# Stop all services
stop_service "api_gateway"
stop_service "user_service"
stop_service "customer_service"
stop_service "seller_service"
stop_service "catalog_service"
stop_service "admin_service"

# Kill any remaining Python processes on the service ports
echo "🧹 Cleaning up any remaining processes..."
pkill -f "run_service.py"
pkill -f "api_gateway.py"

echo "✅ All backend services stopped!"