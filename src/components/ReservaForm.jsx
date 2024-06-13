import { useForm } from "react-hook-form";
import Error from "./Error";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 

export default function ReservaForm({ editingReservation,  onClose }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { currentUser, reservations, setReservations } = useAuth();
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  useEffect(() => {
    if (editingReservation) {
      setValue('cancha', editingReservation.cancha);
      setValue('tipo', editingReservation.tipo);
      setValue('date', editingReservation.date);
      setValue('hour', editingReservation.hour);
    }
  }, [editingReservation, setValue]);

  
  const onSubmit = async (data) => {
   
  
    try {
      const method = editingReservation ? 'PATCH' : 'POST';
      const endpoint = editingReservation 
        ? `http://localhost:3000/reservations/${editingReservation.id}`
        : 'http://localhost:3000/reservations/';

        const reservationData = {
          cancha: data.cancha,
          tipo: data.tipo,
          date: data.date,
          hour: data.hour,
          userId: editingReservation ? editingReservation.userId : currentUser.id
        };
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });
      if (!response.ok) {
        throw new Error('Error al almacenar la reserva');
      }

      const updatedReservation = await response.json();

      setReservations(prevReservations => {
        if (editingReservation) {
          return prevReservations.map(reserva => reserva.id === editingReservation.id ? updatedReservation : reserva);
        } else {
          return [...prevReservations, updatedReservation];
        }
      });
      
      reset();
      onClose();

    } catch (error) {
      console.error("Error al guardar la reserva:", error);
    }
  };

  return (
    <div className="md:w-full mx-5">
        <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label htmlFor="cancha" className="text-sm uppercase font-bold">
            Cancha
          </label>
          <select
            id="cancha"
            className="w-full p-3 rounded-md border-acentColor border-2"
            {...register("cancha", { required: "Selecciona una Cancha" })}
          >
            <option disabled selected value=""> -- selecciona una opción -- </option>
            <option value="Cancha 1">Cancha 1</option>
            <option value="Cancha 2">Cancha 2</option>
            <option value="Cancha 3">Cancha 3</option>
          </select>
          {errors.cancha && (
            <Error>{errors.cancha?.message.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="tipo" className="text-sm uppercase font-bold">
            Tipo
          </label>
          <select
            id="tipo"
            className="w-full p-3 rounded-md border-acentColor border-2"
            {...register("tipo", { required: "Selecciona un Tipo de Cancha" })}
          >
            <option disabled selected value=""> -- selecciona una opción -- </option>
            <option value="Futbol 5">Futbol 5</option>
            <option value="Futbol 7">Futbol 7</option>
            <option value="Futbol 9">Futbol 9</option>
            <option value="Futbol 11">Futbol 11</option>
          </select>
          {errors.tipo && (
            <Error>{errors.tipo?.message.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha
          </label>
          <input
            id="date"
            className="w-full p-3 rounded-md border-acentColor border-2"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
            {...register('date', {
              required: 'La fecha es Obligatoria'
            })}
          />
          {errors.date && (
            <Error>{errors.date?.message.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="hour" className="text-sm uppercase font-bold">
            Hora
          </label>
          <select
            id="hour"
            className="w-full p-3 rounded-md border-acentColor border-2"
            {...register("hour", { required: "Selecciona una hora" })}
          >
            <option disabled selected value> -- selecciona una opción -- </option>
            <option value="8:00">8:00hs</option>
            <option value="8:30">8:30hs</option>
            <option value="09:00">09:00hs</option>
            <option value="09:30">09:30hs</option>
            <option value="10:00">10:00hs</option>
            <option value="10:30">10:30hs</option>
            <option value="11:00">11:00hs</option>
            <option value="11:30">11:30hs</option>
            <option value="12:00">12:00hs</option>
            <option value="12:30">12:30hs</option>
            <option value="13:00">13:00hs</option>
            <option value="13:30">13:30hs</option>
            <option value="14:00">14:00hs</option>
          </select>
          {errors.hour && (
            <Error>{errors.hour?.message.toString()}</Error>
          )}
        </div>

        <input
          type="submit"
          className="bg-acentColor w-full p-3 text-textColor uppercase font-bold hover:bg-textColor hover:text-acentColor cursor-pointer transition-colors"
          value='Guardar Reserva'
        />
      </form>
    </div>
  );
}
