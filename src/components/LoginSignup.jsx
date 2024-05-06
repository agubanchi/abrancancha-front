import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Error from "./Error";
import { useState } from "react";

export default function LoginSignup() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/reservas');
  }

  const [action, setAction] = useState("Registrarse");

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="bg-acentColor py-5 px-4 rounded-md md:w-2/3 full">
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-center text-white py-4 font-Bebas text-3xl '>{action}</h1>
          {action === "Registrarse" && (
            <>
              <div className="mb-5 font-Onest font-normal flex items-center gap-2">
                <FaUser className="w-4 text-textColor" />
                <input
                  id="name"
                  className="text-[.9rem] w-full p-3 text-acentColor border bg-textColor rounded-md placeholder:text-acentColor"
                  type="text"
                  placeholder="Nombre de usuario"
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
          )}
          <div className="mb-5 font-Onest font-normal flex items-center gap-2">
            <FaEnvelope className="w-4 text-textColor" />
            <input
              id="email"
              className="text-[.9rem] w-full p-3 text-acentColor bg-textColor rounded-md placeholder:text-acentColor"
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
              id="password"
              className="text-[.9rem] w-full p-3 text-acentColor bg-textColor rounded-md placeholder:text-acentColor"
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es Obligatoria"
              })}
            />
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}
          <div className="items-center justify-around flex py-4 gap-2">
            <button className={`${
              action === "Registrarse" ? "bg-textColor rounded-md text-acentColor px-6 py-3 text-[.9rem] font-Onest uppercase hover:bg-white hover:text-textColor" : "bg-gray-400 rounded-md text-textColor px-6 py-3 text-[.9rem] font-Onest uppercase hover:bg-white hover:text-textColor"
              }`} onClick={() => { setAction("Registrarse") }}>Registrarse</button>
            <button className={`${
              action === "Loguearse" ? "bg-textColor rounded-md text-acentColor px-6 py-3 text-[.9rem] font-Onest uppercase hover:bg-white hover:text-textColor" : "bg-gray-400 rounded-md text-textColor px-6 py-3 text-[.9rem] font-Onest uppercase hover:bg-white hover:text-textColor"
              }`} onClick={() => { setAction("Loguearse") }}>Loguearse</button>
          </div>
        </form>
      </div>
    </div>
  );
}
