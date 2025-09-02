import { agregarDato } from './datos.js';
import { mostrarReporte } from './reporte.js';

export function inicializarFormulario() {
  const div = document.getElementById('formulario');
  div.innerHTML = `
    <label>Nombre: <input type="text" id="nombre"></label>
    <label>Edad: <input type="number" id="edad"></label>
    <label>Departamento: 
      <select id="departamento">
        <option>Finanzas</option>
        <option>Ventas</option>
        <option>TI</option>
        <option>Recursos Humanos</option>
      </select>
    </label>
    <button id="btnAgregar">Agregar</button>
  `;
  document.getElementById('btnAgregar').onclick = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const departamento = document.getElementById('departamento').value;
    if (nombre && !isNaN(edad)) {
      agregarDato({ nombre, edad, departamento });
      mostrarReporte();
      document.getElementById('nombre').value = '';
      document.getElementById('edad').value = '';
    }
  };
}