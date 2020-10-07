const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const localStorage = window.localStorage;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      infoURL(response)
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

const infoURL = (results) => {
  let newUrl = results.info.next
  localStorage.setItem('next_fetch', newUrl)
}

const removeIntersectionObserver = url => {
	if(url.includes('null')){
		window.alert("Ya no hay personajes...");
	    intersectionObserver.unobserve($observe);
	}
}

const loadData = async () => {
  const newUrl = await localStorage.getItem('next_fetch')
  console.log(localStorage)
  if(newUrl !== null) {
    getData(newUrl);
    removeIntersectionObserver(newUrl)
  } else{
    getData(API);
    removeIntersectionObserver(API)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
localStorage.removeItem('next_fetch');