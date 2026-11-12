# 🛠️ Complaint Management System — Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18+-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Backend REST API for the open-source **Complaint Management System**, built with Express.js, MongoDB/Mongoose, Passport Google OAuth 2.0, Cloudinary media storage, and cryptographic deduplication.

---

## 🌟 Key Features

- **Google OAuth 2.0 Authentication**: Seamless authentication using Passport.js with MongoDB session persistence.
- **Custom Domain Flexibility**: Open by default to any valid Google email account, with optional domain restriction (`ALLOWED_EMAIL_DOMAIN`).
- **Role-Based Access Control (RBAC)**:
  - `Complainant (0)`: Register, view, and retract complaints.
  - `Verifier (1)`: Review, verify, or reject pending complaints.
  - `Technician (2)`: Domain-filtered assignment (Electrical, Plumbing, IT, Mess, Others), acceptance, and resolution.
  - `Admin (3)`: System oversight, staff provisioning, account blocking/unblocking, and aggregate analytics.
- **Cryptographic Anti-Spam / Deduplication**: Calculates SHA-256 hashes of incoming complaints to prevent duplicate submissions.
- **Direct Cloud Media Uploads**: Secure image and video proof storage via Cloudinary with automatic local temp file cleanup.
- **Real-Time Analytics & Aggregations**: Aggregation pipelines for daily, weekly, monthly, and status-based breakdown metrics.

---

## 📋 Prerequisites

- **Node.js** (v18.0.0 or higher)
- **MongoDB** (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Google Cloud Console Project** with OAuth 2.0 Client ID & Secret
- **Cloudinary Account** for proof media attachments

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your configuration:
```env
PORT=5000
NODE_ENV=development
BACKEND_DOMAIN=http://localhost:5000
FRONTEND_DOMAIN=http://localhost:5173

MONGO_URL=mongodb://localhost:27017
DB_NAME=ComplaintManagement
SESSION_SECRET_KEY=your_secure_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ALLOWED_EMAIL_DOMAIN=

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_URL=cloudinary://your_key:your_secret@your_cloud_name
```

### 3. Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

---

## 📡 REST API Reference

### 🔐 Authentication (`/grievance/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/google` | Public | Initiates Google OAuth 2.0 sign-in |
| `GET` | `/google/callback` | Public | OAuth callback URL |
| `GET` | `/logout` | Authenticated | Destroys session and logs user out |
| `GET` | `/pingUser` | Authenticated | Returns logged-in user profile & role |
| `POST` | `/createUser` | Admin | Adds a new Verifier or Technician account |
| `PUT` | `/blockUser/:id` | Admin | Blocks a user account |
| `PUT` | `/unblockUser/:id` | Admin | Unblocks a user account |
| `GET` | `/users/:suburl` | Admin | Lists users with pagination |

### 📝 Complaints (`/grievance`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Complainant | Registers a new complaint with media upload |
| `GET` | `/complaints/:suburl` | Authenticated | Paginated complaints filtered by role/status |
| `GET` | `/complaint/:complaintId`| Authenticated | Retrieves detailed complaint with actor info |
| `POST` | `/verify` | Verifier | Approves/verifies a pending complaint |
| `PUT` | `/reject` | Verifier | Rejects an invalid complaint |
| `POST` | `/accept` | Technician | Claims a verified complaint in technician's domain |
| `POST` | `/solve` | Technician | Marks an accepted complaint as solved |
| `DELETE`| `/delete` | Complainant | Withdraws/deletes an unsolved complaint |
| `GET` | `/complaintcount` | Admin | Fetches counts grouped by complaint status |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
