let villesEnregistrees = [];
let meteoDuJour;
load();

function offFocus(){
  
}

async function load() {
  villesEnregistrees = await getVillesRecords();
  const top3 = topVilles(villesEnregistrees, 3);
  console.log(top3);
  afficheTopVilles(top3);
}

async function main(event) {
  const villeRecherchee = document.querySelector("#ville").value.trim();
  event.preventDefault(event);
  if (ville != "") {
    const forecastWeather = await getForecastMeteo(villeRecherchee);
    meteoDuJour = await getMeteo(villeRecherchee);
    const forecastMeteo = forecast(forecastWeather);
    verifVille(meteoDuJour);
    miseEnFormeForcast(forecastMeteo);
    miseEnFormeMeteoDuJour(meteoDuJour);
  } else alert("ville vide");
}

document.querySelector("#charger").addEventListener("click", main);

function verifVille(majVille) {
  let value = "";
  const index = villesEnregistrees.findIndex(
    e =>
      e.ville == meteoDuJour.name.toLowerCase() &&
      e.country == meteoDuJour.sys.country.toLowerCase()
  );

  if (index === -1) {
    console.log("ville n'existe pas");
    value = {
      ville: majVille.name.toLowerCase(),
      country: majVille.sys.country.toLowerCase(),
      view: 1
    };
    console.log(value);
    putInApi("http://5be41d5495e4340013f88ebe.mockapi.io/Meteo", value);
  } else {
    const id = villesEnregistrees[index].id;
    value = { view: villesEnregistrees[index].view + 1 };
    putInApi("http://5be41d5495e4340013f88ebe.mockapi.io/Meteo/" + id, value);
  }
}

async function chargeMeteoVille(top3) {
  const ville = this.dataset.ville;
  console.log(ville);
  meteoDuJour = await getMeteo(ville);
  miseEnFormeMeteoDuJour(meteoDuJour);
  miseEnFormeForcast(forecast(await getForecastMeteo(ville)));
  verifVille(meteoDuJour);
  $("#ville").val(ville);
}
