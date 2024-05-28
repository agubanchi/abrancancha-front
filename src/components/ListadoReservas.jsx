// ListadoUsuarios.js
// import React from "react";
// import useStore from "../userStore";
// import DetalleReserva from "./DetalleReserva";

// export default function ListadoReservas() {
//   const reservationsList = useStore((state) => state.reservations);

//   return (
//     <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll scrollbar scrollbar-thumb-acentColor scrollbar-thumb-radius">
//       {reservationsList.length ? (
//         <>
//           <h2 className="font-black text-3xl text-center text-acentColor">Listado de Reserva</h2>
//           <p className="text-lg mt-5 text-center mb-10 text-white">Verifica tus{' '}
//           <span className="text-acentColor font-bold">Reservas</span>
//           </p>
//           {reservationsList.map((reserva) => (
//             <DetalleReserva key={reserva.id} reserva={reserva} />
//           ))}
//         </>
//       ) : (
//         <>
//           <h2 className="font-black text-3xl text-center text-acentColor">No hay Reservas</h2>
//           <p className="text-xl mt-5 mb-10 text-center text-white">
//             Comienza agregando tu Reserva{' '}
//             <span className="text-acentColor font-bold">y la verás aquí</span>
//           </p>
//         </>
//       )}
//     </div>
//   );
// }




//este codigo muestra las reservas por usuarios:

import React, { useEffect, useState } from "react";
import DetalleReserva from "./DetalleReserva";
import { useAuth } from "../context/AuthContext";
import useStore from "../userStore";
export default function ListadoReservas() {
  const { user: authUser } = useAuth(); // Obtener el usuario autenticado desde el contexto
  const [reservations, setReservations] = useState([]);
  const deleteReservation = useStore((state) => state.deleteReservation);
  const getReservationById = useStore((state) => state.getReservationById);

  const handleDeleteReservation = (reservationId) => {
    deleteReservation(reservationId);
    setReservations(reservations.filter(reserva => reserva.id !== reservationId));
  };

  const handleEditReservation = (reservationId) => {
    getReservationById(reservationId); // Establecer la reserva activa
  };



  useEffect(() => {
    if (authUser && authUser.id) {
      fetch(`http://localhost:3000/reservations?userId=${authUser.id}`)
        .then((response) => response.json())
        .then((data) => setReservations(data))
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
            <DetalleReserva key={reserva.id} reserva={reserva} handleDeleteReservation={handleDeleteReservation} handleEditReservation={handleEditReservation} />
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
