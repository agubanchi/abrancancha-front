import React, { useEffect } from "react";
import DetalleReserva from "./DetalleReserva";
import useStore from "../userStore";
import { useAuth } from "../context/AuthContext";
import { ENDPOINTS, fetchGet } from "../../services/useFetch";

export default function ListadoReservas() {
  const { user: authUser } = useAuth();
  const reservations = useStore((state) => state.reservations);

  useEffect(() => {
    if (authUser && authUser.id) {
      // fetchGet(`${ENDPOINTS.reservations}/${authUser.id}`)
      fetch(`http://localhost:3000/reservations?userId=${authUser.id}`)
        .then((response) => response.json())
        .then((data) => useStore.setState({ reservations: data })) // Actualiza las reservas en el store
        .catch((error) => console.error('Error fetching reservations:', error));
    }
  }, [authUser]);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll scrollbar scrollbar-thumb-acentColor scrollbar-thumb-radius">
      {reservations.length ? (
        <>
          <h2 className="font-black text-3xl text-center text-acentColor">Listado de Reservas</h2>
          <p className="text-lg mt-5 text-center mb-10 text-white">Verifica tus{' '}
          <span className="text-acentColor font-bold">Reservas</span>
          </p>
          {reservations.map((reserva) => (
            <DetalleReserva key={reserva.id} reserva={reserva} />
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
