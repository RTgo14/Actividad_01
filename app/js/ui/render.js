export const renderizarIncidencias = (datos, contenedorLista, contadorDOM) => {
    contenedorLista.innerHTML = ''; 
    
    // Mejora UX: Contador de registros
    contadorDOM.textContent = datos.length;
    
    // Mejora UX: Estado vacío
    if (datos.length === 0) {
        contenedorLista.innerHTML = '<p class="empty-msg" style="grid-column: 1 / -1; text-align: center; color: #7f8c8d;">No hay incidencias para mostrar.</p>';
        return;
    }

    const datosOrdenados = [...datos].sort((a, b) => b.id - a.id);

    const htmlString = datosOrdenados.map(incidencia => `
        <div class="card card-${incidencia.prioridad.toLowerCase()}">
            <h3>${incidencia.titulo}</h3>
            <p class="badge badge-${incidencia.prioridad.toLowerCase()}">Prioridad: ${incidencia.prioridad}</p>
            <p><strong>Estado:</strong> ${incidencia.estado}</p>
            <p><small>${incidencia.fecha}</small></p>
            <button class="btn-detalle" data-id="${incidencia.id}" data-action="detalle">Ver Detalle</button>
        </div>
    `).join('');

    contenedorLista.innerHTML = htmlString;
};

export const mostrarToastExito = () => {
    const toast = document.getElementById('toast-exito');
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
};