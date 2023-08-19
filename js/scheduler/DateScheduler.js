import DateTools from "../extra/DateTools.js";

class DateScheduler {

    constructor(DataModel, lastRunPropertyName) {
        this.dm = DataModel;
        this.lastRunDataModelPropertyName = lastRunPropertyName;
        this.pullLastRun();
    }

    setLastRun(lastRun) {
        this.lastRun = new Date(lastRun * 1000);
    }

    getLastRun() {
        return Math.round(this.lastRun.getTime() / 1000);
    }

    //Obtain last run time from the data model
    pullLastRun() {
        if (this.lastRunDataModelPropertyName in this.dm) {
            this.setLastRun(this.dm[this.lastRunDataModelPropertyName]);
        }else{
            this.lastRun = new Date();
        }
    }

    run() {
        var today = new Date();
        var startFrom = DateTools.copyDate(this.lastRun);
        startFrom.setDate(startFrom.getDate() + 1); //Start from the day after the previous run
        this.runForDatesBetween(startFrom, today);
        this.lastRun = today;
        //Save run time to the data model:
        this.dm[this.lastRunDataModelPropertyName] = this.getLastRun();
        this.dm.toStorage();
    }

    //Calls child.runForDate(date) for all dates between and inclusive of startDate and endDate
    runForDatesBetween(startDate, endDate) {
        var begin = DateTools.resetTime(startDate);
        var end = DateTools.resetTime(endDate);
        while (begin <= end) {
            this.runForDate(begin); // Define Scheduler logic in child class
            begin.setDate(begin.getDate() + 1);
        }
    }

}
export default DateScheduler;
