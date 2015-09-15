var item1 = {

    clock: function () {

        var that = this;
        var dateTime = new getDateTime();
        var currentTime = dateTime.getTime();

        document.getElementById('time').innerHTML = currentTime.hour + ":" + currentTime.minute + ":" + currentTime.seconds;

        var t = setTimeout( function(){
            that.clock();
        }, 1000);

    },

    compliment: function () {

        var that = this;
        var compliment;

        var today = new Date();
        var hour = today.getHours();
        var compliments;

        if (hour >= 3 && hour < 12) { compliments = message.morning; }
        if (hour >= 12 && hour < 17) { compliments = message.afternoon; }
        if (hour >= 17 || hour < 3) { compliments = message.evening; }

        compliment = Math.floor(Math.random() * compliments.length);

        document.getElementById('message').innerHTML = '<p>' + compliments[compliment] + '</p>';

        // update compliment every minute
        setTimeout(function() {
            that.compliment();
        }, 60000);

    }

};

currentWeather = {

    init: function() {

        var that = this;

            var getWeather = loadWeatherApi.filter();
            var weatherElement = document.getElementById('weather');
            var windDegName;

            var iconTable = {
                '01d':'wi-day-sunny',
                '02d':'wi-day-cloudy',
                '03d':'wi-cloudy',
                '04d':'wi-cloudy-windy',
                '09d':'wi-showers',
                '10d':'wi-rain',
                '11d':'wi-thunderstorm',
                '13d':'wi-snow',
                '50d':'wi-fog',
                '01n':'wi-night-clear',
                '02n':'wi-night-cloudy',
                '03n':'wi-night-cloudy',
                '04n':'wi-night-cloudy',
                '09n':'wi-night-showers',
                '10n':'wi-night-rain',
                '11n':'wi-night-thunderstorm',
                '13n':'wi-night-snow',
                '50n':'wi-night-alt-cloudy-windy'
            };

            if (getWeather.wind.deg < 23 && getWeather.wind.deg > 0 || getWeather.wind.deg > 338 && getWeather.wind.deg < 360) {
                windDegName = "Z";
            } else if (getWeather.wind.deg >= 23 && getWeather.wind.deg <= 68) {
                windDegName = "ZW";
            } else if (getWeather.wind.deg > 68 && getWeather.wind.deg <= 113) {
                windDegName = "W";
            } else if (getWeather.wind.deg > 113 && getWeather.wind.deg <= 158) {
                windDegName = "NW";
            } else if (getWeather.wind.deg > 158 && getWeather.wind.deg <= 203) {
                windDegName = "N";
            } else if (getWeather.wind.deg > 203 && getWeather.wind.deg <= 248) {
                windDegName = "NO";
            } else if (getWeather.wind.deg > 248 && getWeather.wind.deg <= 293) {
                windDegName = "O";
            } else if (getWeather.wind.deg > 293 && getWeather.wind.deg <= 338) {
                windDegName = "ZO";
            }

            var iconClass = iconTable[getWeather.weather.type.icon];

            weatherElement.innerHTML = '<p class="location">' + getWeather.location + '</p>' +
                                       '<span class=" ' + iconClass + ' "></span>' +
                                       '<p class="avgTemp">' + getWeather.temperature + ' \u02DA' + 'C' + '</p>' +
                                       '<p class="windSpeed">' + getWeather.wind.speed + ' Bft' + '</p>' +
                                       '<p class="windDeg">' +
                                           '<span class="wi-wind-north" style="display: inline-block; transform: rotate(' + getWeather.wind.deg + 'deg);"></span>' + ' ' + windDegName +
                                       '</p>';

        // update weather every minute
        setTimeout(function() {
            that.init();
        }, 60000);

    }

};

var news = {

    init: function() {

        var that = this;

        // get newsfeed!!
        newsFeed.init();
        this.carousel();

        // update weather every minute
        setTimeout(function() {
            for(var i = 0; i <= 9; i++){
                document.getElementById("news").removeChild(document.getElementById("article" + i));
            }
            that.init();
        }, 200000);

    },

    carousel: function() {

        var slides;
        var amount;
        var i;
        var animation;
        var timer;

        function run() {
            // hiding previous image and showing next
            $(slides).fadeOut(animation - 100);

            i++;

            if (i >= amount){
                i = 0;
            }

            $(slides[i]).delay(animation).fadeIn(animation);

            // loop
            timer = setTimeout(run, 20000);
        }

        slides = document.getElementById('news').children;
        amount = 10;
        i=0;
        animation = 2000;

        timer = setTimeout(run, 20000);

    }

};

