import { divContainer } from "./selectores.js";


export function mostrarError(msj) {

    const erorP = document.createElement('p');
    erorP.classList.add('p-error')
    erorP.innerHTML = msj;
    divContainer.insertBefore(erorP, divContainer.children[0]);

    // divContainer.appendChild(erorP);

    setTimeout(() => {
        erorP.remove()
    }, 3000);

}