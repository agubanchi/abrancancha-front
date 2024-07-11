import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';

const DashboardReservations = ({ reserva, removeReservation, handleEdit }) => {
  const handleOpenModal = () => {
    handleEdit(reserva);
  };

  return (
    <>
      <tr className='text-center text-white flex justify-between gap-2 w-full px-4 py-2'>
<<<<<<< HEAD
        <td className="content-start w-40">{user ? user.fullname : "Usuario no encontrado"}</td>
        <td className="content-start w-40">{user ? user.email : "Usuario no encontrado"}</td>
        <td className="content-start w-40">{user ? user.phone : "Usuario no encontrado"}</td>
        <td className="content-start w-40">{reserva.cancha}</td>
        <td className="content-start w-40">{reserva.tipo}</td>
        <td className="content-start w-40">{reserva.date}</td>
        <td className="content-start w-40">{reserva.state}</td>
=======
        <td className="content-start w-40">{reserva.user ? reserva.user.fullname : "Usuario no encontrado"}</td>
        <td className="content-start w-40">{reserva.user ? reserva.user.email : "Usuario no encontrado"}</td>
        <td className="content-start w-40">{reserva.user ? reserva.user.phone : "Usuario no encontrado"}</td>
        <td className="content-start w-40">{reserva.court ? reserva.court.name : "Cancha no encontrada"}</td>
        <td className="content-start w-40">{reserva.court ? reserva.court.type : "Tipo no encontrado"}</td>
        <td className="content-start w-40">{new Date(reserva.timedate).toLocaleString()}</td>
        <td className="content-start w-40">{reserva.status ? reserva.status.name : 'Pendiente'}</td>
>>>>>>> 19c4bf2f39701bcf228dd5ebd271c0c22d8e08cf
        <td className='flex justify-around py-2 gap-2 items-center w-40'>
          <FaEdit className="cursor-pointer" onClick={handleOpenModal} />
          <MdDelete className="cursor-pointer" onClick={() => removeReservation(reserva.id)} />
        </td>
      </tr>
    </>
  );
};

export default DashboardReservations;
