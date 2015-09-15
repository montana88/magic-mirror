<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Magic Mirror</title>
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <div id="clock" class="bottom center-hor">
        <div id="time" class="small"></div>
        <div id="message" class="small"></div>
    </div>

    <div class="bottom right"><div class="date small dimmed"></div><div class="time"></div><div class="calendar xxsmall"></div></div>

    <div id="weather" class="right small top"></div>

    <div id="news" class="left xxsmall top"></div>

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