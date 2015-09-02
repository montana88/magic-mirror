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

        setTimeout(function() {
            that.compliment();
        }, 60000);

    }

};

if(document.readyState === "complete") {
    item1.clock();
    item1.compliment();
} else {
    window.addEventListener("DOMContentLoaded", function () {
        item1.clock();
        item1.compliment();
    }, false);
}