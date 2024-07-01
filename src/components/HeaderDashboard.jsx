import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { RiFootballFill } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const HeaderDashboard = () => {
    const [sticky, setSticky] = useState(false);
    const [open, setOpen] = useState(false);
  const { logout, currentUser } = useAuth(); // Obtiene la función de logout del contexto
  const navigate = useNavigate(); // Permite la navegación programática

  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <header className="bg-textColor shadow-md fixed lef-0 top-0  w-full z-[9999]">
      <div className="mx-auto container px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="z-[999] w-48">
            <NavLink to="/"> <h3 className='text-bold text-white'>Volver a Home</h3></NavLink>
          </div>
          <nav className='w-full md:flex hidden items-center gap-4 justify-around text-white font-Bebas text-2xl'>
            <div className='w-3/4 items-center gap-6 text-center flex justify-center'>
            <NavLink to="/canchas" className="hover:text-acentColor border px-2 py-2  border-acentColor rounded-md">Canchas</NavLink>
            <NavLink to="/reservations" className="hover:text-acentColor border px-2 py-2  border-acentColor rounded-md">Reservas</NavLink>
            <NavLink to="/admin" className="hover:text-acentColor border px-2 py-2  border-acentColor rounded-md">Administradores</NavLink>
            <NavLink to="/users" className="hover:text-acentColor border px-2 py-2  border-acentColor rounded-md">Usuarios</NavLink>
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
              <div className='pt-5 flex flex-col justify-center gap-6'>
                <NavLink to="/canchas" className="hover:text-acentColor "> Canchas </NavLink>
                <NavLink to="/reservations" className="hover:text-acentColor "> Reservas </NavLink>
                <NavLink to="/admin" className="hover:text-acentColor">Administradores</NavLink>
            <NavLink to="/users" className="hover:text-acentColor">Usuarios</NavLink>
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
}

export default HeaderDashboard;
