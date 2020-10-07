const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";


const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("next_fetch", response.info.next);
      const characters = response.results;
      let output = characters
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
    })
    .catch((error) => console.log(error));
};

async function loadData() {
  var value = localStorage.getItem("next_fetch");
  console.log(value);
  try {
    if (value == null) {
      getData(API);
    } else if (value == "null") {
      document.getElementById("message").textContent =
        "Ya no hay personajes...";
      intersectionObserver.unobserve($observe);
    } else {
      getData(value);
    }
  } catch (error) {
    console.log(error);
  }
}

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

window.onbeforeunload  = () => {
  localStorage.clear();
}