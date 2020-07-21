const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {

  return new Promise((resolve, reject) => {
      fetch(api)
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
  });
}
const loadData = async () => {
  let fetchUrl = localStorage.getItem('next_fetch')
  if (!fetchUrl) {
      fetchUrl = API
  }
  try {
      const responseInfo = await getData(fetchUrl);
      showNewData(responseInfo.results);
      validateNetx(responseInfo.info.next);
  } catch (error) {
      console.error(error);
  }
}
const showNewData = (characters) => {
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
}
const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
      loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});


const validateNetx = (next) => {
  if (next) {
      localStorage.setItem('netx_fetch', next);
  } else {
      const errorItem = document.createElement('section');
      errorItem.innerHTML = '<h5>ya no hay mas personajes...</h5>';
      errorItem.classlist = 'End';
      $app.appendChild(errorItem);
      intersectionObserver.observe($observe);
  }
}
intersectionObserver.observe($observe);
window.loadData = () => {
  localStorage.clear();
}