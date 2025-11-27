document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;

// Menu toggle for mobile
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu').querySelector('ul');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// SET TIMESTAMP ON PAGE LOAD
document.getElementById("timestamp").value =
    new Date().toLocaleString();

// MODAL HANDLING
document.querySelectorAll(".membership-card .more-info").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const card = e.target.closest(".membership-card");
        const modalId = card.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "flex";
    });
});

// CLOSE BUTTONS
document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", function() {
        this.closest(".modal").style.display = "none";
    });
});

// CLICK OUTSIDE MODAL TO CLOSE
window.onclick = function(e) {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
};