currentWeather = {

    init: function() {

        var getWeather = loadWeatherApi.filter(),
            getDays = getWeather.week,
            weatherElement = document.getElementById('weather'),
            day = new Date(),
            that = this,
            firstRow = '',
            iconTable = {
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
            },
            weekday = ['Zo','Ma','Di','Wo','Do','Vr','Za','Zo','Ma','Di','Wo','Do','Vr','Za'];

        for (var prop in getDays) {

            if(getDays.hasOwnProperty(prop)) {

                var countDays = day.getDay() + parseInt(prop);

                firstRow += '<tr>' +
                                '<td class="day">' + weekday[countDays] + '</td>' +
                                '<td><span class="' + iconTable[getDays[prop].weather] + '"></span></td>' +
                                '<td><span style="float:left;">' + getDays[prop].temperature + '\u02DA' + '</span></td>' +
                                '<td><span style="float:right;"><span class="wi-wind-north" style="margin-right:5px;display: inline-block;transform: rotate(' + getDays[prop].wind.deg + 'deg);"></span>' + that.getWindDeg(getDays[prop].wind.deg).toUpperCase() + '</span></td>' +
                            '</tr>';

            }

        }

        weatherElement.innerHTML = '<div class="currentDay">' +
                                        '<div class="weatherCurrent">' +
                                            '<p style="font-size:22px;margin: 0;"><span class="icon-small wi-up"></span>' + getWeather.currentDay.temperature.max + '\u02DA ' + '<span class="icon-small wi-down"></span>' + getWeather.currentDay.temperature.min + '\u02DA ' +
                                            '<span class="icon-small wi-wind-north" style="display: inline-block;transform: rotate(' + getWeather.currentDay.wind.deg + 'deg);"></span>' + that.getWindDeg(getWeather.currentDay.wind.deg).toUpperCase() + ' <span class="icon-small wi-strong-wind"></span>' + getWeather.currentDay.wind.speed + '</p>' +
                                            '<p style="margin: -10px 0 0 0;font-size: 67px;text-align:center;padding-left: 20px;" class="' + iconTable[getWeather.currentDay.weather] + '"> <span class="currentdayTemp"><span class="icon-medium wi-thermometer"></span>' + getWeather.currentDay.temperature.avg + '\u02DA</span></p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<table class="forecast-table">' +
                                        '<tbody>' +
                                            firstRow +
                                        '</tbody>' +
                                    '</table>';

        // update weather every minute
        setTimeout(function() {
            that.init();
        }, 10000);

    },

    getWindDeg: function (data) {

        var windDegName;

        if (data < 23 && data > 0 || data > 338 && data < 360) {
            windDegName = "z";
        } else if (data >= 23 && data <= 68) {
            windDegName = "zw";
        } else if (data > 68 && data <= 113) {
            windDegName = "w";
        } else if (data > 113 && data <= 158) {
            windDegName = "nw";
        } else if (data > 158 && data <= 203) {
            windDegName = "n";
        } else if (data > 203 && data <= 248) {
            windDegName = "no";
        } else if (data > 248 && data <= 293) {
            windDegName = "o";
        } else if (data > 293 && data <= 338) {
            windDegName = "zo";
        }

        return windDegName;

    }

};

// TODO: add secondary calendars!!!
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
            }

            that.eventList.sort(function(a,b){return a.seconds-b.seconds});

            setTimeout(function() {
                that.updateCalendarData();
            }, 20000);
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
        }, 10000);
    }

};

window.onload = function () {

    currentWeather.init();
//    news.init();
    calendar.updateCalendarData();
    calendar.updateCalendar();
//    gitReload.reload();
//    testingRuby.init();

};