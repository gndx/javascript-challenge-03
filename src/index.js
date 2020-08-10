const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";
const NEXT_KEY = "next_fetch";

window.onbeforeunload = function () {
  localStorage.removeItem(NEXT_KEY);
};

const getData = async (api) => {
  try {
    let request = await fetch(api);
    let response = await request.json();
    const characters = response.results;
    let output = await characters
      .map((character) => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `;
      })
      .join("");
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
    if(response.info.next)
      localStorage.setItem(NEXT_KEY, response.info.next);
    else {
      alert('Ya no hay más personajes');
      intersectionObserver.unobserve($observe);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadData = () => {
  const from = localStorage.getItem(NEXT_KEY) || API;
  getData(from);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
