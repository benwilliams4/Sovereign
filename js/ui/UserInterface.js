//Container class for UI Components

//Import UI components
import Overlay from "./Overlay.js";
import PageManager from "./PageManager.js";
import MenuBar from "./MenuBar.js";
import AccountTable from "./AccountTable.js";
import SavingTable from "./SavingTable.js";
import AccountForm from "./AccountForm.js";
import SavingForm from "./SavingForm.js";
import Popup from "./Popup.js";


class UserInterface {
    constructor(DataModel) {

        this.dm = DataModel; //UI must be bound to an instance of data model

        //Overlay for popups
        this.Overlay = new Overlay();

        //Setup Navingation
        this.PageManager = new PageManager(this);
        this.MenuBar = new MenuBar("menubar", this);
        this.MenuBar.render();

        //Setup Accounts Table
        this.AccountTable = new AccountTable("table-accounts", this);
        this.AccountTable.setResetButton("btn-reset-accounts");
        this.AccountTable.setSaveButton("btn-save-accounts");
        this.AccountTable.render();

        //Setup Savings Table
        this.SavingTable = new SavingTable("table-savings", this);
        this.SavingTable.setResetButton("btn-reset-savings");
        this.SavingTable.setSaveButton("btn-update-savings");
        this.SavingTable.render();

        //Set up create/edit account form
        var popup = new Popup("form-new-account", this);
        popup.setOpenButton("btn-new-account");

        this.AccountForm = new AccountForm("form-new-account", this);
        this.AccountForm.displayAsPopup(popup);

        //Setup create/edit saving form
        popup = new Popup("form-new-saving", this);
        popup.setOpenButton("btn-new-saving");

        this.SavingForm = new SavingForm("form-new-saving", this);
        this.SavingForm.displayAsPopup(popup);

    }

    //Calls render() method on all UI components
    renderAll() {
        var keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            var component = this[keys[i]];
            if ('render' in component) {
                component.render();
            }
        }
    }

    //UI hidden by default, call this in main.js when ready
    show() {
        document.getElementsByTagName("body")[0].classList.remove("hidden");
    }

    //called by main.js if mode is set to use Neutralino.Js
    setupForNeutralino() {
        this.disableContextMenu();
    }

    disableContextMenu() {
        document.addEventListener('contextmenu', event => event.preventDefault());
    }

    /*
    Called by Saving Plan Scheduler for permission to run at periodic interval,
    this is necessary as the SPS will call the saving table to be re-rendered
    which would cause any pending changes to saving balances to be lost. */

    permitSpsRerun() {
        if (
            this.SavingTable.changesPending() == false &&
            this.SavingTable.hasFocus() == false) {
            return true;
        } else {
            return false;
        }
    }
}

export default UserInterface;
