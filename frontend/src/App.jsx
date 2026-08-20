
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
// import { Button } from "./components/ui/button.jsx";
// import Navbar from './components/shared/Navbar.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Home from './components/Home.jsx';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import JobDescription from './components/JobDescription.jsx';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs.jsx';
import PostJob from './components/admin/PostJob.jsx';
import JobSetup from './components/admin/JobSetup.jsx';
import AdminHome from './components/admin/AdminHome.jsx';
import Applicants from './components/admin/Applicants.jsx';
import SavedJobs from './components/SavedJobs.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';
import VerifyOtp from './components/auth/VerifyOtp.jsx';
import useSessionTimeout from './hooks/useSessionTimeout';




const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"login",
    element:<Login/>
  },
  {
    path:"signup",
    element:<Signup/>
  },
  {
    path:"jobs",
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"browse",
    element:<Browse/>
  },
  {
    path:"profile",
    element:<Profile/>
  },
  {
    path:"/saved-jobs",
    element:<SavedJobs/>
  },
  // admin ke liye yanha se start hoga
  {
    path:"/admin/home",
    element:<AdminHome/>
  },
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id",
    element:<JobSetup/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/reset-password/:token",
    element:<ResetPassword/>
  },
  {
    path:"/verify-otp",
    element:<VerifyOtp/>
  },

])
function App() {
  useSessionTimeout();
  return (
      <> 
        <RouterProvider router={appRouter}/>
      </>
  );
  
}

export default App;
