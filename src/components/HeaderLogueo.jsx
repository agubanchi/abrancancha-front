import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const HeaderLogueo = () => {
  const { logout } = useAuth(); // Obtiene la función de logout del contexto
  const navigate = useNavigate(); // Permite la navegación programática

  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <header className="bg-textColor shadow-md relative w-full z-[9999]">
      <div className="mx-auto container px-5 py-5">
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <h3 className='text-bold text-white'>Volver a Home</h3>
          </NavLink>
          <div className='gap-2 flex items-center'>
            <button onClick={handleLogout} className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor">LogOut</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderLogueo;
