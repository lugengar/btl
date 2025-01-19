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

function generateHTML(data) {
  const atencionContainer = document.querySelector('#atencion');
  const ubicacionContainer = document.querySelector('#ubicacion');
  
  const atencion = data.filter(item => item.tipo === 'atencion');
  const ubicacion = data.filter(item => item.tipo === 'ubicacion');
  
  atencion.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('correo');
    a.style.backgroundImage = `url(${item.image})`;
    a.textContent = item.url;
    atencionContainer.appendChild(a);
  });

  ubicacion.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('correo');
    a.style.backgroundImage = `url(${item.image})`;
    a.textContent = item.url;
    ubicacionContainer.appendChild(a);
  });
}

fetchData();
