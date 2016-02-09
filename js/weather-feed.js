angular.module('weather-directive', [])

    .directive('weatherFeed', weatherFeed)

;

weatherData.$inject = ['$http'];

function weatherFeed () {

    return {
        restrict: 'E',
        templateUrl: "weather-feed.html",
        controller: weatherData,
        controllerAs: "weather"
    };

}

function weatherData ($http) {

    var vm = this,
        countDays = 5;

    getData();

    vm.weatherData = {};

    function getData () {

        $http({

            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=2754073&cnt=' + countDays + '&APPID=fa39706c5271705ecd18566772072c08'

        }).then(function successCallback (response) {

            console.log(response);

        });

    }

}