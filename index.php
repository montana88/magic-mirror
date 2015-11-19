<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Magic Mirror</title>
    <script type="text/javascript">
        var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
    </script>
    <meta name="google" value="notranslate">
    <meta http-equiv="refresh" content="21600; URL=http://localhost:8888/magic-mirror/">
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <!--<?php system("ruby icloud.rb"); ?>-->

    <div id="message" class="center-ver center-hor small"></div>

    <div class="top left"><div id="date" class="date small dimmed"></div><div id="time" class="time"></div><div class="calendar xxsmall"></div></div>

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