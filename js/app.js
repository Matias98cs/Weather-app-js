import { callWeather, crearHTML, ObjWeather, showHtml } from './funciones.js';
import { divCard, formulario } from './selectores.js';
import { validacion } from './validacion.js';


formulario.addEventListener('submit', validacion);

