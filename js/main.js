
async function afficheStart(){
let topVille = await getVille();
 afficheTopVille(topVille);
}

afficheStart();

document.getElementById("charger").addEventListener("click", btnChargerClick);

/**
 * Action Click
 * // Lancement de getMeteo()
 * // envoi du resultat vers la miseEnForme()
 */
async function btnChargerClick(event) {
  document.getElementById("ville").style.borderColor = "";
  let ville = document.getElementById("ville").value.trim();
  event.preventDefault(event);

  const datas = await getMeteo(ville);
  const forecast = await getForecast(ville);
  let topVille = await getVille();
  miseEnFormeForcast(forecast);
  miseEnForme(datas);
 
  majVille(topVille, datas.name+","+datas.sys.country);
}

async function jeSaisPasCommentLAppeller(){
  let topVille = await getVille();
  afficheTopVille(topVille);
}

function afficheTopVille(topVille) {
  topVille.sort(function(a, b) {
    return b.view - a.view;
  });

  // console.log(topVille)
  let champsTopVille = "";
  for (i = 0; i < 3; i++) {
    champsTopVille +=`<a href="#" index="topVille${i}">${topVille[i].ville.toUpperCase()[0] +
      topVille[i].ville.toLowerCase().slice(1)}</a> / `;
    
  }

  document.getElementById("topville").innerHTML = champsTopVille.slice(
    0,champsTopVille.length - 3);
}


function getVille() {
  return fetch("https://5be41d5495e4340013f88ebe.mockapi.io/Meteo").then(
    reponse => reponse.json()
  );
}

function majVille(topVille, ville) {
  ville = ville.toLowerCase();
  let villeExiste = topVille.find(e => {
    return e.ville == ville;
  });

  let view = villeExiste == undefined ? 1 : +villeExiste.view + 1;

  let postMeteo = {
    ville: ville,
    view: view
  };

  if (view == 1) {
    $.post(
      "https://5be41d5495e4340013f88ebe.mockapi.io/Meteo",
      postMeteo,
      function(postMeteo) {
        topVille.push(postMeteo);
      }
    );
  } else {
    const id = villeExiste.id;
    $.ajax({
      url: "https://5be41d5495e4340013f88ebe.mockapi.io/Meteo/" + id,
      method: "DELETE",
      success: function() {
        $.post(
          "https://5be41d5495e4340013f88ebe.mockapi.io/Meteo",
          postMeteo,
          function(postMeteo) {
            topVille.push(postMeteo);
           jeSaisPasCommentLAppeller();
          }
        );
      }
    }
    );
  };
};
/**
 * fetch sur le serveur pour la météo du jour
 * @param {string} ville
 */

function getMeteo(ville) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      ville +
      "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric"
  )
    .then(function(reponse) {
      return reponse.json();
    })
    .catch(erreurVille());
};
/**
 * fetch sur le serveur pour la météo du des prochains jours
 * @param {string} ville
 */
function getForecast(ville) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      ville +
      "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric"
  )
    .then(function(reponse) {
      return reponse.json();
    })
    .catch(erreurVille());
};
/**
 *
 * @param {object} forecast
 */
function miseEnFormeForcast(forecast) {
  if (+forecast.cod < 400) {
    document.getElementById("forecastSection").style.display = "block";
    let html ="<tr><th>Jour</th><th>Température</th><th>Tendance</th><th>Vent</th>";
    let dateJour = [];
    let icone = "";
    let temp = "";
    let fleche = "";
    let tendance = forecast.list[0].main.temp;
    let jourJ = "";
    // console.log(forecast);
    for (i = 8; i < 40; i += 8) {
      dateJour = forecast.list[i].dt_txt.slice(0, 10).split("-");
      jourJ = dateJour[2] + "/" + dateJour[1] + "/" + dateJour[0].slice(2);
      temp = +forecast.list[i].main.temp;
      styletemp =
        temp > tendance ? " style='color:red;'" : " style='color:blue;'";
      icone = infoMeteo(forecast.list[i].weather[0].main).icone;
      vent = forecast.list[i].wind.speed;
      fleche = `<i class="fas fa-arrow-down" style="transform: rotate(${
        forecast.list[i].wind.deg
      }deg);"></i>`;
      tendance = temp;

      html += `<tr><th>${jourJ}</th><td${styletemp}>${temp} °C</td><td>${icone}</td><td>${fleche +
        " " +
        vent} km/h</tr>`;
      document.getElementById("forecast").innerHTML = html;
    }
  } else erreurVille;
}

