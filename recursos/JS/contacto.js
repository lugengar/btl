function fetchData() {
  // Realizar una solicitud fetch para obtener los datos JSON
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
  // Seleccionar los contenedores ya existentes
  const atencionContainer = document.querySelector('#atencion');
  const ubicacionContainer = document.querySelector('#ubicacion');
  
  // Filtrar los datos por tipo
  const atencion = data.filter(item => item.tipo === 'atencion');
  const ubicacion = data.filter(item => item.tipo === 'ubicacion');
  
  // Crear los elementos para Atención al Cliente
  atencion.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('correo');
    a.style.backgroundImage = `url(${item.image})`;
    a.textContent = item.url;
    atencionContainer.appendChild(a);
  });

  // Crear los elementos para Ubicación
  ubicacion.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('correo');
    a.style.backgroundImage = `url(${item.image})`;
    a.textContent = item.url;
    ubicacionContainer.appendChild(a);
  });
}

fetchData();
