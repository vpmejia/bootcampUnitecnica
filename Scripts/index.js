
document.addEventListener("DOMContentLoaded", function (event) {
  endpoint();
});

let dataApi, nameCountries;

async function endpoint() {
  const data = await fetch('https://restcountries.com/v3.1/all');
  dataApi = await data.json();
  handlerData(dataApi);
  totalLanguages(dataApi);
  languagesForCountry(dataApi)
  sameLanguages(dataApi)
  countriesRegion(dataApi)
  countriesSubregion(dataApi)
}

function handlerData(filterData) {

  nameCountries = filterData.map((countries, index) => ({
    name: countries.translations.spa.common, id: index
  })).sort((a, b) => a.name.localeCompare(b.name));

  console.log(nameCountries);

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
  // console.log(selectedCountry);nia
  const existsValue = nameCountries.find(identifier => identifier.name === selectedCountry);
  if (existsValue) {
    const identifier = existsValue.id;

    const specificInfo = dataApi[identifier];

    const infoPais = document.getElementById('info-pais');
    infoPais.innerHTML = `
      <hr class="divider">
      <div class="know-country-container">
        <h4 class="title">Esto es ${selectedCountry.toUpperCase()}</h4>
        <a href="../Views/infoLanguages.html"><img src="../img/Flight-rounded.svg" class="know-country-img"></a>
      </div>
      <div class="country-container">
        <div style="padding: -5px">
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

//total de lenguajes existentes en el mundo
function totalLanguages(data) {

  const allLanguages = [...new Set(data.map((selectLanguages) => {
    if (selectLanguages.languages) {
      return Object.keys(selectLanguages.languages);
    }
  }
  ).flat(1))
  ];
  document.getElementById('totalLanguages').value = allLanguages?.length;
}

function tableDraw(lanCountry) {
  let content = buildHeaders();

  if (lanCountry && lanCountry.length > 0) {
    content += "<tbody>";
    for (const posLang of lanCountry) {
      content += "<tr>";
      
      content += `<td>${posLang ? posLang.name : ''}</td>`;
      content += `<td>${posLang ? posLang.languages : ''}</td>`;
      content += `<td>${posLang ? posLang.languagesDescription : ''}</td>`;
      content += "</tr>";
    }
    content += "</tbody>";
  } else {
    content += "<tbody><tr><td colspan='3'>No hay datos</td></tr></tbody>";
  }
  document.getElementById("tableLanguages").innerHTML = content;
}

function buildHeaders() {
  return "".concat(
    ...[
      "<thead>",
      "<tr>",
      "<td> País </td>",
      "<td> Cantidad </td>",
      "<td> Descripción </td>",
      "</tr>",
      "</thead>"
    ]
  );
}

//Lenguages de cada país
function languagesForCountry(data) {
  const languagesCountry = data.map((country) => {
    if (country.languages) {
      const names = Object.values(country.languages);
      return {
        name: country.translations.spa.common,
        languages: names.length,
        languagesDescription: names.join(' - ')
      }
    }
  });
  console.log(languagesCountry);
  tableDraw(languagesCountry);
}

//Cantidad de países que hablan el mismo idioma
function sameLanguages(data) {

  const oneLanguages = data.reduce((acc, country) => {
    if (country.languages) {
      for (const language of Object.values(country.languages)) {
        acc[language]
          ? acc[language]++
          : acc[language] = 1;
      }
    }
    return acc;
  }, {});
  console.log(oneLanguages);
}

// Paises por continentes
function countriesRegion(countries) {

  const y3 = countries.reduce((acc, country) => {
    acc[country.region]
      ? acc[country.region].push(country.translations.spa.common)
      : acc[country.region] = [country.translations.spa.common];
    return acc;
  }
    , {});
  console.log(y3);
}

//Paises por subregiones
function countriesSubregion(countries) {

  const y3 = countries.reduce((acc, country) => {
    acc[country.subregion]
      ? acc[country.subregion].push(country.translations.spa.common)
      : acc[country.subregion] = [country.translations.spa.common];
    return acc;
  }
    , {});
  console.log(y3);
}



// Utiliza Object.keys para obtener un array de claves (propiedades) del subobjeto
//new Set permite crear un conjunto de datos sin que existan repetidos

