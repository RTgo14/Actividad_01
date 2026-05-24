import { incidenciasIniciales } from "./data.js";

// Estado y LocalStorage
let incidencias =
  JSON.parse(localStorage.getItem("incidenciasIT")) || incidenciasIniciales;

// Referencias al DOM (Listado)
const listaDOM = document.getElementById("lista-incidencias");
const inputBuscar = document.getElementById("buscar");
const selectFiltro = document.getElementById("filtro-prioridad");

// Renderizado Dinámico
const renderizarIncidencias = (datos) => {
  listaDOM.innerHTML = "";

  if (datos.length === 0) {
    listaDOM.innerHTML =
      '<p class="empty-msg">No se encontraron incidencias.</p>';
    return;
  }

  // MÉTODO sort
  const datosOrdenados = [...datos].sort((a, b) => b.id - a.id);

  // MÉTODO map
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
// 4. Búsqueda y Filtros
const aplicarFiltros = () => {
  const textoBusqueda = inputBuscar.value.toLowerCase();
  const prioridadFiltro = selectFiltro.value;

  // MÉTODO 3: filter
  const resultados = incidencias.filter((inc) => {
    const coincideTexto = inc.titulo.toLowerCase().includes(textoBusqueda);
    const coincidePrioridad =
      prioridadFiltro === "Todas" || inc.prioridad === prioridadFiltro;
    return coincideTexto && coincidePrioridad;
  });

  renderizarIncidencias(resultados);
};

// Listeners de filtros
inputBuscar.addEventListener("input", aplicarFiltros);
selectFiltro.addEventListener("change", aplicarFiltros);

// Inicializar la vista
renderizarIncidencias(incidencias);
