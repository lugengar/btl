function fetchData() {
  
  fetch('recursos/JSON/contactos.json')
    .then(response => response.json())
    .then(data => {
      
      generateHTML(data);
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
}

function generateHTML(info) {
  ubicacioncarpeta = info.configuracion.ubicacioncarpeta
  data = info.imagenes
  const atencionContainer = document.querySelector('#atencion');
  const ubicacionContainer = document.querySelector('#ubicacion');
  
  const atencion = data.filter(item => item.tipo === 'atencion');
  const ubicacion = data.filter(item => item.tipo === 'ubicacion');
  
  atencion.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('correo');
    a.style.backgroundImage = `url(${ubicacioncarpeta+item.image})`;
    a.onclick = copiarAlPortapapeles.bind(null, a);
    a.textContent = item.url;
    atencionContainer.appendChild(a);
  });

  ubicacion.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('correo');
    a.style.backgroundImage = `url(${ubicacioncarpeta+item.image})`;
    a.onclick = copiarAlPortapapeles.bind(null, a);
    a.textContent = item.url;
    ubicacionContainer.appendChild(a);
  });
}
function copiarAlPortapapeles(enlace) {
  const texto = enlace.textContent;

  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = texto;  
  tempInput.select();  
  document.execCommand('copy');  
  document.body.removeChild(tempInput); 

  alert('Texto copiado al portapapeles: ' + texto);
}

fetchData();
