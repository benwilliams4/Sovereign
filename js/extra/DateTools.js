var DateTools = {};

//Create a new date object equal to the one provided.
DateTools.copyDate = function(date){
    return new Date(date.getTime());
}
//Resets time to 00:00:00:00, preserving the date
DateTools.resetTime = function (dateObject) {
    var d = new Date(dateObject.getTime());
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
};

export default DateTools;
