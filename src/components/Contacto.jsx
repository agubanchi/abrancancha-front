import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'



const Contacto = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_iq2qone', 'template_6u26ezk', form.current, {
        publicKey: 'pI3Gbjjg7I6ql_dTF',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          Swal.fire({
            title: 'Mensaje Enviado!',
            text: 'Mensaje enviado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          form.current.reset(setTimeout(3000)); // Resetting the form
          
        },
        (error) => {
          console.log('FAILED...', error.text);
          Swal.fire({
            title: 'Error!',
            text: 'Su mensaje no pudo ser enviado',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        },
      );
  };

  return (
    <section id="contacto" className="py-10 pt-10 px-3 text-white mx-auto md:w-2/3">
      <div className="text-center mt-8">
        <h1 className="sm:text-5xl text-3xl font-bold text-white font-Bebas ">
          Contacto
        </h1>

        <div className="mt-16 flex md:flex-row flex-col gap-6 max-w-5xl  bg-white md:p-6 p-2 rounded-lg mx-auto">
          <form className="flex flex-col flex-1 gap-5" ref={form} onSubmit={sendEmail}>
            <label className='font-bold text-left text-textColor'>Nombre</label>
            <input className='border-2 border-textColor text-textColor bg-transparent py-2 px-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3' type="text" name="user_name" placeholder='Nombre' />
            <label className='font-bold text-left text-textColor'>Email</label>
            <input className='border-2 border-textColor text-textColor bg-transparent py-2 px-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3' type="email" name="user_email" placeholder='ejemplo@email.com' />
            <label className='font-bold text-left text-textColor'>Mensaje</label>
            <textarea className='text-left border-2 border-textColor text-textColor bg-transparent py-2 px-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3' name="message" placeholder='Escribe aquí tu mensaje...' />
            <button className='bg-textColor font-Bebas text-2xl text-white py-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3 hover:bg-acentColor hover:text-textColo ' type="submit">Enviar</button>
          </form>
       
        </div>
      </div>
    </section>
  );
};

export default Contacto;
