import TableBodyRow from "./TableBodyRow.js";
import MathTools from "../../extra/MathTools.js";

class AccountTableRow extends TableBodyRow {
    constructor(AccountTable, Account) {
        super(AccountTable, Account);
        
        //Obtain relevant data
        var name = Account.getName();
        var balance = Account.getBalance();
        var type = Account.getType();

        
        //Define  number to currency formatting
        var mtparams = {
            "signPositives": false,
            "addThousandSeparator": false,
            "removeRedundantDecimal": true
        };
        
        //Apply number to currency formatting
        balance = MathTools.numberToCurrency(balance, mtparams);

        
        //Update row classes
        this.element.classList.add("account");
        if (type == "Liability") {
            this.element.classList.add("liability");
        }
        
        //Create columns
        this.addColumn(name);
        this.addColumn("<input type='number' value='" + balance + "'>");
        this.addColumn("0.00","change");
        this.addColumn("<span>Edit</span><span>Delete</span></div>");
        
        //Finally...
        this.addEventListeners();
    }
    
    //Apply conditional colour formatting to change column value
    applyChangeColor() {
        var c = this.element.getElementsByClassName("change")[0];
        c.classList.remove("pos", "neg");
        var liability = (this.entry.getType() == "Liability");
        var negative = c.innerHTML.includes("-");
        var positive = c.innerHTML.includes("+");
        if ((liability && negative) || (!liability && positive)) {
            c.classList.add("pos");
        } else if ((liability && positive) || (!liability && negative)) {
            c.classList.add("neg");
        }
    }
    
    
    calculateValues() {
        this.updateChangeColumn(); //Defined in TableBodyRow Class
    }

    //Open edit form for this row's Account
    edit() {
        var ui = this.table.ui;
        var accName = this.entry.getName();
        ui.AccountForm.setEditMode(accName);
        ui.AccountForm.popup.show();
    }
}

export default AccountTableRow;
