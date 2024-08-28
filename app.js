/*
    Pexels API Authorization: 

    GM3FsMY9l5Ft43yoYXsvH4nRWrEewuakS1jkgXTk7pHw1L2b4XbnPYKR  
*/

// https://api.pexels.com/v1/curated?per_page=16&page=1

// https://api.pexels.com/v1/search?query=nature&per_page=15&page=1

const auth = "GM3FsMY9l5Ft43yoYXsvH4nRWrEewuakS1jkgXTk7pHw1L2b4XbnPYKR";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchLink;
let currentSearch;
let page = 1;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  //   json - javascript object notation
  const data = await dataFetch.json();
  return data;
}
function generatePicture(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");

    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    
    <p>${photo.photographer}</p>
 <a target="_blank" href="${photo.src.original}">Download</a>

    </div>

    <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhoto() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePicture(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  generatePicture(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }

  const data = await fetchApi(fetchLink);
  generatePicture(data);
}

curatedPhoto();