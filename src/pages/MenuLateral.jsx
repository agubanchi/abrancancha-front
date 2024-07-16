import React from 'react';
// import { useState } from 'react';
// import { IoClose } from "react-icons/io5";
// import { RiFootballFill } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import ButtonCerrarSesion from '../components/ButtonCerrarSesion';

export default function MenuLateral() {
  const class_Name =
    'hover:text-acentColor border-b-2 border-transparent hover:border-acentColor py-2';

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <nav className="flex flex-col gap-4 p-4">
        {/* <div className="flex flex-col gap-4"> */}
          <NavLink to="/rarifas" className={class_Name}>
            Tarifas**
          </NavLink>
          <NavLink to="/horarios" className={class_Name}>
            Horarios**
          </NavLink>
          <NavLink to="/excepciones" className={class_Name}>
            Excepciones**
          </NavLink>
          <NavLink to="/tiposCanchas" className={class_Name}>
            Tipos de cancha
          </NavLink>
          <NavLink to="/estadosCanchas" className={class_Name}>
            Estados de cancha
          </NavLink>
          <NavLink to="/estadosReservas" className={class_Name}>
            Estados de reserva
          </NavLink>
          <NavLink to="/estadosUsuarios" className={class_Name}>
            Estados de usuario
          </NavLink>
          <NavLink to="/admins" className={class_Name}>
            Administradores
          </NavLink>
          <NavLink to="/club" className={class_Name}>
            Club**
          </NavLink>
        {/* </div> */}
      </nav>
    </div>
  );
}
