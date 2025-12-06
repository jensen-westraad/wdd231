// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;

// NAVIGATION
const navBtns = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        navBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        let page = btn.dataset.page;
        pages.forEach(p => p.classList.remove("active"));
        document.getElementById(page + "Page").classList.add("active");
    });
});

// --------------- CARD SYSTEM -----------------
let allSets = {};
let currentSet = "";
let currentCards = [];

const grid = document.getElementById("cardGrid");
const spinner = document.getElementById("loadingSpinner");

// MODAL ELEMENTS
const modal = document.getElementById("cardModal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImage");
const modalDesc = document.getElementById("modalDescription");
document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

window.onclick = e => {
    if (e.target === modal) modal.classList.add("hidden");
};

// FETCH SETS
async function loadSets() {
    const res = await fetch("data/sets.json");
    allSets = await res.json();

    const selector = document.getElementById("setSelector");

    Object.keys(allSets).forEach(setName => {
        let opt = document.createElement("option");
        opt.value = setName;
        opt.textContent = setName;
        selector.appendChild(opt);
    });

    selector.addEventListener("change", e => {
        currentSet = e.target.value;
        loadCards(currentSet);
    });

    // load first set by default
    currentSet = Object.keys(allSets)[0];
    selector.value = currentSet;
    loadCards(currentSet);
}

async function loadCards(setName) {
    spinner.classList.remove("hidden");
    grid.innerHTML = "";

    // simulate loading delay
    await new Promise(res => setTimeout(res, 300));

    currentCards = allSets[setName];

    displayCards(currentCards);
    spinner.classList.add("hidden");
}

function displayCards(cards) {
    grid.innerHTML = "";

    cards.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <h3>${card.name}</h3>
            <img src="${card.image}" alt="">
        `;
        div.onclick = () => openModal(card);
        grid.appendChild(div);
    });
}

// Load cards
async function loadCards() {
    try {
        const response = await fetch("data/sets.json");
        const data = await response.json();

        const container = document.getElementById("cardGrid");
        container.innerHTML = "";

        data.cards.forEach(card => {
            const div = document.createElement("div");
            div.classList.add("card");

            div.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
                <h3>${card.name}</h3>
                <p>${card.description}</p>
                <p>${card.graded}</p>
            `;

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading cards:", error);
    }
}

loadCards();


function openModal(card) {
    modalTitle.textContent = card.name;
    modalImg.src = card.image;
    modalDesc.textContent = card.description || "No description available.";
    modal.classList.remove("hidden");
}


// INIT
loadSets();
