import { useEffect } from 'react';
import DashboardUsers from '../components/DashboardUsers';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
export default function Dashboard() {
  const {reservations, setReservations } = useAuth();


// traio listado de todas las reservas almacenadas en mi db
  useEffect(() => {
    fetch('http://localhost:3000/reservations/')
      .then(res => res.json())
      .then(json => setReservations(json))
      .catch(err => console.error('Error fetching reservations:', err));
  }, [setReservations]);


//funcion para eliminar Reserva por ID, que luego paso como prop al componente ListdoReservas.
function removeReservation(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la reserva',
    icon: 'warning',
    showCancelButton: true,
    color: "#1d1d1d",
    iconColor: "#1d1d1d",
    confirmButtonColor: "#77da7e",
    cancelButtonColor: '#1d1d1d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/reservations/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al eliminar la reserva');
        }
        setReservations(prevReservations => prevReservations.filter(reserva => reserva.id !== id));
        Swal.fire('Eliminado!', 'La reserva ha sido eliminada.', 'success');
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        Swal.fire('Error', 'Hubo un problema al eliminar la reserva.', 'error');
      }
    }
  });
}


  

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
            <DashboardUsers key={reserva.id} reserva={reserva} removeReservation={removeReservation}  />
          ))}
        </tbody>
      </table>
    </>
  );
}
