
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import useStore from "../userStore";
export default function DetalleReserva({ user }) {
  const deleteUser = useStore((state)=>state.deleteUser)
  return (
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
<button type="button" className=" flex gap-2 items-center py-2 px-6 bg-indigo-500 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg text-sm" ><FaEdit /> Editar Reserva</button>
<button type="button" className=" flex gap-2 items-center py-2 px-6 bg-red-500 hover:bg-red-800 text-white font-bold uppercase rounded-lg text-sm" onClick={()=>deleteUser(user.id)}><MdDelete /> Eliminar Reserva</button>
</div>

<div className="w-full text-center py-6">
<button type="button" className=" w-full   text-center py-3 px-6 bg-textColor hover:bg-acentColor text-white font-bold uppercase rounded-lg text-sm"> Confirmar Reserva</button>
</div>

</div>

   
  );
}
