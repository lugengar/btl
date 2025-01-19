fetch('recursos/JSON/redes.json') 
    .then(response => response.json())
    .then(data => {
        const listaredes = document.querySelector('.listaredes');
        
        data.forEach(servicio => {
            const divServicio = document.createElement('a');
            divServicio.classList.add('red');
            divServicio.style.backgroundImage = `url(${servicio.image})`;
            if(servicio.image == "recursos/SVG/whats.svg"){
                const divServicio2 = document.createElement('a'); 
                divServicio2.classList.add('whats');
                divServicio2.style.backgroundImage = `url(${servicio.image})`;
                divServicio2.href = servicio.url; 
                document.getElementById("main").appendChild(divServicio2);

            }
            divServicio.href = servicio.url; 
            listaredes.appendChild(divServicio);
        });
    })
    .catch(error => console.error('Error cargando el JSON:', error));

