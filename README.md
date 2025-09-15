# Task Manager App

## Setup Instructions

### Backend
1. Navigate to `backend/`
2. Run `npm install`
3. Create a PostgreSQL database `taskdb` and update credentials in `src/db.js`
4. Run SQL script from `database/schema.sql`
5. Start server: `npm run dev`

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Start app: `npm start`

Backend runs on port 5000, Frontend on port 3000.


### Run with Docker Compose
1. Run `docker-compose up --build`
2. Frontend -> http://localhost:3000
3. Backend API -> http://localhost:5000
4. PostgreSQL -> localhost:5432
