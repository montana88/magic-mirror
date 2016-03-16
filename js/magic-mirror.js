angular.module('magicMirror', ['ngSanitize', 'news-directive', 'weather-directive', 'wunderlist-directive', 'clockDate'])

    .controller('funnyMessage', funnyMessage)

    .value('daysOfTheWeek', ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'])

    .value('months', ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'])

    .factory('ajaxCall', ajaxCall)

    .filter('getDutchDates', getDutchDates)

;

getDutchDates.$inject = ['daysOfTheWeek', 'months'];
ajaxCall.$inject = ['$http'];
funnyMessage.$inject = ['ajaxCall', '$interval'];

function getDutchDates (daysOfTheWeek, months) {

    return function(input, format) {

        var dates = new Date(input),
            index,
            string = '',
            values = [
                {'dag': false},
                {'dagNummer': false},
                {'maand': false},
                {'jaar': false},
                {'uur': false},
                {'minuut': false},
                {'sec': false}
            ];

        if(format !== undefined) {

            var filterOptions = format.split(' ');

            for(index = 0; index < filterOptions.length; index++) {

                switch(filterOptions[index]) {
                    case 'dag':
                        values[0] = true;
                        string += daysOfTheWeek[dates.getDay()] + ' ';
                        break;
                    case 'dagNummer':
                        values[1] = true;
                        string += dates.getDate() + ' ';
                        break;
                    case 'maand':
                        values[2] = true;
                        string += months[dates.getMonth()] + ' ';
                        break;
                    case 'jaar':
                        values[3] = true;
                        string += dates.getFullYear() + ' ';
                        break;
                    case 'uur':
                        values[4] = true;
                        string += twoDigits(dates.getHours()) + ':';
                        break;
                    case 'minuut':
                        values[5] = true;
                        string += twoDigits(dates.getMinutes());
                        break;
                    case 'sec':
                        values[6] = true;
                        string += twoDigits(dates.getSeconds());
                        break;
                    default:
                }

            }

        } else {

            string = daysOfTheWeek[dates.getDay()] + ' ' + dates.getDate() + ' ' + months[dates.getMonth()] + ' ' + dates.getFullYear() + ' ' + twoDigits(dates.getMinutes()) + ':' + twoDigits(dates.getHours());

        }

        return string;

    };

    function twoDigits(number) {
        return (number.toString().length === 1) ? '0' + number : number;

    }
}

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
// Reference: http://www.icndb.com/api/
        ajaxCall.getData('GET', 'http://api.icndb.com/jokes/random')
            .then(function successCallback(response){
                vm.joke = response.data.value.joke;
            });

    }

}