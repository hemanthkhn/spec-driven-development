#!/bin/bash

echo "🧪 Running All Tests..."
echo ""

# Backend tests
echo "=========================================="
echo "🐍 Backend Tests (pytest)"
echo "=========================================="
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt

echo ""
pytest -v
BACKEND_EXIT=$?

cd ..

# Frontend tests
echo ""
echo "=========================================="
echo "⚛️  Frontend Tests (Vitest)"
echo "=========================================="
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install -q
fi

echo ""
npm test
FRONTEND_EXIT=$?

cd ..

# Summary
echo ""
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
if [ $BACKEND_EXIT -eq 0 ]; then
    echo "✅ Backend tests: PASSED"
else
    echo "❌ Backend tests: FAILED"
fi

if [ $FRONTEND_EXIT -eq 0 ]; then
    echo "✅ Frontend tests: PASSED"
else
    echo "❌ Frontend tests: FAILED"
fi

echo ""
if [ $BACKEND_EXIT -eq 0 ] && [ $FRONTEND_EXIT -eq 0 ]; then
    echo "🎉 All tests passed!"
    exit 0
else
    echo "⚠️  Some tests failed"
    exit 1
fi
