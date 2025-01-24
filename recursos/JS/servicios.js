fetch('recursos/JSON/servicios.json') 

    .then(response => response.json())
    .then(info => {
        ubicacioncarpeta = info.configuracion.ubicacioncarpeta
        data = info.imagenes
        const listaServicios = document.querySelector('.listaservicios');
        
        data.forEach(servicio => {
            const divServicio = document.createElement('div');
            divServicio.classList.add('servicio');
            divServicio.style.backgroundImage = `url(${ubicacioncarpeta+servicio.imagen})`;
            divServicio.style.backgroundPosition = servicio.posicionimagen;
            
            const divBlur = document.createElement('div');
            divBlur.classList.add('blur');
            
            const h1Titulo = document.createElement('h1');
            h1Titulo.classList.add('subtitulo');
            h1Titulo.textContent = servicio.titulo;
            divServicio.innerHTML= `<button class="botonegro" onclick="consultar('COTIZACIÓN SERVICIOS','${servicio.titulo}')">CONSULTAR COTIZACIÓN</button>`
            const pTexto = document.createElement('p');
            pTexto.classList.add('texto');
            pTexto.textContent = servicio.texto;
            
            divServicio.appendChild(divBlur);
            divServicio.appendChild(h1Titulo);
            divServicio.appendChild(pTexto);
            
            listaServicios.appendChild(divServicio);
        });
    })
    .catch(error => console.error('Error cargando el JSON:', error));

