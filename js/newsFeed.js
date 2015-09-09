newsFeed = {

    // @todo make ajax call without jquery
    init: function() {

        var feed = 'http://feeds.nos.nl/nosjournaal?format=rss';

        $.ajax({
            url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feed),
            dataType : 'json',
            success  : function (data) {

                if (data.responseData.feed && data.responseData.feed.entries) {

                    var parentElement = document.getElementById('news');

                    $.each(data.responseData.feed.entries, function (i, e) {

                        var article = document.createElement('div');
                        article.id = 'article' + i;
                        article.className = 'item';
                        parentElement.appendChild(article);

                        var getArticle = document.getElementById('article' + i);

                        getArticle.innerHTML =   '<h1>' + e.title + '</h1> <small>' + e.publishedDate + '</small>' + e.content;

                    });

                }

            }

        });

    }

};