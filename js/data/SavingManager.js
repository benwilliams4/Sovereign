import EntryManager from "./EntryManager.js";
import SavingGoal from "./SavingGoal.js";
class SavingManager extends EntryManager {

    constructor(DataModel) {
        super(DataModel);
    }

    //Create a Saving Goal
    create(name, GoalAmount) {
        var s = {};
        s.name = name;
        s.goal = GoalAmount;
        s.balance = 0;
        s.SavingPlan = {};
        this.entries.push(s);
        this.sort();
        this.dm.toStorage();
        return this.byName(name);
    }

    //Default method for sorting Saving Goals (name A-Z)
    sort() {
        this.entries.sort(function (a, b) {
            return (a.name > b.name) ? 1 : -1;
        });
    }

    // Get total balance of all saving goals
    totalBalance() {
        var amt = 0;
        for (let i = 0; i < this.count(); i++) {
            var entry = this.entryByIndex(i);
            var entryBalance = entry.balance;
            amt = amt + entryBalance;
        }
        return amt;
    }

    // Get total unallocated funds
    unallocated() {
        var AccountsTotal = this.dm.AccountManager.totalBalance();
        var SavingsTotal = this.totalBalance();
        var unallocated = AccountsTotal - SavingsTotal;
        return unallocated;
    }

    // Get SavingGoal object by its name
    byName(name) {
        var entry = this.entryByName(name);
        return new SavingGoal(this, entry);
    }

    // Get SavingGoal object by its index in this.entries
    byIndex(index) {
        var entry = this.entryByIndex(index);
        return new SavingGoal(this, entry);
    }

    //Reduces all accounts by the given percentage (not yet implemented by any UI function)
    shrinkAll(fraction) {
        for (var i = 0; i < this.count(); i++) {
            var sg = this.byIndex(i);
            sg.updateBalance(Math.floor(sg.getBalance() - (sg.getBalance() * fraction)));
        }
    }

    //Updates balances for all goals according to their saving plan given the specified frequency
    applySavingPlans(frequency) {
        for (let i = 0; i < this.count(); i++) {
            var sg = this.byIndex(i);
            var sp = sg.getSavingPlan();
            if (sp.getFrequency() == frequency && sp.isEnabled() == true) {
                sp.apply();
            }
        }
    }
}

export default SavingManager;
