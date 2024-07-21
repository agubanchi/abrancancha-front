import React from 'react';
import { FaPlus } from 'react-icons/fa';

function ButtonAdd({ handleAdd, caption }) {
  return (
    <caption className="items-center justify-around text-center py-4 gap-2">
      <button
        className="bg-white rounded-md text-textColor px-6 py-3 md:text-[.9rem] font-Onest uppercase hover:bg-acentColor hover:text-textColor hover:font-bold"
        onClick={handleAdd}
      >
        {/* <FaPlus /> */}
        Agregar {caption}
      </button>
       {/* <NavLink to="/registrar" className="bg-white hover:bg-acentColor hover:text-textColor border px-2 py-2  border-acentColor rounded-md">Agregar Usuario</NavLink> */}
    </caption>
  );
}

export default ButtonAdd;
