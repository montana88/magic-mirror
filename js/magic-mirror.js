angular.module('magicMirror', ['ngSanitize', 'news-directive', 'weather-directive', 'wunderlist-directive', 'clockDate'])

    .controller('funnyMessage', funnyMessage)

    .value('daysOfTheWeek', ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'])

    .value('months', ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'])

    .factory('ajaxCall', ajaxCall)

;

funnyMessage.$inject = ['ajaxCall', '$interval'];

ajaxCall.$inject = ['$http'];

function ajaxCall ($http) {

    var factory = {};

    factory.getData = function (method, url, cache) {

        return $http({

            method: method,
            url: url,
            cache: cache

        });

    };

    return factory;

}

function funnyMessage (ajaxCall, $interval) {

    var vm = this;

    vm.joke = '';

    getJoke();

    $interval(getJoke, 3600000); // 3600000 = 1 hour

    function getJoke () {

        ajaxCall.getData('GET', 'http://api.icndb.com/jokes/random')
            .then(function successCallback(response){
                vm.joke = response.data.value.joke;
            });

        // Reference: http://www.icndb.com/api/
//        $http({
//
//            method: 'GET',
//            url: 'http://api.icndb.com/jokes/random'
//
//        }).then(function successCallback(response){
//
//            vm.joke = response.data.value.joke;
//
//        });

    }

}