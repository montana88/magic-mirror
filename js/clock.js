var getDateTime = function () {
    "use strict";
};

getDateTime.prototype.getTime = function() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();


    m = this.checkTime(m);
    s = this.checkTime(s);

    var time = {
        "hour": h,
        "minute": m,
        "seconds": s
    };

    return time;

};

getDateTime.prototype.checkTime = function(i) {

    if (i<10) {
        i = "0" + i; // add zero in front of numbers < 10
    }

    return i;
};

getDateTime.prototype.getDate = function () {

    var currentDate = new Date();
    var dayName     = currentDate.getDay();
    var day     = currentDate.getUTCDate();
    var month   = currentDate.getMonth();
    var year    = currentDate.getFullYear();

    var weekday = new Array(7);
    weekday[0]=  "Zondag";
    weekday[1] = "Maandag";
    weekday[2] = "Dinsdag";
    weekday[3] = "Woensdag";
    weekday[4] = "Donderdag";
    weekday[5] = "Vrijdag";
    weekday[6] = "Zaterdag";

    var monthName = new Array(7);
    monthName[1] = "jan";
    monthName[2] = "feb";
    monthName[3] = "maa";
    monthName[4] = "apr";
    monthName[5] = "mei";
    monthName[6] = "jun";
    monthName[7] = "jul";
    monthName[8] = "aug";
    monthName[9] = "sep";
    monthName[10] = "okt";
    monthName[11] = "nov";
    monthName[12] = "dec";

    var date = {
        "dayName": weekday[dayName],
        "day": this.checkTime(day),
        "month": monthName[month],
        "year": year
    };

    return date;

};