const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
var CountPage = 1;
var StopData = false;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      if(response.info.next != null){
        CountPage++;
        console.log('Sigue mostrando datos');
        console.log('Siguiente: '+response.info.next);
      } else {
        StopData = true;
      }
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
    .catch(error => console.log('Este '+error));
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
    } else {
      loadData();
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);