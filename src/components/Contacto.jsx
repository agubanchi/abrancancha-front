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
    <section id="contacto" className="py-10 pt-[16rem] px-3 text-white mx-auto md:w-2/3">
      <div className="text-center mt-8">
        <h1 className="sm:text-5xl text-3xl font-bold text-white font-Bebas ">
          Contacto
        </h1>

        <div className="mt-16 flex md:flex-row flex-col gap-6 max-w-5xl  bg-acentColor md:p-6 p-2 rounded-lg mx-auto">
          <form className="flex flex-col flex-1 gap-5" ref={form} onSubmit={sendEmail}>
            <label className='font-bold text-left'>Nombre</label>
            <input className='border-2 border-white bg-transparent py-2 px-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3' type="text" name="user_name" placeholder='Nombre' />
            <label className='font-bold text-left'>Email</label>
            <input className='border-2 border-white bg-transparent py-2 px-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3' type="email" name="user_email" placeholder='ejemplo@email.com' />
            <label className='font-bold text-left'>Mensaje</label>
            <textarea className='font-bold text-left border-2 border-white bg-transparent py-2 px-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3' name="message" placeholder='Escribe aqui tu mensaje...' />
            <button className='bg-white font-Bebas text-2xl text-textColor py-2 rounded placeholder:font-light placeholder:text-textColor placeholder:px-3 hover:bg-textColor hover:text-white ' type="submit">Enviar</button>
          </form>
       
        </div>
      </div>
    </section>
  );
};

export default Contacto;
