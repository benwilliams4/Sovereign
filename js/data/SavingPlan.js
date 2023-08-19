class SavingPlan {
    constructor(SavingGoal) {
        this.SavingGoal = SavingGoal; //SavingGoal Instance
        this.dm = SavingGoal.Manager.dm; //Current DataModel
        this.SavingPlan = SavingGoal.entry.SavingPlan; // Raw SavingPlan Data Object
    }

    enable() {
        this.SavingPlan.enabled = true;
        this.dm.toStorage();
    }

    disable() {
        this.SavingPlan.enabled = false;
        this.dm.toStorage();
    }

    isEnabled() {
        return this.SavingPlan.enabled;

    }

    getFrequency() {
        return this.SavingPlan.frequency;
    }

    setFrequency(frequency) {
        this.SavingPlan.frequency = frequency;
        this.dm.toStorage();
    }

    getFormula() {
        return this.SavingPlan.formula;
    }

    setFormula(formula) {
        this.SavingPlan.formula = formula;
        this.dm.toStorage();
    }

    getAutostop() {
        return this.SavingPlan.autostop;
    }

    setAutostop(bool) {
        this.SavingPlan.autostop = bool;
        this.dm.toStorage();
    }

    apply() {
        var newAmt = this.SavingGoal.getBalance() + this.evaluateFormula();
        newAmt = Math.floor(newAmt);
        this.SavingGoal.updateBalance(newAmt);
    }

    evaluateFormula() {

        //Future: If rules become more complex use a FormulaEvaluator Class to do the processing

        var formula = this.getFormula();
        var balance = this.SavingGoal.getBalance();
        var goal = this.SavingGoal.getGoal();
        var unallocated = this.dm.SavingManager.unallocated();

        //define Formula Variables

        var variables = {};
        variables["balance"] = balance;
        variables["current"] = balance; // can use %balance and %current interchangably
        variables["goal"] = goal;
        variables["remaining"] = goal - balance;
        variables["unallocated"] = unallocated;

        //replace %variable in formula with actual amounts
        for (const v in variables) {
            formula = formula.replace("%" + v, variables[v]);
        }
        //evaluate with MathJS (math.js must be imported in main html file)
        var increment = math.evaluate(formula);

        //If autostop is enabled, only increment by what is necessary to reach goal
        if (balance + increment > goal && this.getAutostop() == true) {
            increment = goal - balance;
        }

        /*/Increment cannot be more than available funds
        if (increment > unallocated) {
            increment = unallocated;
        }//*/

        //Remove decimals
        increment = Math.floor(increment);

        return increment;

    }




}

export default SavingPlan;
