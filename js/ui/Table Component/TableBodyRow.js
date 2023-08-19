import TableRow from "./TableRow.js";
import MathTools from "../../extra/MathTools.js";

class TableBodyRow extends TableRow {
    constructor(Table, Entry) {
        super(Table);
        this.entry = Entry;
        this.element = document.createElement("div");
    }
    
    getInputValue() {
        return Number(this.element.getElementsByTagName("input")[0].value);
    }
    
    getChangeState() {
        return this.getInputValue() - this.entry.getBalance();
    }

    hasFocus() {
        var i = this.element.getElementsByTagName("input")[0];
        if (document.activeElement == i) {
            return true;
        } else {
            return false;
        }
    }

    updateChangeColumn() {
        var mtparams = {
            "signPositives": true,
            "addThousandSeparator": true,
            "removeRedundantDecimal": false
        };
        var formatted = MathTools.numberToCurrency(this.getChangeState(), mtparams);
        this.element.getElementsByClassName("change")[0].innerHTML = formatted;
        this.applyChangeColor(); // Defined in child class
    }
    
    saveState() {
        this.entry.updateBalance(this.getInputValue());
    }

    addEventListeners() {
        this.addDeleteEventListener();
        this.addEditEventListener();
        this.addInputChangeEventListener();

    }
    addDeleteEventListener() {
        var del = this.element.querySelector("span:nth-child(2)");
        var row = this;

        var r = row;
        del.addEventListener("click", function () {
            r.delete();
        });
    }
    
    addEditEventListener() {
        //Select first span of 4th child div
        var ed = this.element.querySelector("span:nth-child(1)");
        //Define closure vars

        var row = this;
        ed.addEventListener("click", function () {
            row.edit(); //Define in child class as to which form to open

        });
    }
    
    addInputChangeEventListener() {
        var i = this.element.getElementsByTagName("input")[0];
        var Table = this.table;
        i.addEventListener("keyup", function () {
            Table.calculate();
        });
    }

    delete() {
        this.entry.delete();
        this.table.render();
    }

}
export default TableBodyRow;
