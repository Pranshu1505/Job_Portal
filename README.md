<div align="center">

# 🏢 Job Portal Web Application

**A full-stack platform connecting job seekers with top recruiters — seamlessly.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-4CAF50?style=for-the-badge)](https://job-portal-frontend-svmy.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-pranshuabhishek-181717?style=for-the-badge&logo=github)](https://github.com/pranshuabhishek)
![JavaScript](https://img.shields.io/badge/JavaScript-98.6%25-F7DF1E?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## 📌 Overview

**Job Portal** is a production-ready, full-stack web application that bridges the gap between talented job seekers and forward-thinking recruiters. Built on the **MERN stack**, it delivers a smooth, real-world hiring experience — from job discovery to application submission, all in one place.

> 🔗 **Live:** [https://job-portal-frontend-svmy.onrender.com/](https://job-portal-frontend-svmy.onrender.com/)

---

## ✨ Features

### 👤 For Job Seekers
| Feature | Description |
|---|---|
| 🔐 Registration & Login | Secure JWT-based authentication |
| 🔍 Search Jobs | Filter jobs by role, location, and company |
| 📩 Apply for Jobs | One-click job application |
| 📄 Upload Resume | Cloud-powered resume upload via Cloudinary |
| ✏️ Update Profile | Manage personal info and career details |

### 🏢 For Recruiters
| Feature | Description |
|---|---|
| 🔐 Recruiter Login | Dedicated recruiter portal |
| 📝 Post New Jobs | Create detailed job listings instantly |
| 📋 Manage Jobs | Edit, update, or close job postings |
| 👥 View Applicants | Browse and review candidate applications |
| 🏢 Company Profile | Setup and manage company identity |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)
![Redux](https://img.shields.io/badge/Redux_Toolkit-593D88?style=flat-square&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

| Package | Version | Purpose |
|---|---|---|
| `react` | 18.2.0 | UI Library |
| `vite` | 5.2.0 | Build Tool |
| `@reduxjs/toolkit` | 2.2.6 | State Management |
| `redux-persist` | 6.0.0 | Persistent State |
| `react-router-dom` | 6.23.1 | Client-side Routing |
| `tailwindcss` | 3.4.4 | Utility CSS Framework |
| `axios` | 1.7.2 | HTTP Client |
| `framer-motion` | 11.3.7 | Animations |
| `@radix-ui/*` | Latest | Accessible UI Primitives |
| `lucide-react` | 0.395.0 | Icon Library |
| `sonner` | 1.5.0 | Toast Notifications |

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)

| Package | Version | Purpose |
|---|---|---|
| `express` | 4.19.2 | Web Framework |
| `mongoose` | 8.4.1 | MongoDB ODM |
| `jsonwebtoken` | 9.0.2 | JWT Authentication |
| `bcryptjs` | 2.4.3 | Password Hashing |
| `cloudinary` | 2.3.0 | Cloud File Storage |
| `multer` | 1.4.5 | File Upload Middleware |
| `cookie-parser` | 1.4.6 | Cookie Handling |
| `cors` | 2.8.5 | Cross-Origin Resource Sharing |
| `dotenv` | 16.4.5 | Environment Variables |
| `nodemon` | 3.1.3 | Dev Auto-restart |

---

## 📁 Project Structure

```
Job_Portal/
├── frontend/               # React + Vite client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── redux/          # Redux store & slices
│   │   └── utils/          # Helper functions & axios config
│   └── vite.config.js
│
├── backend/                # Node.js + Express server
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middlewares/        # Auth & file middlewares
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/pranshuabhishek/Job_Portal.git
cd Job_Portal
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in Browser
```
http://localhost:5173
```

---

## 🌐 Deployment

The application is deployed on **Render**:

| Service | URL |
|---|---|
| 🖥️ Frontend | [job-portal-frontend-svmy.onrender.com](https://job-portal-frontend-svmy.onrender.com/) |

---

## 🔮 Upcoming Features

- [ ] 🤖 **AI Resume Analyzer** — Smart feedback on resumes using AI
- [ ] 📅 **Interview Scheduling** — Calendar-based interview booking
- [ ] 📧 **Email Notifications** — Application status updates via email
- [ ] 🛡️ **Admin Dashboard** — Platform-wide analytics and controls
- [ ] 💬 **In-App Messaging** — Direct recruiter-applicant chat

---

## 👨‍💻 Author

<div align="center">

**Pranshu Abhishek**

[![GitHub](https://img.shields.io/badge/GitHub-Pranshu1505-181717?style=for-the-badge&logo=github)](https://github.com/pranshuabhishek)

*Built with ❤️ using the MERN Stack*

</div>

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

</div>
