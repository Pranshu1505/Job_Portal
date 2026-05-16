# Job Portal Web Application

A full-stack Job Portal web application built with React, Vite, Node.js, Express.js, MongoDB, and Redux Toolkit.  
This platform helps users search and apply for jobs, while recruiters can post and manage job listings efficiently.

---

## Features

### For Job Seekers
- User Registration & Login
- Browse Available Jobs
- Search Jobs by Keyword, Location, and Category
- Apply for Jobs
- Profile Management
- Resume Upload

### For Recruiters
- Recruiter Registration & Login
- Post New Jobs
- Manage Posted Jobs
- View Applicants
- Company Profile Management

---

## Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (for image/resume upload)

---

## Project Structure

```bash
job-portal/
│── frontend/
│   ├── src/
│   ├── components/
│   ├── redux/
│   └── pages/
│
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
```

---

## Installation

### Clone Repository
```bash
git clone <your-repository-link>
cd job-portal
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
npm run dev
```

### Install Backend Dependencies
```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create `.env` file inside backend folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Screenshots

- Home Page
- Login/Register
- Job Listings
- Recruiter Dashboard

(Add screenshots here later)

---

## Future Improvements

- Email Notifications
- Interview Scheduling
- Admin Dashboard
- AI Resume Analyzer

---

## Author

**Pranshu**  
Frontend & Full Stack Developer

GitHub: https://github.com/pranshuabhishek