//total de lenguajes existentes en el mundo
function totalLanguages(data) {
  const x = [...new Set(
    data.map((selectLanguages) => {
      if (selectLanguages.languages) {
        return Object.keys(selectLanguages.languages);
      }
    }
    ).flat(1))
  ];
  console.log(x);
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