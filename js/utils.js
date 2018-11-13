function topVilles(villesEnregistrees, top) {
  top = top<villesEnregistrees.length?top:villesEnregistrees.length-1;
  villesEnregistrees.sort(function(a, b) {
    return b.view - a.view;
  });

  let top3 = [];

  for (i = 0; i < top; i++) {
    top3.push({ville:villesEnregistrees[i].ville, country:villesEnregistrees[i].country});
  }
  return top3;
}

/**
 *
 * @param {Array of Object} forecastWeather
 * @return Object {MeteoDuJour as Array, country as String, city as String}
 */
function forecast(forecastWeather) {
  const maDate = new Date();
  const maDateFormatee = `${maDate.getFullYear()}-${maDate.getMonth() +
    1}-${maDate.getDate()}`;
  const city = forecastWeather.city.name;
  const country = forecastWeather.city.country;
  const meteoJour = forecastWeather.list.filter(e =>
    e["dt_txt"].includes(maDateFormatee)
  );
  const forecast = forecastWeather.list.filter(
    e => !e["dt_txt"].includes(maDateFormatee)
  );
  return {
    meteoJour: meteoJour,
    forecast: forecast,
    country: country,
    city: city
  };
}

function miseEnParagraphe(texte){
return "<p>"+texte+"</p>"
}

function tourneFleche(deg){
    return `<i class="fas fa-arrow-down" style="transform: rotate(${deg}deg);"></i>`
}

function convertDate(unix_timestamp){
    const maDate = new Date(unix_timestamp*1000);
    const minute = maDate.getMinutes()==0?maDate.getMinutes()+"0":maDate.getMinutes();
    const heure = maDate.getHours()+":"+minute;
    const date = maDate.getDate()+"/"+(+maDate.getMonth()+1);
    return {date:date, heure:heure, fullDate:maDate};
}

function minMaxForecast(list){
 
    const tabMin =  list.sort(function(a,b){
        return  a.main.temp - b.main.temp;
    });
    const min = tabMin[0].main.temp;
    const max = tabMin[tabMin.length-1].main.temp;
    
    return {min:min, max:max}
}


function changeTitre(meteoDuJour){
  if(document.title=="Mon site météo"){
    document.title = meteoDuJour
  }else document.title = "Mon site météo"
}

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1)
}

function afficheVilleCountry(){
ville=capitalize(meteoDuJour.name);
country = meteoDuJour.sys.country
return ville+", "+country;
}