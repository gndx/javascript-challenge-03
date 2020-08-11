const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = async (api) => {
    try {
        const request = await fetch(api);
        const responseJson = await request.json();
        const characters = await responseJson.results;
        saveNextUrl(responseJson.info.next);
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

const saveNextUrl = (url) => {
    localStorage.setItem('next_fetch', url);
}

const getNextUrl = () => {
    if (localStorage.getItem('next_fetch') !== null) {
        return localStorage.getItem('next_fetch');
    } else {
        return API;
    }
}


const loadData = async (url) => {
    if (url === "null") {
        alert('There are not more characters left');
        intersectionObserver.unobserve($observe);
    } else {
        await getData(url);
    }
}

const handlerObserver = async (entries) => {
    if(entries[0].isIntersecting)
        await loadData(getNextUrl());
}

const intersectionObserver = new IntersectionObserver(handlerObserver, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

const handlerContentLoaded = () => {
    if (localStorage.getItem('next_fetch') !== null) {
        localStorage.removeItem('next_fetch');
    }
}

window.addEventListener('DOMContentLoaded', handlerContentLoaded);