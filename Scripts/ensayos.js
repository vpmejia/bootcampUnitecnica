const miObjeto1 = {
  "nombre": "Ejemplo",
  "edad": 25,
  "ocupacion": "Desarrollador",
  "ubicacion": "Ciudad de Ejemplo"
};

let cantidadDeElementos = 0;

for (const clave in miObjeto1) {
  if (miObjeto1.hasOwnProperty(clave)) {
    cantidadDeElementos++;
  }
}

console.log(`El objeto tiene ${cantidadDeElementos} elementos.`);

//*************************************************************************************** */

const miObjeto = {
  "propiedad1": {
    "subpropiedad1": {
      "clave1": "valor1",
      "clave2": "valor2"
    },
    "subpropiedad2": {
      "clave3": "valor3"
    }
  },
  "propiedad2": {
    "subpropiedad3": {
      "clave4": "valor4",
      "clave5": "valor5",
      "clave6": "valor6"
    }
  }
};

const totalSubProp = [];
// Itera sobre las propiedades del objeto principal
for (const propiedad in miObjeto) {
  if (miObjeto.hasOwnProperty(propiedad)) {
    const subobjeto = miObjeto[propiedad];

    // Utiliza Object.keys para obtener un array de claves (propiedades) del subobjeto
    const claves = Object.keys(subobjeto);

    // La longitud de ese array es la cantidad de propiedades en la subpropiedad
    const cantidadDePropiedades = claves.length;

    console.log(`La propiedad "${propiedad}" tiene ${cantidadDePropiedades} subpropiedades.`);
  }
}


const x = countries.map((country) => (
  {
      name: country.translations.spa.common,
      languages: Object.keys(country.languages).length
  }
  ));
// Cantidad idiomas por pais

countries.map((country) => (
  {
      name: country.translations.spa.common,
      languages: Object.keys(country.languages)
  }
  ));
// Idiomas por pais

 // las llaves es para definir el tipo de dato que quiero que retorne o donde quiero guardar el objeto
// Cuantos paises hablan un determinado idioma

const y3 = z.reduce((acc, country) => 
    {
        if(country.languages) {
             for(const language of country.languages) {
                acc[language]
                    ? acc[language]++
                    : acc[language] = 1;
            }
            return acc;
        }
    }
, {});

countries.reduce((acc, country) => 
    {
        acc[country.region]
            ? acc[country.region].push(country.translations.spa.common)
            : acc[country.region] = [country.translations.spa.common];
        return acc;
    }
, {});


// paises por region*

// Cuantos paises hablan un determinado idioma