import TableRow from "./TableRow.js";
class SavingTableHeader extends TableRow {
    constructor(Table) {
        super(Table);
        this.addColumn("Name");
        this.addColumn("Balance");
        this.addColumn("Change");
        this.addColumn(""); // Progress Bar
        this.addColumn("Goal");
        this.addColumn("Saving Plan");
        this.addColumn("Manager");
    }
}
export default SavingTableHeader;