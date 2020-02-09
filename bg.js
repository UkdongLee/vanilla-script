const body = document.querySelector("body");

const IMG_NUMBER = 3; // number of images

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`
    image.classList.add("bgImage");
    body.appendChild(image);

}

function genRandom(){ // produce random numbers and return random a number
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber); // for show on the web

}

init();