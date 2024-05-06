import React from 'react';
import useStore from "../userStore";
import DashboardUsers from '../components/DashboardUsers';

export default function Dashboard({ user }) {
  const usersList = useStore((state) => state.formData);

  return (
    <>
      <h1 className="pt-[20rem] mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
        Lista de Reservas
      </h1>
      <table className="w-full">
        <thead>
          <tr className='bg-acentColor py-2 gap-2 px-6'>
            <th>Id</th>
            <th>Nombre y Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Cancha</th>
            <th>Tipo de Cancha</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <DashboardUsers key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
}
