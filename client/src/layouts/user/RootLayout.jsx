import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
   <>
   <div className='root_container'>
   <Header />
    
    <Outlet/>
  
   <Footer/>
   </div>
   
   </>
  )
}

export default RootLayout