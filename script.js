const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const buttonSearch= document.getElementById('button-search');
const inlineInput = document.getElementById('inlineInput');

let ready= false;//when the page first load,we want it to be false
let imagesLoaded= 0;
let totalImages= 0;
let photoArray = []; //empty array 

// Unplash API
let count= 1;
const apiKey='V_8k7j1UB3w4E-X60x3Ua-Vf7WixKb2fWNaATKHlKI8';
let apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=`;
let query = '';
//Check if all images were loaded
function imageLoaded () {
    imagesLoaded = 0;
    imagesLoaded++;
    console.log('image loaded');
    if (imagesLoaded === totalImages) {
        ready = true; 
        loader.hidden = true; 
        console.log ('ready =', ready);
        count= 5;
    }
}


// Helper Function to set Attributes on Dom Elments
function setAttributes (element,attributes) {
    for ( const key in attributes) {
        element.setAttribute(key, attributes[key]);
        
    }
}


// Create Elements for Links & PhotoS, Add to Dom
function displayPhotos() {
    totalImages = photoArray.length;
    console.log ('total images' , totalImages);
    //Run function for each object in photsAray
    // We're gonna pass in our variable names, so that means that each object is going to be assigned to the  photo variable as we are running through our for each method.
        photoArray.forEach((photo) => {
        //Create <a></a> to link to Unplash. Create our elements with what we had in our photos array.
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',

        });
        //create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });
        //Event Listener,check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    
    });
}

/*Get photo from ApI*/
async function getPhotos() {
    try {
        console.log(apiUrl + count + query);
        const response = await fetch(apiUrl + count + query);
        photoArray = await response.json();
        displayPhotos();
    }
    catch(error) {
        //catch erro here

    }
}

//Check to see if scrolling near bottom of page, Loud More Photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready= false; 
        console.log('window.innerHeight',window.innerHeight);
        console.log('window.scrollY',window.scrollY);
        console.log('window.innerHeight + window.scrollY',window.innerHeight + window.scrollY);
        console.log('document.body.offsetHeight-1000',document.body.offsetHeight-1000);//consistente because once the page has loaded,we have the full height of all the images.
        console.log('Load More');
        getPhotos();
    }
});

buttonSearch.addEventListener('click', (event) => {
    event.preventDefault();
    imageContainer.innerHTML = '';
    query = '&query=' + inlineInput.value;
    getPhotos();
    console.log(inlineInput.value);
});

// On Load
getPhotos();
