import { NavLink } from 'react-router-dom';
const HeaderLogueo = () => {
  return (
    <header className="bg-textColor shadow-md relative w-full z-[9999]">
    <div className="mx-auto container px-5 py-0">
      <div className="flex justify-between items-center">
          <NavLink to="/"><img className="w-full max-w-52" src="/logo_white.svg" alt="Abrancancha" /></NavLink>
          <div className='gap-2 flex items-center'>
          <NavLink to="/" className="bg-acentColor font-Bebas text-2xl text-textColor py-3 px-12 rounded-full hover:bg-white hover:text-acentColor"> LogOut </NavLink>
          </div>
      </div>
    </div>
   
  </header>
  )
}

export default HeaderLogueo