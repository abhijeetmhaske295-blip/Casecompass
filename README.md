# CaseCompass 🧭⚖️

AI-powered legal case management and timeline intelligence platform. CaseCompass extracts key milestones from court orders and filings, builds chronological event graphs, flags conflicting statements, highlights approaching deadlines, and alerts users to missing evidentiary records.

---

## 🛠️ Tech Stack

- **Frontend**: JavaScript, React 18, Vite, Vanilla Modern CSS (Tailored Design System)
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, Uvicorn
- **DevOps**: Docker, Docker Compose

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ & npm
- Python 3.10+
- (Optional) Docker & Docker Compose

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```
API Documentation will be live at: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend will be available at: `http://localhost:5173`

### 4. Running with Docker Compose
```bash
docker-compose up --build
```

---

## 📂 Project Architecture

See [docs/FEATURE_LIST.md](docs/FEATURE_LIST.md) and [docs/API.md](docs/API.md) for full endpoint and system architecture documentation.
