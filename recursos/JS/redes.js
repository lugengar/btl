fetch('https://cdn.jsdelivr.net/gh/lugengar/btl@main/recursos/JSON/redes.json') 
    .then(response => response.json())
    .then(data => {
        const listaredes = document.querySelector('.listaredes');
        
        data.forEach(servicio => {
            const divServicio = document.createElement('a');
            divServicio.classList.add('red');
            divServicio.style.backgroundImage = `url(${servicio.image})`;
            divServicio.href = servicio.url; 
            listaredes.appendChild(divServicio);
        });
    })
    .catch(error => console.error('Error cargando el JSON:', error));

