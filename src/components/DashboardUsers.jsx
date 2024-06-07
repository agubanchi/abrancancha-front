import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import useStore from "../userStore";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const DashboardUsers = ({ reserva, removeReservation }) => {
  const { users } = useAuth();
  const [showModal, setShowModal] = useState(false);
  
  
  
  
 
  const user = users.find(user => user.id === reserva.userId);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };




  return (
    <>
      <tr className='text-center text-white flex justify-between gap-2 w-full px-4'>
        {/* Mostrar los datos del usuario */}
        <td className="content-start">{user ? user.name : "Usuario no encontrado"}</td>
        <td className="content-start">{user ? user.email : "Usuario no encontrado"}</td>
        <td className="content-start">{user ? user.telefono : "Usuario no encontrado"}</td>
        <td className="content-start">{reserva.cancha}</td>
        <td className="content-start">{reserva.tipo}</td>
        <td className="content-start">{reserva.date}</td>
        <td className="content-start">{reserva.hour}</td>
        <td className='flex justify-around py-2 gap-5 items-center'>
          {/* Modifica el manejo de eventos para abrir el modal y obtener los detalles de la reserva */}
          <FaEdit className="cursor-pointer" onClick={handleOpenModal} />
          <MdDelete className="cursor-pointer" onClick={()=>removeReservation(reserva.id)} />
        </td>
      </tr>
      {/* Pasa la reserva seleccionada al modal */}
      <Modal reserva={reserva} onClose={handleCloseModal} visible={showModal} />
    </>
  );
};

export default DashboardUsers;
