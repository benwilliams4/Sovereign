class MenuBar {
    constructor(elementId, userInterface) {
        this.element = document.getElementById(elementId);
        this.ui = userInterface;
    }

    render() {
        this.element.innerHTML = "";
        var PageManager = this.ui.PageManager;
        var pages = PageManager.getNames();
        for (let i = 0; i < pages.length; i++) {
            this.addMenuItem(pages[i]);
        }
        PageManager.hideAll();
        PageManager.showDefault();
    }

    addMenuItem(text) {
        var item = document.createElement("div");
        item.innerHTML = text;
        var mb = this;
        item.addEventListener("click", function () {
            var text = this.innerHTML;
            mb.menuItemOnClickEvent(text);
        });

        this.element.appendChild(item);
    }

    menuItemOnClickEvent(itemText) {
        var ui = this.ui;
        ui.renderAll(); //Necessary to ensure data is up to date
        ui.PageManager.hideAll();
        ui.PageManager.show(itemText);
       this.setActiveItem(itemText);
    }

    setActiveItem(text) {
        var items = this.element.children;

        for (let i = 0; i < items.length; i++) {
            var el = items[i];
            el.classList.remove("active");
            if (el.innerHTML == text) {
                el.classList.add("active");
            }
        }
    }
}
export default MenuBar;
