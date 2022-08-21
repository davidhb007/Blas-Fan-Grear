// Functions added by David @ RelyDev

function setNewActiveTab(target) {
    let contentBodies = document.getElementsByClassName("content-body");
    for (var contentBody of contentBodies) {
        contentBody.classList.remove("show-active");
    }
    for (let tab of tabs) {
        tab.classList.remove("tab-active");
    }
    document.getElementById(target.id).classList.add("tab-active");
    if (target.id == "shop-all-tab") {
        document
            .getElementById("Shop-all-contents")
            .classList.add("show-active");
    } else if (target.id == "All Schools-tab") {
        document
            .getElementById("All Schools-contents")
            .classList.add("show-active");
    } else {
        document
            .getElementById(target.textContent.trim().concat("-contents"))
            .classList.add("show-active");
    }
}

let tabs = document.getElementsByClassName("tab");
for (var tab of tabs) {
    tab.addEventListener("click", function (e) {
        setNewActiveTab(e.currentTarget);
    });
}
