class Form {
    constructor(elementId, UserInterface) {
        this.element = document.getElementById(elementId);
        this.ui = UserInterface;
        this.attachSubmitButton();
        this.attachResetButton();
        this.popup = false;
    }

    /* If displaying the form inside a popup,
    pass the Popup object here to allow the
    submit and reset buttons to hide it.
    */
    displayAsPopup(popup) {
        this.popup = popup;
    }

    /*Define submit logic in submit method of
    child class, then call this method using super.submit();
    */
    submit() {
        this.reset();
    }

    /*Define reset logic in submit method of
    child class, then call this method using super.reset();
    */
    reset() {
        if (this.popup) {
            this.popup.hide();
        }
        this.clearMessage();
    }

    // BUTTON ATTACHMENT METHODS

    attachSubmitButton() {
        var btn = this.element.getElementsByTagName("button")[0];
        var form = this;
        btn.addEventListener("click", function () {
            form.submit();
        });
    }

    attachResetButton() {
        var btn = this.element.getElementsByTagName("button")[1];
        var form = this;
        btn.addEventListener("click", function () {
            form.reset();
        });
    }

    // MESSAGE METHODS

    //Use to show validation warnings etc.
    showMessage(className, message = "") {
        var el = this.element.getElementsByClassName("message")[0];
        el.innerHTML = message;
        el.className = "message " + className;
    }

    clearMessage() {
        this.showMessage("hidden", "");
    }

    // FORM INPUT GETTER/SETTER METHODS

    getValueByElementName(name) {
        return this.element.querySelector("[name='" + name + "']").value;
    }

    setValueByElementName(name, value) {
        this.element.querySelector("[name='" + name + "']").value = value;
    }

}
export default Form;
