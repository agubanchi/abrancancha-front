import React, { useState } from 'react';
import { FaEdit, FaCheckSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export default function DetalleReserva({ reserva, handleEditar }) {
  const { currentUser, confirmReservation, cancelReservation } = useAuth();
  const [showReservation, setShowReservation] = useState(true);

  const confirmarReserva = () => {
    Swal.fire({
      title: "Reserva confirmada!",
      text: "Su Reserva ha sido confirmada con éxito",
      icon: "success",
      confirmButtonColor: "#77da7e",
    }).then(() => {
      confirmReservation(reserva.id); // Llama al método del contexto para confirmar esta reserva
      setShowReservation(false);
    });
  };

  const cancelarReserva = () => {
    Swal.fire({
      title: "Reserva cancelada!",
      text: "Su Reserva ha sido cancelada",
      icon: "error",
      confirmButtonColor: "#ff5e5e",
    }).then(() => {
      cancelReservation(reserva.id); // Llama al método del contexto para cancelar esta reserva
      setShowReservation(false);
    });
  };

  return (
    <>
      {showReservation ? (
        <div className="bg-white rounded-xl mx-5 my-10 px-5 py-10">
          <div className='flex items-center justify-around'>
            <div>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Email: {''}
                <span className='text-sm low font-light text-textColor font-Onest'>{currentUser.email}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Teléfono: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>{currentUser.phone}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Cancha: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.cancha}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Tipo de Cancha: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.tipo}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Fecha: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.date}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Hora: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.hour}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Precio: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>$ {reserva.price}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Seña/anticipo: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>$ {reserva.price * 0.3}</span>
              </p>
              <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Estado: {''}
                <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.statusOfReservation || 'Pendiente'}</span>
              </p>
            </div>

            <div>
              <img className="w-full" src="/logo_black.svg" alt="Abrancancha" />
            </div>
          </div>

          <div className="flex justify-between py-2 gap-3 mt-4">
            <button type="button" className="flex gap-2 items-center py-3 px-6 bg-acentColor hover:bg-green-800 text-white font-bold uppercase rounded-lg text-sm" onClick={confirmarReserva}><FaCheckSquare /> Confirmar Reserva</button>
            <button type="button" className="flex gap-2 items-center py-3 px-6 bg-red-500 hover:bg-red-800 text-white font-bold uppercase rounded-lg text-sm" onClick={cancelarReserva}><MdDelete /> Cancelar Reserva</button>
          </div>

          <div className="w-full text-center py-6">
            <button type="button" className="w-full text-center justify-center flex gap-2 items-center py-3 px-6 bg-indigo-500 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg text-sm" onClick={() => handleEditar(reserva.id)}><FaEdit /> Editar Reserva</button>
          </div>
        </div>
      ) : (
        <button type="button" className="w-full text-center py-3 mb-3 px-6 bg-acentColor text-white hover:bg-white hover:text-textColor font-bold uppercase rounded-lg text-sm" onClick={() => setShowReservation(true)}>
          Ver mi Reserva del {reserva.date}
        </button>
      )}
    </>
  );
}
