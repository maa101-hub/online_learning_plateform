import React from 'react'
import Navbar from '../../components/Home/navbar'
import Hero from '../../components/Home/hero'
import SubjectSlider from '../../components/Home/subject-slider'
import LiveChat from '../../components/Home/live-chat'
import Quize from '../../components/Home/quize'
import TestimonialsSlider from '../../components/Home/testimonials'
import CTASection from '../../components/Home/cta'
import Footer from '../../components/Home/footer'
import { useAuth } from '../../utils/authProvider'
import WhyChooseUs from '../../components/Home/WhychooseUs';
import HeroSection from '../../components/Home/HeroAnimation'


const Home = () => {
  
  const {setIsLoggingOut } =useAuth();

  setIsLoggingOut(false);
  return (
    <div className='bg-blue-100 min-h-screen'>
      {/* className="" */}
      <Navbar/>
      {/* <Hero/> */}
      <HeroSection/>
      <SubjectSlider/>
      <LiveChat/>
      <Quize/>
      <WhyChooseUs/>
      <TestimonialsSlider/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Home
