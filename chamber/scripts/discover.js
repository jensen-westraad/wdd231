// Footer updates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;

// Visitor message logic
const visitMessage = document.getElementById("visitMessage");
let lastVisit = Number(localStorage.getItem("last-visit"));
let currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
    visitMessage.textContent = days < 1
        ? "Back so soon! Awesome!"
        : `You last visited ${days} day(s) ago.`;
}

localStorage.setItem("last-visit", currentVisit);

// Load JSON
fetch("data/discover.json")
    .then(response => response.json())
    .then(attractions => buildCards(attractions))
    .catch(error => console.error("Error loading JSON:", error));


// Build attraction cards
function buildCards(attractions) {
    const grid = document.getElementById("discoverGrid");

    attractions.forEach(attraction => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" alt="${attraction.name}"
                     loading="lazy" width="300" height="200">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more">Learn More</button>
        `;

        grid.appendChild(card);

        // EVENT LISTENER FOR MODAL
        const button = card.querySelector(".learn-more");
        button.addEventListener("click", () => {
            openModal(attraction);
        });
    });
}


// OPEN MODAL
function openModal(attraction) {
    document.getElementById("modalTitle").textContent = attraction.name;
    document.getElementById("modalImage").src = attraction.image;
    document.getElementById("modalDescription").textContent = attraction.learn;

    document.getElementById("modal").style.display = "flex";
}


// CLOSE MODAL
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Close modal if background is clicked
window.addEventListener("click", (event) => {
    if (event.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
});


