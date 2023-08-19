import TableFooter from "./TableFooter.js";
import MathTools from "../../extra/MathTools.js";
class SavingTableFooter extends TableFooter {
    constructor(Table) {
        super(Table);
        this.addColumn("Unallocated");
        this.addColumn(""); //Total Unallocated Balance
        this.addColumn(""); //Total Change
        this.addColumn(""); //Progress Bar
        this.addColumn(""); //Goal
        this.addColumn(""); //Saving Plan
    }
    calculateValues() { //Called by Table.calculate()
        var unallocated = this.table.getUnallocatedState();
        var totalChange = this.table.getTotalChangeState();
        var mtparams = {
            "signPositives": false,
            "addThousandSeparator": true,
            "removeRedundantDecimal": false
        };
        this.element.children[1].innerHTML = MathTools.numberToCurrency(unallocated, mtparams);
        mtparams.signPositives = true;
        this.element.children[2].innerHTML = MathTools.numberToCurrency(0 - totalChange, mtparams);
        this.applyChangeColor(); //Inherited from TableFooter class

    }
}
export default SavingTableFooter;
