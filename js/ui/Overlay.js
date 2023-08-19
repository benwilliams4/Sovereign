class Overlay {
    constructor() {
        this.element = document.getElementById("overlay");
    }
    show() {
        this.element.classList.remove("hidden");
    }
    hide() {
        this.element.classList.add("hidden");
    }
}

export default Overlay;
