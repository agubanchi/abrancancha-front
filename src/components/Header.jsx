import React, { useEffect, useState } from "react";
import { NavLink,Link, useLocation} from 'react-router-dom'
import { FaHamburger } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiFootballFill } from "react-icons/ri";
 export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
    const{pathname} = useLocation()
    console.log(pathname);



    useEffect(() => {
      window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        window.scrollY > 0 ? setSticky(true) : setSticky(false);
      });
    }, []);


   return (
     <header className="bg-textColor shadow-md fixed w-full ">
        <div className="mx-auto container px-5 py-0 ">
            <div className="flex justify-between items-center ">
                <div className="z-[999]">
                    <NavLink to="/"><img  className="w-full max-w-52" src="/logo_white.svg" alt="Abrancancha" /></NavLink>
            
                </div>
                <nav className='w-full md:flex hidden items-center gap-6 justify-around text-white font-Bebas text-2xl '>
                  <div className='w-full items-center gap-6 text-center flex justify-center'>
                <NavLink to="/reservas" className="hover:text-acentColor border-b-2 border-acentColor"> Reservar Cancha </NavLink>
                    <a href="#inicio"  className="hover:text-acentColor"> Inicio </a>
                    <a href="#galeria"  className="hover:text-acentColor"> Galería </a>
                    <a href="#contacto"  className="hover:text-acentColor"> Contacto </a>
                    <a href="#frecuentes"  className="hover:text-acentColor"> Preguntas Frecuentes </a>
                    </div>
                    <div className=''>
                    <NavLink to="/login" className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor" > Login </NavLink>
                    </div>
 </nav>


 <div
          onClick={() => setOpen(!open)}
          className={`z-[2]  ${
            open ? "text-acentColor" : "text-acentColor"
          } ${sticky?  " text-white" :""}  text-3xl md:hidden m-5`}
        >{ open?
          <IoClose className="cursor-pointer z-[9999]"/>
        
         :
         <RiFootballFill className={`cursor-pointer animate-bounce ${sticky ? "text-white" :""}`}/>
         }
        </div>

        <div
          className={`md:hidden text-gray-900 absolute w-full h-screen
      px-7 py-2 font-medium bg-textColor top-0 duration-300 ${
        open ? "right-0" : "right-[-100%]"
      }`}
        >
                     <nav className='flex flex-col justify-center h-full text-white font-Bebas text-2xl '  onClick={() => setOpen(false)}
               >
                  <div className='pt-40  flex flex-col justify-center gap-6  '>
                  <NavLink to="/reservas" className="hover:text-acentColor border-b-2 border-acentColor"> Reservar Cancha </NavLink>
                    <a href="#inicio"  className="hover:text-acentColor"> Inicio </a>
                    <a href="#galeria"  className="hover:text-acentColor"> Galería </a>
                    <a href="#contacto"  className="hover:text-acentColor"> Contacto </a>
                    <a href="#frecuentes"  className="hover:text-acentColor"> Preguntas Frecuentes </a>
                    </div>
                    <div className='py-6'>
                    <NavLink to="/login" className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor" > Login </NavLink>
                    </div>
 
 </nav>
        </div>
 
            </div>
        </div>
     </header>
   )
 }
 