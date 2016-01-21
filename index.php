<!doctype html>
<html lang="nl" ng-app="magicMirror">
<head>
    <meta charset="UTF-8">
    <title>Magic Mirror</title>
    <script type="text/javascript">
        var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
    </script>
    <meta name="google" value="notranslate">
    <!--<meta http-equiv="refresh" content="21600; URL=http://localhost:8888/magic-mirror/">-->
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="js/lib/angular.min.js"></script>
    <script src="js/magic-mirror.js"></script>
</head>
<body>

    <div id="message" class="center-ver center-hor small" ng-controller="funnyMessage">{{ joke }}</div>

    <div class="top left">
        <div id="date" class="date small dimmed" ng-controller="TimeCtrl">{{ date }}</div>
        <div id="time" class="time" ng-controller="TimeCtrl">{{ clock | date:'HH:mm' }} <span class="sec">{{ clock | date:'ss' }}</span></div>
        <div class="calendar xxsmall"></div>
    </div>

    <div id="weather" class="right small top"></div>

    <div id="news" class="bottom center-hor xxsmall"></div>

    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/clock.js"></script>
    <script src="js/cheeringMessage.js"></script>
    <script src="js/rrule.js"></script>
    <script src="js/socket.io.min.js"></script>
    <script src="js/moment-with-langs.min.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/newsFeed.js"></script>
    <script src="js/ical_parser.js"></script>
    <script src="js/main.js"></script>

</body>
</html>