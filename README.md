# My People — Customer Management System

A full-stack CRUD web application for managing customer records, built with React, Node.js, Express, and MongoDB. Includes authentication, search/filter, dashboard analytics, and pagination.

## Features

- **Full CRUD operations** — create, view, update, and delete customer records
- **Authentication** — secure login using hashed passwords (bcrypt) and JWT tokens
- **Search & filter** — find customers instantly by name, email, or subscription plan
- **Dashboard stats** — at-a-glance summary cards showing customer counts by plan
- **Pagination** — clean navigation through large customer lists
- **Responsive UI** — built with React-Bootstrap for a clean, corporate design

## Tech Stack

**Frontend:** React, React-Bootstrap, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose ODM)
**Auth:** JSON Web Tokens (JWT), bcrypt.js

## Project Structure

```
customer-management-system/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic for customers and auth
│   ├── middleware/       # JWT authentication middleware
│   ├── models/           # Mongoose schemas (Customer, User)
│   ├── routes/           # API route definitions
│   └── server.js         # App entry point
└── frontend/
    └── src/
        ├── components/    # React components (form, list, login, stats)
        ├── services/      # Axios API calls
        └── App.js         # Root component
```

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB connection (local install or MongoDB Atlas)

### Setup

1. Clone the repository
```bash
git clone https://github.com/Alishba-Abdul-Suboor/customer-management-system.git
cd customer-management-system
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file inside `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

4. Start the backend
```bash
npm run dev
```

5. In a new terminal, install and start the frontend
```bash
cd frontend
npm install
npm start
```

6. Open `http://localhost:3000` in your browser

### First-time login

Since there's no public signup form, create your first user by sending a one-time request to the register endpoint:
```bash
POST http://localhost:5000/api/auth/register
Body: { "username": "admin", "password": "yourpassword" }
```
Then log in through the app using those credentials.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/api/auth/register` | Create a new user (one-time setup) |
| POST | `/api/auth/login` | Log in and receive a JWT token |
| GET | `/api/customers` | Get all customers |
| POST | `/api/customers` | Create a new customer |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |

## Author

Alishba Abdul Suboor
