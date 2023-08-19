import Table from "./Table.js";
import AccountTableHeader from "./Table Component/AccountTableHeader.js";
import AccountTableFooter from "./Table Component/AccountTableFooter.js";
import AccountTableRow from "./Table Component/AccountTableRow.js";
import MathTools from "../extra/MathTools.js";

class AccountTable extends Table {
    constructor(elementId, userInterface) {
        super(elementId, userInterface);
    }

    render() {
        this.clear(); // defined in parent
        var AccountManager = this.ui.dm.AccountManager;
        AccountManager.sort();
        var n = AccountManager.count();
        if (n === 0) {
            this.element.innerHTML = "No accounts to show.";
        } else {
            //Add Header
            this.header = new AccountTableHeader(this);
            this.element.appendChild(this.header.element);
            //Add rows
            for (let i = 0; i < n; i++) {
                var account = AccountManager.byIndex(i);
                var row = new AccountTableRow(this, account);
                this.rows.push(row);
                this.element.appendChild(row.element);
            }
            //Add footer
            this.footer = new AccountTableFooter(this);
            this.element.appendChild(this.footer.element);
            //Update dynamic values
            this.calculate(); //Defined in parent class
        }
    }

    // QUERY METHODS

    //Get the total balance based on the current state of user input
    getTotalBalanceState() {
        var balance = 0;
        for (let i = 0; i < this.rows.length; i++) {
            var type = this.rows[i].entry.getType();
            if (type == "Liability") {
                balance -= Number(this.rows[i].getInputValue());
            } else {
                balance += Number(this.rows[i].getInputValue());
            }

        }
        return balance;
    }

    //Get the overall change based on the current state of user input
    getTotalChangeState() {
        var changeAmt = 0;
        for (let i = 0; i < this.rows.length; i++) {
            var type = this.rows[i].entry.getType();
            var amt = this.rows[i].getChangeState();
            if (type == "Liability") {
                changeAmt -= amt;
            } else {
                changeAmt += amt;
            }

        }
        return changeAmt;
    }
}

export default AccountTable;
