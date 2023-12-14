const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idPais = params.get('id');

document.addEventListener('DOMContentLoaded', function () {
  const gridContainer = document.getElementById('grid-container');
  const mostrarMasButton = document.getElementById('mostrarMas');
  const input = document.getElementById("filterName");

  // Definir la cantidad inicial de elementos visibles
  let elementosVisibles = 6;

  // Función para actualizar la visibilidad de los elementos en el grid
  function actualizarVisibilidad() {
    const elementos = gridContainer.querySelectorAll('.grid-item');
    elementos.forEach((elemento, index) => {
      if (index < elementosVisibles) {
        elemento.style.display = 'block';
      } else {
        elemento.style.display = 'none';
      }
    });
  }

  // Mostrar más elementos cuando se hace clic en el botón
  mostrarMasButton.addEventListener('click', function () {
    elementosVisibles += 6;
    actualizarVisibilidad();
  });

  // Actualizar visibilidad al cambiar el filtro por nombre (en cada cambio de input)
  input.addEventListener('input', function () {
    filtrarElementos();
  });

  // Llama a esta función al cargar la página para configurar la visibilidad inicial
  actualizarVisibilidad();
});

function filtrarElementos() {
  const input = document.getElementById("filterName");
  const filtro = input.value.toUpperCase();
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach((gridItem) => {
    const nombreFlag = gridItem.querySelector('.text').textContent || gridItem.querySelector('.text').innerText;
    const coincideFiltro = nombreFlag.toUpperCase().includes(filtro);
    gridItem.style.display = coincideFiltro ? "" : "none";
  });
}

function paintData() {
  const countryData = JSON.parse(localStorage.getItem('dataApi'));
  const flagsC = countryData.map((countries, index) => ({
    name: countries.translations.spa.common, id: index, flags: countries.flags.png
  })).sort((a, b) => a.name.localeCompare(b.name));
  paintCountryData(flagsC);
  // paintBandera(countryData.flags.png);
}

function infoCountry(idRoute) {
  const urlDestino = `../Views/country.html?id=${idRoute}`;
  window.location.href = urlDestino;
}

function paintCountryData(countryFlags) {

  const grid = document.getElementById('grid-container');

  let structure = '';

  for (const flag of countryFlags) {
    structure += ` <div class="grid-item" onclick="infoCountry(${flag.id})">
      <div class="flip-card">
        <img src="${flag.flags}" class="img-card">
        <div class="middle">
          <div class="text">${flag.name}</div>
        </div>
      </div>
    </div>`;
  }
  grid.innerHTML = structure;
}

paintData();