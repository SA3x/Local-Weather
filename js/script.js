$(document).ready(function() {

var C = false;

 backgroundArray = [
    'http://www.weatherwizkids.com/wp-content/uploads/2015/04/lightning3.jpg',
    'http://www.tokkoro.com/picsup/422014-rain-free-high-resolution-wallpaper.jpg',
    'http://www.etc-web.com/wp-content/uploads/2012/08/shutterstock_54718255.jpg',
    'http://eskipaper.com/images/snowfall-hd-wallpaper-1.jpg',
    'http://i.huffpost.com/gen/1846574/images/o-SAN-FRANCISCO-FOG-facebook.jpg',
    'http://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg',
    'http://eskipaper.com/images/cloudy-sky-hd-2.jpg',
    'http://static.superiorwallpapers.com/images/lthumbs/2015-05/7755_A-storm-with-black-cloud-lightning-and-tornado.jpg'
  ];

var locationApi = 'https://freegeoip.net/json/';

$.getJSON(locationApi, function(data) {
console.log(data);

$("#city").html(data.city);
$("#country").html(data.country_name);
$("#lat").html(data.latitude);
$("#lon").html(data.longitude);

var weatherApi = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat='+data.latitude+'&lon='+data.longitude+'&units=imperial&appid=985c906148a24ec40efcfe4f8611c6c6';

$.getJSON(weatherApi, function(data2) {
console.log(data2);
render(data2, C);

$("#toggle").click(function() {
        C = !C;
        render(data2, C);

});

var id = data2.weather[0].id;
var backgroundID = [299, 399, 599, 699, 799, 800, 804];

backgroundID.push(id);
var backgroundIndex = backgroundID.sort().indexOf(id);

console.log(backgroundID);
console.log(backgroundIndex);

$('body').css('background-image', 'url('+backgroundArray[backgroundIndex]+')');

});

});

});
 	function displayTemp(F, C) {
 		if(C) return Math.round((F-32)*(5/9))+ '&deg; C';
 		return Math.round(F)+ '&deg; F';
 };

 	function render(somedata, C) {
 		var currentTemp = displayTemp(somedata.main.temp, C);
 		var currentWeather = somedata.weather[0].description;
 		var icon = somedata.weather[0].icon;

 		$("#temp").html(currentTemp);
 		$("#weather").html(currentWeather);

 		var apiIcon = 'http://openweathermap.org/img/w/'+icon+'.png'
 		$("#temp").prepend('<img src='+apiIcon+'>  ');

 };
//need a function that takes api2 data and inputs into #temp span and #weather span



