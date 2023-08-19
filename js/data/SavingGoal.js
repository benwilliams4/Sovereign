import Entry from "./Entry.js";
import SavingPlan from "./SavingPlan.js";

class SavingGoal extends Entry {
    constructor(SavingManager, entryObject) {
        super(SavingManager, entryObject);
    }

    getGoal() {
        return this.entry.goal;
    }
    updateGoal(value) {
        this.entry.goal = value;
        this.Manager.dm.toStorage();
    }

    getSavingPlan() {
        return new SavingPlan(this);
    }

}

export default SavingGoal;
