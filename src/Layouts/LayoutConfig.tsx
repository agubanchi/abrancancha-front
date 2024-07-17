import { Outlet } from 'react-router-dom';
import React from 'react';
import MenuLateral from '../pages/MenuLateral';

export default function LayoutConfig() {
  return (
    <div className="flex flex-row h-full bg-gray-900 text-white">
      <MenuLateral />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
