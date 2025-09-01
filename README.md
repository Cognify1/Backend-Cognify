# Cognify Backend

Cognify is a web platform designed to provide interactive coding challenges, structured programs, and progress tracking for learners.  
This repository contains the **backend implementation**, responsible for authentication, course management, challenges, submissions, and data persistence. It exposes a RESTful API that powers the entire platform.

The backend is deployed on **Render** and integrates with a **PostgreSQL database hosted on Supabase**.

🔗 The **frontend repository** can be found here: [Cognify Frontend](https://github.com/Cognify1/Frontend-Cognify).  
That repository contains the actual web interface — the application that **Coders** interact with — which consumes the API provided by this backend.

---

## 🚀 Project Overview

The backend provides a RESTful API to support the Cognify platform, enabling the following functionalities:

- **Authentication & Authorization**: User registration, login, and role management.
- **Programs & Courses**: Creation and retrieval of learning programs, courses, and lessons.
- **Progress Tracking**: Track users’ progress through lessons and courses.
- **Challenges & Submissions**: Coding challenges with automatic test case validation in a secure sandbox.
- **Enrollments**: Manage student enrollment in programs.
- **Resources**: External references and study materials.

---

## 🏗️ Architecture

- **Backend**: Node.js (Vanilla JS) + Express
    - Authentication: bcryptjs
    - Environment: dotenv
    - Database Client: pg
    - Server utilities: cors, nodemon
- **Database**: PostgreSQL (Supabase)
- **Deployment**:
    - Backend → Render
    - Database → Supabase (PostgreSQL)

```
+----------------+          REST API         +----------------+
|  Frontend      |  <--------------------->  |    Backend     |
|  (Vanilla JS + |                           |  (Node + Exp.) |
|   HTML + CSS)  |                           |                |
+----------------+                           +----------------+
                                               |
                                               | SQL Queries
                                               v
                                        +------------------+
                                        |  Supabase (DB)   |
                                        |  PostgreSQL      |
                                        +------------------+
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: bcryptjs (password hashing)
- **Environment Management**: dotenv
- **Deployment**: Render

---

## ✅ Requirements

Before setting up the project locally, ensure you have the following installed and configured:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Supabase](https://supabase.com/) account with:
    - A PostgreSQL database project created
    - Connection credentials (host, port, database name, user, password)
- (Optional) [Postman](https://www.postman.com/) or any API testing tool for testing endpoints

> **Note:** Although the backend is designed and tested using **Supabase** as the PostgreSQL provider,  
> it will also work with any standard PostgreSQL instance (self-hosted or cloud) as long as the  
> correct environment variables are configured.

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Cognify1/Backend-Cognify.git
cd Backend-Cognify
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory based on .env.example:
```bash
# Database connection (Supabase/Postgres)
DB_HOST=your-db-host.supabase.co
DB_PORT=your-db-port
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# Server
PORT=3000
```

### 4. Initialize the database
Run the SQL scripts in `src/database/`:

- `schema.sql` → creates tables
- `seed.sql` → (optional) seeds initial data

### 5. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

The server will run at:
```bash
http://localhost:3000
```

---

## 📂 Project Structure

Backend-Cognify/  
├── src/  
│   ├── config/              → Database configuration (db.js)  
│   ├── controllers/         → Business logic for each resource  
│   ├── database/            → SQL scripts (schema & seed)  
│   └── routes/              → API endpoints per resource  
├── .env.example             → Example environment variables  
├── .gitignore               → Git ignore rules  
├── package.json             → Dependencies and scripts  
├── package-lock.json        → Dependency lock file  
└── server.js                → Application entry point

---

## 🌐 Deployment

The backend is deployed at:
https://backend-cognify.onrender.com

You can verify that the server is running with the following health-check endpoint:  
[https://backend-cognify.onrender.com/api/tester](https://backend-cognify.onrender.com/api/tester)

---

## 📌 API Usage (Examples)

### 1. Register a user
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "coder"
}
```

### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 3. Get all programs
```bash
GET /api/programs
```

### 4. Submit a challenge
```bash
POST /api/submissions/:challengeId
Content-Type: application/json

{
  "user_id": 1,
  "solution_code": "function solve(a, b) { return a + b; }"
}
```

---

## 👥 Team
Cognify was developed by a team of five dedicated members:
- Juan Camilo Villa
- Juan Pablo Rico
- Kaled Mesa
- Andrés Bolaños
- Carlos Arturo Rojas

---

## ⚠️ License
This project does not currently have a license and is intended for academic and internal use only.