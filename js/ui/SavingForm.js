import Form from "./Form.js";
import MathTools from "../extra/MathTools.js";

class SavingForm extends Form {
    constructor(elementId, userInterface) {
        super(elementId, userInterface);
        this.applySavingPlanChangeEventListener();
        this.setCreateMode(); // defaults to create mode
        this.editing = ""; //When in edit mode, update to the name of the entry being edited.
    }


    submit() {
        if (this.validate()) {
            var SavingManager = this.ui.dm.SavingManager;

            //Get form input values
            var name = this.getValueByElementName("name");
            var goal = this.getValueByElementName("goal");
            var formula = this.getValueByElementName("formula");
            var status = this.getValueByElementName("status");
            var frequency = this.getValueByElementName("frequency");
            var stop = this.getValueByElementName("autostop");

            //Convert input values to appropriate types
            var goal = Number(goal);
            var status = (status == "Enabled") ? true : false;
            var stop = (stop == "Yes") ? true : false;

            //For create mode, add new goal
            if (this.mode == "create") {
                var sg = SavingManager.create(name, goal);
            }
            //For edit mode, update name and goal amount
            else if (this.mode == "edit") {
                var sg = SavingManager.byName(this.editing);
                sg.rename(name);
                sg.updateGoal(goal);
            }

            //For both modes, update the saving plan
            var sp = sg.getSavingPlan();

            sp.setFormula(formula);
            sp.setFrequency(frequency);
            sp.setAutostop(stop);

            if (status) {
                sp.enable();
            } else {
                sp.disable();
            }

            //Finally...
            super.submit(); //resets form and closes popup
            this.ui.SavingTable.render(); //update UI to reflect changes
        }
    }

    validate() {
        var SavingManager = this.ui.dm.SavingManager;
        var name = this.getValueByElementName("name");

        if (name == "") {
            this.showMessage("error", "Saving goal must have a name!");
            return false;
        }

        //right side allows for the name to remain unchanged in edit mode
        if (SavingManager.exists(name) && (this.mode != "edit" || this.editing != name)) {
            this.showMessage("error", "A goal with this name already exists.");
            return false;
        }
        return true;
    }

    reset() {
        this.setValueByElementName("name", "");
        this.setValueByElementName("goal", "");
        this.setValueByElementName("formula", "");
        this.setValueByElementName("status", "Disabled");
        this.setValueByElementName("frequency", "Monthly");
        this.setValueByElementName("autostop", "Yes");
        this.toggleSavingPlanFormControls();
        this.setCreateMode();
        super.reset();


    }
    // Enables/Disables Form controls based on Saving Plan status
    toggleSavingPlanFormControls() {
        var disabled = (this.getValueByElementName("status") == "Disabled") ? true : false;
        this.element.querySelector("[name='frequency']").disabled = disabled;
        this.element.querySelector("[name='formula']").disabled = disabled;
        this.element.querySelector("[name='autostop']").disabled = disabled;
    }

    //Call the above whenever the "Status" input changes
    applySavingPlanChangeEventListener(e) {
        var sf = this;
        this.element.querySelector("[name='status']").addEventListener("change", function () {
            sf.toggleSavingPlanFormControls();
        });
    }

    // CREATE/EDIT MODE SETUP METHODS

    setCreateMode() {
        this.mode = "create";
        this.editing = "";
        this.element.getElementsByTagName("h1")[0].innerHTML = "New Saving Goal";
        this.element.getElementsByTagName("button")[0].innerHTML = "Create Saving Goal";
        this.toggleSavingPlanFormControls();
    }

    setEditMode(sgName) {
        //Update THIS
        this.mode = "edit";
        this.editing = sgName;

        //Update HTML text for edit mode context
        this.element.getElementsByTagName("h1")[0].innerHTML = "Edit Saving Goal";
        this.element.getElementsByTagName("button")[0].innerHTML = "Update Saving Goal";

        //Set Saving Goal Properites
        var sg = this.ui.dm.SavingManager.byName(sgName);
        var goal = sg.getGoal();

        var mtparams = {"signPositives" : false, "addThousandSeparator":false,"removeRedundantDecimal":true};
        goal = MathTools.numberToCurrency(goal,mtparams);

        this.setValueByElementName("name", sgName);
        this.setValueByElementName("goal", goal);

        //Set Saving Plan Properties
        var sp = sg.getSavingPlan();
        var status = (sp.isEnabled()) ? "Enabled" : "Disabled";
        var formula = sp.getFormula();
        var frequency = sp.getFrequency();
        var autostop = (sp.getAutostop()) ? "Yes" : "No";

        this.setValueByElementName("status",status);
        this.setValueByElementName("formula", formula);
        this.setValueByElementName("frequency", frequency);
        this.setValueByElementName("autostop", autostop);

        //update form control states
        this.toggleSavingPlanFormControls();

    }
}


export default SavingForm;
