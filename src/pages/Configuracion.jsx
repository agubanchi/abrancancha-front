import { Outlet } from 'react-router-dom';
import Canchas from './Canchas';
import React from 'react';
import MenuLateral from './MenuLateral';

export default function Configuracion() {
  return (
    <div className="flex flex-row h-full bg-gray-900 text-white">
      <MenuLateral />
      <div className="flex flex-Col h-full bg-gray-900 text-white">
        {/* <Canchas /> */}
      <Outlet />
      </div>
    </div>
  );
}
