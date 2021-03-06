<!doctype html>
<html lang="nl" ng-app="magicMirror">
<head>
    <meta charset="UTF-8">
    <title>Magic Mirror</title>
    <script type="text/javascript">
        var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
    </script>
    <meta name="google" value="notranslate">
    <meta http-equiv="refresh" content="3600; URL=http://<?= $_SERVER[HTTP_HOST] . $_SERVER[REQUEST_URI] ?>"> <!-- 3600000 -->
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="js/lib/angular.min.js"></script>
    <script src="js/lib/angular-sanitize.min.js"></script>
    <script src="js/lib/socket.io.min.js"></script>
    <script src="js/lib/moment-with-langs.min.js"></script>

    <script src="js/magic-mirror.js"></script>
    <script src="js/clockDate.js"></script>
    <script src="js/news-feed.js"></script>
    <script src="js/weather-feed.js"></script>
    <script src="js/calendar.js"></script>
    <script src="js/wunderlist.js"></script>
</head>
<body>

<div id="message" class="center-ver center-hor small" ng-controller="funnyMessage as message" ng-bind-html="message.joke"></div>

<div class="top left" ng-controller="TimeController as clock">
        <div id="date" class="date small dimmed">{{ clock.time | getDutchDates:'dag dagNummer maand jaar' }}</div>
        <div id="time" class="time">{{ clock.time | getDutchDates:'uur minuut' }} <span class="sec">{{ clock.time | getDutchDates:'sec' }}</span></div>
        <div class="calendar xxsmall"></div>
        <calendar id="calendar" class="xxsmall"></calendar>
    </div>

<weather-feed id="weather" class="right small top"></weather-feed>

<wunderlist class="bottom left small"></wunderlist>

<news-feed id="news" class="bottom center-hor xxsmall"></news-feed>

    <script src="js/lib/jquery-2.1.4.min.js"></script>
    <script src="js/rrule.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/ical_parser.js"></script>
    <script src="js/main.js"></script>

</body>
</html>