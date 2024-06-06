import { useEffect } from 'react';
import DashboardUsers from '../components/DashboardUsers';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const {reservations, setReservations } = useAuth();


// traio listado de todas las reservas almacenadas en mi db
  useEffect(() => {
    fetch('http://localhost:3000/reservations/')
      .then(res => res.json())
      .then(json => setReservations(json))
      .catch(err => console.error('Error fetching reservations:', err));
  }, [setReservations]);


  return (
    <>
      <h1 className=" mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
        Lista de Reservas
      </h1>
      <table className="w-full h-screen">
        <thead>
          <tr className='text-center text-white flex justify-between gap-2 w-full bg-acentColor px-4'>
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
          {reservations.map((reserva) => (
            <DashboardUsers key={reserva.id} reserva={reserva}  />
          ))}
        </tbody>
      </table>
    </>
  );
}
