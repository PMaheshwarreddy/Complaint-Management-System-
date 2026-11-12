<div align="center">

# 🏛️ Open-Source Complaint Management System (CMS)

### *A robust, transparent, and scalable end-to-end grievance resolution platform for universities, enterprises, and communities.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.2+-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18+-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Uploads-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

[Key Features](#-key-features) •
[System Architecture](#-system-architecture) •
[Grievance Lifecycle](#-grievance-lifecycle) •
[Role Matrix](#-role-based-access-control-rbac) •
[Getting Started](#-getting-started) •
[API Documentation](#-api-endpoints) •
[Contributing](#-contributing)

</div>

---

## 📌 Overview

**Complaint Management System (CMS)** is a production-ready, full-stack open-source platform designed to modernize issue reporting and maintenance workflows. It replaces unstructured channels (emails, paper registers, verbal reports) with a structured, verifiable, and role-driven lifecycle.

Whether deployed across a university campus, a residential complex, or a corporate workspace, the system guarantees **transparency**, **cryptographic deduplication**, **media verification**, and **complete accountability** from complaint submission through resolution.

---

## 🌟 Key Features

- 🔐 **Google OAuth 2.0 Authentication**: One-click Google sign-in with session persistence stored securely in MongoDB.
- 🌐 **Open & Customizable Email Access**: Works out-of-the-box with **any** Google email address, or can optionally restrict registration to specific organization domains (`ALLOWED_EMAIL_DOMAIN`).
- 👥 **Four-Tier Role-Based Access Control (RBAC)**: Distinct permissions and tailored views for **Complainants**, **Verifiers**, **Technicians**, and **Administrators**.
- 🛡️ **Cryptographic Deduplication (Anti-Spam)**: Implements automated SHA-256 payload hashing to prevent duplicate grievances from cluttering the backlog.
- 📸 **Cloud Media Attachments**: Upload and preview high-resolution images or videos as evidence directly through Cloudinary.
- ⚡ **Reactive, Paginated Dashboards**: Built with React 18 and TanStack React Query featuring infinite scrolling, debounce-filtered search, and instant toast notifications.
- 📊 **Administrative Insights & Analytics**: Real-time status counters and user management tools to monitor operational efficiency.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 18 + Vite)"]
        UI["Tailwind CSS UI + Sonner Toasts"]
        Router["React Router v6"]
        Query["TanStack React Query Cache"]
        UserCtx["User Auth Context"]
    end

    subgraph Server["Backend API (Express.js / Node.js)"]
        Passport["Passport.js Google OAuth 2.0"]
        Session["express-session (MongoDB Store)"]
        RoleMW["RBAC Middleware (CheckRole)"]
        UploadMW["Cloudinary File Upload & Cleanup"]
        CryptoMW["SHA-256 Deduplication Engine"]
        Controllers["Controllers (Complaints & Users)"]
    end

    subgraph Data["Storage & Third-Party Services"]
        Mongo[("MongoDB Database")]
        Cloudinary[("Cloudinary Media Storage")]
        GoogleOAuth[("Google Identity Services")]
    end

    UI --> Router --> Query
    Query --> Server
    Server --> Passport --> GoogleOAuth
    Server --> Session --> Mongo
    Server --> UploadMW --> Cloudinary
    Server --> CryptoMW --> Mongo
    Server --> Controllers --> Mongo
```

---

## 🔄 Grievance Lifecycle

Every complaint follows an audited state machine to guarantee that issues are inspected before dispatch and confirmed upon resolution:

```mermaid
stateDiagram-v2
    [*] --> Pending: Complainant submits complaint with photo/video proof
    Pending --> Verified: Verifier inspects & verifies legitimacy
    Pending --> Rejected: Verifier dismisses invalid or duplicate complaint
    Pending --> Withdrawn: Complainant deletes unsolved complaint
    Verified --> Accepted: Domain Technician claims the task
    Accepted --> Solved: Domain Technician completes fix & marks solved
    Solved --> [*]
    Rejected --> [*]
    Withdrawn --> [*]
```

### Complaint Status Reference
| Status Code | Status Name | Description |
|:---:|:---:|---|
| `0` | **Pending** | Newly submitted, awaiting initial verification by staff. |
| `1` | **Verified** | Approved by a Verifier; routed to technicians in that discipline. |
| `2` | **Accepted** | Claimed by an assigned technician currently working on the resolution. |
| `3` | **Solved** | Issue resolved and verified completed. |
| `4` | **Rejected** | Marked invalid, spurious, or untraceable by a Verifier. |

---

## 👥 Role-Based Access Control (RBAC)

| Capability | Complainant (`0`) | Verifier (`1`) | Technician (`2`) | Admin (`3`) |
|---|:---:|:---:|:---:|:---:|
| Submit Grievances with Media Proof | ✅ | ❌ | ❌ | ❌ |
| View Personal Filed Grievances | ✅ | ❌ | ❌ | ❌ |
| Withdraw / Delete Unsolved Complaints | ✅ | ❌ | ❌ | ❌ |
| Verify or Reject Pending Issues | ❌ | ✅ | ❌ | ❌ |
| View Domain-Specific Work Queue | ❌ | ❌ | ✅ | ❌ |
| Accept & Solve Assigned Jobs | ❌ | ❌ | ✅ | ❌ |
| Provision Verifiers & Technicians | ❌ | ❌ | ❌ | ✅ |
| Block / Unblock User Access | ❌ | ❌ | ❌ | ✅ |
| Access Global System Metrics & Counts | ❌ | ❌ | ❌ | ✅ |

---

## 🛠️ Tech Stack

- **Frontend**:
  - **React 18** (Vite build tool)
  - **Tailwind CSS** (Responsive UI design)
  - **React Router v6** (Client-side routing)
  - **TanStack React Query v5** (Server-state caching, optimistic updates, infinite scroll)
  - **Axios** (HTTP client with credential support)
  - **Sonner** (Toast notification system)
- **Backend**:
  - **Node.js** & **Express.js** (ES Modules)
  - **MongoDB** & **Mongoose ODM**
  - **Passport.js** (`passport-google-oauth20`)
  - **express-session** with `connect-mongodb-session`
  - **Cloudinary SDK** with `express-fileupload`
  - **Crypto** (Native SHA-256 hashing)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas URI)
- A [Google Cloud Console](https://console.cloud.google.com/) project with OAuth 2.0 Credentials
- A free [Cloudinary](https://cloudinary.com/) account for media uploads

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/complaint-management-system.git
cd complaint-management-system
```

---

### Step 2: Configure the Backend

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd Campus_concern/backend
   npm install
   ```

2. Create your environment configuration:
   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` variables:
   ```env
   PORT=5000
   NODE_ENV=development
   BACKEND_DOMAIN=http://localhost:5000
   FRONTEND_DOMAIN=http://localhost:5173

   # MongoDB
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=ComplaintManagement
   SESSION_SECRET_KEY=generate_a_secure_random_string_here

   # Google OAuth 2.0 Credentials
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   # Optional: Set to restrict logins (e.g. yourcompany.com), or leave blank for any email
   ALLOWED_EMAIL_DOMAIN=

   # Cloudinary Media Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The API will start at `http://localhost:5000`.*

---

### Step 3: Configure the Frontend

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd Campus_concern/frontend
   npm install
   ```

2. Create your frontend `.env`:
   ```bash
   cp .env.example .env
   ```

3. Ensure the backend endpoint matches your server port:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Launch the frontend client:
   ```bash
   npm run dev
   ```
   *The application will open at `http://localhost:5173`.*

---

## 🔑 Setting up Google OAuth 2.0

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., `Complaint-Management-System`).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - User Type: **External**.
   - Fill in App Name, User support email, and Developer contact information.
   - Scopes: Add `.../auth/userinfo.email` and `.../auth/userinfo.profile`.
4. Go to **Credentials** > **Create Credentials** > **OAuth client ID**:
   - Application Type: **Web application**.
   - Authorized JavaScript origins: `http://localhost:5000` and `http://localhost:5173`.
   - Authorized redirect URIs: `http://localhost:5000/grievance/auth/google/callback`.
5. Copy your **Client ID** and **Client Secret** into your backend `.env` file.

---

## 📡 API Endpoints

### Authentication (`/grievance/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/google` | Public | Initiates Google OAuth flow |
| `GET` | `/google/callback` | Public | OAuth callback URL |
| `GET` | `/pingUser` | Authenticated | Returns current authenticated user and role |
| `GET` | `/logout` | Authenticated | Logs out user and destroys session |
| `POST`| `/createUser` | Admin | Adds a Verifier or Technician account |
| `PUT` | `/blockUser/:id` | Admin | Blocks an account |
| `PUT` | `/unblockUser/:id` | Admin | Unblocks an account |
| `GET` | `/users/:suburl` | Admin | Paginated list of users |

### Grievance Management (`/grievance`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Complainant | Registers complaint with multipart media proof |
| `GET` | `/complaints/:suburl` | Authenticated | Fetches paginated complaints by role filter |
| `GET` | `/complaint/:complaintId`| Authenticated | Detailed view of single complaint |
| `POST` | `/verify` | Verifier | Marks complaint as Verified |
| `PUT` | `/reject` | Verifier | Marks complaint as Rejected |
| `POST` | `/accept` | Technician | Claims complaint under technician's domain |
| `POST` | `/solve` | Technician | Marks task as Solved |
| `DELETE`| `/delete` | Complainant | Retracts/deletes user's unsolved complaint |
| `GET` | `/complaintcount` | Admin | Status count metrics aggregation |

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create! Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## ⭐ Show your support

If this project helped you or your organization, give it a **⭐️ on GitHub**!

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
