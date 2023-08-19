/*
Parent class for AccountManager and SavingManager classes.
Both these classes share the following properties:

- entries (an array containing objects representing Accounts or Saving Goals)
- dm (referring to the parent DataModel object)

And the following methods:
- sort

Each entry in EntryManager.entries should have the following properties:
- name (i.e Account name OR Savings name)
- balance (i.e. Account balance OR Savings balance)

*/
class EntryManager {
    constructor(DataModel) {
        this.dm = DataModel;
        this.entries = [];
    }
    count() {
        return this.entries.length;
    }

    entryByIndex(index) {
        if (index >= this.count()) {
            return false;
        } else {
            return this.entries[index];
        }
    }

    entryByName(name) {
        for (let i = 0; i < this.count(); i++) {
            if (this.entryByIndex(i).name == name) {
                return this.entryByIndex(i);
            }
        }
        return false;
    }

    indexOf(name) {
        for (let i = 0; i < this.count(); i++) {
            if (this.entryByIndex(i).name == name) {
                return i;
            }
        }
        return false;
    }

    exists(name) {
        for (let i = 0; i < this.count(); i++) {
            if (this.entryByIndex(i).name == name) {
                return true;
            }
        }
        return false;
    }

    deleteEntry(name) {
        var index = this.indexOf(name);
        this.entries.splice(index, 1);
        this.dm.toStorage();
    }
}


export default EntryManager;
