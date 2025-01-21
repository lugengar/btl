
fetch('recursos/JSON/super.json') 

    .then(response => response.json())
    .then(data => {
        const iframe = document.getElementById('iframe');
        iframe.src = data.video.url
    })
    .catch(error => console.error('Error cargando el JSON:', error));

