const API_KEY = "8d18fa84bdf2205742d76a8b021616e2";

const COORDS = "coords";

function getWeather (lat, lon) {
    fetch(
        `https://api.openweathermap.org/date/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);

}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForlocation() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}


function loadCoords () {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForlocation();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init () {
    loadCoords();

}

init();