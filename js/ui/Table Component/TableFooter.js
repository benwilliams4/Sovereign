import TableRow from "./TableRow.js";

class TableFooter extends TableRow {
    constructor(Table) {
        super(Table);
    }
    
    //Apply conditional colour formatting to the change column
    // Called by Child Class calculateValues() method
    applyChangeColor() {
        var t = this.element.children[2];
        t.classList.remove("pos", "neg");
        if (t.innerHTML.includes("-")) {
            t.classList.add("neg");
        } else if (t.innerHTML.includes("+")) {
            t.classList.add("pos");
        }
    }

}
export default TableFooter;
