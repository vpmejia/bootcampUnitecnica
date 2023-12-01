
function tableDraw(lanCountry) {
  let content = buildHeaders();

  if (lanCountry && lanCountry.length > 0) {
    content += "<tbody>";
    for (const posLang of lanCountry) {
      // debugger;
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