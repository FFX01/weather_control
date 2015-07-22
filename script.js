$(document).ready(function() {

  //Gets location data from ip address and passes to getWeather function
  function getLocation() {
    $.get("http://ipinfo.io/json", function(location) {
      getWeather(location.loc);
    }, 'jsonp');
  };

  //performs api call and manipulates DOM
  function getWeather(loc) {

    lat = loc.split(',')[0];
    lon = loc.split(',')[1];

    var reqURL = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&units=imperial";

    $.get(reqURL, function(data) {

      var temperature = Math.round(data.main.temp);
      var description = data.weather[0].description;
      var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      var wind = Math.round(data.wind.speed);
      var windDeg = data.wind.deg;
      var windDirection = '';
      
      if(windDeg >= 0 && windDeg < 23){
        windDirection = 'North';
      }else if(windDeg > 23 && windDeg < 68){
        windDirection = 'North-East';
      }else if(windDeg > 68 && windDeg < 113){
        windDirection = 'East';
      }else if(windDeg > 113 && windDeg < 158){
        windDirection = 'South-East';
      }else if(windDeg > 158 && windDeg < 203){
        windDirection = 'South';
      }else if(windDeg > 203 && windDeg < 248){
        windDirection = 'South-West';
      }else if(windDeg > 248 && windDeg < 293){
        windDirection ='West';
      }else if(windDeg > 293 && windDeg < 338){
        windDirection = 'North-West';
      }else if(windDeg > 338 && windDeg <=360){
        windDirection = 'North';
      }else{
        console.log("Wind deg input error.");
      }

      $('#weather-box-temp').html(temperature + '&degF');
      $('#weather-box-desc').html("<p>" + description + "</p>");
      $('#weather-box-icon').html('<img src="' + icon + '">');
      $('#weather-box-wind').html(windDirection + ' @ ' + wind + " knots");

      if (temperature >= 90) {
        $('body').css('background', 'url("http://hdwyn.com/wallpaper_1920x1080/desert_sun_sand_heat_sky_light_midday_shadows_1920x1080_hd-wallpaper-59586.jpg")');
      } else if (temperature >= 70 && temperature < 90) {
        $('body').css('background', 'url("http://i.imgur.com/ZkPODoD.jpg")');
      } else if (temperature >= 40 && temperature < 70) {
        $('body').css('background', 'url("http://i.imgur.com/6N1QIFG.jpg")');
      } else if (temperature >= 10 && temperature < 40) {
        $('body').css('background', 'url("http://i.imgur.com/bILcyaq.jpg")');
      } else {
        $('body').css('background', 'url("http://i.imgur.com/uvjImw4.jpg")');
      }

    }, 'jsonp');
  };
  getLocation();
});
