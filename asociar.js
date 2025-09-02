export function initAsociar() {
  const div = document.getElementById('modulo-asociar');
  div.innerHTML = `
    <h2>Asociar</h2>
    <form id="formAsociar">
      <label>ID Contrato: <input type="text" id="asociarContrato"></label>
      <label>ID Cliente: <input type="text" id="asociarCliente"></label>
      <button type="submit">Asociar</button>
    </form>
    <div id="asociarMsg"></div>
  `;
  document.getElementById('formAsociar').onsubmit = e => {
    e.preventDefault();
    document.getElementById('asociarMsg').innerText = 
      'Contrato asociado: ' + document.getElementById('asociarContrato').value +
      ' con cliente ' + document.getElementById('asociarCliente').value;
    document.getElementById('formAsociar').reset();
  };
}