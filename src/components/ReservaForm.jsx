import { useForm } from "react-hook-form";
import ErrorComp from "./Error";
import ErrorComp from "./Error";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Endpoint, HttpMethod, fetchAll } from "../services/fetchs"; // Asegúrate de que las rutas sean correctas

// Función para combinar fecha y hora
export function combinarFechaYHora(fechaString, horaString) {
  const [año, mes, dia] = fechaString.split('-').map(Number); // Formato YYYY-MM-DD
  const [hora, minuto] = horaString.split(':').map(Number);
  return new Date(año, mes - 1, dia, hora, minuto); // El mes en JavaScript se cuenta desde 0 (enero = 0, febrero = 1, ...)
}

// Función para formatear la fecha en YYYY-MM-DD
function dateFormatToYMD(fechaString) {
  let [dia, mes, año] = fechaString.split(/[-\/]/); // Permitir tanto '-' como '/' como separadores
  // Asegurar que el mes y el día tengan dos dígitos (agregar ceros a la izquierda si es necesario)
  mes = mes.padStart(2, '0');
  dia = dia.padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}


export default function ReservaForm({ editingReservation, setEditingReservation, onClose }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm();

  const { currentUser, reservations, setReservations, fetchCreate, fetchUpdate } = useAuth();
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  const [price, setPrice] = useState(0);
  const [observations, setObservations] = useState("");

  // crear un estado local? o traer las canchas del contexto?
  // useEffect(() => {
  //   fetchGet({endPoint: Endpoint.courts})
  //     .then(res => res.json())
  //     .then(json => setCourts(json))
  //     .catch(err => console.error('Error fetching courts:', err));
  // }, []);
  // useEffect(() => {
  //   fetchGet({endPoint: Endpoint.typesOfCourt})
  //     .then(res => res.json())
  //     .then(json => setCourts(json))
  //     .catch(err => console.error('Error fetching typesOfCourt:', err));
  // }, []);

  // los precios vienen con la cancha

  // crear un estado local? o traer las canchas del contexto?
  // useEffect(() => {
  //   fetchGet({endPoint: Endpoint.courts})
  //     .then(res => res.json())
  //     .then(json => setCourts(json))
  //     .catch(err => console.error('Error fetching courts:', err));
  // }, []);
  // useEffect(() => {
  //   fetchGet({endPoint: Endpoint.typesOfCourt})
  //     .then(res => res.json())
  //     .then(json => setCourts(json))
  //     .catch(err => console.error('Error fetching typesOfCourt:', err));
  // }, []);

  // los precios vienen con la cancha

  const precios = {
    'Futbol 5': 20000,
    'Futbol 7': 32000,
    'Futbol 9': 40000,
    'Futbol 11': 48000
  };

  const observaciones = {
    'Cancha 1': 'Cancha al Aire Libre, Hierba',
    'Cancha 2': 'Cancha cubierta',
    'Cancha 3': 'Cancha con cesped sintético',
    'Cancha 4': 'Cancha Iluminación Nocturna',
    'Cancha 5': 'Cancha al aire libre, Cesped Sintético'
  };

  const porcentajeAnticipo = 0.3;

  useEffect(() => {
    if (editingReservation) {
      setValue('cancha', editingReservation.cancha);
      setValue('tipo', editingReservation.tipo);
      setValue('date', editingReservation.date.split('T')[0]); // Extract only date part
      setValue('hour', editingReservation.date.split('T')[1].slice(0, 5)); // Extract only time part
      setPrice(precios[editingReservation.tipo] || 0);
      setObservations(observaciones[editingReservation.cancha] || "");
    }
  }, [editingReservation, setValue]);

  const tipoSeleccionado = watch('tipo');
  
  useEffect(() => {
    if (tipoSeleccionado) {
      const nuevoPrecio = precios[tipoSeleccionado] || 0;
      setPrice(nuevoPrecio);
    }
  }, [tipoSeleccionado]);

  const canchaSeleccionada = watch('cancha');
  
  useEffect(() => {
    if (canchaSeleccionada) {
      const nuevaObservacion = observaciones[canchaSeleccionada] || "";
      setObservations(nuevaObservacion);
    }
  }, [canchaSeleccionada]);

  const onSubmit = async (data) => {
    try {
      const method = editingReservation ? HttpMethod.PATCH : HttpMethod.POST;
      const endpoint = Endpoint.reservations;
      const idData = editingReservation ? editingReservation.id : undefined;

      // Combina fecha y hora
      const combinedDateTime = combinarFechaYHora(data.date, data.hour);
      const formattedDate = combinedDateTime.toISOString();

      const reservationData = {
        cancha: data.cancha,
        tipo: data.tipo,
        date: formattedDate,
        idUser: editingReservation ? editingReservation.idUser : currentUser.id,
        price,
        idCourt: canchaSeleccionada,  // Suponiendo que tienes un campo idCourt
      };

      const response = await fetchAll({
        method,
        endPoint: endpoint,
        idData,
        data: reservationData,
      });

      if (!response.ok) {
        throw new ErrorComp("Error al almacenar la reserva");
      }

      const updatedReservation = await response.json();
      setReservations((prevReservations) => {
        if (editingReservation) {
          return prevReservations.map((reserva) =>
            reserva.id === editingReservation.id ? updatedReservation : reserva
          );
        } else {
          return [...prevReservations, updatedReservation];
        }
      });

      reset();
      setEditingReservation(null);
      onClose();
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await fetchAll({
        method: HttpMethod.DELETE,
        endPoint: Endpoint.reservations,
        idData: editingReservation.id,
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la reserva');
      }

      setReservations(prevReservations => 
        prevReservations.filter(reserva => reserva.id !== editingReservation.id)
      );

      reset();
      setEditingReservation(null);
      onClose();
      
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    }
  };

  return (
    <div className="md:w-full mx-0">
      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label htmlFor="cancha" className="text-sm uppercase font-bold">
            Cancha
          </label>
                    
                {/* <select id='cancha' className="w-full p-3 rounded-md border-acentColor border-2" defaultValue="Elige Deporte" */}
                  {/* // onChange={(event) => updateFiltroTipoCancha(Number(event.target.value))} */}
                  {/* // {...register("cancha", { required: "Selecciona una Cancha" })}> */}
                  {/* <option disabled value=" ">              {" "}              -- selecciona una opción --{" "}            </option> */}
                  {/* <option value={0} > Elige Deporte </option> */}
                  {/* <SelectGenerico endPoint={Endpoint.typesOfCourt} /> */}
                {/* </select>           */}
         
          <select
            id="cancha"
            className="w-full p-3 rounded-md border-acentColor border-2"
            {...register("cancha", { required: "Selecciona una Cancha" })}
          >
            <option disabled value=""> -- selecciona una opción -- </option>
            <option value="Cancha 1">Cancha 1</option>
            <option value="Cancha 2">Cancha 2</option>
            <option value="Cancha 3">Cancha 3</option>
            <option value="Cancha 4">Cancha 4</option>
            <option value="Cancha 5">Cancha 5</option>
          </select>
          {errors.cancha && <ErrorComp>{errors.cancha?.message.toString()}</ErrorComp>}
        </div>

        <div className="mb-5">
          <label htmlFor="tipo" className="text-sm uppercase font-bold">
            Tipo
          </label>
          {/* <select id='tipo' className="w-full p-3 rounded-md border-acentColor border-2" defaultValue=" "
                  // onChange={(event) => updateFiltroTipoCancha(Number(event.target.value))}
                  {...register("cancha", { required: "Selecciona un Tipo de Cancha" })}>
                  <option disabled value=" ">              {" "}              -- selecciona una opción --{" "}            </option>
                  {/* <option value={0} > Elige Deporte </option> */}
                  {/* <SelectGenerico endPoint={Endpoint.typesOfCourt} />
                </select>    */} 
          <select
            id="tipo"
            className="w-full p-3 rounded-md border-acentColor border-2"
            {...register("tipo", { required: "Selecciona un Tipo de Cancha" })}
          >
            <option disabled value=""> -- selecciona una opción -- </option>
            <option value="Futbol 5">Futbol 5</option>
            <option value="Futbol 7">Futbol 7</option>
            <option value="Futbol 9">Futbol 9</option>
            <option value="Futbol 11">Futbol 11</option>
          </select>
          {errors.tipo && <ErrorComp>{errors.tipo?.message.toString()}</ErrorComp>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha
          </label>
          <input
            id="date"
            className="w-full p-3 rounded-md border-acentColor border-2"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            {...register("date", {
              required: "La fecha es Obligatoria",
            })}
          />
          {errors.date && <ErrorComp>{errors.date?.message.toString()}</ErrorComp>}
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
            <option disabled value=""> -- selecciona una opción -- </option>
            <option value="08:00">08:00hs</option>
            <option value="08:30">08:30hs</option>
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
            <ErrorComp>{errors.hour?.message.toString()}</ErrorComp>
          )}
        </div>
        
        <div className="mb-5">
          <label className="text-sm uppercase font-bold">
            Precio: ${price}
          </label>
        </div>

        <div className="mb-5">
          <label className="text-sm uppercase font-bold">
            Seña/Anticipo: ${price * porcentajeAnticipo}
          </label>
        </div>

        <div className="mb-5">
          <label className="text-sm uppercase font-bold">
            Observaciones: {observations}
          </label>
        </div>

        <input
          type="submit"
          className="bg-acentColor w-full p-3 text-textColor uppercase font-bold hover:bg-textColor hover:text-acentColor cursor-pointer transition-colors"
          value="Guardar Reserva"
        />
      </form>
      {editingReservation && (
        <button
          onClick={onDelete}
          className="bg-red-600 w-full p-3 text-textColor uppercase font-bold hover:bg-red-800 cursor-pointer transition-colors mt-3"
        >
          Eliminar Reserva
        </button>
      )}
    </div>
  );
}
