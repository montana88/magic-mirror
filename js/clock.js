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