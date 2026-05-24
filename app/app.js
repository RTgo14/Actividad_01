import { incidenciasIniciales } from "./data.js";

// Estado y LocalStorage
let incidencias =
    JSON.parse(localStorage.getItem("incidenciasIT")) || incidenciasIniciales;

// Referencias al DOM (Listado)
const listaDOM = document.getElementById("lista-incidencias");
const inputBuscar = document.getElementById("buscar");
const selectFiltro = document.getElementById("filtro-prioridad");
const form = document.getElementById('form-incidencia');
const msgError = document.getElementById('mensaje-error');

// Renderizado Dinamico
const renderizarIncidencias = (datos) => {
    listaDOM.innerHTML = "";

    if (datos.length === 0) {
        listaDOM.innerHTML =
            '<p class="empty-msg">No se encontraron incidencias.</p>';
        return;
    }

    // METODO sort
    const datosOrdenados = [...datos].sort((a, b) => b.id - a.id);

    // METODO map
    const htmlString = datosOrdenados
        .map(
            (incidencia) => `
        <div class="card card-${incidencia.prioridad.toLowerCase()}">
            <h3>${incidencia.titulo}</h3>
            <p class="badge badge-${incidencia.prioridad.toLowerCase()}">Prioridad: ${incidencia.prioridad}</p>
            <p><strong>Estado:</strong> ${incidencia.estado}</p>
            <p><small>${incidencia.fecha}</small></p>
            <button class="btn-detalle" data-id="${incidencia.id}">Ver Detalle</button>
        </div>
    `,
        )
        .join("");

    listaDOM.innerHTML = htmlString;
};
// Busqueda y Filtros
const aplicarFiltros = () => {
    const textoBusqueda = inputBuscar.value.toLowerCase();
    const prioridadFiltro = selectFiltro.value;

    // METODO filter
    const resultados = incidencias.filter((inc) => {
        const coincideTexto = inc.titulo.toLowerCase().includes(textoBusqueda);
        const coincidePrioridad =
            prioridadFiltro === "Todas" || inc.prioridad === prioridadFiltro;
        return coincideTexto && coincidePrioridad;
    });

    renderizarIncidencias(resultados);
};

// Creacion y Validacion
const mostrarError = (mensaje) => {
    msgError.textContent = mensaje;
    msgError.classList.remove('hidden');
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const prioridad = document.getElementById('prioridad').value;

    // Validacion
    if (!titulo || !descripcion || !prioridad) {
        mostrarError("Todos los campos son obligatorios.");
        return;
    }
    
    if (titulo.length < 5) {
        mostrarError("El título debe tener al menos 5 caracteres.");
        return;
    }

    msgError.classList.add('hidden');

    const nuevaIncidencia = {
        id: Date.now(), 
        titulo,
        descripcion,
        prioridad,
        estado: "Abierto",
        fecha: new Date().toISOString().split('T')[0]
    };

    incidencias.push(nuevaIncidencia);
    localStorage.setItem('incidenciasIT', JSON.stringify(incidencias));
    
    form.reset();
    aplicarFiltros(); 
});

// Listeners de filtros
inputBuscar.addEventListener("input", aplicarFiltros);
selectFiltro.addEventListener("change", aplicarFiltros);

// Inicializacion de vista
renderizarIncidencias(incidencias);
