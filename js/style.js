const meteos = {
  Rain: {
    icone: '<i class="wi wi-day-rain"></i>',
    commentaire: "Pluie",
    bgstyle: "#4C4E4F"
  },

  Clouds: {
    icone: '<i class="wi wi-day-cloudy"></i>',
    commentaire: "Nuageux",
    bgstyle: "#245592"
  },

  Clear: {
    icone: '<i class="wi wi-day-sunny"></i>',
    commentaire: "Dégagé",
    bgstyle: "#2889D7"
  },

  Snow: {
    icone: '<i class="wi wi-day-snow"></i>',
    commentaire: "Neige",
    bgstyle: "#B8CEE7"
  },

  Mist: {
    icone: '<i class="wi wi-day-fog"></i>',
    commentaire: "Brumeux",
    bgstyle: "#fffcfc"
  },
  Fog: {
    icone: '<i class="wi wi-day-fog"></i>',
    commentaire: "Brouillard",
    bgstyle: "#fffcfc"
  },

  Drizzle: {
    icone: '<i class="wi wi-day-sleet"></i>',
    commentaire: "Grisaille",
    bgstyle: "#dedbdb"
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
    miseEnParagraphe(meteos[temps].commentaire) +
    miseEnParagraphe(meteos[temps].icone) +
    miseEnParagraphe(meteoJour.main.temp + " °C");

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

    html += `<button data-action="afficher" data-ville="${ville +
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
      "<article>" +
      miseEnParagraphe(convertDate(tableau[j].dt).heure) +
      miseEnParagraphe(icone) +
      miseEnParagraphe(tableau[j].main.temp + " °C") +
      "</article>";
  }

  return html;
}
