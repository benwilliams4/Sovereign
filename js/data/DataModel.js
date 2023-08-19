import AccountManager from "./AccountManager.js";
import SavingManager from "./SavingManager.js";
import config from "../config.js";

class DataModel {

    constructor() {
        this.AccountManager = new AccountManager(this);
        this.SavingManager = new SavingManager(this);
        this.spsLastRun = undefined;
        this.localStorageName = undefined;
    }

    //Sets the name of the key which to save retrieve data in localstorage/Neutralino
    setLocalStorageName(name) {
        this.localStorageName = name;
    }

    // Saves current Data Model state to storage location
    toStorage() {
        var storeData = {};
        storeData.Accounts = this.AccountManager.entries;
        storeData.Savings = this.SavingManager.entries;
        storeData.spsLastRun = this.spsLastRun;

        var json = JSON.stringify(storeData);

        //Neutralino storage
        if (typeof Neutralino !== 'undefined' && config.useNeutralino == true) {
            var storeData = async function (key, value) {
                await Neutralino.storage.setData(key, value);
            }
            storeData(this.localStorageName, json);

        }
        //Browser storage
        else {
            localStorage.setItem(this.localStorageName, json);
        }
    }

    // Updates the Data Model state from the storage location
    fromStorage() {
        var dm = this;

        //function to copy from stored object to data model
        var copyFromJSON = function (json) {
            var d = JSON.parse(json);

            if (d) {
                //Copy properties to this object:
                dm.AccountManager.entries = d.Accounts;
                dm.SavingManager.entries = d.Savings;
                dm.spsLastRun = d.spsLastRun;
            }
        }

        //FUTURE: tidy this once more experienced with Promise Objects
        return new Promise((resolve) => {
            try {
                //Neutralino method
                if (typeof Neutralino !== 'undefined' && config.useNeutralino == true) {

                    //Define function to check whether a Neutralino storage key exists
                    var dataExists = async function (key) {
                        try {
                            let keys = await Neutralino.storage.getKeys();
                            console.log("Searching for " + key + " in " + keys);
                            if (keys.includes(key)) {
                                console.log("Found!");
                                return true;
                            } else {
                                console.log("Not found.");
                                return false;
                            }
                        } catch {
                            console.log("Error searching for keys, storage directory probably doesn't exist.");
                            return false;
                        }
                    }

                    // Define function to obtain Neutralino storage key data
                    var getData = async function (key) {
                        return await Neutralino.storage.getData(key);
                    }

                    //Check existence of key
                    dataExists(dm.localStorageName).then(exists => {
                        //Code to run once response has been received:
                        if (exists) {
                            console.log("Neutralino data found");
                            var d = getData(dm.localStorageName).then(response => {
                                //Once data has been retrieved, copy to dataframe and resolve promise
                                copyFromJSON(response);
                                resolve();
                            });
                        } else {
                            console.log("No Neutralino data found");
                            //Resolve promise, app will load without pre-existing state
                            resolve();
                        }
                    });
                }
            //End of Neutralino Method
            //Browser method
            else {
                    var d = localStorage.getItem(dm.localStorageName);
                    copyFromJSON(d);
                    resolve();
                }
            } catch {
                console.log("Failed to retrieve data from storage.");
                localStorage.removeItem(this.localStorageName);
                resolve(); // app will load without pre-existing state
            }
        });
    }


    //development use only: sends scheduler back by x days
    backdateSPS(x) {
        this.spsLastRun = this.spsLastRun - (3600 * 24 * x);
        this.toStorage();
        console.log("sps last run changed to " + x + " days ago.");
    }
}

export default DataModel;
