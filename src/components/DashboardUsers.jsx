import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
const DashboardUsers = ({ user }) => {
  
  const [showModal,setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <tr className='text-center text-white font-medium'>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.telefono}</td>
      <td>{user.cancha}</td>
      <td>{user.tipo}</td>
      <td>{user.date}</td>
      <td className='flex justify-around py-2 gap-2  items-center'>
      <FaEdit className="cursor-pointer"  onClick={handleOpenModal}/>
      <MdDelete className="cursor-pointer"  onClick={handleOpenModal}/>
      </td>
    </tr>
    <Modal onClose={handleCloseModal} visible={showModal}/>
    </>
  );
};

export default DashboardUsers;
