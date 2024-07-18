import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ErrorComp from './Error';
import { Role, useAuth } from '../context/AuthContext';
import { Endpoint } from '../services/fetchs';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
// import { send, EmailJSResponseStatus } from '@emailjs/react-native';
// npm install @emailjs/browser --save
// npm uninstall --save @emailjs/react-native

export default function LoginReset() {
  const { fetchUpdate } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams(); //params.resetPassToken

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const endPoint = params.resetPassToken
        ? `${Endpoint.reset}/${params.resetPassToken}`
        : Endpoint.reset;

      const response = await fetchUpdate({
        endPoint: endPoint,
        data: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (!params.resetPassToken) {
        // crear archivo .env.local en la raiz del proyecto con estas variables
        const YOUR_SERVICE_ID = import.meta.env.VITE_YOUR_SERVICE_ID;
        const YOUR_TEMPLATE_ID = import.meta.env.VITE_YOUR_TEMPLATE_ID;
        const YOUR_PUBLIC_KEY = {
          publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY,
        };

        emailjs.send(
          YOUR_SERVICE_ID,
          YOUR_TEMPLATE_ID,
          {
            name: 'fulano',
            email: formData.email,
            message: `${window.location.href}/${data.data.resetToken}`,
          },
          YOUR_PUBLIC_KEY
        );
      }
      // ? `Se ha enviado un <b>email</b> con el <a href="${window.location.href}/${data.data.resetToken}" autofocus>link</a>
      const msgHtml = !params.resetPassToken
        ? `Se ha enviado un <b>email</b> con el link para generar una nueva, el cual es válido hasta las 00:00hs`
        : `Su nueva contraseña ha sido cambiada con exito. Vuelva a loguearse.`;
      Swal.fire({
        title: 'Contraseña reseteada!',
        html: msgHtml,
        // text: 'Se ha enviado un email con el link para generar una nueva, es valida hasta las 00:00hs',
        icon: 'success',
        iconColor: '#77da7e',
        confirmButtonColor: '#77da7e',
      });

      navigate('/');
    } catch (error) {
      // if (error instanceof EmailJSResponseStatus) {
      //   console.log('EmailJS Request Failed...', error);
      // }
      console.error('Error al resetear contraseña:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 md:w-1/2 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-black text-3xl py-4 text-center text-textColor">
            Reseteo de contraseña
          </h1>
          {!params.resetPassToken ? (
            <>
              <h1 className="font-black text-2xl py-4 text-center text-textColor">
                Ingrese su email
              </h1>
              <div className="mb-5 font-Onest font-normal flex items-center gap-2">
                <FaEnvelope className="w-4 text-textColor" />
                <input
                  name="email"
                  id="email"
                  className="w-full p-3  rounded-md border-acentColor border-2"
                  type="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'El Email es Obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email no válido',
                    },
                  })}
                />
              </div>
              {errors.email && <ErrorComp>{errors.email.message}</ErrorComp>}
            </>
          ) : (
            <>
              <h1 className="font-black text-2xl py-4 text-center text-textColor">
                Ingrese su nueva contraseña
              </h1>
              <div className="mb-5 font-Onest font-normal flex items-center gap-2">
                <FaLock className="w-4 text-textColor" />
                <input
                  name="newPassword"
                  id="newPassword"
                  className="w-full p-3  rounded-md border-acentColor border-2"
                  type="password"
                  placeholder="Contraseña"
                  {...register('newPassword', {
                    required: 'La contraseña es Obligatoria',
                  })}
                />
              </div>
              {errors.newPassword && (
                <ErrorComp>{errors.newPassword.message}</ErrorComp>
              )}
            </>
          )}
          {errorMessage && <ErrorComp>{errorMessage}</ErrorComp>}

          <div className="items-center justify-around text-center flex py-4 gap-2">
            <button className="bg-textColor rounded-md text-acentColor px-6 py-3 md:text-[.9rem] font-Onest uppercase hover:bg-acentColor hover:text-textColor">
              Resetear Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
