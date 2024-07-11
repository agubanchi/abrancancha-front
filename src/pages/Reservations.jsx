<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
import DashboardReservations from '../components/DashboardReservations';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import Modal from '../components/Modal';
<<<<<<< HEAD
import { Endpoint, HttpMethod, fetchAll } from '../services/fetchs'; // Asegúrate de importar correctamente

export default function Reservations() {
  const { reservations, setReservations,fetchDelete, token } = useAuth();
  const [editingReservation, setEditingReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetchAll({
          method: HttpMethod.GET,
          endPoint: Endpoint.reservations,
          token: token, // Incluye el token en la solicitud GET
        });

        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [setReservations, token]);

  const removeReservation = async (id) => {
=======

export default function Dashboard() {
  const { reservations, setReservations } = useAuth();
  const [editingReservation, setEditingReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/reservations/')
      .then(res => res.json())
      .then(json => setReservations(json))
      .catch(err => console.error('Error fetching reservations:', err));
  }, [setReservations]);

  const removeReservation = (id) => {
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la reserva',
      icon: 'warning',
      showCancelButton: true,
<<<<<<< HEAD
      confirmButtonColor: '#77da7e',
=======
      color: "#1d1d1d",
      iconColor: "#1d1d1d",
      confirmButtonColor: "#77da7e",
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
      cancelButtonColor: '#1d1d1d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
<<<<<<< HEAD
          await fetchDelete({ endPoint: `${Endpoint.reservations}/${id}`, token });  // Asegúrate de pasar el token aquí
          setReservations(prevReservations =>
            prevReservations.filter(reserva => reserva.id !== id)
          );
  
          Swal.fire({
            title: 'Eliminado!',
            text: 'La reserva ha sido eliminada.',
            icon: 'success',
            confirmButtonColor: '#77da7e',
            cancelButtonColor: '#1d1d1d',
          });
        } catch (error) {
          console.error('Error al eliminar la reserva:', error);
=======
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
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
          Swal.fire('Error', 'Hubo un problema al eliminar la reserva.', 'error');
        }
      }
    });
  };
<<<<<<< HEAD
  
  

  const handleEdit = (reservation) => {
    setShowModal(true);
    setEditingReservation(reservation);
=======

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setShowModal(true);
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
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
<<<<<<< HEAD
            <th className='w-40'>Nombre y Apellido</th>
=======
          <th className='w-40'>Nombre y Apellido</th>
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
            <th className='w-40'>Email</th>
            <th className='w-40'>Teléfono</th>
            <th className='w-40'>Cancha</th>
            <th className='w-40'>Tipo de Cancha</th>
            <th className='w-40'>Fecha</th>
            <th className='w-40'>Estado</th>
            <th className='w-40'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reserva) => (
            <DashboardReservations key={reserva.id} reserva={reserva} removeReservation={removeReservation} handleEdit={handleEdit} />
          ))}
        </tbody>
      </table>
      {showModal && <Modal visible={showModal} onClose={handleCloseModal} editingReservation={editingReservation} />}
    </>
  );
}
