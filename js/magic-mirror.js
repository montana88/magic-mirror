angular.module('magicMirror', ['ngSanitize', 'news-directive', 'weather-directive', 'wunderlist-directive'])

    .controller('TimeController', TimeController)

    .controller('funnyMessage', funnyMessage)

;

TimeController.$inject = ['$interval', '$filter'];

funnyMessage.$inject = ['$http', '$interval'];

function TimeController ($interval, $filter) {

    var vm = this,
        weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
        months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

    tick();

    $interval(tick, 1000);

    function tick () {

        var date = new Date(),
            dayNumber = $filter('date')(Date.now(), "dd"),
            dayName = weekdays[date.getDay()],
            monthName = months[$filter('date')(Date.now(), "M") - 1],
            year = $filter('date')(Date.now(), "yyyy");

        vm.time = Date.now();

        vm.date = dayName + ' ' + dayNumber + ' ' + monthName + ' ' + year;

    }

}

function funnyMessage ($http, $interval) {

    var vm = this;

    vm.joke = '';

    getJoke();

    $interval(getJoke, 3600000); // 3600000 = 1 hour

    function getJoke () {

        // Reference: http://www.icndb.com/api/
        $http({

            method: 'GET',
            url: 'http://api.icndb.com/jokes/random'

        }).then(function successCallback(response){

            vm.joke = response.data.value.joke;

        });

    }

}