import { initCrear } from './crear.js';
import { initAsociar } from './asociar.js';
import { initDatosContrato } from './datos_contrato.js';
import { initGestionContrato } from './gestion_contrato.js';
import { initInformes } from './informes.js';
import { initGestionContratos } from './gestion_contratos.js';

window.mostrarModulo = function(mod) {
  document.querySelectorAll('.modulo').forEach(div => div.classList.remove('activo'));
  document.getElementById(`modulo-${mod}`).classList.add('activo');
};

window.onload = () => {
  initCrear();
  initAsociar();
  initDatosContrato();
  initGestionContrato();
  initInformes();
  initGestionContratos();
  mostrarModulo('crear');
};