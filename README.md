# Dashboard - Mesa de Ayuda e Incidencias Tecnológicas

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Proceso-orange)
![Tecnología](https://img.shields.io/badge/Tecnología-Vanilla_JS-yellow)

Prototipo web interactivo para la gestión y seguimiento de incidencias tecnológicas (Grupo 8). Desarrollado aplicando JavaScript intermedio, manipulación del DOM y persistencia de datos local, sin el uso de frameworks externos.

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
- [Capturas del Sistema](#capturas-del-sistema)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Uso](#instalación-y-uso)
- [Autores](#autores)

## Descripción del Proyecto
Este sistema permite a un equipo de soporte técnico registrar, buscar y filtrar tickets. Pasamos de un código monolítico a un sistema basado en módulos ES6. Aplicamos validaciones reutilizables, persistencia de datos con `localStorage` y programación orientada a objetos (clases) para asegurar que cada ticket cumpla con las reglas de negocio desde su creación.

## Características Principales
* **Arquitectura Modular:** Separación estricta de la lógica de negocio, manejo del DOM, servicios de almacenamiento y validaciones (Principio de Responsabilidad Única).
* **Reglas de Negocio (POO):** Uso de clases para garantizar que todo ticket nuevo nazca con el estado por defecto "Abierto" y con campos obligatorios.
* **Mejoras de UX:** * Contador dinámico de registros.
  * Estado vacío (*Empty State*) amigable cuando no hay coincidencias o datos.
  * Ordenamiento automático (los tickets más recientes aparecen primero).
  * Notificaciones visuales (Toast) al guardar con éxito.
* **Filtros en Tiempo Real:** Búsqueda combinada por texto y categorización por nivel de prioridad.
* **Vista de Detalles (Modal):** Panel expandible, optimizado con delegación de eventos, para leer la descripción completa.

## Capturas del Sistema

### 1. Interfaz Principal
![Vista Principal del Dashboard antes de insertar las incidencias](app/Capturas/ListasIncidenciasVacias.jpeg)
Panel de control con el formulario de registro a la izquierda y la cuadrícula de incidencias dinámicas a la derecha.

### 2. Interfaz Principal con la lista de incidencias
![Vista Principal del Dashboard despues de insertar las incidencias](app/Capturas/ListasIncidenciasLlenas.jpeg)
Demostración del filtrado de tickets por prioridad y el manejo de errores en el formulario.

### 3. Modal de Detalles
![Detalle del Ticket](app/Capturas/Modal.jpeg)
Ventana modal que expone la información completa al hacer clic en el botón "Ver Detalle".

## Estructura del Proyecto

```text
/app
├── index.html                  # Estructura principal de la interfaz
├── styles.css                  # Estilos, variables CSS y diseño responsive
├── docs/                       # Documentación técnica del módulo
├── js/                         # Lógica modularizada (ES6 Modules)
│   ├── main.js                 # Orquestador principal y eventos
│   ├── data/seed.js            # Datos de prueba iniciales
│   ├── models/entity.js        # Clase constructora de la Incidencia
│   ├── services/storage.js     # Manejo exclusivo de localStorage
│   ├── services/module-service.js # CRUD y reglas de negocio
│   ├── ui/render.js            # Manipulación pura del DOM y UI
│   └── utils/validators.js     # Funciones puras de validación
└── Capturas/                   # Evidencias visuales del funcionamiento
```


## Instalación y Uso

1. *Clonar el repositorio:*
   ```bash
   git clone https://github.com/RTgo14/Actividad_01.git
   ```
   
2. *Abrir el proyecto:*
Dado que el código utiliza módulos de JavaScript (type="module" para separar la lógica de los datos), el sistema no funcionará haciendo doble clic sobre el archivo HTML debido a las políticas de seguridad (CORS) de los navegadores.

3. *Ejecución mediante Servidor Local:*

* *VS Code:* Instala la extensión Live Server y presiona "Go Live" sobre el archivo index.html.

## Autores
* Leiber Zambrano
* Michael Palma
* Christofer Barzola
* Blair Delgado
