import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import useStore from "../userStore";
import Swal from "sweetalert2";

const DashboardUsers = ({ reserva }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteReservation = useStore((state) => state.deleteReservation);
  const getReservationById = useStore((state) => state.getReservationById);
  const getUserById = useStore((state) => state.getUserById);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getReservationById(reserva.id);
  }, [getReservationById, reserva.id]);

  useEffect(() => {
    if (reserva.userId) {
      getUserById(reserva.userId);
    }
  }, [getUserById, reserva.userId]);




  const handleOpenModal = () => {
    setShowModal(true);
    getReservationById(reserva.id); // Obtener los detalles de la reserva seleccionada
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
      color: "#1d1d1d",
      iconColor: "#1d1d1d",
      confirmButtonColor: "#77da7e",
      cancelButtonColor: '#1d1d1d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReservation(reserva.id);
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
      <td className="content-start">{user ? user.name : ""}</td>
        <td className="content-start">{user ? user.email : ""}</td>
        <td className="content-start">{user ? user.telefono : ""}</td>
        <td className="content-start">{reserva.cancha}</td>
        <td className="content-start">{reserva.tipo}</td>
        <td className="content-start">{reserva.date}</td>
        <td className="content-start">{reserva.hour}</td>
        <td className='flex justify-around py-2 gap-2  items-center'>
          {/* Modifica el manejo de eventos para abrir el modal y obtener los detalles de la reserva */}
          <FaEdit className="cursor-pointer" onClick={handleOpenModal} />
          <MdDelete className="cursor-pointer" onClick={() => handleEliminar(reserva.id)} />
        </td>
      </tr>
      {/* Pasa la reserva seleccionada al modal */}
      <Modal reserva={reserva} onClose={handleCloseModal} visible={showModal} />
    </>
  );
};

export default DashboardUsers;
