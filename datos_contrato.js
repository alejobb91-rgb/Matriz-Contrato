export function initDatosContrato() {
  const div = document.getElementById('modulo-datos_contrato');
  div.innerHTML = `
    <h2>Datos Contrato</h2>
    <form id="formDatosContrato">
      <label>ID Contrato: <input type="text" id="datosIdContrato"></label>
      <label>Fecha Inicio: <input type="date" id="datosFechaInicio"></label>
      <label>Fecha Fin: <input type="date" id="datosFechaFin"></label>
      <label>Monto: <input type="number" id="datosMonto"></label>
      <button type="submit">Guardar</button>
    </form>
    <div id="datosContratoMsg"></div>
  `;
  document.getElementById('formDatosContrato').onsubmit = e => {
    e.preventDefault();
    document.getElementById('datosContratoMsg').innerText = 'Datos de contrato guardados.';
    document.getElementById('formDatosContrato').reset();
  };
}