const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idPais = params.get('id');

function paintIframe() {
  const { maps } = JSON.parse(localStorage.getItem('dataApi'))[parseInt(idPais)];
  debugger;
  const iframe = document.getElementById('iframe-maps');
  iframe.src = maps.googleMaps;
}

paintIframe();