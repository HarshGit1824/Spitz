const selectEl = document.querySelector("select");
const carouselContainerEl = document.querySelector(".carousel-inner");

// console.log(selectEl, carouselContainerEl);

const BASE_URL = "https://dog.ceo/api/";


// === MARK: Fetch
// Gets the list of dog breeds from api
async function getDogsList() {
    try {
        const response = await fetch(`${BASE_URL}breeds/list/all`);
        const data = await response.json();
        return Object.keys(data.message);
    } catch (err) {
        console.log(err);
    }
}
getDogsList();

// Gets list of 10 images on breed
async function getDogImages(breed) {
    try {
        const res = await fetch(`${BASE_URL}breed/${breed}/images`);
        const data = await res.json();
        return data.message.slice(0, 10);
    } catch (err) {
        console.log(err);
    }
}


//MARK: Render
async function renderOptions(){
    const breedList = await getDogsList();

    for(breed of breedList){
        const option = document.createElement("option");
        option.textContent = breed[0].toUpperCase() + breed.slice(1).toLowerCase();
        option.value = breed;
        selectEl.appendChild(option);
    }
}
renderOptions();

async function renderCarousel(breed) {
    carouselContainerEl.innerHTML = ''
    const images = await getDogImages(breed);
    
    for (let i = 0; i < images.length; i++){
        const div  = document.createElement("div");
        div.classList.add("carousel-item", i===0 && "active");
        div.innerHTML = `<img src="${images[i]}" 
          class="d-block w-100 rounded-3 "
          alt="${breed}">`;
        carouselContainerEl.appendChild(div);
    }
}

selectEl.addEventListener("change", function (e) {
    renderCarousel(e.target.value);
});

renderCarousel("affenpinscher");