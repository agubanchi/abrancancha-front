import React from 'react';
import useStore from "../userStore";
import DashboardUsers from '../components/DashboardUsers';

export default function Dashboard({ reserva }) {
  const reservationsList = useStore((state) => state.reservations);

  return (
    <>
      <h1 className=" mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
        Lista de Reservas
      </h1>
      <table className="w-full h-screen">
        <thead>
          <tr className='bg-acentColor py-2 gap-2 px-6'>
            <th>Nombre y Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Cancha</th>
            <th>Tipo de Cancha</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservationsList.map((reserva) => (
            <DashboardUsers key={reserva.id} reserva={reserva} />
          ))}
        </tbody>
      </table>
    </>
  );
}
