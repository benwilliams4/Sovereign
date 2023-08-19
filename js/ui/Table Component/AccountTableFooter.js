import TableFooter from "./TableFooter.js";
import MathTools from "../../extra/MathTools.js";

class AccountTableFooter extends TableFooter {
    constructor(Table) {
        super(Table);
        this.addColumn("Total");
        this.addColumn(""); // Balance
        this.addColumn(""); //Change
        this.addColumn(""); //Manage
    }
    calculateValues() { // Called by Table.calculate()
        var balance = this.table.getTotalBalanceState();
        var changeAmt = this.table.getTotalChangeState();

        var mtparams = {
            "signPositives": false,
            "addThousandSeparator": true,
            "removeRedundantDecimal": false
        };
        this.element.children[1].innerHTML = MathTools.numberToCurrency(balance, mtparams);

        mtparams.signPositives = true; //Adjust paramaters
        this.element.children[2].innerHTML = MathTools.numberToCurrency(changeAmt, mtparams);
        this.applyChangeColor(); //Inherited from TableHeader
    }
}
export default AccountTableFooter;
