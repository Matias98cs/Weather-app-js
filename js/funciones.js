import { mostrarError } from "./mostrarError.js";
import { formulario, divContainer, divContainerBusqueda, divCard } from "./selectores.js";
import { validacion } from "./validacion.js";

export let ObjWeather = [];

window.addEventListener('DOMContentLoaded', () => {
    ObjWeather = JSON.parse( localStorage.getItem('ObjWeather') ) || []  ;
    crearHTML();
    console.log(ObjWeather)

    const divBox = document.querySelector('.weather-search');

});

export function callWeather(ciudad, pais) {

    const apiKey = 'c2728711452718a07c3395739faf9070';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if (data.cod === '404') {
                mostrarError('Ciudad no encontrada')
            }
            console.log(data)
            showHtml(data);
        })

}

export function showHtml(data) {
    // window.location.href = 'busqueda.html';

    const { main: {temp, temp_min, temp_max}, weather: [{icon, description}], sys : {country}, name} = data;

    const waetherObjeto = {
        id: Date.now(),
        main: {
            temp: temp,
            temp_max: temp_max,
            temp_min : temp_min,   
        },
        weather: [{
            icon: icon,
            description: description
        }],
        sys: {
            country: country
        },
        name: name

    }

    ObjWeather = [...ObjWeather, waetherObjeto];

    crearHTML();

    formulario.reset();
}

export function crearHTML() {
    limpiarHTML();

    if(ObjWeather.length > 0) {
        ObjWeather.forEach( info => {
            const { main: {temp, temp_min, temp_max}, weather: [{icon, description}], sys : {country}, name} = info;
                const temperatura = KelvinACentigrados(temp)
                const max = KelvinACentigrados(temp_max);
                const min = KelvinACentigrados(temp_min);

                
                const html = document.createElement('div');

                html.innerHTML = `
                <div class="weather-search">
                    <div class="col-1">
                        <div class="name">
                            <p><strong>${country}</strong>, ${name}</p>
                        </div>
                        <div class="number">
                            <div class="temp">
                                <p> ${temperatura} °C</p>
                            </div>
                            <div class="temp-max-min">
                                <p>Min ${max}°C</p>
                                <p>Max ${min}°C</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="weater-img">
                            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="img-weather">
                            <p>${description}</p>
                        </div>
                    </div>
                </div>
                `;
                // divContainer.appendChild(html);
                divContainer.insertBefore(html, divContainer.children[0]);
            
        });
    }
    sincroLocalStorage();

}

export function KelvinACentigrados(grados) {
    return parseInt( grados - 273.15);
  }

function sincroLocalStorage(){
    localStorage.setItem('ObjWeather', JSON.stringify(ObjWeather))
}

export function limpiarHTML() {
    while(divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
    }
}


