console.log("gallery.js start");


let currentImage = 1;
let maxImage = 1;

let currentPost = 1;
let maxPost = 1;

// Zlicz obrazki
async function findMaxImageNumber() {
  let n = 1;
  while (await imageExists(`img${n}.png?v=${getCacheBuster()}`)) {
    n++;
  }
  return n - 1;
}

// Zlicz posty
async function findMaxPostNumber() {
  let n = 1;
  while (await fileExists(`post${n}.txt?v=${getCacheBuster()}`)) {
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
  imgElement.src = `img${n}.png?v=${getCacheBuster()}`;
  const counter = document.getElementById("imageCounter");
  counter.textContent = `${currentImage} / ${maxImage}`;
}

// Ładuje post
async function loadPost(n) {
  const res = await fetch(`post${n}.txt?v=${getCacheBuster()}`);
  let text = await res.text();

  document.getElementById("postContent").innerHTML = `<p>${text}</p>`;

  
  decodeBase64Elements();

  const counter = document.getElementById("postCounter");
  counter.textContent = `${currentPost} / ${maxPost}`;
}

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
	const previmgurl = `img${currentImage - 1}.png?v=${getCacheBuster()}`;
    fetch(previmgurl, { method: 'GET', cache: 'force-cache' })
  }
}

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
	const prevposturl = `post${currentPost - 1}.txt?v=${getCacheBuster()}`;
    fetch(prevposturl, { method: 'GET', cache: 'force-cache' })
  }
}

function decodeBase64Elements() {
  const el = document.getElementById("64");
  if (el) {
    try {
      el.innerHTML = atob(el.textContent.trim());
    } catch {
      console.warn("Invalid Base64 in #64 element");
    }
  }
}
function getCacheBuster() {
  const now = Date.now();
  const hour = 1000 * 60 * 60; 
  return Math.floor(now / hour); r
} 
window.addEventListener("DOMContentLoaded", async () => {
  const [imageCount, postCount] = await Promise.all([
    findMaxImageNumber(),
    findMaxPostNumber()
  ]);
  
  maxImage = imageCount;
  maxPost = postCount;
  currentImage = maxImage;
  currentPost = maxPost;

  const loadPromises = [
    loadImage(currentImage), 
    loadPost(currentPost)    
  ];

  if (currentImage > 1) {
    const prevImgUrl = `img${currentImage - 1}.png?v=${getCacheBuster()}`;
    loadPromises.push(fetch(prevImgUrl, { method: 'GET', cache: 'force-cache' }));
  }
  if (currentPost > 1) {
    const prevPostUrl = `post${currentPost - 1}.txt?v=${getCacheBuster()}`;
    loadPromises.push(fetch(prevPostUrl, { method: 'GET', cache: 'force-cache' }));
  }

  await Promise.all(loadPromises);
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


