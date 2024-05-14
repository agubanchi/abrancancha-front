import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import useStore from "../userStore";
import Swal from "sweetalert2";

const DashboardUsers = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteUser = useStore((state) => state.deleteUser);
  const getUserById = useStore((state) => state.getUserById);
  
  const handleOpenModal = () => {
    setShowModal(true);
    getUserById(user.id); // Obtener los detalles de la reserva seleccionada
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la reserva',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.id);
        Swal.fire(
          'Eliminado!',
          'La reserva ha sido eliminada.',
          'success'
        );
      }
    });
  };

  return (
    <>
      <tr className='text-center text-white font-medium'>
        <td  className="content-start">{user.name}</td>
        <td  className="content-start">{user.email}</td>
        <td className="content-start">{user.telefono}</td>
        <td className="content-start">{user.cancha}</td>
        <td className="content-start">{user.tipo}</td>
        <td className="content-start">{user.date}</td>
        <td className="content-start">{user.hour}</td>
        <td className='flex justify-around py-2 gap-2  items-center'>
          {/* Modifica el manejo de eventos para abrir el modal y obtener los detalles de la reserva */}
          <FaEdit className="cursor-pointer" onClick={handleOpenModal} />
          <MdDelete className="cursor-pointer" onClick={() => handleEliminar(user.id)} />
        </td>
      </tr>
      {/* Pasa la reserva seleccionada al modal */}
      <Modal reserva={user} onClose={handleCloseModal} visible={showModal} />
    </>
  );
};

export default DashboardUsers;
