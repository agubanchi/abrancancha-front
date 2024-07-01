import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import React from 'react'
import HeaderDashboard from '../components/HeaderDashboard'

export default function Layout() {
  return (
    <>
    
  
    <HeaderDashboard/>
<main className="w-full mx-auto py-0 ">
<Outlet/>
</main>
<Footer/>
    
    </>
  )
}
