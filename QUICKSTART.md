# 🚀 Quick Start Guide

Get the Task Management application running in 3 simple steps!

## Prerequisites Check

```bash
# Check Python version (need 3.9+)
python3 --version

# Check Node version (need 18+)
node --version

# Check npm
npm --version
```

## 1️⃣ Setup Backend (2 minutes)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2️⃣ Setup Frontend (2 minutes)

```bash
cd frontend
npm install
```

## 3️⃣ Run Application

**Terminal 1 - Backend:**

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

## 🎉 Access Application

- **Frontend UI**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🧪 Run Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# All tests at once
./run_tests.sh
```

## 📖 First Steps

1. Open http://localhost:5173 in your browser
2. Create your first task using the form
3. Try marking it as complete
4. Test the search and filter features
5. Delete the task

## 🐛 Troubleshooting

### Backend won't start

```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend won't start

```bash
# Delete and reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

### Port already in use

```bash
# Backend - use different port
uvicorn app.main:app --reload --port 8001

# Frontend - will prompt automatically
```

## 📚 Learn More

- [Complete Setup Guide](SETUP.md)
- [Testing Documentation](TESTING.md)
- [Architecture Details](ARCHITECTURE.md)
- [Project Summary](PROJECT_SUMMARY.md)

## 🎯 What's Next?

1. ✅ Run the application
2. ✅ Run the tests
3. ✅ Explore the features
4. ✅ Check the API docs at `/docs`
5. ✅ Review the code structure

## 💡 Key Features to Try

- ✨ Create tasks with different priorities
- 🔍 Search for tasks
- 🎯 Filter by status and priority
- ✅ Mark tasks complete/incomplete
- 🗑️ Delete tasks

## 📊 Project Stats

- **Total Files**: 50+ source files
- **Lines of Code**: 2,500+
- **Test Cases**: 48+
- **Test Coverage**: >90%
- **Setup Time**: ~5 minutes

## 🔗 Useful Commands

```bash
# Backend
uvicorn app.main:app --reload     # Start server
pytest                            # Run tests
pytest -v                         # Verbose tests
pytest --cov=app                  # With coverage

# Frontend
npm run dev                       # Start dev server
npm test                          # Run tests
npm run build                     # Production build
npm run preview                   # Preview build

# Helper Scripts
./run_backend.sh                  # Auto-setup backend
./run_frontend.sh                 # Auto-setup frontend
./run_tests.sh                    # Run all tests
```

## 🎨 UI Overview

The application features:

- 🌈 Modern gradient design
- 📱 Responsive layout
- ✨ Smooth animations
- 🎯 Clear visual feedback
- ♿ Accessible components

## 🏗️ Tech Stack

**Backend:**

- FastAPI 0.109.0
- SQLAlchemy 2.0.25
- pytest 7.4.4

**Frontend:**

- React 18.2.0
- Vite 5.0.11
- Vitest 1.2.0

## 📞 Need Help?

1. Check [SETUP.md](SETUP.md) for detailed instructions
2. Review [TESTING.md](TESTING.md) for test info
3. See [ARCHITECTURE.md](ARCHITECTURE.md) for system design
4. Read inline code comments

---

**Ready in 5 minutes!** ⚡
