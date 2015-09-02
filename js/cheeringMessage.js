if(document.readyState === "complete") {
    var dateTime = new getDateTime();
    dateTime.startTime();
} else {
    window.addEventListener("DOMContentLoaded", function () {
        var dateTime = new getDateTime();

        console.log(dateTime.getTime());
    }, false);
}