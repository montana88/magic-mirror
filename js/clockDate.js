(function(){

    angular.module('clockDate', [])

        .controller('TimeController', TimeController)

    ;

    TimeController.$inject = ['$interval'];

    function TimeController ($interval) {
        var vm = this;

        tick();

        $interval(tick, 1000);

        function tick () {

            var date = new Date();

            vm.time = Date.now();

        }

    }

})();