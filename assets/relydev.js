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

// The following takes care of the sroll to top functionality
let relydevBackToTopBtn = document.getElementById("relydev-back-top-top-btn");
if (relydevBackToTopBtn) {
    relydevBackToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.onscroll = function () {
        topBtnToggle();
    };

    function topBtnToggle() {
        if (
            document.body.scrollTop > 150 ||
            document.documentElement.scrollTop > 600
        ) {
            relydevBackToTopBtn.style.display = "block";
        } else {
            relydevBackToTopBtn.style.display = "none";
        }
    }
}

//RelyDev method to make Blog Categories Buttons Scrollable with mouse and touch
const leftArrow = document.querySelector("#relydev-left-arrow");
const rightArrow = document.querySelector("#relydev-right-arrow");

function makeScrollableButtons(x) {
    const slider = document.querySelector(".tab-selector");
    if (!slider) {
        return;
    }
    if (x.matches) {
        const itsLinks = document.querySelectorAll(".tab");
        let isDown = false;
        let isLinkDisabled = false;
        let startX;
        let scrollLeft;

        function toggleLinks() {
            if (!isLinkDisabled) {
                itsLinks.forEach((link) => {
                    link.classList.add("disabled");
                    isLinkDisabled = true;
                });
            } else {
                itsLinks.forEach((link) => {
                    link.classList.remove("disabled");
                    isLinkDisabled = false;
                });
            }
        }

        slider.addEventListener("mousedown", (e) => {
            //Mouse click down event
            isDown = true;
            slider.classList.add("active");
            sliderInnerShadow();
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener("touchstart", (e) => {
            //Finger touch event
            isDown = true;
            slider.classList.add("active");
            sliderInnerShadow();
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener("mouseleave", (e) => {
            //Mouse leaves element area event
            isDown = false;
            slider.classList.remove("active");
            sliderInnerShadow();
            toggleLinks();
        });
        slider.addEventListener("touchcancel", (e) => {
            //Finger leaves element area event
            isDown = false;
            slider.classList.remove("active");
            sliderInnerShadow();
            toggleLinks();
        });
        slider.addEventListener("mouseup", (e) => {
            //Mouse click lifted
            isDown = false;
            slider.classList.remove("active");
            sliderInnerShadow();
            toggleLinks();
        });
        slider.addEventListener("touchend", (e) => {
            //Finger lifted
            isDown = false;
            slider.classList.remove("active");
            sliderInnerShadow();
            toggleLinks();
        });
        slider.addEventListener("mousemove", (e) => {
            //Mouse move event
            if (!isDown) return;
            toggleLinks();
            e.preventDefault();
            sliderInnerShadow();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2;
            slider.scrollLeft = scrollLeft - walk;
        });
        slider.addEventListener("touchmove", (e) => {
            //Finger move event
            if (!isDown) return;
            toggleLinks();
            e.preventDefault();
            sliderInnerShadow();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        });
        slider.addEventListener("scroll", (e) => {
            sliderInnerShadow();
        });
    }
}

//Functionality for tab slider Arrows
if (leftArrow) {
    const slider = document.querySelector(".tab-selector");
    leftArrow.addEventListener("click", (e) => {
        // Left Arrow scroll left on click
        let scrollDistance = slider.firstChild.clientWidth * 3;
        slider.scrollBy({
            top: 0,
            left: -scrollDistance,
            behavior: "smooth",
        });
    });
}

if (rightArrow) {
    const slider = document.querySelector(".tab-selector");
    rightArrow.addEventListener("click", (e) => {
        // Right Arrow scroll right on click
        let scrollDistance = slider.firstChild.clientWidth * 3;
        slider.scrollBy({
            top: 0,
            left: scrollDistance,
            behavior: "smooth",
        });
    });
}
function sliderInnerShadow() {
    const tabSelector = document.querySelector(".tab-selector");
    if (!tabSelector || !leftArrow || !rightArrow) {
        return;
    }
    const firstTab = document.querySelector(".tab-selector").firstElementChild;
    const lastTab = document.querySelector(".tab-selector").lastElementChild;
    let initialPosition =
        Math.floor(tabSelector.getBoundingClientRect().left) <=
        Math.floor(firstTab.getBoundingClientRect().left);
    let maxScroll =
        Math.floor(tabSelector.getBoundingClientRect().right) >=
        Math.floor(lastTab.getBoundingClientRect().right);

    if (!initialPosition && !maxScroll) {
        tabSelector.classList.remove("slider-inner-shadow-left");
        tabSelector.classList.remove("slider-inner-shadow-right");
        tabSelector.classList.add("slider-inner-shadow-both");
        leftArrow.classList.add("relydev-tab-arrow-show");
        rightArrow.classList.add("relydev-tab-arrow-show");
    } else if (initialPosition && !maxScroll) {
        tabSelector.classList.remove("slider-inner-shadow-left");
        tabSelector.classList.remove("slider-inner-shadow-both");
        tabSelector.classList.add("slider-inner-shadow-right");
        leftArrow.classList.remove("relydev-tab-arrow-show");
        rightArrow.classList.add("relydev-tab-arrow-show");
    } else if (maxScroll && !initialPosition) {
        tabSelector.classList.remove("slider-inner-shadow-right");
        tabSelector.classList.remove("slider-inner-shadow-both");
        tabSelector.classList.add("slider-inner-shadow-left");
        leftArrow.classList.add("relydev-tab-arrow-show");
        rightArrow.classList.remove("relydev-tab-arrow-show");
    } else if (maxScroll && initialPosition) {
        tabSelector.classList.remove("slider-inner-shadow-left");
        tabSelector.classList.remove("slider-inner-shadow-right");
        tabSelector.classList.remove("slider-inner-shadow-both");
        leftArrow.classList.remove("relydev-tab-arrow-show");
        rightArrow.classList.remove("relydev-tab-arrow-show");
    }
}

let w = window.matchMedia("(min-width: 0px)");
makeScrollableButtons(w);
sliderInnerShadow();
w.addEventListener("change", makeScrollableButtons);

function shareLinkIconSizer() {
    let shareLinkIcons = document.querySelectorAll(".shareLink-icon");
    if (!shareLinkIcons) {
        return;
    }
    shareLinkIcons.forEach((icon) => {
        let parentElSize = window
            .getComputedStyle(icon.parentElement)
            .getPropertyValue("font-size");
        icon.style.verticalAlign = "top";
        icon.firstElementChild.style.height = parentElSize;
        icon.firstElementChild.style.maxHeight = "3rem";
    });
}

function copyLink() {
    let shareLinkIcons = document.querySelectorAll(".shareLink-icon");
    if (!shareLinkIcons) {
        return;
    }
    shareLinkIcons.forEach((icon) => {
        $(icon).click(() => {
            let tooltip = $(icon).find("span");
            let shareUrl = icon.dataset.url;
            navigator.clipboard.writeText(shareUrl);
            tooltip.css({
                width: "180px",
                "margin-left": "-90px",
            });
            tooltip.text("Copied to Clipboard");

            icon.addEventListener("mouseleave", () => {
                tooltip.css({
                    width: "100px",
                    "margin-left": "-50px",
                });
                tooltip.text("Copy Link");
            });
        });
    });
}

var css = "background-color: purple; font-size: 16px"; //For debugging -> delete later

function displaySocialButtons() {
    let isOpen = false;
    $(this).toggleClass("open");
    let socialList = $(".social-list");
    socialList.toggleClass("hidden");

    $(
        "#eapps-social-share-buttons-1 .eapps-social-share-buttons-item-more"
    ).click(() => {
        let allSocials = $("#eapps-social-share-buttons-1").detach();
        allSocials.appendTo("body");
        isOpen = true;
    });
    $("#eapps-social-share-buttons-1 .eapps-social-share-buttons-item")
        .not(".eapps-social-share-buttons-item-more")
        .click(() => {
            let allSocials = $("#eapps-social-share-buttons-1").detach();
            allSocials.appendTo($(socialList));
            socialList.addClass("hidden");
            $(this).removeClass("open");
        });
    $(
        "#eapps-social-share-buttons-1 .eapps-social-share-buttons-all-items"
    ).click(() => {
        let allSocials = $("#eapps-social-share-buttons-1").detach();
        allSocials.appendTo($(socialList));
        socialList.addClass("hidden");
        $(this).removeClass("open");
    });
    $(
        "#eapps-social-share-buttons-1 .eapps-social-share-buttons-all-controls"
    ).click(() => {
        let allSocials = $("#eapps-social-share-buttons-1").detach();
        allSocials.appendTo($(socialList));
        socialList.addClass("hidden");
        $(this).removeClass("open");
    });
}

$(".relydev-share-button").click(displaySocialButtons);

document.addEventListener("DOMContentLoaded", shareLinkIconSizer);
document.addEventListener("DOMContentLoaded", copyLink);
window.addEventListener("resize", shareLinkIconSizer);
