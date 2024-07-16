import React from 'react';
import { NavLink } from 'react-router-dom';

function ButtonLogin() {
  return (
    <NavLink
      to="/login"
      className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor"
    >
      Iniciar Sesión
    </NavLink>
  );
}

export default ButtonLogin;
