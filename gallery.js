console.log("gallery.js start");

(function chooseBackground() {
  const useAlt = Math.floor(Math.random() * 2) === 0;
  const bg = useAlt ? "bcg1.png" : "bcg1.png";
  document.body.style.backgroundImage = `url(${bg})`;
})();

let currentImage = 1;
let maxImage = 1;

let currentPost = 1;
let maxPost = 1;

// Zlicz obrazki
async function findMaxImageNumber() {
  let n = 1;
  while (await imageExists(`img${n}.png?v=${Date.now()}`)) {
    n++;
  }
  return n - 1;
}

// Zlicz posty
async function findMaxPostNumber() {
  let n = 1;
  while (await fileExists(`post${n}.txt?v=${Date.now()}`)) {
    n++;
  }
  return n - 1;
}

// Sprawdza istnienie obrazka
async function imageExists(url) {
 console.log("Sprawdzam obraz:", url);
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
 
 
// Sprawdza istnienie tekstu
async function fileExists(url) {
 console.log("Sprawdzam post:", url);
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}


// Ładuje obrazek
function loadImage(n) {
  const imgElement = document.getElementById("mainImage");
  imgElement.src = `img${n}.png?v=${Date.now()}`;
  const counter = document.getElementById("imageCounter");
  counter.textContent = `${currentImage} / ${maxImage}`;
}

// Ładuje post
async function loadPost(n) {
  const res = await fetch(`post${n}.txt?v=${Date.now()}`);
  let text = await res.text();
  text = `<p> ${text} </p>`;
  document.getElementById("postContent").innerHTML = text;
  const counter = document.getElementById("postCounter");
  counter.textContent = `${currentPost} / ${maxPost}`;
}

// Funkcje do zmieniania obrazków
function nextImage() {
  if (currentImage < maxImage) {
    currentImage++;
    loadImage(currentImage);
  }
}

function prevImage() {
 console.log("Kliknięto Poprzedni Obraz:", currentImage);
  if (currentImage > 1) {
    currentImage--;
    loadImage(currentImage);
  }
}

// Funkcje do zmieniania postów
function nextPost() {
  if (currentPost < maxPost) {
    currentPost++;
    loadPost(currentPost);
  }
}

function prevPost() {
  console.log("Kliknięto Poprzedni Post:", currentPost);
  if (currentPost > 1) {
    currentPost--;
    loadPost(currentPost);
  }
}



// Inicjalizacja

window.addEventListener("DOMContentLoaded", async () => {
  
  maxImage = await findMaxImageNumber();
  maxPost = await findMaxPostNumber();
  currentImage = maxImage;
  currentPost = maxPost;
  loadImage(currentImage);
  loadPost(currentPost);
});
window.prevImage = prevImage;
console.log("window.prevImage = prevImage;")
window.nextImage = nextImage;
console.log("window.nextImage = nextImage;")
window.prevPost = prevPost;
console.log("window.prevPost = prevPost;")
window.nextPost = nextPost;
console.log("window.nextPost = nextPost;")
console.log("gallery.js end");
