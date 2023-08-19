import DateScheduler from "./DateScheduler.js";

class SavingPlanScheduler extends DateScheduler {
    constructor(DataModel, lastRunPropertyName) {
        super(DataModel, lastRunPropertyName);

    }
    runForDate(date) {
        var SavingManager = this.dm.SavingManager;
        SavingManager.applySavingPlans("Daily");
        if (date.getDay() === 0) { //FUTURE check against this.dm.settings.get("spsWeekDay");
            SavingManager.applySavingPlans("Weekly");
        }
        if (date.getDate() == 1) { //FUTURE check against this.dm.settings.get("spsMonthDay");
            SavingManager.applySavingPlans("Monthly");
        }
    }

    //periodically rerun the scheduler if the user is not making changes to the data
    beginLiveUpdates(ui) {
        var interval = 60000; //every minute
        var sps = this;
        var spsInterval = setInterval(function () {
            if (ui.permitSpsRerun()) {
                sps.pullLastRun() // Only needed for DataModel.backdateSPS() debugging func.
                sps.run();
                ui.SavingTable.render();
            }
        }, interval);
    }
}

export default SavingPlanScheduler;
