import React from 'react';
import Footer from '../components/Footer';
import HeaderLogueo from '../components/HeaderLogueo';
import { Outlet } from 'react-router-dom'; 

export default function Logueo() {
  return (
    <>
      <HeaderLogueo />
      <main className="w-full mx-auto py-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
