import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import { useAuth } from "../context/AuthContext";

const DashboardCanchas = ({ reserva, removeReservation, handleEdit }) => {
  const { users } = useAuth();
  const user = users.find(user => user.id === reserva.idUser);

  const handleOpenModal = () => {
    handleEdit(reserva);
  };

  return (
    <>
      <tr className='text-center text-white flex justify-between gap-2 w-full px-4 py-2'>
        <td className="content-start w-40">{reserva.id}</td>
        <td className="content-start w-40">{reserva.court.name}</td>
        <td className="content-start w-40">{reserva.court.idType}</td>
        <td className="content-start w-40">$ {reserva.price}</td>
        <td className="content-start w-40">{reserva.status.name}</td>
       
        <td className='flex justify-around py-2 gap-2 items-center w-40'>
          <FaEdit className="cursor-pointer" onClick={handleOpenModal} />
          <MdDelete className="cursor-pointer" onClick={() => removeReservation(reserva.id)} />
        </td>
      </tr>
    </>
  );
};

export default DashboardCanchas;
