# Expense Tracker (Full Stack)

Modern full-stack Expense Tracker with authentication, dashboard analytics, transaction CRUD, filters/search, CSV export, pagination, and dark mode.

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Charts: Recharts

## Project Structure

```
/frontend
  /components
  /pages
  /hooks
  /context
  /utils
/backend
  /controllers
  /models
  /routes
  /middleware
  /config
```

## Core Features Implemented
- User signup/login with hashed passwords
- JWT-auth protected transaction routes
- Dashboard summary cards (balance/income/expense)
- Recent transactions list
- Analytics charts (monthly income vs expense + category distribution)
- Transaction add/edit/delete
- Filters (date range, category, search, sorting)
- Pagination
- CSV export
- Dark mode toggle
- Responsive sidebar layout
- Basic form validation

## Run Locally

### 1) Start backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Start frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Transactions (JWT required)
- `GET /api/transactions`
- `GET /api/transactions/analytics`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

## Example Request Body (transaction)

```json
{
  "amount": 120.5,
  "category": "Food",
  "type": "expense",
  "date": "2026-01-10",
  "description": "Lunch and snacks"
}
```
