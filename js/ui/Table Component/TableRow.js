class TableRow {
    constructor(Table) {
        this.table = Table;
        this.element = document.createElement("div");
    }
    addColumn(name,className) {
        var col = document.createElement("div");
        col.innerHTML = name;
        col.className=className;
        this.element.appendChild(col);
    }
}
export default TableRow;
