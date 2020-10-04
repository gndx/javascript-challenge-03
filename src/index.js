const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let API = 'https://rickandmortyapi.com/api/character';
localStorage.clear();
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem("next_fetch",response.info.next)
      const characters = response.results;
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

const loadData = async(API) => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    
    if(localStorage.getItem("next_fetch") != null ){
      API=localStorage.getItem("next_fetch")
      loadData(API);
    }
    else if( localStorage.getItem("next_fetch") == "") {
      let newItem = document.createElement('h1');
      newItem.innerHTML = 'Ya no hay personajes';
      $app.appendChild(newItem);
      intersectionObserver.disconnect()
    }else{
      loadData(API);
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);