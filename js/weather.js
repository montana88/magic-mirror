// docs on: http://openweathermap.org/api
// account:
// username:    montana88
// email:       klein_duiveltje88@hotmail.com
// ww:          **********

var loadWeatherApi = {
    apiRequest: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=hillegom,NLid=524901&APPID=bbdbb29b96c275d6db8c97014b905325", false); //, false for the message
        xhr.send();

        var json = JSON.parse(xhr.response);

        return json;

    },

    filter: function () {

        var connectToAPI = this.apiRequest();

        var filteredJson = {
            "location": connectToAPI.name,
            "weather": {
                "type": connectToAPI.weather[0]
            },
            "temperature": Math.round(connectToAPI.main.temp - 273.15),
            "wind": connectToAPI.wind
        };

        return filteredJson;

    }

};