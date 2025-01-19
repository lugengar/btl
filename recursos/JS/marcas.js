fetch('https://cdn.jsdelivr.net/gh/lugengar/btl@main/https://cdn.jsdelivr.net/gh/lugengar/btl@main/recursos/JSON/marcas.json')
    .then(response => response.json())
    .then(marcasData => {
        const marcasContainer = document.getElementById("marcas");
        const totalMarcas = marcasData.length;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const imageWidth = screenHeight * 1;

        const animationDistance = screenWidth + imageWidth;

        const baseSpeed = 10; 
        const animationDuration = baseSpeed * (animationDistance / screenWidth);

        marcasData.forEach((marcaData, index) => {
            const marcaDiv = document.createElement("div");
            marcaDiv.classList.add("marca");

            marcaDiv.style.backgroundImage = `url('${marcaData.image}')`;
            if(marcaData.tamaño != "") {
                marcaDiv.style.backgroundSize = `url('${marcaData.tamaño}')`;
            }

            marcaDiv.style.animation = `animarca ${animationDuration}s linear infinite`;

            const delay = index * (animationDuration / totalMarcas);
            marcaDiv.style.animationDelay = `${delay}s`;

            marcasContainer.appendChild(marcaDiv);
        });
    })
    .catch(error => console.error("Error cargando el JSON:", error));
