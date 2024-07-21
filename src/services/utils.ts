export function combinarFechaYHora(fechaString:string, horaString:string): Date {
  const [dia, mes, año] = fechaString.split('/').map(Number);
  const [hora, minuto, segundo] = horaString.split(':').map(Number);
  // El mes en JavaScript se cuenta desde 0 (enero = 0, febrero = 1, ...)
  return new Date(año, mes - 1, dia, hora, minuto, segundo);
}

function dateFormatToYMD(fechaString: string): string {
  let [dia, mes, año] = fechaString.split(/[-\/]/); // Permitir tanto '-' como '/' como separadores
  // Asegurar que el mes y el día tengan dos dígitos (agregar ceros a la izquierda si es necesario)
  mes = mes.padStart(2, '0');
  dia = dia.padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}
//------------------------------------------------------------------------------
export function capitalizeWords(string: string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function proper(string: string): string {
  return string.charAt(0).toUpperCase()+string.toLowerCase().slice(1);
}
