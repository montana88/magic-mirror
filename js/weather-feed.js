angular.module('weather-directive', [])

    .directive('weatherFeed', weatherFeed)

;

function weatherFeed () {

    return {
        restrict: 'E',
        templateUrl: "weather-feed.html",
        controller: weatherData,
        controllerAs: "weather"
    };

}

weatherData.$inject = ['ajaxCall', '$interval'];

function weatherData (ajaxCall, $interval) {

    var vm = this,
        countDays = 5,
        date = new Date(),
        iconTable = {
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

    weather();

    $interval(weather, 600000); // 600000 = 10min

    function weather () {

        ajaxCall.getData(
            'GET',
            'http://api.openweathermap.org/data/2.5/forecast/daily?id=2754073&cnt=' + countDays + '&APPID=fa39706c5271705ecd18566772072c08',
            true
        ).then(
            function successCallback (response) {

                var daysData = [],
                    addDay = 0;

                for(var i = 0; i < response.data.list.length; i++) {
                    if(i > 1) {
                        addDay = 1
                    }
                    daysData[i] = {
                        day: date.setDate(date.getDate() + addDay),
                        icon: iconTable[response.data.list[i].weather[0].icon],
                        temp: Math.round(response.data.list[i].temp.day - 273.15),
                        tempMax: Math.round(response.data.list[i].temp.max - 273.15),
                        tempMin: Math.round(response.data.list[i].temp.min - 273.15),
                        deg: {
                            'transform': 'rotate(' + response.data.list[i].deg + 'deg)',
                            'display': 'inline-block'
                        },
                        wind: windDegree(response.data.list[i].deg),
                        windSpeed: Math.round(response.data.list[i].speed).toFixed(1)
                    };
                }

                vm.weatherCast = daysData;
            },
            function errorCallback (response) {
                console.log(response);
            }
        );

    }

    function windDegree (data) {

        var windDegName;

        if (data < 23 && data > 0 || data > 338 && data < 360) {
            windDegName = "z ";
        } else if (data >= 23 && data <= 68) {
            windDegName = "zw";
        } else if (data > 68 && data <= 113) {
            windDegName = "w ";
        } else if (data > 113 && data <= 158) {
            windDegName = "nw";
        } else if (data > 158 && data <= 203) {
            windDegName = "n ";
        } else if (data > 203 && data <= 248) {
            windDegName = "no";
        } else if (data > 248 && data <= 293) {
            windDegName = "o ";
        } else if (data > 293 && data <= 338) {
            windDegName = "zo";
        }

        return windDegName;

    }

}