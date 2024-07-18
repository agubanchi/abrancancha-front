import { Outlet } from 'react-router-dom';
import React from 'react';
import MenuLateral from '../components/MenuLateral';

export default function LayoutConfig() {
  return (
    <div className="flex flex-row h-full  text-white">
      <MenuLateral />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
