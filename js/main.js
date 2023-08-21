import DataModel from "./data/DataModel.js";
import UserInterface from "./ui/UserInterface.js"
import SavingPlanScheduler from "./scheduler/SavingPlanScheduler.js";
import DeveloperToolkit from "./extra/DeveloperToolkit.js";
import config from "./config.js";


// Define the startup process for once existing data has been loaded
var onDataLoad = function () {
    var sps = new SavingPlanScheduler(dm, "spsLastRun");
    sps.run();

    var ui = new UserInterface(dm);

    if (config.development) {
        //expose objects to window for debugging
        window.data = dm;
        window.ui = ui;
        window.sps = sps;
        window.config = config;
        window.dev = new DeveloperToolkit(dm,ui,sps);

    }

    //Show Interface
    if (config.useNeutralino) {
        ui.setupForNeutralino();
    }
    ui.show();

    //periodically rerun sps, pass UI to allow checks that user is not currently editing relevant fields
    sps.beginLiveUpdates(ui);

}
//End of OnDataLoad function


//Create the data model
var dm = new DataModel();

//Set Data Location to either live or development
if (config.development) {
    dm.setLocalStorageName(config.storageNames.development);
} else {
    dm.setLocalStorageName(config.storageNames.live);
}

//Load exsting data then run the onDataLoad function
dm.fromStorage().then(onDataLoad);
