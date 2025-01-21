//https://www.youtube.com/embed/y47Htq3Ol2c?si=cg-ouPmtVw1mbZg0&amp;controls=0

fetch('recursos/JSON/video.json') 

    .then(response => response.json())
    .then(data => {
        const iframe = document.getElementById('iframe');
        if(data.url == ""){
            iframe.parentNode.style.display="none"
        }else{
            iframe.src = data.url
        }
    })
    .catch(error => console.error('Error cargando el JSON:', error));

