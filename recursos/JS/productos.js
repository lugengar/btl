fetch('recursos/JSON/productos.json')
    .then(response => response.json())
    .then(data => {
        renderConfiguracion(data.configuracion);
        renderProductos(data.imagenes);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

function renderConfiguracion(config) {
    const producto = document.getElementById('producto');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    
    producto.src = config.imagenprincipal;

    h1.textContent = config.titulo;
    p.textContent = config.texto;

    producto.appendChild(h1);
    producto.appendChild(p);
}

function renderProductos(productos) {
    const listaProductos = document.querySelector('.listaproductos');

    productos.forEach(producto => {
        const item = document.createElement('div');
        const h3 = document.createElement('h1');
        const p = document.createElement('p');
        const divBlur = document.createElement('div');
        divBlur.classList.add('blur');
        
        h3.textContent = producto.titulo;
        p.textContent = "DESCRIPCIÓN: "+producto.texto;
        item.classList.add('producto');
        h3.classList.add('minititulo');
        item.style.backgroundImage = `url(${producto.imagen})`;
        item.style.backgroundPosition = producto.posicionimagen
        item.appendChild(divBlur);
        item.appendChild(h3);
        item.appendChild(p);
        listaProductos.appendChild(item);
    });
}

const containers = document.querySelectorAll('.listaproductos, .listaservicios');
let scrollPosition = 0;
let llego = false;
let timeoutId;

function autoScroll(container) {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        llego = true; 
    } else if (container.scrollLeft <= 0) {
        llego = false;
    }

    if (!llego) {
        scrollPosition += 0.1; 
    } else {
        scrollPosition -= 0.1;
    }

    container.scrollLeft = scrollPosition;
}

containers.forEach(container => {
    let scrollInterval = setInterval(() => autoScroll(container), 10);

    container.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });

    container.addEventListener('mouseleave', () => {
        clearTimeout(timeoutId); 
        timeoutId = setTimeout(() => {
            scrollInterval = setInterval(() => autoScroll(container), 10);
        }, 5000); 
    });
});
