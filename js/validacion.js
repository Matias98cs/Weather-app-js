import { callWeather } from "./funciones.js";
import { mostrarError } from "./mostrarError.js";
import { formulario } from "./selectores.js";



export function validacion(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;

    }
    callWeather(ciudad, pais);
}