const permisosPorRol = {
  "Administrador Principal": {
    gestionContratos: ["ver", "crear", "editar", "eliminar"],
    datosContrato: ["ver", "crear", "editar", "eliminar"],
    crearInformes: ["ver", "crear", "editar", "eliminar"]
  },
  "Coordinador": {
    gestionContratos: ["ver"],
    datosContrato: ["ver", "crear", "editar"],
    crearInformes: ["ver", "crear", "editar"]
  },
  "Social": {
    gestionContratos: ["ver", "crear", "editar"],
    datosContrato: ["ver", "crear", "editar"],
    crearInformes: ["ver", "crear", "editar"]
  },
  "Solo Vista": {
    gestionContratos: ["ver"],
    datosContrato: ["ver"],
    crearInformes: ["ver"]
  }
};

function tienePermiso(modulo, accion) {
  const usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  const rol = usuario.rol || "";
  return permisosPorRol[rol] && permisosPorRol[rol][modulo] && permisosPorRol[rol][modulo].includes(accion);
}

function aplicarPermisosGestionContratos() {
  document.getElementById('btnCrearContrato').style.display = tienePermiso('gestionContratos', 'crear') ? '' : 'none';
  document.getElementById('btnEditarContrato').style.display = tienePermiso('gestionContratos', 'editar') ? '' : 'none';
  document.getElementById('btnEliminarContrato').style.display = tienePermiso('gestionContratos', 'eliminar') ? '' : 'none';
  document.getElementById('btnVerContrato').style.display = tienePermiso('gestionContratos', 'ver') ? '' : 'none';
  document.getElementById('campoNombre').disabled = !tienePermiso('datosContrato', 'editar') && !tienePermiso('datosContrato', 'crear');
  document.getElementById('campoDescripcion').disabled = !tienePermiso('datosContrato', 'editar') && !tienePermiso('datosContrato', 'crear');
  document.getElementById('btnGuardarContrato').style.display = (tienePermiso('datosContrato', 'crear') || tienePermiso('datosContrato', 'editar')) ? '' : 'none';
  document.getElementById('btnCrearInforme').style.display = tienePermiso('crearInformes', 'crear') ? '' : 'none';
  document.getElementById('btnVerInforme').style.display = tienePermiso('crearInformes', 'ver') ? '' : 'none';
}
document.addEventListener('DOMContentLoaded', aplicarPermisosGestionContratos);