async function getForecastMeteo(ville) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      ville +
      "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric"
  ).then(function(reponse) {
    return reponse.json();
  })
  .catch(erreurVille())
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
  })
  // .catch(function(error){
  //   console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  // });
}

function verifVille(majVille) {
  let value = {};
  
  const index = villesEnregistrees.findIndex(
    e =>
      e.ville == meteoDuJour.name.toLowerCase() &&
      e.country == meteoDuJour.sys.country.toLowerCase()
  );

  if (index === -1) {
    
    value = {
      ville: majVille.name.toLowerCase(),
      country: majVille.sys.country.toLowerCase(),
      view: 1
    };
    
    $.post("http://5be41d5495e4340013f88ebe.mockapi.io/Meteo/",value,function(){
      villesEnregistrees.push(value);
      load();})
  } else {
    const id = villesEnregistrees[index].id;
    
    value = { view: +villesEnregistrees[index].view + 1 };

    $.ajax({
      url: "http://5be41d5495e4340013f88ebe.mockapi.io/Meteo/" + id,
      
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(value),
      dataType: 'json',
      success: function (){
        load()
      }
   
   
   });
  }
}

