//Parent Class for Account and Saving Goal Classes.

class Entry {
    constructor(EntryManager, entryObject) {
        this.Manager = EntryManager; //Instance of AccountManager or SavingManager
        this.entry = entryObject; // reference to the raw entry data stored in the Manager Object
    }
    getName(){
        return this.entry.name;
    }
    rename(newName) {
        this.entry.name = newName;
        this.Manager.sort();
        this.Manager.dm.toStorage();
    }
    getBalance() {
        return this.entry.balance;
    }
    updateBalance(newBalance) {
        this.entry.balance = newBalance;
        this.Manager.dm.toStorage();
    }
    delete(){
        this.Manager.deleteEntry(this.getName());
    }
}

export default Entry;
