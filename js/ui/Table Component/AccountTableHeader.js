import TableRow from "./TableRow.js";
class AccountTableHeader extends TableRow {
    constructor(Table) {
        super(Table);
        this.element = document.createElement("div");
        this.addColumn("Account Name");
        this.addColumn("Balance");
        this.addColumn("Change");
        this.addColumn("Manage");
    }
}
export default AccountTableHeader;