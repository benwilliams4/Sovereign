import DataModel from "../data/DataModel.js";

class DeveloperToolkit {
    constructor(dm, ui, sps) {
        this.dm = dm; //Data Model
        this.ui = ui; // User Interface
        this.sps = sps; //Saving Plan Scheduler
    }

    //simulate th sps Scheduler running into the future
    fastForward(days = 90) {
        var dm = this.dm;
        var ui = this.ui;
        var sps = this.sps;

        //Function to run after current data model has been copied
        var callback = function () {
            var i = 0;
            var interval = setInterval(function () {
                var d = new Date();
                d.setDate(d.getDate() + i);
                console.log(d);
                sps.runForDate(d);
                dm.toStorage();
                ui.renderAll();
                i++;
                if (i > days) {
                    clearInterval(interval);
                    //Reload the original Data Model
                    preservedData.toStorage();
                    dm.fromStorage();
                    ui.renderAll();
                }
            }, 100);
        };

        //copy current data model
        var preservedData = new DataModel();
        preservedData.setLocalStorageName(dm.localStorageName);
        preservedData.fromStorage().then(callback);
    }
}

export default DeveloperToolkit;
