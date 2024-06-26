import { useForm } from "react-hook-form";
import userStore from "../userStore";
import { v4 as uuidv4 } from 'uuid';
import Error from "./Error";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Ajusta la ruta de importación según tu proyecto

export default function ReservaForm({ onClose }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const addReservation = userStore((state) => state.addReservation);
  const activeReservationId = userStore((state) => state.activeReservationId);
  const reservations = userStore((state) => state.reservations);
  const updateReservation = userStore((state) => state.updateReservation);
  const { user: authUser } = useAuth(); // Obtener el usuario autenticado desde el contexto

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  useEffect(() => {
    if (activeReservationId) {
      const activeReservation = reservations.find(reservation => reservation.id === activeReservationId);
      if (activeReservation) {
        setValue('cancha', activeReservation.cancha);
        setValue('tipo', activeReservation.tipo);
        setValue('date', activeReservation.date);
        setValue('hour', activeReservation.hour);
      }
    }
  }, [activeReservationId, setValue, reservations]);

  const onSubmit = async (data) => {
    const id = activeReservationId ? activeReservationId : uuidv4(); // Usa el ID activo o genera uno nuevo
    if (activeReservationId) {
      updateReservation({ ...data, id });
    } else {
      addReservation({ ...data, id });
    }

    try {
      const method = activeReservationId ? 'PUT' : 'POST';
      const endpoint = activeReservationId ? `http://localhost:3000/reservations/${id}` : 'http://localhost:3000/reservations';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, id, userId: authUser.id })
      });
      if (!response.ok) {
        throw new Error('Error al almacenar la reserva');
      }
      reset(); // Reinicia el formulario después de enviar
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
