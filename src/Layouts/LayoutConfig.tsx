import { Outlet } from 'react-router-dom';
import React from 'react';
import MenuLateral from '../components/MenuLateral';

export default function LayoutConfig() {
  return (
<<<<<<< HEAD
    <div className="flex flex-row h-full  text-white">
=======
    <div className="flex flex-row h-full text-white">
>>>>>>> 1f124851b1a0a0ea768287aecfca36e37d2a9d9b
      <MenuLateral />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
