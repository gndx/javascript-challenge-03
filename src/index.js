const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
var CountPage = 33;
var StopData = false;
var deleteItem;
var nextFetch = false;


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const cantPages = response.info.pages;
      console.log('Variable NextFetch '+nextFetch);
      if(nextFetch !== null && CountPage < cantPages){
        nextFetch = localStorage.getItem('next_fetch');
        CountPage++;
        console.log('Sigue mostrando datos');
        console.log('Siguiente: '+response.info.next);
      } else {
        console.log('Entra al Sino');
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
    .catch(error => console.log('Este es '+error));
}

const loadData = () => {
  getData(API+'?page='+CountPage);
}


const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    if(StopData == true) {
      console.log('No se pueden mostrar datos mas porque no hay');
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
