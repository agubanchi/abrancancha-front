
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Swal from 'sweetalert2';
import useStore from "../userStore";
export default function DetalleReserva({ user }) {
  const deleteUser = useStore((state)=>state.deleteUser)
  const getUserById = useStore((state) => state.getUserById); 
  const [showReservation, setShowReservation] = useState(true);

  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la reserva',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.id);
        Swal.fire(
          'Eliminado!',
          'La reserva ha sido eliminada.',
          'success'
        );
      }
    });
  };

  const confirmarReserva = () => {
    Swal.fire({
      title: "Reserva confirmada!",
      text: "Su Reserva ha sido confirmada con éxito",
      icon: "success"
    });
    
    setShowReservation(false);
  };

  return (
    <>
    {showReservation ? (
    <div className="bg-white rounded-xl mx-5 my-10 px-5 py-10">
    <div className='flex items-center justify-around  '>
    <div className='  text-2xl '>

        <p className='font-Bebas mb-3 text-acentColor items-center flex gap-2 '> Nombre: {''}
        <span className=' text-sm uppercase font-bold text-textColor font-Onest'>{user.name}</span>
        </p>
        <p className='font-Bebas mb-3 text-acentColor items-center flex gap-2'> Email: {''}
        <span className='text-sm  font-bold text-textColor font-Onest'>{user.email}</span>
        </p>
        <p className='font-Bebas mb-3 text-acentColor items-center flex gap-2'> Teléfono: {''}
        <span className='text-sm uppercase font-bold text-textColor font-Onest'>{user.telefono}</span>
        </p>
        <p className='font-Bebas mb-3 text-acentColor items-center flex gap-2'> Cancha: {''}
        <span className='text-sm uppercase font-bold text-textColor font-Onest'>{user.cancha}</span>
        </p>
        <p className='font-Bebas mb-3 text-acentColor items-center flex gap-2'> Tipo de Cancha: {''}
        <span className='text-sm uppercase font-bold text-textColor font-Onest'>{user.tipo}</span>
        </p>
        <p className='font-Bebas mb-3 text-acentColor items-center flex gap-2'> Fecha: {''}
        <span className='text-sm uppercase font-bold text-textColor font-Onest'>{user.date}</span>
        </p>   
    </div>

<div>
<img  className="w-full " src="/logo_black.svg" alt="Abrancancha" />
</div>
</div>

  
<div class=" flex justify-between py-2 gap-3  mt-10">
<button type="button" className=" flex gap-2 items-center py-2 px-6 bg-indigo-500 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg text-sm" onClick={()=>getUserById(user.id)}><FaEdit/> Editar Reserva</button>
<button type="button" className=" flex gap-2 items-center py-2 px-6 bg-red-500 hover:bg-red-800 text-white font-bold uppercase rounded-lg text-sm" onClick={()=>handleEliminar(user.id)}><MdDelete /> Eliminar Reserva</button>
</div>

<div className="w-full text-center py-6">
<button type="button" className=" w-full   text-center py-3 px-6 bg-textColor hover:bg-acentColor text-white font-bold uppercase rounded-lg text-sm" onClick={confirmarReserva}> Confirmar Reserva</button>
</div>

</div>
  ) : <button type="button" className="w-full text-center py-3 px-6 bg-acentColor text-white hover:bg-white hover:text-textColor font-bold uppercase rounded-lg text-sm" onClick={() => setShowReservation(true)}>Ver mis Reserva</button>
}
  </>
   
  );
}
