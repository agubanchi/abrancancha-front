import React, { useEffect } from "react";
import Swal from "sweetalert2";
import DetalleReserva from "./DetalleReserva";
import { useAuth } from "../context/AuthContext";

export default function ListadoReservas({ onEdit }) {
  const { currentUser, reservations, setReservations } = useAuth();
  
  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetch(`http://localhost:3000/reservations?userId=${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => setReservations(data))
        .catch((error) => console.error('Error fetching reservations:', error));
    }
  }, [currentUser, setReservations]);

  const removeReservation = async (id) => {
    const result = await Swal.fire({
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
    });

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
  };

  const handleEditar = (id) => {
    const reservaEdit = reservations.find(reserva => reserva.id === id);
    onEdit(reservaEdit); // Pasar la reserva a editar al formulario
  };

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll ">
      {reservations.length ? (
        <>
          <h2 className="font-black text-3xl text-center text-acentColor">Listado de Reservas</h2>
          <p className="text-lg mt-5 text-center mb-10 text-white">Verifica tus{' '}
          <span className="text-acentColor font-bold">Reservas</span>
          </p>
          {reservations.map((reserva) => (
            <DetalleReserva key={reserva.id} reserva={reserva} removeReservation={removeReservation} handleEditar={handleEditar}  />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center text-acentColor">No hay Reservas</h2>
          <p className="text-xl mt-5 mb-10 text-center text-white">
            Comienza agregando tu Reserva{' '}
            <span className="text-acentColor font-bold">y la verás aquí</span>
          </p>
        </>
      )}
    </div>
  );
}
