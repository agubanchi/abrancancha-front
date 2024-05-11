import React from 'react'
import { MdPhoneAndroid } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaInstagram, FaFacebookF, FaGithub  } from "react-icons/fa";
export default function Footer() {
  return (
    <>
    <div className='py-4 bg-acentColor w-full'>

<div className=' container mx-auto px-8 md:flex  justify-between items-center'>

    <div>
    <img className="w-32" src="/logo_black.svg" alt="Abrancancha" />
    </div>

    <div className='reserva gap-3 py-3 items-center '>
        <p className='text-center font-bold'> Abrancancha 2024 | Todos los derechos reservados©.</p>
        <p className='  justify-center gap-2 text-[.8rem] md:flex hidden'> <span className='font-bold'>Desarrollado por:</span>
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'> <FaGithub /> Agustin Banchi</a></span> 
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'><FaGithub /> Nicolas Mansilla</a></span>
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'><FaGithub /> Mario Patronelli</a></span>
         <span className='flex gap-2 items-center'> <a href="#" className='flex gap-2 items-center hover:text-white'><FaGithub /> Juan Tomas Lacave</a></span>
         </p>
    </div>

    <div className="social gap-3 flex ">
   <a href="#"> <FaFacebookF  className='w-8 text-textColor hover:text-white ' /></a>
   <a href="#"> <FaInstagram className='w-8 text-textColor hover:text-white'/></a>
   <a href="#"> <MdPhoneAndroid  className='w-8 text-textColor hover:text-white ' /></a>
   <a href="#"> <IoMail className='w-8 text-textColor hover:text-white'/></a>
    </div>
</div>

    </div>
    
    </>
  )
}
