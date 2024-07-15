import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ButtonCerrarSesion() {
  const { logout, currentUser } = useAuth(); // Obtiene la función de logout del contexto
  const navigate = useNavigate(); // Permite la navegación programática

  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate('/'); // Redirige a la página de inicio de sesión
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor"
    >
      {currentUser
        ? `${currentUser?.fullname || ''} ( ${currentUser?.role || ''} ) - `
        : ''}
      Cerrar Sesión
    </button>
  );
}

export default ButtonCerrarSesion;
