const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      saveNewurl(response.info.next);
      console.log(response.info.next);
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

const saveNewurl= (newAPIurl)=>{
  window.localStorage.setItem('next_fetch', newAPIurl);
}

const loadData = async() => {
  try{ 
    if(window.localStorage.getItem('next_fetch')!==null){
      const url= window.localStorage.getItem('next_fetch');
      if(url!=='null'){
        getData(url);
      }else{
        intersectionObserver.unobserve($observe);
        swal({ text: "ya no hay más personajes ...",});
      }
    }else{
      getData(API);
    }
  }catch(error){
    console.error(error);
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
window.localStorage.removeItem('next_fetch'); 