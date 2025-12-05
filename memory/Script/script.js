const input = document.getElementById("testing");
const button = document.querySelector(".playButton");

function validateInput() {
    if (input.value.trim().length > 0) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const name = input.value.trim();
    localStorage.setItem("playerName", name);
    window.location = "./pages/game.html";
}

input.addEventListener("input", validateInput);
button.addEventListener("click", handleSubmit);
