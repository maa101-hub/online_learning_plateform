import React from 'react'
import Navbar from '../../components/Home/navbar'
import Footer from '../../components/Home/footer'
import ContactModule from '../../components/Contact/contact'


const Contact = () => {
  return (
    <div className='w-full'>
       <Navbar/>
       <ContactModule/>
       <Footer/>
      
    </div>
  )
}

export default Contact
