export function initInformes() {
  const div = document.getElementById('modulo-informes');
  div.innerHTML = `
    <h2>Crear Informes</h2>
    <button id="btnInforme">Generar informe</button>
    <div id="informeMsg"></div>
  `;
  document.getElementById('btnInforme').onclick = () => {
    document.getElementById('informeMsg').innerText = 'Informe generado. (Aquí irá la lógica de reportes)';
  };
}