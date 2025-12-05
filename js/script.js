const openBtn = document.getElementById("openAll");
const closeBtn = document.getElementById("closeAll");
const labs = document.querySelectorAll(".lab");

openBtn.addEventListener("click", () => {
    labs.forEach(lab => lab.open = true);
});

closeBtn.addEventListener("click", () => {
    labs.forEach(lab => lab.open = false);
});
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
});