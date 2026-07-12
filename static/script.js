const button = document.getElementById("learnButton");
const joinButton = document.getElementById("joinButton");

const goHome = document.getElementById("goHome");
const goAbout = document.getElementById("goAbout");
const goShowcase = document.getElementById("goShowcase");
const goSocsGuide = document.getElementById("goSocsGuide");


function fadeNavigate(url) {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = url;
    }, 500);
}


if (learnButton) {
    learnButton.addEventListener("click", () => {
        fadeNavigate("/about");
    });
}


if (joinButton) {
    joinButton.addEventListener("click", () => {
        fadeNavigate("/socsGuide");
    });
}


if (goHome) {
    goHome.addEventListener("click", () => {
        fadeNavigate("/");
    });
}


if (goAbout) {
    goAbout.addEventListener("click", () => {
        fadeNavigate("/about");
    });
}


if (goShowcase) {
    goShowcase.addEventListener("click", () => {
        fadeNavigate("/showcase");
    });
}


if (goSocsGuide) {
    goSocsGuide.addEventListener("click", () => {
        fadeNavigate("/socsGuide");
    });
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const url = link.href;

        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    });
});