function infoMeteo(temp) {
  const meteos = {
    Rain: {
      icone: "<i class='wi wi-day-rain'>",
      commentaire: "Pluie",

      style: "url('img/pluie.jpg')",
      bgstyle: "#4C4E4F"
    },

    Clouds: {
      icone: "<i class='wi wi-day-cloudy'>",
      commentaire: "Nuageux",

      style: "url('img/nuageux.jpg')",
      bgstyle: "#245592"
    },

    Clear: {
      icone: "<i class='wi wi-day-sunny'>",
      commentaire: "Dégagé",

      style: "url('img/soleil.jpg')",
      bgstyle: "#2889D7"
    },

    Snow: {
      icone: "<i class='wi wi-day-snow'>",

      commentaire: "Neige",
      style: "url('img/neige.jpg')",
      bgstyle: "#B8CEE7"
    },

    Mist: {
      icone: "<i class='wi wi-day-fog'>",
      style:
        "linear-gradient(to bottom, #fffcfc, #f4f1f1, #e8e6e6, #dddbdb, #d2d0d0)",
      commentaire: "Brumeux",
      bgstyle: "#fffcfc"
    },
    Fog: {
      icone: "<i class='wi wi-day-fog'>",
      style:
        "linear-gradient(to bottom, #fffcfc, #f4f1f1, #e8e6e6, #dddbdb, #d2d0d0)",
      commentaire: "Brouillard",
      bgstyle: "#fffcfc"
    },

    Drizzle: {
      icone: "<i class='wi wi-day-sleet'>",
      style:
        "linear-gradient(to top, #dedbdb, #dbd8d8, #d8d5d5, #d5d3d3, #d2d0d0)",
      commentaire: "Grisaille",
      bgstyle: "#dedbdb"
    }
  };

  return meteos[temp];
}

function miseEnForme(tempDuJour) {
 
  if (+tempDuJour.cod < 400) {
    document.getElementById("weatherSection").style.display = "block";
    document.getElementById("ville").style.border = "1px solid black";
    const fleche = '<i class="fas fa-arrow-down"></i>';

    const icone = infoMeteo(tempDuJour.weather[0].main).icone;
    const temperature = parseFloat(tempDuJour.main.temp).toFixed(1);
    const pression = tempDuJour.main.pressure;
    const styleBg = infoMeteo(tempDuJour.weather[0].main).bgstyle;
    const commentaire = infoMeteo(tempDuJour.weather[0].main).commentaire;
    const ville = tempDuJour.name;

    document.getElementById("infos").textContent =
      "Aujourd'hui à " + ville.toUpperCase() + "," + tempDuJour.sys.country;
    document.getElementById("commentaire").textContent = commentaire;
    document.getElementById("tempsIcone").innerHTML =
      icone + " / " + temperature + "°C";

    document.getElementById("pression").innerHTML =
      "<strong>Pression atmosphérique : </strong>" + pression + " hPa";

    document.querySelector("body").style.backgroundColor = styleBg;
    document.getElementById("vent").innerHTML =
      "<strong>Vent : </strong>" +
      tempDuJour.wind.speed +
      "km/h direction :" +
      fleche;
    document.querySelector("#vent>i").style.transform =
      "rotate(" + tempDuJour.wind.deg + "deg)";

    /////////////////////
    /**
     * On met dans la bdd
     */
  } else erreurVille;
}

function erreurVille() {
  document.getElementById("forecastSection").style.display = "none";
  document.getElementById("weatherSection").style.display = "none";
  document.querySelector("body").style.backgroundColor = "black";
  document.getElementById("ville").style.border = "2px solid red";

}
