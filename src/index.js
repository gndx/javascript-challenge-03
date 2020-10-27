const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const NEXT_FETCH = response.info.next;
      localStorage.setItem("NEXT_FETCH", NEXT_FETCH);
      if (localStorage.NEXT_FETCH){
        console.log(`NEXT_FETCH creada exitosamente en localSorage con el valor: ${localStorage.NEXT_FETCH}`);
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
    .catch(error => console.log(error));
}

let llamadasALaAPI = 0;

/* const loadData = () => {
  getData(API); */
const loadData = async () => {
  try {
    if (localStorage.NEXT_FETCH === null || llamadasALaAPI === 0){
      localStorage.removeItem(`NEXT_FETCH`);
      await getData(API);
      llamadasALaAPI++;
    } else {
      await getData(`${localStorage.NEXT_FETCH}`);
      llamadasALaAPI++;
    }
  } catch{
}
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
    console.log(`Llamadas: ${llamadasALaAPI}`)
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);