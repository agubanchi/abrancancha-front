import { useForm } from "react-hook-form";
import ErrorComp from "./Error";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Endpoint } from "../services/fetchs";
import SelectGenerico from "./SelectGenerico";

export default function ReservaForm({ editingReservation, setEditingReservation, onClose }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm();

  const { currentUser, reservations, setReservations, fetchCreate, fetchUpdate } = useAuth();
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  const [price, setPrice] = useState(0);


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

  const porcentajeAnticipo = 0.3;

  useEffect(() => {
    if (editingReservation) {
      setValue('cancha', editingReservation.cancha);
      setValue('tipo', editingReservation.tipo);
      setValue('date', editingReservation.date);
      setValue('hour', editingReservation.hour);
      setPrice(precios[editingReservation.tipo] || 0);
      
    }
  }, [editingReservation, setValue]);

  const tipoSeleccionado = watch('tipo');
  
  useEffect(() => {
    if (tipoSeleccionado) {
      const nuevoPrecio = precios[tipoSeleccionado] || 0;
      setPrice(nuevoPrecio);

    }
  }, [tipoSeleccionado]);

  const onSubmit = async (data) => {
    try {
      // ################################################################
      //  anular estas lineas para el sistema viejo
      // const reservationData = {
      //   // timedate: new Date(`${data.date} ${data.hour}`),
      //   // price: data.court.tariff.price /* 5000 */,
      //   // idCourt: data.court.id,
      //   // idUser: currentUser.id,
      //   // idStatus: 1,
      //   cancha: data.cancha,
      //   tipo: data.tipo,
      //   date: data.date,
      //   hour: data.hour,
      //   precio,
      //   anticipo,
      //   ...(editingReservation && {id: editingReservation})
      // };
      // const response = editingReservation
      // ? await fetchCreate({
      //     endPoint: Endpoint.reservations,
      //     data: data,
      //   })
      // : await fetchUpdate({
      //     endPoint: Endpoint.reservations,
      //     data: data,
      //     idData: editingReservation,
      //   });
        // ################################################################
      const method = editingReservation ? "PATCH" : "POST";
      const endpoint = editingReservation
        ? `http://localhost:3000/reservations/${editingReservation.id}`
        : "http://localhost:3000/reservations/";

      const reservationData = {
        cancha: data.cancha,
        tipo: data.tipo,
        date: data.date,
        hour: data.hour,
        userId: editingReservation ? editingReservation.userId : currentUser.id,
        price
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
        body: JSON.stringify(reservationData),
      });
      // ################################################################
      // ################################################################
      if (!response.ok) {
        throw new ErrorComp("Error al almacenar la reserva");
        throw new ErrorComp("Error al almacenar la reserva");
      }

      const updatedReservation = await response.json();
      setReservations((prevReservations) => {
      setReservations((prevReservations) => {
        if (editingReservation) {
          return prevReservations.map((reserva) =>
            reserva.id === editingReservation.id ? updatedReservation : reserva
          );
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
                    
                {/* <select id='cancha' className="w-full p-3 rounded-md border-acentColor border-2" defaultValue="Elige Deporte" */}
                  {/* // onChange={(event) => updateFiltroTipoCancha(Number(event.target.value))} */}
                  {/* // {...register("cancha", { required: "Selecciona una Cancha" })}> */}
                  {/* <option disabled value=" ">              {" "}              -- selecciona una opción --{" "}            </option> */}
                  {/* <option value={0} > Elige Deporte </option> */}
                  {/* <SelectGenerico endPoint={Endpoint.typesOfCourt} /> */}
                {/* </select>           */}
         
                    
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
            <option disabled value=" ">
              {" "}
              -- selecciona una opción --{" "}
            </option>
            <option disabled value=" ">
              {" "}
              -- selecciona una opción --{" "}
            </option>
            <option value="Cancha 1">Cancha 1</option>
            <option value="Cancha 2">Cancha 2</option>
            <option value="Cancha 3">Cancha 3</option>
          </select>
          {errors.cancha && <ErrorComp>{errors.cancha?.message.toString()}</ErrorComp>}
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
            <option disabled defaultValue=" ">
              {" "}
              -- selecciona una opción --{" "}
            </option>
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
            <option disabled defaultValue=" ">
              {" "}
              -- selecciona una opción --{" "}
            </option>
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
            Precio: ${price}
          </label>
        </div>

        <div className="mb-5">
          <label className="text-sm uppercase font-bold">
            Seña/Anticipo: ${price * porcentajeAnticipo}
          </label>
        </div>

        <input
          type="submit"
          className="bg-acentColor w-full p-3 text-textColor uppercase font-bold hover:bg-textColor hover:text-acentColor cursor-pointer transition-colors"
          value="Guardar Reserva"
        />
      </form>
    </div>
  );
}
