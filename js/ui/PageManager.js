class PageManager {
    constructor(userInterface) {
        this.ui = userInterface;
    }

    // Retrieves names from all html elements with ID = page-*
    getNames() {
        var pages = document.querySelectorAll("[id|='page']");
        var pageNames = [];
        for (let i = 0; i < pages.length; i++) {
            var id = pages[i].getAttribute("id"); // get ID of element
            var name = id.substring(id.indexOf('-') + 1); // get the 'name' part of ID
            var name = name.charAt(0).toUpperCase() + name.substring(1); //capitalise first letter
            pageNames.push(name);
        }
        return pageNames;
    }

    hideAll() {
        var pages = document.querySelectorAll("[id|='page']");
        for (let i = 0; i < pages.length; i++) {
            pages[i].classList.add("hidden");
        }
    }

    show(name) {
        window.location.hash = '#' + name.toLocaleLowerCase();
        var openPage = "page-" + name.toLowerCase();
        document.getElementById(openPage).classList.remove("hidden");
    }

    //Shows the page specified by the url hash if specified (e.g. #accounts) otherwise the first page is shown
    showDefault() {
        var hash = window.location.hash;
        var pages = this.getNames();
        var show = pages[0];
        if (window.location.hash) {
            var name = hash.substring(1);
            name = name.charAt(0).toUpperCase() + name.substring(1);
            show = (pages.includes(name)) ? name : show;
        }
        this.hideAll();
        this.show(show);
        this.ui.MenuBar.setActiveItem(show);
    }
}

export default PageManager;
