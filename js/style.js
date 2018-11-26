const meteos = {
  Rain: {
    icone: '<i class="wi wi-day-rain"></i>',
    commentaire: "Pluie",
    bgstyle: "linear-gradient(to left top, #cfd9df,  #e2ebf0)"
  },

  Clouds: {
    icone: '<i class="wi wi-day-cloudy"></i>',
    commentaire: "Nuageux",
    bgstyle: "linear-gradient(to left top, #8e9eab, #eef2f3)"
  },

  Clear: {
    icone: '<i class="wi wi-day-sunny"></i>',
    commentaire: "Dégagé",
    bgstyle: "linear-gradient(to left top, #2980b9, #6dd5fa, #ffffff)"
  },

  Snow: {
    icone: '<i class="wi wi-day-snow"></i>',
    commentaire: "Neige",
    bgstyle: "linear-gradient(to left top, #e6e9f0, #eef1f5);"
  },

  Mist: {
    icone: '<i class="wi wi-day-fog"></i>',
    commentaire: "Brumeux",
    bgstyle: "linear-gradient(to left top, #ece9e6, #ffffff)"
  },
  Fog: {
    icone: '<i class="wi wi-day-fog"></i>',
    commentaire: "Brouillard",
    bgstyle: "linear-gradient(to left top, #ece9e6, #00416A, #ffffff)"
  },

  Drizzle: {
    icone: '<i class="wi wi-day-sleet"></i>',
    commentaire: "Grisaille",
    bgstyle: "linear-gradient(to right top, #e6dada, #274046)"
  }
};

function miseEnFormeMeteoDuJour(meteoJour) {
  const fleche = tourneFleche(meteoJour.wind.deg);
  const temps = meteoJour.weather[0].main;
  const leveSoleil =
    "<i class='wi wi-sunrise'> </i>" +
    convertDate(+meteoJour.sys.sunrise).heure;
  const coucheSoleil =
    "<i class='wi wi-sunset'> </i>" + convertDate(+meteoJour.sys.sunset).heure;
  const releve = convertDate(+meteoJour.dt).heure;
  const formatVillePourTitre = afficheVilleCountry().slice(
    0,
    afficheVilleCountry().indexOf(",")
  );
  document.title =
    formatVillePourTitre +
    " : " +
    meteos[temps].commentaire +
    "/" +
    meteoJour.main.temp +
    " °C";
  setTimer();

  document.getElementById("infoVille").innerHTML =
    "Actuellement à " + "<h1>" + afficheVilleCountry() + "</h1>";
  // document.getElementById("commentaire").innerHTML = meteos[temps].commentaire;
  // document.getElementById("tempsIcone").innerHTML = meteos[temps].icone;
  // document.getElementById("temperature").innerHTML =
  //   meteoJour.main.temp + " °C";
  document.getElementById("infoTemp").innerHTML =
    "<p class='infoTemp__comment'>" +
    meteos[temps].commentaire +
    "</p>" +
    "<span class='infoTemp__icon' >" +
    meteos[temps].icone +
    "</span >" +
    "<p class='infoTemp__degrees'>" +
    meteoJour.main.temp +
    " °C" +
    "</p";

  document.getElementById("infoTemp").style.backgroundImage =
    meteos[temps].bgstyle;

  document.getElementById("infoPlus").style.backgroundImage =
    meteos[temps].bgstyle;
  document.getElementById("infoPlus").innerHTML =
    miseEnParagraphe("Pression : " + meteoJour.main.pressure + " hP") +
    miseEnParagraphe("Taux d'humidité : " + meteoJour.main.humidity + " %") +
    miseEnParagraphe(leveSoleil + " " + coucheSoleil) +
    "Vent : " +
    meteoJour.wind.speed +
    " km/h - direction " +
    fleche;
  document.getElementById("jsDate").innerHTML = miseEnParagraphe(
    "Derniere mise à jour : " + releve
  );
}

function miseEnFormeForcast(forecast) {
  /////// section tendance du jour

  document.getElementById("nexthours").innerHTML =
    "<h3 class='w100'>Les prochaines heures</h3>" +
    createForcast(forecast.meteoJour);

  //   /////// section jours suivant
  let listeArticle = "";

  for (i = 0; i < forecast.forecast.length; i += 8) {
    listeArticle +=
      "<div>" +
      miseEnParagraphe(convertDate(forecast.forecast[i].dt).date) +
      createForcast(forecast.forecast.slice(i, i + 7)) +
      "</div>";
  }

  document.getElementById("nextdays").innerHTML =
    "<h3 class='w100'>Les prochains jours</h3>" + listeArticle;
}

function afficheTopVilles(topVilles) {
  html = "";
  let ville = "";
  let pays = "";
  for (i = 0; i < topVilles.length; i++) {
    ville = capitalize(topVilles[i].ville);
    pays = topVilles[i].country.toUpperCase();

    html += `<button class="btn invert" data-action="afficher" data-ville="${ville +
      "," +
      pays}">${ville + "," + pays}</button>`;
  }
  document.getElementById("villes").innerHTML =
    " <h3 class='w100'>Météo des villes les plus consultés</h3>" + html;
  var matches = document.querySelectorAll('button[data-action="afficher"]');

  matches.forEach(link => {
    link.addEventListener("click", chargeMeteoVille);
  });
}

function erreurVille() {
  document.getElementById("ville").style.border = "2px solid red";
}

function createForcast(tableau) {
  let html = "";
  // console.log(tableau)
  for (j = 0; j < tableau.length; j++) {
    icone = meteos[tableau[j].weather[0].main].icone;
    html +=
      "<div>" +
      miseEnParagraphe(convertDate(tableau[j].dt).heure) +
      "<span>" +
      icone +
      "</span>" +
      miseEnParagraphe(tableau[j].main.temp + " °C") +
      "</div>";
  }
  displayFields("show");
  return html;
}

function displayFields(show) {
  switch (show) {
    case "show":
    document.querySelector(".infoPlus").classList.remove("hide");
    document.querySelector(".infoTemp").classList.remove("hide");
    document.querySelector(".nexthours").classList.remove("hide");
    document.querySelector(".nextdays").classList.remove("hide");
    document.querySelector(".weatherSection").classList.remove("hide");
    break
    default:
    document.querySelector(".infoPlus").classList.add("hide");
    document.querySelector(".infoTemp").classList.add("hide");
    document.querySelector(".nexthours").classList.add("hide");
    document.querySelector(".nextdays").classList.add("hide");
    document.querySelector(".weatherSection").classList.add("hide");
    break;

    
  }
}
