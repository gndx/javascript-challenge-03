const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
var CountPage = 1;
var StopData = false;
var nextFetch = false;


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const cantPages = response.info.pages;
      if(nextFetch !== null && CountPage < cantPages){
        nextFetch = localStorage.getItem('next_fetch');
        CountPage++;
      } else {
        localStorage.removeItem('next_fetch');
        StopData = true;
      }
      localStorage.setItem('next_fetch', response.info.next);
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

const loadData = async () => {
  const data = await getData(API+'?page='+CountPage);
  return data;
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    if(StopData === true) {
      let newItem = document.createElement('div');
      newItem.classList.add('NoDatos');
      newItem.innerHTML = '<h3>No hay más datos para mostrar</h3>';
      $app.appendChild(newItem);
      intersectionObserver.unobserve($observe);
    }else {
      loadData();
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

  intersectionObserver.observe($observe);
