angular.module('wunderlist-directive', [])

    .directive('wunderlist', wunderlist)

    .factory('wunderlistSession', function($http){

        return {

            getSessions: function(url, additionalHeaders) {

                return $http({

                    method: 'GET',
                    url: url,
                    headers: {
                        'x-access-token': 'b223b7ade22af671c528b1301ed0506b1e01b5b32bede1e7c05b7cd8ddaa',
                        'x-client-id': '524edc726a1f7a790fcf'
                    }

                });

            }

        };

    })

;

wunderlistData.$inject = ['wunderlistSession', '$interval'];

function wunderlist () {

    return {
        restrict: 'E',
        templateUrl: "wunderlist.html",
        controller: wunderlistData,
        controllerAs: "wunderlist"
    };

}

function wunderlistData (wunderlistSession, $interval) {

    var vm = this;

    getData();

    $interval(getData, 20000);

    function getData () {

        wunderlistSession
            .getSessions('https://a.wunderlist.com/api/v1/reminders?task_id=1611467706')
            .then(function successCallback (response) {

                console.log(response);

            });

        /*$http({

            method: 'GET',
            url: 'https://a.wunderlist.com/api/v1/reminders?task_id=1611467706',
            *//*url: 'https://a.wunderlist.com/api/v1/tasks?list_id=234846299',*//*
            headers: {
                'x-access-token': 'b223b7ade22af671c528b1301ed0506b1e01b5b32bede1e7c05b7cd8ddaa',
                'x-client-id': '524edc726a1f7a790fcf'
            }

        }).then(function successCallback (response) {

            self.data = response.data;

        });*/

    }

}