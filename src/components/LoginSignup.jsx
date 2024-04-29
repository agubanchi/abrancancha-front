import { useState } from "react";
import { FaUser, FaLock, FaEnvelope   } from "react-icons/fa";

export default function LoginSignup() {






  return (
    <>
<div className="flex items-center justify-center h-screen px-5">
    <div className="bg-acentColor py-5 px-4 rounded-md md:w-1/3 w-full">
    <form action="" className=''>
      <h1 className='text-center text-textColor py-4'>Registrarse</h1>
<div className="mb-5 font-Onest font-normal   flex items-center gap-2">
<FaUser className="w-4 text-textColor"/>
                    <input  
                        id="name"
                        className=" text-[.9rem] w-full p-3 text-acentColor  border bg-textColor rounded-md placeholder:text-acentColor"  
                        type="text" 
                        placeholder="Nombre y Apellido" />
              
                    
                </div>
  
                <div className="mb-5 font-Onest font-normal  flex items-center gap-2">
                <FaEnvelope  className="w-4 text-textColor"/>
                <input  
                    id="email"
                    className=" text-[.9rem] w-full p-3 text-acentColor  bg-textColor rounded-md placeholder:text-acentColor "  
                    type="email" 
                    placeholder="Email" />

              </div>



  
              <div className="mb-5 font-Onest font-normal   flex items-center gap-2">
              <FaLock className="w-4 text-textColor"/>
                <input  
                    id="password"
                    className="text-[.9rem] w-full p-3 text-acentColor  bg-textColor rounded-md placeholder:text-acentColor"  
                    type="password" 
                    placeholder="Contraseña" />

              </div>
      <div className="items-center justify-around flex py-4">
      <button className="bg-textColor rounded-md text-acentColor px-6 py-3 gap-2 text-[.9rem] font-Onest uppercase hover:bg-white hover:text-textColor"  >Registrarse</button>
      <button className="bg-textColor rounded-md text-acentColor px-6 py-3 gap-2 text-[.9rem] font-Onest uppercase hover:bg-white hover:text-textColor">Loguearse</button>
      </div>
</form>
    </div>
</div>

    
    
    </>
  )
}
