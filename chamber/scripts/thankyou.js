document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;

// Menu toggle for mobile
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu').querySelector('ul');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});



// Extract query string params
const params = new URLSearchParams(window.location.search);

let output = "";
params.forEach((value, key) => {
    output += `<p><strong>${key}:</strong> ${value}</p>`;
});

document.getElementById("output").innerHTML = output;