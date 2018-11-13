async function getForecastMeteo(ville) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      ville +
      "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric"
  ).then(function(reponse) {
    return reponse.json();
  });
}

function getVillesRecords() {
  return fetch("https://5be41d5495e4340013f88ebe.mockapi.io/Meteo").then(
    topVille => topVille.json()
  );
}

function getMeteo(ville) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      ville +
      "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric"
  ).then(function(reponse) {
    return reponse.json();
  });
}



  function putInApi(url, value){
  $.ajax({
    url: url,
    
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(value),
    dataType: 'json',
    success: async function (reponse) {
      villesEnregistrees =  await getVillesRecords();
      afficheTopVilles(topVilles(villesEnregistrees,3));
    },
    error: function () {
    }

 });
}