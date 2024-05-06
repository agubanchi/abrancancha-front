import React from 'react';
import LoginSignup from './LoginSignup';
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ visible, onClose }) => {

  const handleOnClose = (e) => {
    if (e.target.id === 'container-modal') onClose();
  };

  if (!visible) return null;

  return (
    <div id='container-modal' className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999]' onClick={handleOnClose}>
      <div className="bg-black/30 p-2 rounded w-2/3 mt-2" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-end mr-6 mt-2 pt-6'>
          <IoIosCloseCircle className='cursor-pointer text-acentColor text-2xl' onClick={onClose} />
        </div>
        <LoginSignup />
      </div>
    </div>
  );
};

export default Modal;
