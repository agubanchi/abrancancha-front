// Header.js
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import Modal from "./Modal";
import { IoClose } from "react-icons/io5";
import { RiFootballFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleLogout = () => {
    logout(); // Llama a la función de logout
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="bg-textColor shadow-md relative lef-0 top-0  w-full z-[9999]">
      <div className="mx-auto container px-5 py-0">
        <div className="flex justify-between items-center">
          <div className="z-[999]">
            <NavLink to="/"><img className="w-full max-w-40" src="/logo_white.svg" alt="Abrancancha" /></NavLink>
          </div>
          <nav className='w-full md:flex hidden items-center gap-4 justify-around text-white font-Bebas text-2xl'>
            <div className='w-3/4 items-center gap-6 text-center flex justify-center'>
              <NavLink to="/reservas" className="hover:text-acentColor border-b-2 border-acentColor"> Reservar Cancha </NavLink>
              <a href="#inicio" className="hover:text-acentColor"> Inicio </a>
              <a href="#galeria" className="hover:text-acentColor"> Galería </a>
              <a href="#contacto" className="hover:text-acentColor"> Contacto </a>
              <a href="#frecuentes" className="hover:text-acentColor"> Preguntas Frecuentes </a>
            </div>
            <div className='gap-2 flex items-center'>
              {currentUser ? (
                <button onClick={handleLogout} className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor">Cerrar Sesión</button>
              ) : (
                <NavLink to="/login" className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor">Iniciar Sesión</NavLink>
              )}
            </div>
          </nav>

          <div
            onClick={() => setOpen(!open)}
            className={`z-[2]  ${open ? "text-acentColor" : "text-acentColor"} ${sticky ? " text-white" : ""}  text-3xl md:hidden m-5`}
          >
            {open ? (
              <IoClose className="cursor-pointer z-[9999]" />
            ) : (
              <RiFootballFill className={`cursor-pointer animate-bounce ${sticky ? "text-white" : ""}`} />
            )}
          </div>

          <div
            className={`md:hidden text-gray-900 absolute w-full h-screen px-7 py-2 font-medium bg-textColor top-0 duration-300 ${
              open ? "right-0" : "right-[-100%]"
            }`}
          >
            <nav className='flex flex-col justify-center h-full text-white font-Bebas text-2xl' onClick={() => setOpen(false)}>
              <div className='pt-40 flex flex-col justify-center gap-6'>
                <NavLink to="/reservas" className="hover:text-acentColor border-b-2 border-acentColor"> Reservar Cancha </NavLink>
                <a href="#inicio" className="hover:text-acentColor"> Inicio </a>
                <a href="#galeria" className="hover:text-acentColor"> Galería </a>
                <a href="#contacto" className="hover:text-acentColor"> Contacto </a>
                <a href="#frecuentes" className="hover:text-acentColor"> Preguntas Frecuentes </a>
              </div>
              <div className='py-6'>
                {currentUser ? (
                  <button onClick={handleLogout} className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor">Cerrar Sesión</button>
                ) : (
                  <NavLink to="/login" className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor">Iniciar Sesión</NavLink>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
