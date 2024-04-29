// ListadoUsuarios.js
import React from "react";
import useStore from "../userStore";
import DetalleReserva from "./DetalleReserva";

export default function ListadoUsuarios() {
  const usersList = useStore((state) => state.formData);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll scrollbar scrollbar-thumb-acentColor scrollbar-thumb-radius">
      {usersList.length ? (
        <>
          <h2 className="font-black text-3xl text-center text-acentColor">Listado de Reserva</h2>
          <p className="text-lg mt-5 text-center mb-10 text-white">Verifica tus{' '}
          <span className="text-acentColor font-bold">Reservas</span>
          </p>
          {usersList.map((user) => (
            <DetalleReserva key={user.id} user={user} />
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
