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
    ubicacioncarpeta = info.configuracion.ubicacioncarpeta;
    productos = info.imagenes;
    const listaProductos = document.querySelector('.listaproductos');
    let indice = 0;
    
    productos.forEach(producto => {
        indice++;
        const item = document.createElement('div');
        const h3 = document.createElement('h1');
        const p = document.createElement('p');
        const divBlur = document.createElement('div');
        
        if (indice > 1) {
            item.style.display = "none";
            item.classList.add("oculto");
        }
        
        divBlur.classList.add('blur');
        p.classList.add('texto');
        h3.textContent = producto.titulo;
        p.textContent = producto.texto;
        item.classList.add('producto');
        h3.classList.add('minititulo');
        item.setAttribute("data-marca", producto.marca);
        item.innerHTML = `<button class="botonegro" onclick="consultar('producto','${producto.titulo}')">CONSULTAR PRECIO</button>`;
        item.style.backgroundImage = `url(${ubicacioncarpeta+producto.imagen})`;
        item.style.backgroundPosition = producto.posicionimagen;
        item.appendChild(divBlur);
        item.appendChild(h3);
        item.appendChild(p);
        listaProductos.appendChild(item);
    });

    
    const botonVerMas = document.getElementById('vermas');
    botonVerMas.addEventListener("click", function () {
        let ocultos = document.querySelectorAll(".listaproductos .producto.oculto");
        ocultos.forEach((producto, index) => {
            if (index < 1 && producto.style.display === "none") {
                if (producto.classList.contains("oculto") && producto.style.display === "none") {
                    let titulo = producto.querySelector(".minititulo").textContent.toLowerCase();
                    let marca = producto.getAttribute("data-marca").toLowerCase();
                    let filtro = document.getElementById("buscar").value.toLowerCase();
                    let marcaSeleccionada = document.getElementById("marcasbuscar").value.toLowerCase();

                    if ((titulo.includes(filtro) || marca.includes(filtro)) && (marcaSeleccionada === "" || marca === marcaSeleccionada)) {
                        producto.style.display = "grid";
                        producto.classList.remove("oculto");
                    }
                }
            }
        });

        actualizarBotonVerMas();
    });
}

function actualizarVisibilidadProductos() {
    let filtro = document.getElementById("buscar").value.toLowerCase();
    let marcaSeleccionada = document.getElementById("marcasbuscar").value.toLowerCase();
    let productos = document.querySelectorAll(".listaproductos .producto");
    let sinResultados = document.getElementById("sinResultados");
    let hayResultados = false;
    
    productos.forEach(producto => {
        let titulo = producto.querySelector(".minititulo").textContent.toLowerCase();
        let marca = producto.getAttribute("data-marca").toLowerCase();

        if ((titulo.includes(filtro) || marca.includes(filtro)) && (marcaSeleccionada === "" || marca === marcaSeleccionada)) {
            producto.style.display = "grid";
            producto.classList.remove("oculto");
            hayResultados = true;
        } else {
            producto.style.display = "none";
            producto.classList.add("oculto");
        }
    });

    if (sinResultados) {
        sinResultados.style.display = hayResultados ? "none" : "block";
    }

    actualizarBotonVerMas();
}

function actualizarBotonVerMas() {
    const botonVerMas = document.getElementById('vermas');
    const productosOcultos = document.querySelectorAll(".listaproductos .producto.oculto");
    const productosVisibles = document.querySelectorAll(".listaproductos .producto[style*='display: grid']");
    
    if (productosOcultos.length === 0 || productosVisibles.length === 0) {
        botonVerMas.style.display = "none";
    } else {
        botonVerMas.style.display = "block";
    }
}

document.getElementById("buscar").addEventListener("input", actualizarVisibilidadProductos);
document.getElementById("marcasbuscar").addEventListener("change", actualizarVisibilidadProductos);

