import Entry from "./Entry.js";

class Account extends Entry {
    constructor(AccountManager, entryObject) {
        super(AccountManager, entryObject);
    }
    setType(newType) {
        this.entry.type = newType;
        this.Manager.sort();
        this.Manager.dm.toStorage();
    }
    getType() {
        return this.entry.type;
    }
}

export default Account;
