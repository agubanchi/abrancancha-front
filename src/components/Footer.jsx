import React from 'react'
import { MdPhoneAndroid } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaInstagram, FaFacebookF, FaGithub  } from "react-icons/fa";
export default function Footer() {
  return (
    <>
    <div className='py-4 bg-acentColor w-full'>

<div className=' container mx-auto px-8 md:flex  justify-between items-center'>

    <div className='contact'>
        <h3 className='text-textColor font-Bebas text-2xl py-3'>Contacto</h3>
        <div className='  flex flex-col justify-center gap-2 text-[.8rem]'>
                <p className='flex items-center font-bold gap-2 '><MdPhoneAndroid /> Teléfono:    <a href="#"  className="hover:text-white">1234-567-890 </a></p> 
                <p className='flex items-center font-bold gap-2'><IoMail /> E-Mail:    <a href="#"  className="hover:text-white ">contacto.abrancancha@gmail.com </a></p> 
                    </div>
    </div>

    <div className='reserva gap-3 py-3 items-center '>
        <p className='text-center'>Abrancancha 2024 | Todos los derechos reservados©.</p>
        <p className='flex  justify-center gap-2 text-[.8rem] md:flex hidden'> <span className='font-bold'>Desarrollado por:</span>
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'> <FaGithub /> Agustin Banchi</a></span> 
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'><FaGithub /> Nicolas Mansilla</a></span>
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'><FaGithub /> Mario Patronelli</a></span>
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'><FaGithub /> Juan Tomas Lacave</a></span>
         </p>
    </div>

    <div className="social gap-3 flex ">
   <a href="#"> <FaFacebookF  className='w-8 text-white hover:text-textColor ' /></a>
   <a href="#"> <FaInstagram className='w-8 text-white hover:text-textColor'/></a>
    </div>
</div>

    </div>
    
    </>
  )
}