var gitReload = {

    reload: function() {

        var that = this;

        $.getJSON('githash.php', {}, function(json, textStatus) {
            if (json) {
                if (json.gitHash != gitHash) {
                    console.log('hahahahahahahahahahahahahahahahahhahahahahaha');
                    window.location.reload();
                    window.location.href=window.location.href;
                }
            }
        });
        setTimeout(function() {
            that.reload();
        }, 3000);
    }

}

var calendar = {

    eventList: [],

    updateCalendarData: function() {

        var that = this;

        new ical_parser("calendar.php", function(cal){
            var events = cal.getEvents();
            that.eventList = [];

            for (var i in events) {
                var e = events[i];
                for (var key in e) {
                    var value = e[key];
                    var seperator = key.search(';');
                    if (seperator >= 0) {
                        var mainKey = key.substring(0,seperator);
                        var subKey = key.substring(seperator+1);

                        var dt;
                        if (subKey == 'VALUE=DATE') {
                            //date
                            dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8));
                        } else {
                            //time
                            dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8), value.substring(9,11), value.substring(11,13), value.substring(13,15));
                        }

                        if (mainKey == 'DTSTART') e.startDate = dt;
                        if (mainKey == 'DTEND') e.endDate = dt;
                    }
                }

                if (e.startDate == undefined){
                    //some old events in Gmail Calendar is "start_date"
                    //FIXME: problems with Gmail's TimeZone
                    var days = moment(e.DTSTART).diff(moment(), 'days');
                    var seconds = moment(e.DTSTART).diff(moment(), 'seconds');
                    var startDate = moment(e.DTSTART);
                } else {
                    var days = moment(e.startDate).diff(moment(), 'days');
                    var seconds = moment(e.startDate).diff(moment(), 'seconds');
                    var startDate = moment(e.startDate);
                }

                //only add fututre events, days doesn't work, we need to check seconds
                if (seconds >= 0) {
                    if (seconds <= 60*60*5 || seconds >= 60*60*24*2) {
                        var time_string = moment(startDate).fromNow();
                    }else {
                        var time_string = moment(startDate).calendar()
                    }
                    if (!e.RRULE) {
                        that.eventList.push({'description':e.SUMMARY,'seconds':seconds,'days':time_string});
                    }
                    e.seconds = seconds;
                }

                // Special handling for rrule events
                if (e.RRULE) {
                    var options = new RRule.parseString(e.RRULE);
                    options.dtstart = e.startDate;
                    var rule = new RRule(options);

                    // TODO: don't use fixed end date here, use something like now() + 1 year
                    var dates = rule.between(new Date(), new Date(2016,11,31), true, function (date, i){return i < 10});
                    for (date in dates) {
                        var dt = new Date(dates[date]);
                        var days = moment(dt).diff(moment(), 'days');
                        var seconds = moment(dt).diff(moment(), 'seconds');
                        var startDate = moment(dt);
                        if (seconds >= 0) {
                            if (seconds <= 60*60*5 || seconds >= 60*60*24*2) {
                                var time_string = moment(dt).fromNow();
                            } else {
                                var time_string = moment(dt).calendar()
                            }
                            that.eventList.push({'description':e.SUMMARY,'seconds':seconds,'days':time_string});
                        }
                    }
                }
            };

            that.eventList.sort(function(a,b){return a.seconds-b.seconds});

            setTimeout(function() {
                that.updateCalendarData();
            }, 10000);
        });
    },

    updateCalendar: function() {

        var table = $('<table/>').addClass('xsmall').addClass('calendar-table');
        var opacity = 1;
        var that = this;

        for (var i in that.eventList) {
            var e = that.eventList[i];

            var row = $('<tr/>').css('opacity',opacity);
            row.append($('<td/>').html(e.description).addClass('description'));
            row.append($('<td/>').html(e.days).addClass('days dimmed'));
            table.append(row);

            opacity -= 1 / that.eventList.length;
        }

        $('.calendar').html(table);

        setTimeout(function() {
            that.updateCalendar();
        }, 1000);
    }

}

if(document.readyState === "complete") {
    item1.clock();
    item1.compliment();
    currentWeather.init();
    news.init();
    calendar.updateCalendarData();
    calendar.updateCalendar();
    gitReload.reload();
} else {
    window.addEventListener("DOMContentLoaded", function () {
        item1.clock();
        item1.compliment();
        currentWeather.init();
        news.init();
        calendar.updateCalendarData();
        calendar.updateCalendar();
        gitReload.reload();
    }, false);
}