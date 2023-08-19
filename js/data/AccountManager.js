import EntryManager from "./EntryManager.js";
import Account from "./Account.js";

class AccountManager extends EntryManager {
    constructor(DataModel) {
        super(DataModel);
    }

    //Create a new account
    create(name, type = "Asset") {
        var account = {};
        account.name = name;
        account.balance = 0;
        account.type = type;
        this.entries.push(account);
        this.sort();
        this.dm.toStorage();
    }

    //Default sorting method for accounts (Assets A-Z then Liabilities A-Z)
    sort() {
        this.entries.sort(function (a, b) {
            if (a.type == b.type) {
                return (a.name > b.name) ? 1 : -1;
            } else {
                return (a.type == "Liability") ? 1 : -1;
            }
        });
    }

    //Gets the total value of accounts (Assets less Liabilities)
    totalBalance() {
        var amt = 0;
        for (let i = 0; i < this.count(); i++) {
            var acc = this.byIndex(i);
            var accBalance = acc.getBalance();
            amt = (acc.getType() == "Liability") ? amt - accBalance : amt + accBalance;
        }
        return amt;
    }

    //Returns an Account object by account name
    byName(name){
        var entry = this.entryByName(name);
        return new Account(this, entry);
    }

    //Returns an Account object by its index in 'this.entries'
    byIndex(index){
        var entry = this.entryByIndex(index);
        return new Account(this, entry);
    }
}
export default AccountManager;
