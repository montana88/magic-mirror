<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Magic Mirror</title>
    <script type="text/javascript">
        var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
    </script>
    <meta name="google" value="notranslate" />
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <!--<?php system("ruby icloud.rb"); ?>-->

    <div id="message" class="center-ver center-hor small"></div>

    <div class="top left"><div id="date" class="date small dimmed"></div><div id="time" class="time"></div><div class="calendar xxsmall"></div></div>

    <div id="weather" class="right small top"></div>

    <div id="news" class="bottom center-hor xxsmall"></div>

    <!--<div class="icon-small wi-day-cloudy-gusts"></div>
    <div class="icon-small wi-day-cloudy-windy"></div>
    <div class="icon-small wi-day-cloudy"></div>
    <div class="icon-small wi-day-fog"></div>
    <div class="icon-small wi-day-hail"></div>
    <div class="icon-small wi-day-lightning"></div>
    <div class="icon-small wi-day-rain-mix"></div>
    <div class="icon-small wi-day-rain-wind"></div>
    <div class="icon-small wi-day-rain"></div>
    <div class="icon-small wi-day-showers"></div>
    <div class="icon-small wi-day-snow"></div>
    <div class="icon-small wi-day-sprinkle"></div>
    <div class="icon-small wi-day-sunny-overcast"></div>
    <div class="icon-small wi-day-sunny"></div>
    <div class="icon-small wi-day-storm-showers"></div>
    <div class="icon-small wi-day-thunderstorm"></div>
    <div class="icon-small wi-cloudy-gusts"></div>
    <div class="icon-small wi-cloudy-windy"></div>
    <div class="icon-small wi-cloudy"></div>
    <div class="icon-small wi-fog"></div>
    <div class="icon-small wi-hail"></div>
    <div class="icon-small wi-lightning"></div>
    <div class="icon-small wi-rain-mix"></div>
    <div class="icon-small wi-rain-wind"></div>
    <div class="icon-small wi-rain"></div>
    <div class="icon-small wi-showers"></div>
    <div class="icon-small wi-snow"></div>
    <div class="icon-small wi-sprinkle"></div>
    <div class="icon-small wi-storm-showers"></div>
    <div class="icon-small wi-thunderstorm"></div>
    <div class="icon-small wi-windy"></div>
    <div class="icon-small wi-night-alt-cloudy-gusts"></div>
    <div class="icon-small wi-night-alt-cloudy-windy"></div>
    <div class="icon-small wi-night-alt-hail"></div>
    <div class="icon-small wi-night-alt-lightning"></div>
    <div class="icon-small wi-night-alt-rain-mix"></div>
    <div class="icon-small wi-night-alt-rain-wind"></div>
    <div class="icon-small wi-night-alt-rain"></div>
    <div class="icon-small wi-night-alt-showers"></div>
    <div class="icon-small wi-night-alt-snow"></div>
    <div class="icon-small wi-night-alt-sprinkle"></div>
    <div class="icon-small wi-night-alt-storm-showers"></div>
    <div class="icon-small wi-night-alt-thunderstorm"></div>
    <div class="icon-small wi-night-clear"></div>
    <div class="icon-small wi-night-cloudy-gusts"></div>
    <div class="icon-small wi-night-cloudy-windy"></div>
    <div class="icon-small wi-night-cloudy"></div>
    <div class="icon-small wi-night-hail"></div>
    <div class="icon-small wi-night-lightning"></div>
    <div class="icon-small wi-night-rain-mix"></div>
    <div class="icon-small wi-night-rain-wind"></div>
    <div class="icon-small wi-night-rain"></div>
    <div class="icon-small wi-night-showers"></div>
    <div class="icon-small wi-night-snow"></div>
    <div class="icon-small wi-night-sprinkle"></div>
    <div class="icon-small wi-night-storm-showers"></div>
    <div class="icon-small wi-night-thunderstorm"></div>
    <div class="icon-small wi-celcius"></div>
    <div class="icon-small wi-cloud-down"></div>
    <div class="icon-small wi-cloud-refresh"></div>
    <div class="icon-small wi-cloud-up"></div>
    <div class="icon-small wi-cloud"></div>
    <div class="icon-small wi-degrees"></div>
    <div class="icon-small wi-down-left"></div>
    <div class="icon-small wi-down"></div>
    <div class="icon-small wi-fahrenheit"></div>
    <div class="icon-small wi-horizon-alt"></div>
    <div class="icon-small wi-horizon"></div>
    <div class="icon-small wi-left"></div>
    <div class="icon-small wi-lightning"></div>
    <div class="icon-small wi-night-fog"></div>
    <div class="icon-small wi-refresh-alt"></div>
    <div class="icon-small wi-refresh"></div>
    <div class="icon-small wi-right"></div>
    <div class="icon-small wi-sprinkles"></div>
    <div class="icon-small wi-strong-wind"></div>
    <div class="icon-small wi-sunrise"></div>
    <div class="icon-small wi-sunset"></div>
    <div class="icon-small wi-thermometer-exterior"></div>
    <div class="icon-small wi-thermometer-internal"></div>
    <div class="icon-small wi-thermometer"></div>
    <div class="icon-small wi-tornado"></div>
    <div class="icon-small wi-up-right"></div>
    <div class="icon-small wi-up"></div>
    <div class="icon-small wi-wind-east"></div>
    <div class="icon-small wi-wind-north-east"></div>
    <div class="icon-small wi-wind-north-west"></div>
    <div class="icon-small wi-wind-north"></div>
    <div class="icon-small wi-wind-south-east"></div>
    <div class="icon-small wi-wind-south-west"></div>
    <div class="icon-small wi-wind-south"></div>
    <div class="icon-small wi-wind-west"></div>-->

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