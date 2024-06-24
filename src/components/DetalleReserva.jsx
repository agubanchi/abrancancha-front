
//este codigo puede eliminar la reserva por usuario, pero no me funciona la edicion:
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Swal from 'sweetalert2';
import useStore from "../userStore";
import { useAuth } from '../context/AuthContext';
export default function DetalleReserva({ reserva, removeReservation, handleEditar }) {
  const { currentUser, reservations } = useAuth();
  const [showReservation, setShowReservation] = useState(true);





  

  const confirmarReserva = () => {
    Swal.fire({
      title: "Reserva confirmada!",
      text: "Su Reserva ha sido confirmada con éxito",
      icon: "success",
      color: "#1d1d1d",
      iconColor: "#1d1d1d",
      confirmButtonColor: "#77da7e",
      
    });
    
    setShowReservation(false);
  };

  return (
    <>
    {showReservation ? (
    <div className="bg-white rounded-xl mx-5 my-10 px-5 py-10">
    <div className='flex items-center justify-around  '>
    <div className=''>

        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Email: {''}
        <span className='text-sm low font-light text-textColor font-Onest'>{currentUser.email}</span>
        </p>
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Teléfno: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>{currentUser.telefono}</span>
        </p>
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Cancha: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.cancha}</span>
        </p>
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Tipo de Cancha: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.tipo}</span>
        </p>
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Fecha: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.date}</span>
        </p>   
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Hora: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>{reserva.hour}</span>
        </p>
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Precio: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>$ {reserva.precio}</span>
        </p>
        <p className='text-sm uppercase font-bold mb-3 text-textColor items-center flex gap-2'> Seña/anticipo: {''}
        <span className='text-sm uppercase font-light text-textColor font-Onest'>$ {reserva.anticipo}</span>
        </p>
    </div>

<div>
<img  className="w-full " src="/logo_black.svg" alt="Abrancancha" />
</div>
</div>

  
<div class=" flex justify-between py-2 gap-3  mt-4">
<button type="button" className="flex gap-2 items-center py-2 px-6 bg-indigo-500 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg text-sm" onClick={() => handleEditar(reserva.id)}><FaEdit/> Editar Reserva</button>
<button type="button" className=" flex gap-2 items-center py-2 px-6 bg-red-500 hover:bg-red-800 text-white font-bold uppercase rounded-lg text-sm"  onClick={()=>removeReservation(reserva.id)}><MdDelete /> Eliminar Reserva</button>
</div>

<div className="w-full text-center py-6">
<button type="button" className=" w-full   text-center py-3 px-6 bg-acentColor text-textColor hover:bg-textColor hover:text-white font-bold uppercase rounded-lg text-sm" onClick={confirmarReserva}> Confirmar Reserva</button>
</div>

</div>
  ) : <button type="button" className="w-full text-center py-3 mb-3 px-6 bg-acentColor text-white hover:bg-white hover:text-textColor font-bold uppercase rounded-lg text-sm" onClick={() => setShowReservation(true)}>Ver mis Reserva del {currentUser.date}</button>
}
  </>
   
  );
}






