
fetch('recursos/JSON/video.json') 

    .then(response => response.json())
    .then(data => {
        const iframe = document.getElementById('iframe');
        iframe.src = data.url
    })
    .catch(error => console.error('Error cargando el JSON:', error));

