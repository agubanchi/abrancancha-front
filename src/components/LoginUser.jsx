import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Error from "./Error";
import { useAuth } from "../context/AuthContext";

export default function LoginUser() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const responseUsers = await fetch('http://localhost:3000/users');
      const responseAdmins = await fetch('http://localhost:3000/admin');

      if (!responseUsers.ok || !responseAdmins.ok) {
        throw new Error('Error al obtener los usuarios o los administradores');
      }

      const users = await responseUsers.json();
      const admins = await responseAdmins.json();

      const user = users.find(user => user.email === formData.email && user.password === formData.password);
      const admin = admins.find(admin => admin.email === formData.email && admin.password === formData.password);

      if (user) {
        login(user);
        navigate('/reservas');
      } else if (admin) {
        login(admin);
        navigate('/dashboard');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage(error.message);
    }
  };

  const mensaje =  'Ingresa los datos de acceso';

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 md:w-1/2 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='font-black text-2xl py-4 text-center text-textColor'>{mensaje}</h1>
          <div className="mb-5 font-Onest font-normal flex items-center gap-2">
            <FaEnvelope className="w-4 text-textColor" />
            <input
              name="email"
              id="email"
              className="w-full p-3  rounded-md border-acentColor border-2"
              type="email"
              placeholder="Email"
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
              {...register("password", {
                required: "La contraseña es Obligatoria"
              })}
            />
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}
          {errorMessage && <Error>{errorMessage}</Error>}
          <div className="items-center justify-around text-center flex py-4 gap-2">
            <button className="bg-textColor rounded-md text-acentColor px-6 py-3 md:text-[.9rem] font-Onest uppercase hover:bg-acentColor hover:text-textColor">Iniciar Sesión</button>
          </div>
          <div className="text-center py-2">
            <a className="text-ms border-b-2 border-acentColor" href="#">¿Olvidaste tu Contraseña?</a>
          </div>
          <div className="text-center py-2">
            ¿No estás registrado? <a className="text-ms border-b-2 border-acentColor" href="/registrar">Registrate</a>
          </div>
        </form>
      </div>
    </div>
  );
}
