class Popup {
    constructor(elementId, userInterface) {
        this.ui = userInterface;
        this.element = document.getElementById(elementId);
        this.element.classList.add("hidden", "popup");
    }

    show() {
        this.element.classList.remove("hidden");
        this.element.querySelector("input,select").focus(); //focus on first form element
        this.ui.Overlay.show();
    }

    hide() {
        this.element.classList.add("hidden");
        this.ui.Overlay.hide();
    }

    setOpenButton(elementId) {
        var openButton = document.getElementById(elementId);
        var popup = this;
        openButton.addEventListener("click", function () {
            popup.show();
        })
    }

    setDismissButton(elementId) {
        var openButton = document.getElementById(elementId);
        var popup = this;
        openButton.addEventListener("click", function () {
            popup.hide();
        })
    }


}

export default Popup;
