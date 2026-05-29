import { getStorage, saveStorage } from './storage.js';
import { incidenciasIniciales } from '../data/seed.js';
import { Incidencia } from '../models/entity.js';

export const cargarIncidencias = () => {
    let datos = getStorage();
    if (!datos) {
        datos = incidenciasIniciales;
        saveStorage(datos);
    }
    return datos;
};

export const agregarIncidencia = (datosFormulario) => {
    const nuevaIncidencia = new Incidencia(datosFormulario);
    const incidencias = cargarIncidencias();
    incidencias.push(nuevaIncidencia);
    saveStorage(incidencias);
    return incidencias;
};

export const filtrarIncidencias = (texto, prioridad) => {
    const incidencias = cargarIncidencias();
    return incidencias.filter(inc => {
        const coincideTexto = inc.titulo.toLowerCase().includes(texto.toLowerCase());
        const coincidePrioridad = prioridad === 'Todas' || inc.prioridad === prioridad;
        return coincideTexto && coincidePrioridad;
    });
};