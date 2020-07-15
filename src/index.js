const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = async (api) => {
    try {
        const request = await fetch(api);
        const responseJson = await request.json();
        const characters = await responseJson.results;

        let renderCharacters = await characters.map(character => {
            return `
              <article class="Card">
                <img src="${character.image}" />
                <h2>${character.name}<span>${character.species}</span></h2>
              </article>
      `;}).join('');

        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = renderCharacters;
        $app.appendChild(newItem);

    } catch (err) {
        console.error(err.message);
    }
}

const loadData = () => {
    getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        loadData();
    }
}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);