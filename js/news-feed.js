angular.module('news-directive', [])

    .directive('newsFeed', newsfeed)

;

feed.$inject = ['$http', '$interval', '$filter', 'ajaxCall', 'daysOfTheWeek', 'months'];

function newsfeed () {

    return {
        restrict: 'E',
        templateUrl: "news-feed.html",
        controller: feed,
        controllerAs: "news"
    };

}

function feed ($http, $interval, $filter, ajaxCall, daysOfTheWeek, months ) {

    var vm = this,
        url = 'http://feeds.nos.nl/nosjournaal?format=rss',
        pastArticleId;

    getData();

    $interval(getData, 30000);

    function getData () {

        ajaxCall.getData(
                'JSONP',
                '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url),
                true
            )
            .then(
            function succesCallback(response) {

                var articleId = Math.floor(Math.random() * 20);

                // Check if articleId is same as last 1
                if (articleId !== pastArticleId) {

                    var dates = new Date(response.data.responseData.feed.entries[articleId].publishedDate),
                        minutesToTwoDigits = dates.getMinutes();

                    if(minutesToTwoDigits.toString().length === 1) {
                        twoDigits = '0' + twoDigits
                    }

                    vm.bulletin = response.data.responseData.feed.entries[articleId];

                    vm.publishedDate = daysOfTheWeek[dates.getDay()] + ' ' + dates.getDate() + ' ' + months[dates.getMonth()] + ' ' + dates.getFullYear() + ' ' + dates.getHours() + ':' + twoDigits;

                    // Update previous ArticleId.
                    pastArticleId = articleId;

                } else {
                    // articleId is same as last ID

                    // Try again
                    getData();

                }
            }
        );

    }

}