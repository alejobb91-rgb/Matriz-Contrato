// Sistema de Control de Contratos
class ControlContratos {
    constructor() {
        this.contratos = this.cargarContratos();
        this.contratoEditando = null;
        this.inicializar();
    }

    inicializar() {
        this.configurarEventos();
        this.renderizarTabla();
    }

    configurarEventos() {
        // Botón nuevo contrato
        document.getElementById('btnNuevoContrato').addEventListener('click', () => {
            this.abrirModalNuevo();
        });

        // Formulario de contrato
        document.getElementById('contratoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarContrato();
        });

        // Cerrar modal
        document.querySelector('.close').addEventListener('click', () => {
            this.cerrarModal();
        });

        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('modalContrato');
            if (e.target === modal) {
                this.cerrarModal();
            }
        });

        // Búsqueda
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filtrarContratos(e.target.value);
        });
    }

    abrirModalNuevo() {
        this.contratoEditando = null;
        document.getElementById('modalTitle').textContent = 'Nuevo Contrato';
        document.getElementById('contratoForm').reset();
        document.getElementById('modalContrato').style.display = 'block';
    }

    abrirModalEditar(id) {
        const contrato = this.contratos.find(c => c.id === id);
        if (!contrato) return;

        this.contratoEditando = id;
        document.getElementById('modalTitle').textContent = 'Editar Contrato';
        
        // Llenar el formulario con los datos del contrato
        document.getElementById('numeroContrato').value = contrato.numero;
        document.getElementById('nombreCliente').value = contrato.cliente;
        document.getElementById('descripcion').value = contrato.descripcion;
        document.getElementById('fechaInicio').value = contrato.fechaInicio;
        document.getElementById('fechaFin').value = contrato.fechaFin;
        document.getElementById('monto').value = contrato.monto;
        document.getElementById('estado').value = contrato.estado;

        document.getElementById('modalContrato').style.display = 'block';
    }

    cerrarModal() {
        document.getElementById('modalContrato').style.display = 'none';
        this.contratoEditando = null;
        document.getElementById('contratoForm').reset();
    }

    guardarContrato() {
        const formData = new FormData(document.getElementById('contratoForm'));
        const contrato = {
            numero: document.getElementById('numeroContrato').value.trim(),
            cliente: document.getElementById('nombreCliente').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            fechaInicio: document.getElementById('fechaInicio').value,
            fechaFin: document.getElementById('fechaFin').value,
            monto: parseFloat(document.getElementById('monto').value),
            estado: document.getElementById('estado').value
        };

        // Validaciones
        if (!this.validarContrato(contrato)) {
            return;
        }

        if (this.contratoEditando) {
            // Editar contrato existente
            const index = this.contratos.findIndex(c => c.id === this.contratoEditando);
            if (index !== -1) {
                this.contratos[index] = { ...contrato, id: this.contratoEditando };
            }
        } else {
            // Nuevo contrato
            contrato.id = this.generarId();
            this.contratos.push(contrato);
        }

        this.guardarContratos();
        this.renderizarTabla();
        this.cerrarModal();

        // Mostrar mensaje de éxito
        this.mostrarMensaje('Contrato guardado exitosamente', 'success');
    }

    validarContrato(contrato) {
        // Validar que el número de contrato no esté duplicado
        const numeroExiste = this.contratos.some(c => 
            c.numero === contrato.numero && c.id !== this.contratoEditando
        );

        if (numeroExiste) {
            this.mostrarMensaje('El número de contrato ya existe', 'error');
            return false;
        }

        // Validar fechas
        if (new Date(contrato.fechaFin) <= new Date(contrato.fechaInicio)) {
            this.mostrarMensaje('La fecha de fin debe ser posterior a la fecha de inicio', 'error');
            return false;
        }

        // Validar monto
        if (contrato.monto <= 0) {
            this.mostrarMensaje('El monto debe ser mayor a cero', 'error');
            return false;
        }

        return true;
    }

    eliminarContrato(id) {
        if (confirm('¿Está seguro de que desea eliminar este contrato?')) {
            this.contratos = this.contratos.filter(c => c.id !== id);
            this.guardarContratos();
            this.renderizarTabla();
            this.mostrarMensaje('Contrato eliminado exitosamente', 'success');
        }
    }

    filtrarContratos(termino) {
        const terminos = termino.toLowerCase().split(' ');
        const filas = document.querySelectorAll('#tablaContratosBody tr');

        filas.forEach(fila => {
            const texto = fila.textContent.toLowerCase();
            const coincide = terminos.every(t => texto.includes(t));
            fila.style.display = coincide ? '' : 'none';
        });
    }

    renderizarTabla() {
        const tbody = document.getElementById('tablaContratosBody');
        const noContratos = document.getElementById('noContratos');
        const tablaContainer = document.querySelector('.tabla-container');

        if (this.contratos.length === 0) {
            tbody.innerHTML = '';
            tablaContainer.style.display = 'none';
            noContratos.style.display = 'block';
            return;
        }

        tablaContainer.style.display = 'block';
        noContratos.style.display = 'none';

        tbody.innerHTML = this.contratos.map(contrato => `
            <tr>
                <td>${this.escapeHtml(contrato.numero)}</td>
                <td>${this.escapeHtml(contrato.cliente)}</td>
                <td>${this.escapeHtml(contrato.descripcion)}</td>
                <td>${this.formatearFecha(contrato.fechaInicio)}</td>
                <td>${this.formatearFecha(contrato.fechaFin)}</td>
                <td>$${this.formatearNumero(contrato.monto)}</td>
                <td><span class="estado estado-${contrato.estado}">${this.capitalize(contrato.estado)}</span></td>
                <td class="acciones">
                    <button class="btn btn-edit" onclick="control.abrirModalEditar('${contrato.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="control.eliminarContrato('${contrato.id}')">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }

    formatearFecha(fecha) {
        return new Date(fecha).toLocaleDateString('es-ES');
    }

    formatearNumero(numero) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numero);
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    generarId() {
        return 'contrato_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    cargarContratos() {
        try {
            const data = localStorage.getItem('contratos');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error al cargar contratos:', error);
            return [];
        }
    }

    guardarContratos() {
        try {
            localStorage.setItem('contratos', JSON.stringify(this.contratos));
        } catch (error) {
            console.error('Error al guardar contratos:', error);
            this.mostrarMensaje('Error al guardar los datos', 'error');
        }
    }

    mostrarMensaje(mensaje, tipo = 'info') {
        // Crear elemento de mensaje
        const mensajeEl = document.createElement('div');
        mensajeEl.className = `mensaje mensaje-${tipo}`;
        mensajeEl.textContent = mensaje;
        
        // Estilos del mensaje
        Object.assign(mensajeEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
        });

        // Colores según el tipo
        switch (tipo) {
            case 'success':
                mensajeEl.style.backgroundColor = '#28a745';
                break;
            case 'error':
                mensajeEl.style.backgroundColor = '#dc3545';
                break;
            default:
                mensajeEl.style.backgroundColor = '#17a2b8';
        }

        document.body.appendChild(mensajeEl);

        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            if (mensajeEl.parentNode) {
                mensajeEl.parentNode.removeChild(mensajeEl);
            }
        }, 3000);
    }

    // Método para exportar datos (funcionalidad adicional)
    exportarDatos() {
        const dataStr = JSON.stringify(this.contratos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'contratos_' + new Date().toISOString().split('T')[0] + '.json';
        link.click();
    }

    // Método para importar datos (funcionalidad adicional)
    importarDatos(archivo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const datos = JSON.parse(e.target.result);
                if (Array.isArray(datos)) {
                    this.contratos = datos;
                    this.guardarContratos();
                    this.renderizarTabla();
                    this.mostrarMensaje('Datos importados exitosamente', 'success');
                } else {
                    this.mostrarMensaje('Formato de archivo inválido', 'error');
                }
            } catch (error) {
                this.mostrarMensaje('Error al procesar el archivo', 'error');
            }
        };
        reader.readAsText(archivo);
    }
}

// Funciones globales para cerrar modal (compatibilidad con HTML)
function cerrarModal() {
    control.cerrarModal();
}

// Inicializar la aplicación cuando se carga la página
let control;
document.addEventListener('DOMContentLoaded', () => {
    control = new ControlContratos();
});