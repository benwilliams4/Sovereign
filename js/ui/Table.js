/*Parent Class for:
- AccountTable
- SavingTable
*/

class Table {
    constructor(elementId, userInterface) {
        this.element = document.getElementById(elementId);
        this.ui = userInterface;
        this.rows = [];
    }
    clear() {
        this.element.innerHTML = "";
        this.rows = [];
    }

    //QUERY METHODS

    //Boolean whether the current state differs from the saved state
    changesPending() {
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].getChangeState() != 0) {
                return true;
            }
        }
        return false;
    }

    //Returns true if any of the contained input fields have focus
    hasFocus() {
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].hasFocus() == true) {
                return true;
            }
        }
        return false;
    }

    // BUTTON METHODS


    setResetButton(elementId) {
        this.resetButton = document.getElementById(elementId);
        var Table = this;
        this.resetButton.addEventListener("click", function () {
            Table.render();
        });
    }

    setSaveButton(elementId) {
        this.saveButton = document.getElementById(elementId);
        var Table = this;
        //Save button onclick update data
        this.saveButton.addEventListener("click", function () {
            Table.saveState();
        });
    }

    //Enables/Disables save button depending whether there are pending changes
    setSaveButtonState() {
        if (this.changesPending()) {
            this.saveButton.disabled = false;
        } else {
            this.saveButton.disabled = true;
        }
    }



    // UPDATE METHODS


    //updates table to feflect current input states without saving to data model
    calculate() {
        for (let x = 0; x < this.rows.length; x++) {
            this.rows[x].calculateValues();
        }
        this.footer.calculateValues();
        this.setSaveButtonState();
    }
    //Update the Data Model to reflect the current table state
    saveState() {
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].saveState();
        }
        this.render();
    }

}




export default Table;
