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

//RelyDev method to make Blog Categories Buttons Scrollable with mouse
function makeScrollableButtons(x) {
    if (x.matches) {
        const slider = document.querySelector(".tab-selector");
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
            const walk = (x - startX) * 1.2;
            slider.scrollLeft = scrollLeft - walk;
        });
        slider.addEventListener("scroll", (e) => {
            sliderInnerShadow();
        });
    }
}

function sliderInnerShadow() {
    const tabSelector = document.querySelector(".tab-selector");
    const firstTab = document.querySelector(".tab-selector").firstElementChild;
    const lastTab = document.querySelector(".tab-selector").lastElementChild;

    let initialPosition =
        tabSelector.getBoundingClientRect().left <=
        firstTab.getBoundingClientRect().left;
    let maxScroll =
        tabSelector.getBoundingClientRect().right >=
        lastTab.getBoundingClientRect().right;

    if (!initialPosition && !maxScroll) {
        tabSelector.classList.remove("slider-inner-shadow-left");
        tabSelector.classList.remove("slider-inner-shadow-right");
        tabSelector.classList.add("slider-inner-shadow-both");
    } else if (initialPosition && !maxScroll) {
        tabSelector.classList.remove("slider-inner-shadow-left");
        tabSelector.classList.remove("slider-inner-shadow-both");
        tabSelector.classList.add("slider-inner-shadow-right");
    } else if (maxScroll && !initialPosition) {
        tabSelector.classList.remove("slider-inner-shadow-right");
        tabSelector.classList.remove("slider-inner-shadow-both");
        tabSelector.classList.add("slider-inner-shadow-left");
    }
}

let w = window.matchMedia("(min-width: 0px)");
makeScrollableButtons(w);
sliderInnerShadow();
w.addEventListener("change", makeScrollableButtons);
