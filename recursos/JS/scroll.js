function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const elements = document.querySelectorAll('.listaproductos, .listaservicios, .titulo, .inputs, #producto h1, #producto p, .botonegro, .minitexto, #servicios .titulo');
    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('aparece');
        }
    });
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', handleScroll);
