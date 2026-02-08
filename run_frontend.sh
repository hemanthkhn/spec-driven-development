#!/bin/bash

echo "🚀 Starting React Frontend..."
echo ""

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the development server
echo ""
echo "🎯 Starting development server..."
echo "🌐 Frontend: http://localhost:5173"
echo ""
npm run dev
