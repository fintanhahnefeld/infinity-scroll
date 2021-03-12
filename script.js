const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'ZVUpAWvpG9ChYPHRhbIx9mpazdPQihMEP7m3iM9iMKQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);  
    }
}

// Create elements for links and phots, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
        const item = document.createElement('a'); 
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
    // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplah APi
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // Catch error here

    }
}

// Check to see if scrolling is at bottom of page, then load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On load 
getPhotos();