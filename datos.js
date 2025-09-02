// Módulo para gestión de datos
export let datos = [];

export function agregarDato(dato) {
  datos.push(dato);
}

export function filtrarDatos(departamento) {
  return departamento ? datos.filter(d => d.departamento === departamento) : datos;
}

export function guardarJSON() {
  const blob = new Blob([JSON.stringify(datos)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "datos.json";
  link.click();
}