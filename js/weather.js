// docs on: http://openweathermap.org/api

var loadWeatherApi = {
    apiRequest: function() {

        var countDays = 5;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=" + countDays + "&id=2754073&APPID=bbdbb29b96c275d6db8c97014b905325", false); //, false for the message
        xhr.send();

        var json = JSON.parse(xhr.response);

        return json;

    },

    filter: function () {

        var connectToAPI = this.apiRequest();

        var filteredJson = {
            "currentDay": {
                "weather": connectToAPI.list[0].weather[0].icon,
                "wind": {
                    "speed": connectToAPI.list[0].speed.toFixed(1),
                    "deg": connectToAPI.list[0].deg
                },
                "temperature": {
                    "min": Math.round(connectToAPI.list[0].temp.min - 273.15),
                    "max": Math.round(connectToAPI.list[0].temp.max - 273.15),
                    "avg": Math.round(connectToAPI.list[0].temp.day - 273.15)
                }
            }
        };

        filteredJson["location"] = connectToAPI.city.name;
        filteredJson["week"] = {};

        for(var i = 1; i < connectToAPI.cnt; i++){

            filteredJson.week[i] = {
                "weather": connectToAPI.list[i].weather[0].icon,
                "wind": {
                    "speed": connectToAPI.list[i].speed.toFixed(1),
                    "deg": connectToAPI.list[i].deg
                },
                "temperature": Math.round(connectToAPI.list[i].temp.day - 273.15)
            }

        }

        return filteredJson;

    }

};

/*
var filteredJson = {
    "location": connectToAPI.name,
    "weather": {
        "type": connectToAPI.weather[0]
    },
    "temperature": Math.round(connectToAPI.main.temp - 273.15),
    "wind": connectToAPI.wind
};*/
