import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <>
    
  
    <Header/>
<main className="w-full mx-auto py-0 ">
<Outlet/>
</main>
<Footer/>
    
    </>
  )
}
