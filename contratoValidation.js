export function validarContrato(data) {
  const errores = [];
  if (!data.nombre) errores.push('El nombre es obligatorio');
  if (!data.cliente) errores.push('El cliente es obligatorio');
  if (!data.fechaInicio) errores.push('La fecha de inicio es obligatoria');
  if (!data.fechaFin) errores.push('La fecha de fin es obligatoria');
  if (!data.monto || isNaN(Number(data.monto))) errores.push('El monto es obligatorio y debe ser numérico');
  return errores;
}