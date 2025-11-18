document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;


const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu').querySelector('ul');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


const apiKey = "1a1e57dfeb8ae7b6b882914d97ad0ef1";
const lat = "-33.9242";
const lon = "18.4116";

async function loadWeather() {
    try {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const weatherRes = await fetch(weatherURL);
        const weather = await weatherRes.json();

        document.getElementById("current-temp").textContent =
            `${Math.round(weather.main.temp)}°C`;

        document.getElementById("current-desc").textContent =
            weather.weather[0].description;

        const iconCode = weather.weather[0].icon;
        document.getElementById("weather-icon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const forecastRes = await fetch(forecastURL);
        const forecast = await forecastRes.json();

        const daily = forecast.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0, 3);

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        daily.forEach((day, i) => {
            const date = new Date(day.dt_txt);
            document.getElementById(`day${i + 1}`).innerHTML =
                `<strong>${dayNames[date.getDay()]}:</strong> ${Math.round(day.main.temp)}°C`;
        });

    } catch (err) {
        console.error("Weather API Error:", err);
    }
}

loadWeather();


async function loadSpotlights() {
    try {
        const res = await fetch("/chamber/data/members.json");
        const data = await res.json();

        const levelName = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        const eligible = data.companies.filter(c =>
            c.membership === 2 || c.membership === 3
        );

        const count = Math.random() < 0.5 ? 2 : 3;
        const selected = [];

        while (selected.length < count) {
            const pick = eligible[Math.floor(Math.random() * eligible.length)];
            if (!selected.includes(pick)) selected.push(pick);
        }

        const container = document.querySelector(".spotlight-grid");
        container.innerHTML = "";

        selected.forEach(company => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img class="spot-logo" src="${company.image}" alt="${company.name} logo">
                <h3>${company.name}</h3>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <p><strong>Membership Level:</strong> ${levelName[company.membership]}</p>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Spotlights Error:", err);
    }
}

loadSpotlights();


