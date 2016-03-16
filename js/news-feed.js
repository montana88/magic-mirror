angular.module('news-directive', [])

    .directive('newsFeed', newsfeed)

;

feed.$inject = ['$interval', 'ajaxCall'];

function newsfeed () {

    return {
        restrict: 'E',
        templateUrl: "news-feed.html",
        controller: feed,
        controllerAs: "news"
    };

}

function feed ($interval, ajaxCall ) {

    var vm = this,
        url = 'http://feeds.nos.nl/nosjournaal?format=rss';

    vm.articleId = 1;

    getData();

    $interval(getData, 1800000);
    $interval(newArticle, 30000);

    function getData () {

        ajaxCall.getData(
            'JSONP',
            '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url),
            true
        ).then(

            function succesCallback(response) {

                var dates = new Date(response.data.responseData.feed.entries.publishedDate);
                vm.bulletins = response.data.responseData.feed.entries;

            },

            function (errorCallback) {
                // There was something wrong getting the data

                vm.error = true;
                vm.message = errorCallback;


            }

        );

    }

    function newArticle () {
        vm.articleId = Math.floor(Math.random() * 20);
    }

}