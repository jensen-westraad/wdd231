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



fetch("data/featured_card.json")
    .then(res => res.json())
    .then(data => {

        const imgPath = data.cards[0].image;

        document.getElementById("featuredCard").src = imgPath;
    })
    .catch(err => {
        console.error("Error loading featured card:", err);
    });
