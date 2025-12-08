document.addEventListener("DOMContentLoaded", () => {


  const yearEl = document.getElementById('year');
  const lastModEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) lastModEl.textContent = 'Last Modified: ' + document.lastModified;

  const menuButton = document.getElementById('menuButton');
  const navMenu = document.getElementById('navMenu');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toLocaleString();
  }

  let membershipData = {};

  fetch('data/membership.json')
    .then(response => response.json())
    .then(data => {
      membershipData = data;
      initModals();
    })
    .catch(err => console.error('Failed to load membership data:', err));

  function initModals() {
    const cards = document.querySelectorAll(".membership-card");
    const modals = document.querySelectorAll(".modal");

    // Open modal on card click
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const modalId = card.dataset.modal;
        const modal = document.getElementById(modalId);
        const data = membershipData[modalId];

        if (modal && data) {
          modal.querySelector(".modal-title").textContent = data.title;
          const img = modal.querySelector(".modal-image");
          img.src = data.image;
          img.alt = data.alt;
          modal.querySelector(".modal-description").textContent = data.description;

          modal.style.display = "flex";
        }
      });
    });

    // Close modal on close button
    modals.forEach(modal => {
      const closeBtn = modal.querySelector(".close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }
    });

    // Close modal when clicking outside content
    window.addEventListener("click", e => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });
  }

});
