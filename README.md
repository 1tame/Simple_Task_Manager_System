# 📝 Task Manager API

A simple Node.js + Express REST API for managing tasks with user authentication (JWT) and MongoDB.

## 🔧 Features

- User registration & login (with hashed passwords)
- JWT-based authentication
- Create, read, update, and delete tasks
- Update task status separately
- Task search and pagination
- User-specific task access

## User Routes (/users)

POST /users/register

POST /users/login

GET /users/profile (requires auth)

## Task Routes (/tasks) — (all require auth)

GET /tasks

POST /tasks

PUT /tasks/:id

PATCH /tasks/:id

DELETE /tasks/:id

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- dotenv + cors
