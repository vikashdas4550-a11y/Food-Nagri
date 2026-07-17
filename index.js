document.addEventListener("DOMContentLoaded", function () {

    const citySelect = document.getElementById("citySelect");

    citySelect.addEventListener("change", function () {

        if (this.value !== "") {
            window.location.href = this.value;
        }

    });

});
// dark mode
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML="☀️";
        localStorage.setItem("theme","dark");

    }else{

        themeBtn.innerHTML="🌙";
        localStorage.setItem("theme","light");

    }

});

if(localStorage.getItem("theme")=="dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML="☀️";

}
// city auto select//

document.getElementById("citySelector").addEventListener("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        document.getElementById("cityName").innerText = "Detecting...";

        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.state_district ||
                "Unknown";

            document.getElementById("cityName").innerText = city;
        })
        .catch(() => {
            document.getElementById("cityName").innerText = "Location not found";
        });
}

function error() {
    alert("Location permission denied.");
    document.getElementById("cityName").innerText = "Sitamarhi";
}


// city select ke liye hai//
const pages = {
    "Sitamarhi": "sitamarhi.html",
    "Siwan": "siwan.html",
    "Patna": "patna.html",
    "Muzaffarpur": "muzaffarpur.html",
    "Darbhanga": "darbhanga.html",
    "Gaya": "gaya.html",
    "Hajipur": "hajipur.html",
    "Motihari": "motihari.html",
    "Chapra": "chapra.html",
    "Bettiah": "bettiah.html"
};

if (pages[city]) {
    setTimeout(() => {
        window.location.href = pages[city];
    }, 1000);
}