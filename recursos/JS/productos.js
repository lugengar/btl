fetch('recursos/JSON/productos.json')
    .then(response => response.json())
    .then(data => {
        renderConfiguracion(data);
        renderProductos(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

function renderConfiguracion(info) {
    config = info.configuracion
    const producto = document.getElementById('producto');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    
    producto.style.backgroundImage = `url(${config.ubicacioncarpeta+config.imagenprincipal})`;
    
    h1.textContent = config.titulo;
    p.textContent = config.texto;

    producto.appendChild(h1);
    producto.appendChild(p);
}

function renderProductos(info) {
    ubicacioncarpeta = info.configuracion.ubicacioncarpeta
    productos = info.imagenes
    const listaProductos = document.querySelector('.listaproductos');

    productos.forEach(producto => {
        const item = document.createElement('div');
        const h3 = document.createElement('h1');
        const p = document.createElement('p');
        const divBlur = document.createElement('div');
        divBlur.classList.add('blur');
        p.classList.add('texto');
        h3.textContent = producto.titulo;
        p.textContent = producto.texto;
        item.classList.add('producto');
        h3.classList.add('minititulo');
        item.innerHTML= `<button class="botonegro" onclick="consultar('producto','${producto.titulo}')">CONSULTAR PRECIO</button>`
        item.style.backgroundImage = `url(${ubicacioncarpeta+producto.imagen})`;
        item.style.backgroundPosition = producto.posicionimagen
        item.appendChild(divBlur);
        item.appendChild(h3);
        item.appendChild(p);
        listaProductos.appendChild(item);
    });
}
/*
const containers = document.querySelectorAll('.listaproductos, .listaservicios');
containers.forEach(container => {

    let scrollPosition = 0;
    let llego = false;
    let scrollInterval;
    let timeoutId;

    function autoScroll() {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            llego = true; 
        } else if (container.scrollLeft <= 0) {
            llego = false;
        }

        scrollPosition = llego ? scrollPosition - 1 : scrollPosition + 1;
        container.scrollLeft = scrollPosition;
    }

    function startAutoScroll() {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, 20);
    }
    function startAutoScroll2() {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, 10000);
    }
    function stopAutoScroll() {
        clearInterval(scrollInterval);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(startAutoScroll, 5000);
    }

    startAutoScroll();

    container.addEventListener("touchstart", stopAutoScroll, { passive: true });
    container.addEventListener("touchend", startAutoScroll2, { passive: true });
    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll2);
});
*/