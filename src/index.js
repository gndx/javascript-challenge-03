const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
const localStorage = window.localStorage

localStorage.setItem('next_fetch',`${API}`)

const getData = async (api) => {
  try {
    const request = await fetch(api)
    const response = await request.json()
    const characters = response.results

      let output = await characters.map(character => {
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
      const url = response.info.next 
      localStorage.removeItem('next_fetch')
      localStorage.setItem('next_fetch',`${url}`)      
    }
    catch(error){
      console.log(error)
    }
} 


const loadData = async () => {
  const URL =  localStorage.getItem('next_fetch')
  try {
    if (URL === 'null'){
      let h1 = document.createElement('h1');
      h1.innerHTML = 'Ya no hay mas personajes ...!'
      $observe.appendChild(h1)
      localStorage.removeItem('next_fetch')
      intersectionObserver.unobserve($observe); 
    }else {
      await getData(URL)
    }
  }
  catch(error){console.log(error)}
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe); 

