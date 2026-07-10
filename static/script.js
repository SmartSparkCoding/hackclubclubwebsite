const button = document.getElementById("learnButton");
const joinButton = document.getElementById("joinButton");

button.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
});

joinButton.addEventListener("click", () => {
    document.getElementById("join").scrollIntoView({
        behavior: "smooth"
    });
});