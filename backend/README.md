# Farmer Voice AI Assistant — Phase 1 Backend

FastAPI backend for the Farmer Voice AI Assistant platform supporting Scheme discovery (WCD Jalgaon flow), Scheme Details, Rule-Based Eligibility Engine, Authentication (JWT / Mobile OTP / Google), and Farmer Profile management.

---

## Backend Architecture

```
Frontend (React Native / Expo)
    ↓
API Router (FastAPI Routers under /api/v1)
    ↓
Controller (Request validation & HTTP response formatting)
    ↓
Service (Business logic & Eligibility evaluation)
    ↓
Repository (SQLAlchemy ORM Data Access Layer)
    ↓
PostgreSQL Database
```

---

## Requirements

- Python 3.10+
- PostgreSQL 14+

---

## Setup & Running Instructions

### 1. Create PostgreSQL Database

Create a PostgreSQL database named `farmervoice`:
```sql
CREATE DATABASE farmervoice;
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` in the `backend/` directory:
```bash
cp .env.example .env
```

Update your database credentials in `.env`:
```env
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=farmervoice
SECRET_KEY=your_jwt_secret_key
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Alembic Database Migrations

```bash
alembic upgrade head
```

### 5. Seed Database

Seed realistic Maharashtra / WCD Jalgaon scheme data into PostgreSQL:
```bash
python -m app.seed
```

### 6. Start FastAPI Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

FastAPI Interactive Documentation will be available at:
- Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Running Automated Tests

Run the backend test suite using Pytest (uses an in-memory SQLite database):

```bash
pytest
```

---

## API Endpoints Summary

All APIs are versioned under `/api/v1`:

### Schemes
- `GET /api/v1/schemes` - Paginated scheme list (supports `category`, `search`, `page`, `limit`)
- `GET /api/v1/schemes/categories` - Scheme categories with scheme counts
- `GET /api/v1/schemes/search` - Keyword search across schemes
- `GET /api/v1/schemes/{scheme_id}` - Complete WCD Jalgaon Scheme details (*Overview, Eligibility, How to Apply, Documents, FAQs, GR, Contact*)

### Eligibility
- `POST /api/v1/eligibility/check` - Deterministic rule-based eligibility evaluation

### Auth
- `POST /api/v1/auth/send-otp` - Send mobile OTP
- `POST /api/v1/auth/verify-otp` - Verify mobile OTP and issue JWT access/refresh tokens
- `POST /api/v1/auth/google` - Authenticate via Google id_token
- `POST /api/v1/auth/refresh` - Issue new access token using refresh token
- `POST /api/v1/auth/logout` - Logout session

### Profile
- `GET /api/v1/profile` - Retrieve current user profile
- `PUT /api/v1/profile` - Update user preferred language, name, state, district
