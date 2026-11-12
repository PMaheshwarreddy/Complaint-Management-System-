# 💻 Complaint Management System — Frontend Client

[![React](https://img.shields.io/badge/React-v18.2+-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v5.1+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5+-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Modern, reactive single-page frontend application for the open-source **Complaint Management System**, built with React 18, Vite, React Router v6, Tailwind CSS, TanStack React Query, and Sonner toasts.

---

## 🌟 Key Features

- **Dynamic Role-Based Dashboards**: Automatically renders customized dashboards for Complainants, Verifiers, Technicians, and Administrators.
- **Infinite Pagination & Debounced Search**: Seamless scrolling table views with live keyword search and status filters.
- **Structured Complaint Filing Form**: Autofills verified user identity, captures issue category, building/location, description, and accepts media attachments (images/videos).
- **Proof Viewer**: Inline preview of uploaded image or video evidence.
- **Real-Time Notification Toasts**: Interactive status feedback powered by Sonner.
- **Admin Statistics Panel**: Visual breakdown of open, verified, accepted, solved, and rejected issues.

---

## 📋 Prerequisites

- **Node.js** (v18.0.0 or higher)
- **Backend API Server** running and accessible

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set your backend API endpoint:
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
src/
├── api/             # Axios API client functions
├── assets/          # SVG icons & branding graphics
├── components/      # UI components (Navbar, Footer, Tables, Cards, Modals)
├── contexts/        # UserContextProvider (session & auth state)
├── Layouts/         # IndexLayout & UserLayout route shells
├── pages/
│   ├── Admin/       # Admin dashboards, metrics, and staff management
│   ├── Complaint/   # Detailed complaint view with action buttons
│   ├── Dashboard/   # Role-specific dashboard views (User, Verifier, Tech)
│   ├── Form/        # Grievance registration form
│   ├── Home/        # Hero landing page & feature highlights
│   └── Login/       # Google sign-in portal
├── constants.js     # Role definitions, routes, building maps & styles
└── utils/           # Helper utilities
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
