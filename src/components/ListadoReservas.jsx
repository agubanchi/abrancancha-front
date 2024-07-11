import React, { useEffect } from "react";
import Swal from "sweetalert2";
import DetalleReserva from "./DetalleReserva";
import { useAuth } from "../context/AuthContext";
import { Endpoint, HttpMethod, fetchAll } from "../services/fetchs";

export default function ListadoReservas({ onEdit }) {
  const { currentUser, reservations, setReservations, token } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (currentUser && currentUser.id) {
          const response = await fetchAll({
            method: HttpMethod.GET,
            endPoint: `${Endpoint.reservations}?userId=${currentUser.id}`, // Endpoint modificado para filtrar por userId
            token: token,
          });

          if (!response.ok) {
            throw new Error('Error al obtener las reservas');
          }

          const data = await response.json();
          setReservations(data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [currentUser, setReservations, token]);

  const removeReservation = async (id) => {
    // Función para eliminar la reserva, similar a tu implementación actual
  };

  const handleEditar = (id) => {
    // Función para editar la reserva, similar a tu implementación actual
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
            <DetalleReserva key={reserva.id} reserva={reserva} removeReservation={removeReservation} handleEditar={handleEditar} />
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
