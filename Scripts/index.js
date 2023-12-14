document.addEventListener("DOMContentLoaded", function (event) {
  endpoint();
});

let nameCountries;
let dataApi;

async function endpoint() {
  const data = await fetch('http://localhost:3333/all');
  dataApi = await data.json();
  localStorage.setItem('dataApi', JSON.stringify(dataApi));
  handlerData(dataApi);
}

function handlerData(filterData) {
  nameCountries = filterData.map((countries, index) => ({
    name: countries.translations.spa.common, id: index
  })).sort((a, b) => a.name.localeCompare(b.name));

  const dataList = document.getElementById('chooseCountry');
  const input = document.getElementById('searchCountries');
  for (const country of nameCountries) {
    const option = document.createElement('option');
    option.value = country.name;
    dataList.appendChild(option);
  }
  input.setAttribute('list', 'chooseCountry');
}

function paintFlag(container, img) {
  const imageFlag = document.createElement('img');
  imageFlag.classList.add('img-flag');
  imageFlag.src = img;
  container.appendChild(imageFlag);
}

//Option datalist - Busqueda de país
function selectedSearch() {
  const selectedCountry = document.getElementById('searchCountries').value;
  const existsValue = nameCountries.find(identifier => identifier.name === selectedCountry);
  if (existsValue) {
    const identifier = existsValue.id;

    const specificInfo = dataApi[identifier];

    const infoPais = document.getElementById('info-pais');
    infoPais.innerHTML = `
      <hr class="divider">
      <div class="know-country-container">
        <h4 class="title">Esto es ${selectedCountry.toUpperCase()}</h4>
        <a href="../Views/country.html?id=${identifier}"><img src="../img/Flight-rounded.svg" class="know-country-img"></a>
      </div>
      <div class="country-container">
        <div>
          <p type="text" id="onlyCapital" >Capital: ${specificInfo.capital ?? '...'}</p>
          <p type="text" id="onlyRegion" >Región: ${specificInfo.region ?? '...'}</p>
          <p type="text" id="onlySubregion">Subregión: ${specificInfo.subregion ?? '...'}</p>
        </div>
        <div id="imgFlag" class="img-flag-container">
        </div>
      </div>
    `;

    const containerFlag = document.getElementById('imgFlag');
    
    if (containerFlag.childElementCount > 0) {
      containerFlag.removeChild(containerFlag.lastChild);
    }
    paintFlag(containerFlag, specificInfo.flags.png);

    document.getElementById('searchCountries').value = '';
  } else {
    paintAstronaut();
  }
}

function paintAstronaut() {
  const infoPais = document.getElementById('info-pais');
  infoPais.innerHTML = `
    <hr class="divider">
    <div class="astronaut-container">
      <img src="../img/astronaut.gif" style="width:300px">
      <h4 class="title">Ups! Parece que no has buscado un país...</h4>
    </div>
  `;
}

// Utiliza Object.keys para obtener un array de claves (propiedades) del subobjeto
//new Set permite crear un conjunto de datos sin que existan repetidos
