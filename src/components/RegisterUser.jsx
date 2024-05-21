import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import Error from "./Error";
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
export default function RegisterUser() {
  const { login } = useAuth(); // Importar login desde el contexto


  const { register, handleSubmit, formState: { errors }, getValues } = useForm(); 
  const navigate = useNavigate();

  const onSubmit = (data) => {
  
    const formData = getValues();
 
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al enviar los datos al servidor');
      

    }
    Swal.fire({
      title: "Usuario registrado!",
      text: "Usuario registrado exitosamente",
      icon: "success",
      color:"#1d1d1d",
      iconColor:"#77da7e",
      confirmButtonColor:"#77da7e"
    });

     login(formData); // Almacenar datos del usuario en el contexto
          // Almacenar datos del usuario en localStorage
          localStorage.setItem("user", JSON.stringify(formData));
    // Cambiar a la vista de inicio de sesión
    navigate('/login');
  })
  .catch(error => {
    console.error('Error al registrar usuario:', error);
  });
  };
  
  



  const mensaje =  'Crear Usuario';

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 md:w-1/2 w-full">
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='font-black text-2xl py-4 text-center text-textColor '>{mensaje}</h1>

            <>
              <div className="mb-5 font-Onest font-normal flex items-center gap-2">
                <FaUser className="w-4 text-textColor" />
                <input
                name="name"
                  id="name"
                  className="w-full p-3  rounded-md border-acentColor border-2"
                  type="text"
                  placeholder="Nombre de usuario"
                  onChange={(event) => setFormData({...formData, name:event.target.value})}
                  {...register('name', {
                    required: 'El Nombre de usuario es Obligatorio',
                    minLength: {
                      value: 4,
                      message: 'Mínimo 4 caracteres'
                    },
                    maxLength: {
                      value: 45,
                      message: 'Máximo 45 caracteres'
                    }
                  })}
                />
              </div>
              {errors.name && <Error>{errors.name.message}</Error>}
            </>
        
          <div className="mb-5 font-Onest font-normal flex items-center gap-2">
            <FaEnvelope className="w-4 text-textColor" />
            <input
            name="email"
              id="email"
              className="w-full p-3  rounded-md border-acentColor border-2"
              type="email"
              placeholder="Email"
              onChange={(event) => setFormData({...formData, email:event.target.value})}
              {...register("email", {
                required: "El Email es Obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email no válido'
                }
              })}
            />
          </div>
          {errors.email && <Error>{errors.email.message}</Error>}
          <div className="mb-5 font-Onest font-normal flex items-center gap-2">
            <FaLock className="w-4 text-textColor" />
            <input
            name="password"
              id="password"
              className="w-full p-3  rounded-md border-acentColor border-2"
              type="password"
              placeholder="Contraseña"
              onChange={(event) => setFormData({...formData, password:event.target.value})}
              {...register("password", {
                required: "La contraseña es Obligatoria"
              })}
            />
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}
          <div className="items-center justify-around text-center flex py-4 gap-2">
          <button className=
              "bg-textColor  rounded-md text-acentColor px-6 py-3   md:text-[.9rem] font-Onest uppercase hover:bg-acentColor hover:text-textColor" 
                onClick={handleSubmit}>  Registrar </button>

              </div>

              
                <div className="text-center py-4">
                  
                    ¿Ya tienes una cuenta? <a className="text-ms border-b-2 border-acentColor" href="/login">Iniciar Sesión
                  </a>
                </div>
             
        </form>
      </div>
    </div>
  );
}
