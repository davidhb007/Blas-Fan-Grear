// Functions added by David @ RelyDev

let customHeading = $("#relydev-main-h1");
customHeading.css("background-color", "lightblue");
customHeading.click(() => {
    alert("Welcome to the Development Theme");
});

function setNewActiveTab(target) {
    let contentBodies = document.getElementsByClassName("content-body");
    for (var contentBody of contentBodies) {
        contentBody.classList.remove("show-active");
        console.log(contentBody.id);
    }
    for (let tab of tabs) {
        tab.classList.remove("tab-active");
    }
    document.getElementById(target.id).classList.add("tab-active");
    document
        .getElementById(target.textContent.trim().concat("-contents"))
        .classList.add("show-active");
}

let tabs = document.getElementsByClassName("tab");
for (var tab of tabs) {
    tab.addEventListener("click", function (e) {
        console.log(e.currentTarget);
        setNewActiveTab(e.currentTarget);
    });
}
