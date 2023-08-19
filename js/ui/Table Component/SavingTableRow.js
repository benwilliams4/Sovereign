import TableBodyRow from "./TableBodyRow.js";
import MathTools from "../../extra/MathTools.js";

class SavingTableRow extends TableBodyRow {
    constructor(SavingTable, SavingGoal) {
        super(SavingTable, SavingGoal);


        //Obtain relevant data
        var name = SavingGoal.getName();
        var balance = SavingGoal.getBalance();
        var goal = SavingGoal.getGoal();
        var spEnabled = SavingGoal.getSavingPlan().isEnabled();
        var spFrequency = SavingGoal.getSavingPlan().getFrequency();

        //Parameters for number to currency formatting
        var mtparams = {
            "signPositives": false,
            "addThousandSeparator": true,
            "removeRedundantDecimal": true
        };
        
        //Apply number to currency formatting
        balance = MathTools.numberToCurrency(balance, mtparams);
        goal = MathTools.numberToCurrency(goal, mtparams);

        //Create the row
        this.element.classList.add("account");
        this.addColumn(name);
        this.addColumn("<input type='number' value='" + balance + "'></div>");
        this.addColumn("0.00", "change");
        this.addColumn("<div class='meter-border'><div class='meter-fill'></div></div>");
        this.addColumn(goal);
        this.addColumn((spEnabled) ? spFrequency : "Disabled");
        this.addColumn("<span>Edit</span><span>Delete</span></div>");
        
        //Finally...
        this.addEventListeners();
    }

    //Apply conditional colour formatting to change column
    applyChangeColor() {
        var c = this.element.getElementsByClassName("change")[0];
        c.classList.remove("pos", "neg");
        if (c.innerHTML.includes("-")) {
            c.classList.add("neg");
            c.classList.remove("pos");
        } else if (c.innerHTML.includes("+")) {
            c.classList.add("pos");
            c.classList.remove("neg");
        }
    }
    
    //Update progress bar size to reflect current input value
    updateProgressBar() {
        var currentInput = this.getInputValue();
        var goal = this.entry.getGoal();
        var proposedPercent = Math.round((currentInput / goal) * 100);
        this.element.getElementsByClassName("meter-fill")[0].style.width = proposedPercent + '%';
    }

    calculateValues() {
        this.updateChangeColumn(); //Defined in TableBodyRow Class
        this.updateProgressBar();
    }

    //Launch edit form for this row's entry
    edit() {
        var ui = this.table.ui;
        var accName = this.entry.getName();
        ui.SavingForm.setEditMode(accName);
        ui.SavingForm.popup.show();
    }

}

export default SavingTableRow;
