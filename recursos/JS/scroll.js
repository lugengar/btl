// Función para verificar si un elemento está en la pantalla
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Aplicar la clase "aparece" cuando el elemento entra en el viewport
function handleScroll() {
    const elements = document.querySelectorAll('.listaproductos, .listaservicios, .titulo, .inputs, #producto h1, #producto p, .botonegro, .minitexto, #servicios .titulo');
    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('aparece');
        }
    });
}

// Escuchar el evento de scroll
window.addEventListener('scroll', handleScroll);

// Llamar la función una vez al cargar la página para animar elementos visibles desde el principio
document.addEventListener('DOMContentLoaded', handleScroll);
