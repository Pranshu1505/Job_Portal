import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import bgImg from '../assets/bg-image.jpg';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      {/* <div className="bg-cover bg-center bg-no-repeat py-16"
            style={{
                backgroundImage:
                       `url(${bgImg})`
                      // "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72')",
            }}
      ></div> */}
      {/* Background section except footer
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="bg-black/60 min-h-screen">
          <HeroSection />
          <CategoryCarousel />
          <LatestJobs />
        </div>
      </div> */}

      {/* Only Hero has image */}
      {/* <HeroSection /> */}

      {/* White sections */}
      {/* <div className="bg-gray-50 py-10">
        <CategoryCarousel />
        <LatestJobs />
      </div> */}
      <HeroSection />
      {/* <div className="bg-cover bg-center bg-no-repeat py-16"
            style={{
                backgroundImage:
                       `url(${bgImg})`
                      // "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72')",
            }} */}
          {/* <CategoryCarousel />
          <LatestJobs />
      </div> */}
      
        <CategoryCarousel />
        <LatestJobs />
      
      <Footer />
    </div>
  )
}

export default Home