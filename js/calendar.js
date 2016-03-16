angular.module('calendar', [])

    .directive('calendarFeed', calendarFeed)

;

function calendarFeed() {

    return {
        restrict: 'E',
        templateUrl: "calendar.html",
        controller: calendarData,
        controllerAs: "weather"
    };

}

calendarData.$inject = ['ajaxCall', '$interval'];

function calendarData (ajaxCall, $interval) {

    var vm = this,
        getCal = new ical_parser();
console.log('hier???');
    getCal("calendar.php", function(cal){
        console.log(cal);
    });

}