import React from "react";
import Accordion from "./Accordion";

const Faq = () => {
  return (
    <div className="py-10 pt-10 px-3 text-textColor mx-auto md:w-2/3" id="frecuentes">
        <div className="text-center mt-8">
        <h1 className="sm:text-5xl text-3xl font-bold text-white font-Bebas ">
          Preguntas Frecuentes
        </h1>
        </div>
      <Accordion
        title="¿Cómo me registro para sacar un turno?"
        answer="Ingresá tu nombre completo, teléfono,  email y contraseña para registrarte."
      />
      <Accordion
        title="¿Cómo reservar un turno?"
        answer="Una vez registrado, podrás loguearte con tu usuario y contraseña y accederas al panel para realizar tu reserva."
      />
      <Accordion title="¿Cómo doy de baja una reserva" 
      answer="Para dar de baja una reserva..." />
    </div>
  );
};

export default Faq;