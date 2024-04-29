import { useForm } from "react-hook-form";
import userStore from "../userStore";
import { v4 as uuidv4 } from 'uuid';
import Error from "./Error";

export default function ReservaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const setFormData = userStore((state) => state.setFormData);

  const onSubmit = (data) => {
    const id = uuidv4(); // Genera un nuevo ID
    console.log(data, id); // Muestra los datos en la consola
    setFormData({ ...data, id }); // Almacena los datos en el store global junto con el ID generado
    reset(); // Reinicia el formulario después de enviar
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5 ">
      <h2 className="font-black text-3xl text-center text-acentColor">Tu Reserva</h2>

      <p className="text-lg mt-5 text-center mb-10 text-white">
        Añade tus datos para realizar {' '}
        <span className="text-acentColor font-bold">la Reserva</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Nombre y Apellido
          </label>
          <input
            id="name"
            className="w-full p-3  rounded-md border-acentColor border-2"
            type="text"
            placeholder="Nombre y Apellido"
            {...register('name', {
              required: 'El Nombre de usuario es Obligatorio',
                minLength:{
                  value:4,
                  message:'Minimo 4 caracteres'
                },

                maxLength:{
                  value:45,
                  message:'Máximo 45 caracteres'
                }
              
            })}
          />
          {errors.name && (
            <Error>{errors.name?.message.toString()}</Error>
          )}

{errors.minLength && (
            <Error>{errors.minLength?.message.toString()}</Error>
          )}

{errors.maxLength && (
            <Error>{errors.maxLength?.message.toString()}</Error>
          )}

        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  rounded-md border-acentColor border-2"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido'
              }
            })}
          />
          {errors.email && (
            <Error>{errors.email?.message.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="telefono" className="text-sm uppercase font-bold">
            Teléfono
          </label>
          <input
            id="telefono"
            className="w-full p-3  rounded-md border-acentColor border-2"
            type="tel"
            placeholder="Teléfono"
            {...register("telefono", {
              required: "El Número de teléfono es Obligatorio",
              pattern: {
                value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
                message: 'Teléfono No Válido'
              }
            })}
          />
          {errors.telefono && (
            <Error>{errors.telefono?.message.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="cancha" className="text-sm uppercase font-bold">
            Cancha
          </label>
          <select id="cancha" className="w-full p-3  rounded-md border-acentColor border-2" {...register("cancha", { required: "Selecciona una Cancha" })}>
            <option disabled selected value> -- selecciona una opción -- </option>
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
          <select id="tipo" className="w-full p-3  rounded-md border-acentColor border-2" {...register("tipo", { required: "Selecciona un Tipo" })}>
            <option disabled selected value> -- selecciona una opción -- </option>
            <option value="Futbol 5" className="">Futbol 5</option>
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
            className="w-full p-3  rounded-md border-acentColor border-2"
            type="date"
            {...register('date', {
              required: 'La fecha es Obligatoria'
            })}
          />
          {errors.date && (
            <Error>{errors.date?.message.toString()}</Error>
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
