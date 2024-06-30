import { useEffect, useState } from 'react';
import DashboardUsers from '../components/DashboardUsers';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import Modal from '../components/Modal';
import { Endpoint } from "../services/fetchs";

export default function Dashboard() {
  const { reservations, setReservations, token, fetchGet, fetchDelete } = useAuth();
  const [editingReservation, setEditingReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
              // fetch('http://localhost:3000/reservations/')
    fetchGet({endPoint: Endpoint.reservations})
    .then(res => res.json())
    .then(json => setReservations(json))
    .catch(err => console.error('Error fetching reservations:', err));
      }
      fetchData();
        
    // () => {    
    // // fetch('http://localhost:3000/reservations/')
    // fetchGet({endPoint: Endpoint.reservations})
    //   .then(res => res.json())
    //   .then(json => setReservations(json))
    //   .catch(err => console.error('Error fetching reservations:', err));
  }, [setReservations,token]);

  const removeReservation = (id) => {
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
          // const response = await fetch(`http://localhost:3000/reservations/${id}`, {
          //   method: 'DELETE',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // });
          const response = await fetchDelete({endPoint: Endpoint.reservations, idData: id})
          if (!response.ok) {
            throw new Error('Error al eliminar la reserva');
          }
          setReservations(prevReservations => prevReservations.filter(reserva => reserva.id !== id));
          Swal.fire({
           title: 'Eliminado!',
            text: 'La reserva ha sido eliminada.',
            icon:  'success',
            color: '#1d1d1d',
            iconColor: "#1d1d1d",
            confirmButtonColor: '#77da7e',
            cancelButtonColor: '#1d1d1d',
              
          });
        } catch (error) {
          console.error("Error al eliminar la reserva:", error);
          Swal.fire('Error', 'Hubo un problema al eliminar la reserva.', 'error');
        }
      }
    });
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReservation(null);
  };

  return (
    <>
      <h1 className="mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
        Lista de Reservas
      </h1>
      <table className="w-full h-screen">
        <thead>
          <tr className='text-center text-white flex justify-between gap-2 w-full bg-acentColor px-4'>
            <th className='w-40'>Nombre y Apellido</th>
            <th className='w-40'>Email</th>
            <th className='w-40'>Teléfono</th>
            <th className='w-40'>Cancha</th>
            <th className='w-40'>Tipo de Cancha</th>
            <th className='w-40'>Fecha</th>
            <th className='w-40'>Hora</th>
            <th className='w-40'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations && reservations.map((reserva) => (
            <DashboardUsers key={reserva.id} reserva={reserva} removeReservation={removeReservation} handleEdit={handleEdit} />
          ))}
        </tbody>
      </table>
      {showModal && <Modal visible={showModal} onClose={handleCloseModal} editingReservation={editingReservation} />}
    </>
  );
}
