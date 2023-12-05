const PaisesData = [
  {
    "title": "Colombia: país de biodiversidad",
    "icon": "",
    "text": "Es uno de los países más megadiversos del mundo, alberga alrededor del 10% de la biodiversidad conocida en el mundo y es especialmente notable en regiones como la Amazonía, los Andes y los bosques nubosos. "
  },
  {
    "title": "Japón: Longevidad y Centenarios",
    "icon": "../img/img-data-interesting/anciano.png",
    "text": "Japón tiene una de las expectativas de vida más altas del mundo. Se atribuye a factores como una dieta saludable, estilo de vida activo y acceso a atención médica de calidad. Además, Japón tiene una cantidad significativa de centenarios, personas que han alcanzado los 100 años de edad."
  },
  {
    "title": "Islandia: Energía Renovable y Geotermia",
    "icon": "",
    "text": "Islandia es líder mundial en el uso de energías renovables y geotérmicas. Aproximadamente el 85% de la energía primaria del país proviene de fuentes renovables, como la energía hidroeléctrica y geotérmica. Las aguas termales y la actividad geotérmica también son aspectos destacados del paisaje islandés."
  },
  {
    "title": "Suiza: Neutralidad y Paz",
    "icon": "",
    "text": "Suiza es conocida por su política de neutralidad y ha evitado participar en conflictos armados internacionales desde 1815. Además, es sede de varias organizaciones internacionales, como la Cruz Roja. Suiza también es famosa por su paisaje montañoso y lagos pintorescos."
  },
  {
    "title": "Nueva Zelanda: Biodiversidad Única y Kiwis",
    "icon": "",
    "text": "Nueva Zelanda alberga una biodiversidad única, con muchas especies de plantas y animales que no se encuentran en ninguna otra parte del mundo. Es hogar de los kiwis, un ave no voladora y símbolo nacional. Nueva Zelanda es conocida por sus impresionantes paisajes, desde montañas hasta playas."
  },
  {
    "title": "Brasil: Selva Amazónica",
    "icon": "",
    "text": "Brasil alberga la selva amazónica, la selva tropical más grande del mundo. La Amazonía es vital para la biodiversidad global y es el hogar de una inmensa variedad de plantas, animales y tribus indígenas. Además, la Amazonía juega un papel crucial en la regulación del clima."
  },
  {
    "title": "Australia: Gran Barrera de Coral",
    "icon": "",
    "text": "La Gran Barrera de Coral en Australia es la estructura de coral más grande del mundo y es tan grande que se puede ver desde el espacio. Es el hogar de una increíble diversidad de vida marina, incluyendo una amplia variedad de corales, peces, y otras especies marinas."
  },
  {
    "title": "Bután: Felicidad Nacional Bruta",
    "icon": "",
    "text": `Bután es conocido por su enfoque único en la medición del bienestar. En lugar de utilizar el Producto Interno Bruto (PIB), Bután mide la "Felicidad Nacional Bruta", que evalúa factores como la salud, la educación, la calidad de vida y la preservación cultural.`
  },
  {
    "title": "Suecia: Derecho de Acceso Público",
    "icon": "",
    "text": `Suecia tiene una ley conocida como "Allemansrätten" o "Derecho de Acceso Público", que otorga a las personas el derecho de acceder y disfrutar libremente de la naturaleza, incluso en propiedades privadas. Esto significa que las personas pueden acampar y caminar libremente en la mayoría de los paisajes naturales suecos.`
  },
  {
    "title": "Mónaco: País más pequeño del mundo",
    "icon": "",
    "text": "Mónaco es un pequeño principado ubicado en la costa sur de Francia y es el país independiente más pequeño del mundo en términos de superficie. A pesar de su tamaño diminuto, es conocido por su lujo, casinos y eventos deportivos como el Gran Premio de Mónaco de Fórmula 1."
  }
];

function paintSabiasqueData() {
  const grid = document.getElementById('grid-container');

  let structure = '';

  for (const data of PaisesData) {
    structure += ` <div class="grid-item">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h6 class="card-title">${data.title}</h6>
            <img src="${data.icon}" class="img-card">
          </div>
          <div class="flip-card-back">
            <p class="txt-card">${data.text}</p>
          </div>
        </div>
      </div>
    </div>`;

  }
  grid.innerHTML = structure;
}

paintSabiasqueData();