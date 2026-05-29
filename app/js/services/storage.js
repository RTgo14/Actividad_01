/*funcion para guardar y leer los datos de la memoria del navegador*/
const STORAGE_KEY = 'incidenciasIT';

export const getStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export const saveStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};