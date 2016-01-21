angular.module('magicMirror', [])

    .controller('TimeCtrl', [ '$scope', '$interval', '$filter', function($scope, $interval, $filter) {

        var self = this,
            weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
            months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

        this.tick = function() {

            var date = new Date(),
                dayNumber = $filter('date')($scope.clock, "dd"),
                dayName = weekdays[date.getDay()],
                monthName = months[$filter('date')($scope.clock, "M") - 1],
                year = $filter('date')($scope.clock, "yyyy");

            $scope.clock = Date.now();

            $scope.date = dayName + ' ' + dayNumber + ' ' + monthName + ' ' + year;

            // implement fluent interface
            return this;

        };

        this.tick();

        $interval(self.tick, 1000);

    }])

    .controller('funnyMessage', ['$http', '$scope', '$interval', function($http, $scope, $interval) {

        var self = this;

        this.getJoke = function () {

            // Docs: http://www.icndb.com/api/

            $http
                .get('http://api.icndb.com/jokes/random')
                .success(
                function(data){
                    $scope.joke = data.value.joke;
                }
            );

        };

        this.getJoke();

        $interval(self.getJoke, 3600000); // 3600000 = 1 hour

    }])

;