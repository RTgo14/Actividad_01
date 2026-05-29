import { cargarIncidencias, agregarIncidencia, filtrarIncidencias } from './services/module-service.js';
import { renderizarIncidencias, mostrarToastExito } from './ui/render.js';
import { validarLongitud, validarPrioridad } from './utils/validators.js';

// Elementos del DOM
const form = document.getElementById('form-incidencia');
const inputBuscar = document.getElementById('buscar');
const selectFiltro = document.getElementById('filtro-prioridad');
const listaDOM = document.getElementById('lista-incidencias');
const contadorDOM = document.getElementById('contador-registros');
const msgError = document.getElementById('mensaje-error');
const modal = document.getElementById('modal-detalle');

// Inicialización
let incidenciasActuales = cargarIncidencias();
renderizarIncidencias(incidenciasActuales, listaDOM, contadorDOM);

// Eventos de Filtro
const aplicarFiltros = () => {
    incidenciasActuales = filtrarIncidencias(inputBuscar.value, selectFiltro.value);
    renderizarIncidencias(incidenciasActuales, listaDOM, contadorDOM);
};

inputBuscar.addEventListener('input', aplicarFiltros);
selectFiltro.addEventListener('change', aplicarFiltros);

// Formulario de creación
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const prioridad = document.getElementById('prioridad').value;

    // Uso de validadores reutilizables
    if (!validarLongitud(titulo, 5) || !validarLongitud(descripcion, 10)) {
        msgError.textContent = "El título (min 5) y descripción (min 10) son obligatorios.";
        msgError.classList.remove('hidden');
        return;
    }

    if (!validarPrioridad(prioridad)) {
        msgError.textContent = "Seleccione una prioridad válida.";
        msgError.classList.remove('hidden');
        return;
    }

    msgError.classList.add('hidden');

    // Módulo Service se encarga de guardar y retornar la lista actualizada
    incidenciasActuales = agregarIncidencia({ titulo, descripcion, prioridad });
    
    form.reset();
    aplicarFiltros(); 
    mostrarToastExito();
});

// Eventos Delegados (Mejora de rendimiento para el modal)
listaDOM.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'detalle') {
        const id = Number(e.target.dataset.id);
        const incidencia = incidenciasActuales.find(inc => inc.id === id);
        
        if (incidencia) {
            document.getElementById('modal-titulo').textContent = incidencia.titulo;
            document.getElementById('modal-estado').textContent = incidencia.estado;
            document.getElementById('modal-prioridad').textContent = incidencia.prioridad;
            document.getElementById('modal-fecha').textContent = incidencia.fecha;
            document.getElementById('modal-descripcion').textContent = incidencia.descripcion;
            modal.classList.remove('hidden');
        }
    }
});

// Cerrar Modal
document.getElementById('close-modal').addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });