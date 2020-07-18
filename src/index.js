const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const nextURL = response.info.next;
      // save next url 
      saveUrlLocalStorage(nextURL);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async (url) => {
  await getData(url);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData(getDataLocalStorage());
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

const saveUrlLocalStorage = (url) => {
  localStorage.setItem("next_fetch", url)
}

function getDataLocalStorage() {

  const urlSave = localStorage.getItem('next_fetch');

  if (urlSave) {
    return urlSave;
  } else {
    return API;
  }
}

const removeLocalStorage = () => {
  if (localStorage.getItem('next_fetch')) {
    localStorage.removeItem('next_fetch');
  }
}

window.addEventListener('DOMContentLoaded', removeLocalStorage);
