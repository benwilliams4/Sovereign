import Form from "./Form.js";
class AccountForm extends Form {
    constructor(elementId, userInterface) {
        super(elementId, userInterface);
        this.setCreateMode(); // defaults to create mode
        this.editing = ""; //When in edit mode, update to the name of the entry being edited.
    }

    submit() {
        if (this.validate()) {
            var name = this.getValueByElementName("name");
            var type = this.getValueByElementName("type");
            var AccountManager = this.ui.dm.AccountManager;

            // For create Mode, create a new account
            if (this.mode == "create") {
                this.ui.dm.AccountManager.create(name, type);
            }
            //For edit mode, update the name and type
            else if (this.mode == "edit") {
                var account = AccountManager.byName(this.editing);
                account.rename(name);
                account.setType(type);
            }

            super.submit();
            this.ui.AccountTable.render();
        }
    }

    validate() {
        var name = this.getValueByElementName("name");
        var type = this.getValueByElementName("type");

        if (name == "") {
            this.showMessage("error", "Account must have a name!");
            return false;
        }

        //right side of expression allows for the name to remain unchanged in edit mode
        if (this.ui.dm.AccountManager.exists(name) && (this.mode != "edit" || this.editing != name)) {
            this.showMessage("error", "An account already exists with this name.");
            return false;
        }
        return true;
    }

    reset() {
        this.setValueByElementName("name", "");
        this.setValueByElementName("type", "Asset");
        this.setCreateMode();
        super.reset();
    }

    setCreateMode() {
        this.mode = "create";
        this.editing = "";
        this.element.getElementsByTagName("h1")[0].innerHTML = "New Account";
        this.element.getElementsByTagName("button")[0].innerHTML = "Create Account";
    }

    setEditMode(accountName) {
        this.mode = "edit";
        this.editing = accountName;
        var accountType = this.ui.dm.AccountManager.byName(accountName).getType();

        this.element.getElementsByTagName("h1")[0].innerHTML = "Edit Account";
        this.element.getElementsByTagName("button")[0].innerHTML = "Update Account";
        this.setValueByElementName("name", accountName);
        this.setValueByElementName("type", accountType);

    }
}

export default AccountForm;
