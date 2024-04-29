import React from 'react'
import ReservaForm from '../components/ReservaForm'
import ListadoUsuarios from '../components/ListadoUsuarios'

export default function Reservas() {
  return (
    <>
  <div className='container mx-auto mt-20'>
    <h1 className='font-Bebas text-5xl text-center text-white md:2/3 md:mx-auto'>
      Tu reserva, a un {''}
      <span className='text-acentColor'>Click de distancia</span>
    </h1>

    <div className='mt-12 md:flex'>

    <ReservaForm/>
    <ListadoUsuarios/>

    </div>


  </div>
    </>
    
  )
}
