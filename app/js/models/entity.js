export class Incidencia {
    constructor({ titulo, descripcion, prioridad }) {
        this.id = Date.now();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        // Regla de negocio: Toda nueva incidencia nace con estado "Abierto"
        this.estado = "Abierto"; 
        this.fecha = new Date().toISOString().split('T')[0];
    }
}