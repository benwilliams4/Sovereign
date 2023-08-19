import Table from "./Table.js";
import SavingTableHeader from "./Table Component/SavingTableHeader.js";
import SavingTableFooter from "./Table Component/SavingTableFooter.js";
import SavingTableRow from "./Table Component/SavingTableRow.js";
import MathTools from "../extra/MathTools.js";

class SavingTable extends Table {
    constructor(elementId, userInterface) {
        super(elementId, userInterface);
    }


    //RENDER METHODS

    render() {
        this.clear();
        var Savings = this.ui.dm.SavingManager;
        Savings.sort();
        var n = Savings.count();
        if (n === 0) {
            this.element.innerHTML = "No savings to show.";
        } else {
            // Add header
            this.header = new SavingTableHeader(this);
            this.element.appendChild(this.header.element);

            //Add rows
            for (let i = 0; i < n; i++) {
                var SavingGoal = Savings.byIndex(i);
                var row = new SavingTableRow(this, SavingGoal);
                this.rows.push(row);
                this.element.appendChild(row.element);
            }
            // Add footer
            this.footer = new SavingTableFooter(this);
            this.element.appendChild(this.footer.element);
            //Update dynamic content
            this.calculate(); //defined in class: Table
        }
    }

    //QUERY METHODS

    //Based on the current user input, how many unallocated funds still remain
    getUnallocatedState() {
        var AccountManager = this.ui.dm.AccountManager;
        var accountsTotal = AccountManager.totalBalance();
        var total = this.getTotalBalanceState();
        return accountsTotal - total;
    }

    //Difference in Saving Goal Totals between current user input state and the saved sate.
    getTotalChangeState() {

        var totalChange = 0;
        for (let i = 0; i < this.rows.length; i++) {
            totalChange += this.rows[i].getChangeState();
        }
        return totalChange;
    }

    // Total amount allocated to saving goals based on the current user input
    getTotalBalanceState() {
        var balance = 0;
        for (let i = 0; i < this.rows.length; i++) {
            balance += this.rows[i].getInputValue();
        }
        return balance;
    }



}
export default SavingTable;
