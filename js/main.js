var item1 = {

    clock: function () {

        var that = this;
        var dateTime = new getDateTime();
        var currentTime = dateTime.getTime();

        document.getElementById('time').innerHTML = currentTime.hour + ":" + currentTime.minute + ":" + currentTime.seconds;

        var t = setTimeout( function(){
            that.clock();
        }, 1000);

    },

    compliment: function () {

        var that = this;
        var compliment;

        var today = new Date();
        var hour = today.getHours();
        var compliments;

        if (hour >= 3 && hour < 12) { compliments = message.morning; }
        if (hour >= 12 && hour < 17) { compliments = message.afternoon; }
        if (hour >= 17 || hour < 3) { compliments = message.evening; }

        compliment = Math.floor(Math.random() * compliments.length);

        document.getElementById('message').innerHTML = '<p>' + compliments[compliment] + '</p>';

        // update compliment every minute
        setTimeout(function() {
            that.compliment();
        }, 60000);

    }

};

weather = {
    init: function() {

        var that = this;
        var getWeather = loadWeatherApi.filter();
        var windDegName;

        var iconTable = {
            '01d':'wi-day-sunny',
            '02d':'wi-day-cloudy',
            '03d':'wi-cloudy',
            '04d':'wi-cloudy-windy',
            '09d':'wi-showers',
            '10d':'wi-rain',
            '11d':'wi-thunderstorm',
            '13d':'wi-snow',
            '50d':'wi-fog',
            '01n':'wi-night-clear',
            '02n':'wi-night-cloudy',
            '03n':'wi-night-cloudy',
            '04n':'wi-night-cloudy',
            '09n':'wi-night-showers',
            '10n':'wi-night-rain',
            '11n':'wi-night-thunderstorm',
            '13n':'wi-night-snow',
            '50n':'wi-night-alt-cloudy-windy'
        };

        if (getWeather.wind.deg < 23 && getWeather.wind.deg > 0 || getWeather.wind.deg > 338 && getWeather.wind.deg < 360) {
            windDegName = "Z";
        } else if (getWeather.wind.deg >= 23 && getWeather.wind.deg <= 68) {
            windDegName = "ZW";
        } else if (getWeather.wind.deg > 68 && getWeather.wind.deg <= 113) {
            windDegName = "W";
        } else if (getWeather.wind.deg > 113 && getWeather.wind.deg <= 158) {
            windDegName = "NW";
        } else if (getWeather.wind.deg > 158 && getWeather.wind.deg <= 203) {
            windDegName = "N";
        } else if (getWeather.wind.deg > 203 && getWeather.wind.deg <= 248) {
            windDegName = "NO";
        } else if (getWeather.wind.deg > 248 && getWeather.wind.deg <= 293) {
            windDegName = "O";
        } else if (getWeather.wind.deg > 293 && getWeather.wind.deg <= 338) {
            windDegName = "ZO";
        }

        var iconClass = iconTable[getWeather.weather.type.icon];
        console.log(getWeather);

        var weatherElement = document.getElementById('weather');

        var namePlace = document.createElement('p');
        namePlace.className = "place";
        namePlace.appendChild(document.createTextNode(getWeather.location));

        var weatherIcon = document.createElement('span');
        weatherIcon.className = iconClass + " weatherType";

        var temp = document.createElement('p');
        temp.className = "avgtemp";
        temp.appendChild(document.createTextNode(getWeather.temperature + " \u02DA" + "C"));

        var windSpeed = document.createElement('p');
        windSpeed.className = "windspeed";
        windSpeed.appendChild(document.createTextNode(getWeather.wind.speed + " Bft"));

        var windDeg = document.createElement('p');
        windDeg.className               = "winddeg";

        var windDegIcon = document.createElement('span');
        windDegIcon.className               = 'wi-wind-north'
        windDegIcon.style.display           = 'inline-block';
        windDegIcon.style.webkitTransform   = 'rotate('+getWeather.wind.deg+'deg)';
        windDegIcon.style.mozTransform      = 'rotate('+getWeather.wind.deg+'deg)';
        windDegIcon.style.msTransform       = 'rotate('+getWeather.wind.deg+'deg)';
        windDegIcon.style.oTransform        = 'rotate('+getWeather.wind.deg+'deg)';
        windDegIcon.style.transform         = 'rotate('+getWeather.wind.deg+'deg)';

        windDeg.appendChild(windDegIcon);

        windDeg.appendChild(document.createTextNode(" " + windDegName));

        weatherElement.appendChild(namePlace);
        weatherElement.appendChild(weatherIcon);
        weatherElement.appendChild(temp);
        weatherElement.appendChild(windSpeed);
        weatherElement.appendChild(windDeg);

    }
};

if(document.readyState === "complete") {
    item1.clock();
    item1.compliment();
    weather.init();
} else {
    window.addEventListener("DOMContentLoaded", function () {
        item1.clock();
        item1.compliment();
        weather.init();
    }, false);
}