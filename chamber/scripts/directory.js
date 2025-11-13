
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;

// Menu toggle for mobile
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu').querySelector('ul');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Grid/List view toggle
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const membersContainer = document.getElementById("members");

gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// Fetch members JSON asynchronously
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        renderMembers(data.companies);
    } catch (error) {
        console.error('Error fetching members:', error);
        membersContainer.innerHTML = '<p>Failed to load members. Please try again later.</p>';
    }
}

// Render member cards
function renderMembers(companies) {
    membersContainer.innerHTML = '';

    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${company.image}" alt="${company.name}">
            <div class="member-info">
                <h2>${company.name}</h2>
                <p>${company.address}</p>
                <p>${company.phone}</p>
                <p>Membership Level: ${company.membership}</p>
                <p>${company.description}</p>
                <a href="${company.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
        `;
        membersContainer.appendChild(card);
    });
}

// Call the async function
getMembers();



