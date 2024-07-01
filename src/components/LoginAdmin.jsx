import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import ErrorComp from "./Error";
import { useState } from "react";
import { Endpoint } from "../services/fetchs";

export default function LoginAdmin() {
  const { fetchGet } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

 

  const { register, handleSubmit, formState: { errors }, getValues } = useForm(); 
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    const formData = getValues();
    // fetch('http://localhost:3000/admin')
    fetchGet(Endpoint.administrators)
      .then(response => {
        if (!response.ok) {
          throw new ErrorComp('Error al obtener los usuarios');
        }
        return response.json(); // Asegúrate de obtener los datos correctamente
      })
      .then(users => {
        // Verificar si el email y la contraseña coinciden con algún usuario en la base de datos
        users.forEach(user => {
          if (user.email === formData.email && user.password === formData.password) {
            alert('Correcto!');
            navigate('/dahsboard');
          }
          else{
            alert('Error!');
          }
        });
       
       
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  
  



  const mensaje =  'Ingresa los datos de acceso';

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 md:w-1/2 w-full">
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='font-black text-2xl py-4 text-center text-textColor '>{mensaje}</h1>

           
        
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
          {errors.email && <ErrorComp>{errors.email.message}</ErrorComp>}
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
          {errors.password && <ErrorComp>{errors.password.message}</ErrorComp>}
          <div className="items-center justify-around text-center flex py-4 gap-2">
          <button className=
              "bg-textColor  rounded-md text-acentColor px-6 py-3   md:text-[.9rem] font-Onest uppercase hover:bg-acentColor hover:text-textColor" 
                onClick={handleSubmit}>  Reservar Cancha </button>

              </div>

              
                <div className="text-center py-2">
                <a className="text-ms border-b-2 border-acentColor" href="#">
                    ¿Olvidaste tu Contraseña? 
                  </a>
                </div>
                <div className="text-center py-2">
               
                    ¿No estás registrado?  <a className="text-ms border-b-2 border-acentColor" href="/registrar"> Registrate
                  </a>
                </div>
             
        </form>
      </div>
    </div>
  );
}
