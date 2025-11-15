document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;

// Menu toggle for mobile
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu').querySelector('ul');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
