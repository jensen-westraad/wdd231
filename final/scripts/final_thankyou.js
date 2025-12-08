document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;




const params = new URLSearchParams(window.location.search);

let output = "";
params.forEach((value, key) => {
    output += `<p><strong>${key}:</strong> ${value}</p>`;
});

document.getElementById("output").innerHTML = output;