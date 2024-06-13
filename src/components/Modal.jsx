import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import ReservaForm from './ReservaForm';

const Modal = ({ visible, onClose, editingReservation }) => {

  const handleOnClose = (e) => {
    if (e.target.id === 'container-modal') onClose();
  };

  if (!visible) return null;

  return (
    <div id='container-modal' className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999]' onClick={handleOnClose}>
      <div className="bg-black/30 p-2 rounded w-3/4 mt-2" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-end mr-6 mt-2 pt-6'>
          <IoIosCloseCircle className='cursor-pointer text-acentColor text-2xl' onClick={onClose} />
        </div>
        <ReservaForm onClose={onClose} editingReservation={editingReservation} />
      </div>
    </div>
  );
};

export default Modal;
