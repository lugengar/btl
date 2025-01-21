fetch('recursos/JSON/super.json')
    .then(response => response.json())
    .then(info => {
        ubicacioncarpeta = info.marcas.configuracion.ubicacioncarpeta
        marcasData = info.marcas.imagenes
        const marcasContainer = document.getElementById("marcas");
        const marcasContainer2 = document.getElementById("marcasbuscar");
        const totalMarcas = marcasData.length;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const imageWidth = screenHeight * 1;

        const animationDistance = screenWidth + imageWidth;

        const baseSpeed = 10; 
        const animationDuration = baseSpeed * (animationDistance / screenWidth);

        marcasData.forEach((marcaData, index) => {
            const marcaDiv = document.createElement("div");
            const marcaDiv2 = document.createElement("option");
            marcaDiv.classList.add("marca");
            marcaDiv2.classList.add("marca2");

            marcaDiv.style.backgroundImage = `url('${ubicacioncarpeta+marcaData.image}')`;
            marcaDiv2.textContent= marcaData.nombre;
            marcaDiv2.value= marcaData.nombre;
            if(marcaData.tamañoespecial != "") {
                marcaDiv.style.backgroundSize = marcaData.tamañoespecial
            }

            marcaDiv.style.animation = `animarca ${animationDuration}s linear infinite`;

            const delay = index * (animationDuration / totalMarcas);
            marcaDiv.style.animationDelay = `${delay}s`;

            marcasContainer.appendChild(marcaDiv);
            marcasContainer2.appendChild(marcaDiv2);
        });
    })
    .catch(error => console.error("Error cargando el JSON:", error));
