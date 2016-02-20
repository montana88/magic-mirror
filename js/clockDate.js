(function(){

    angular.module('clockDate', [])

        .controller('TimeController', TimeController)

    ;

    TimeController.$inject = ['$interval', '$filter', 'daysOfTheWeek', 'months'];

    function TimeController ($interval, $filter, daysOfTheWeek, months) {
        var vm = this;

        tick();

        $interval(tick, 1000);

        function tick () {

            var date = new Date(),
                dayNumber = $filter('date')(Date.now(), "dd"),
                dayName = daysOfTheWeek[date.getDay()],
                monthName = months[$filter('date')(Date.now(), "M") - 1],
                year = $filter('date')(Date.now(), "yyyy");

            vm.time = Date.now();

            vm.date = dayName + ' ' + dayNumber + ' ' + monthName + ' ' + year;

        }

    }

})();