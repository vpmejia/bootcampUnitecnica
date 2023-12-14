const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idPais = params.get('id');

const structureCountryData = [
  {
    text: "$VALUE",
    key: "currencies",
    function: getCurrencyName
  },
  {
    text: "Su identificador es $VALUE",
    key: "idd",
    function: getRoot
  },
  {
    text: "Se encuentra en el continente de $VALUE",
    key: "region",
    function: getContinente
  },
  {
    text: "Se encuentra en la subregión $VALUE",
    key: "subregion",
    function: getSubregion
  },
  {
    text: "Su capital es $VALUE",
    key: "capital",
    function: getJoinedKey
  },
  {
    text: "Cuenta con una población de $VALUE",
    key: "population",
    function: getPopulation
  },
  {
    text: "Conducen por el lado $VALUE",
    key: "car",
    function: getSide
  },
  {
    text: "Su semana inicia el día $VALUE",
    key: "startOfWeek",
    function: getDayOfWeek
  },
  {
    text: "Sus zonas horarias son $VALUE",
    key: "timezones",
    function: getJoinedKey
  },

];

function getCurrencyName(currencies) {
  const key = currencies ? Object.keys(currencies) : {};
  return (key.length) ? `Su moneda es ${currencies[key].name} y su simbolo es ${currencies[key].symbol}` : 'Ups! este dato no lo tenemos';
}

function getRoot(idd) {
  return idd.root ?? '...';
}

function getContinente(region) {
  return region ?? '...';
}

function getSubregion(subregion) {
  return subregion ?? '...';
}

function getJoinedKey(capital) {
  return capital ? capital?.join(' - ') : '...';
}

function getPopulation(population) {
  return population;
}

function getSide(car) {
  const traduccion = {
    left: 'Izquierdo',
    right: 'Derecho'
  };
  return traduccion[car.side] ?? '...';
}

function getDayOfWeek(startOfWeek) {
  const traduccion = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miercoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return traduccion[startOfWeek] ?? '';
}

function paintData() {
  const countryData = JSON.parse(localStorage.getItem('dataApi'))[parseInt(idPais)];
  paintCountryName(countryData.translations.spa.official);
  paintEscudo(countryData.coatOfArms.svg);
  paintBandera(countryData.flags.png);
  paintCountryData(countryData);
  const translations = getCountryTranslations(countryData);
  pronunciationCountry(translations);
}

function getCountryTranslations(country) {
  const languages = totalLanguages(JSON.parse(localStorage.getItem('dataApi')));
  return translateLanguages(languages, country);
}

function languagesForCountry(data) {
  const languagesCountry = data.map((country) => {
    if (country.languages) {
      const names = Object.values(country.languages);
      return {
        name: country.translations.spa.common,
        languages: names.length,
        languagesDescription: names
      }
    }
  });
  console.log(languagesCountry);
}

function translateLanguages(languages, country) {
  return country.translations ?
    Object.keys(country.translations).reduce((acc, act) => {
      const language = languages.find(lang => lang.key === act);
      if(language) {
        acc[language.value] = country.translations[act].official;
      }
      return acc;
    }, {})
    : []
}

//total de lenguajes existentes en el mundo
function totalLanguages(data) {
  const langs = data.map((country) => {
    if (country.languages) {
      return Object.keys(country.languages).map(lang => ({ key: lang, value: country.languages[lang] }))
    }
  }
  ).flat(1);
  return eliminarObjetosRepetidos(langs, 'key');
}

function eliminarObjetosRepetidos(array, propiedad) {
  const unicos = new Set();
  return array.filter(obj => {
    if (obj) {
      const valor = obj[propiedad];
      if (!unicos.has(valor)) {
        unicos.add(valor);
        return true;
      }
      return false;
    }
  });
}

function paintCountryName(name) {
  const title = document.getElementById('title');
  title.innerText = name;
}

function paintEscudo(route) {
  const imgEscudo = document.getElementById('image-escudo');
  imgEscudo.src = route;
}

function paintBandera(route) {
  const imgBandera = document.getElementById('image-bandera');
  console.log(imgBandera);
  imgBandera.src = route;
}

function paintCountryData(countryData) {
  const grid = document.getElementById('grid-container');

  let structure = '';

  for (const data of structureCountryData) {
    const replaceText = data.function.call(this, countryData[data.key]);
    structure += `
      <div class="grid-item">
        <div class="card">
          <img src="../img/MaterialSymbolsDone.svg" class="done-img">
          <p class="txt-card">${data.text.replace('$VALUE', replaceText)}</p>
        </div>
      </div>`;
  }
  grid.innerHTML = structure;
}

function pronunciationCountry(otherCountries) {
  const grid = document.getElementById('grid-pronunciation');

  let structure = '';

  for (const lang in otherCountries) {
    if (otherCountries.hasOwnProperty(lang)) {
      const translation = otherCountries[lang];
      structure += `
        <div class="grid-item">
          <div class="card">
            <img src="../img/icon-languages.svg" class="done-img">
            <p class="txt-card">${lang}: ${translation}</p>
          </div>
        </div>`;
    }
  }

  grid.innerHTML = structure;
}

function openMap() {
  const countryData = JSON.parse(localStorage.getItem('dataApi'))[parseInt(idPais)];
  const url = countryData.maps.googleMaps;
  window.open(url, '_blank');
}

paintData();