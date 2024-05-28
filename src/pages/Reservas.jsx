import React from 'react'
import ReservaForm from '../components/ReservaForm'
import ListadoReservas from '../components/ListadoReservas'

export default function Reservas(props) {
  return (
    <>
  <div className='container mx-auto mt-20'>
    <h1 className='font-Bebas text-5xl text-center text-white  md:mx-auto'>
      Tu reserva, a un {''}
      <span className='text-acentColor'>Click de distancia</span>
    </h1>

    <div className='mt-12 md:flex'>

    <div className='md:w-1/2 lg:w-2/5 mx-5 '>
    <h2 className="font-black text-3xl text-center text-acentColor">Tu Reserva </h2>

<p className="text-lg mt-5 text-center mb-10 text-white">
  Añade tus datos para realizar {' '}
  <span className="text-acentColor font-bold">la Reserva</span>
</p>
    <ReservaForm/>
    </div>
    <ListadoReservas/>

    </div>


  </div>
    </>
    
  )
}
