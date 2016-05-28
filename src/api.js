import _ from 'lodash';

const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=127e60be74f3198a467759d45f0d3e81';

var kevinToF = (kelvin) => {
    return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F'
};

module.exports = function(latitude, longitude) {
    
    var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
    
return fetch(url)
     .then((response) => {
        return response.json();
    })
     .then((json) => {
        return {
          city: json.name,
          temperature: kevinToF(json.main.temp),
          description: _.capitalize(json.weather[0].description)
        }
    })
    
}

