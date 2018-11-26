let villesEnregistrees = [];
let meteoDuJour;
var refresh;
let villeRecherchee="";

load();

async function load() {
  villesEnregistrees = await getVillesRecords();
  const top3 = topVilles(villesEnregistrees, 3);
  afficheTopVilles(top3);
  
}

async function main(event) {
  
   villeRecherchee = document.querySelector("#ville").value.trim();

   villeRecherchee=verifSyntaxe(villeRecherchee)


  event.preventDefault(event);
  if (ville != "") {
    const forecastWeather = await getForecastMeteo(villeRecherchee);

    const forecastMeteo = forecast(forecastWeather);
    
    miseEnFormeForcast(forecastMeteo);
    setTimer(villeRecherchee);
    
  } else {alert("ville vide");}
}

document.querySelector("#charger").addEventListener("click", main);

async function chargeMeteoDuJour(villeRecherchee){
  // console.log(villeRecherchee)
  meteoDuJour = await getMeteo(villeRecherchee);
      
  miseEnFormeMeteoDuJour(meteoDuJour);
  verifVille(meteoDuJour);
}


async function chargeMeteoVille(top3) {
  const ville = this.dataset.ville;
  // console.log(ville);
  meteoDuJour = await getMeteo(ville);
  miseEnFormeMeteoDuJour(meteoDuJour);
  miseEnFormeForcast(forecast(await getForecastMeteo(ville)));
  verifVille(meteoDuJour);
  $("#ville").val(ville);
}
