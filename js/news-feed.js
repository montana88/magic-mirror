angular.module('news-directive', [])

    .directive('newsFeed', newsfeed)

;

feed.$inject = ['$http', '$interval', '$filter'];

function newsfeed () {

    return {
        restrict: 'E',
        templateUrl: "news-feed.html",
        controller: feed,
        controllerAs: "news"
    };

}

function feed ($http, $interval, $filter) {

    var vm = this,
        url = 'http://feeds.nos.nl/nosjournaal?format=rss',
        pastArticleId;

    getData();

    $interval(getData, 30000);

    vm.bulletins = {};

    function getData () {

        $http({

            method: 'JSONP',
            url: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url)

        }).then(

            function(response) {
                // success response

                var articleId = Math.floor(Math.random() * 20);

                // Check if articleId is same as last 1
                if (articleId !== pastArticleId) {
                    // articleId is not the same get new article

                    vm.bulletin = response.data.responseData.feed.entries[articleId];

                    vm.publishedDate = $filter('date')(response.data.responseData.feed.entries[articleId].publishedDate, "EEE dd-MMM-yyyy HH:mm:ss");

                    // Update previous ArticleId.
                    pastArticleId = articleId;

                } else {
                    // articleId is same as last ID

                    // Try again
                    getData();

                }

            }, function(response) {
                // failure response

                console.log(response);

            }

        );

    }

}