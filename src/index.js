const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://rickandmortyapi.com/api/character/'

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results
      saveInLocalStorage(response.info.next)
      let output = characters
        .map(character => {
          return `
          <article class="Card">
          <img src="${character.image}" />
          <h2>${character.name}<span>${character.species}</span></h2>
          </article>
          `
        })
        .join('')

      let newItem = document.createElement('section')
      newItem.classList.add('Items')
      newItem.innerHTML = output
      $app.appendChild(newItem)
    })
    .catch(error => console.log(error))
}

const loadData = api => {
  getData(api)
}

const saveInLocalStorage = next_fetch => {
  localStorage.setItem('next_fetch', next_fetch)
}

const printMessage = () => {
  const output = `
    <article class="Card">
    <h2><span>No se encontraron mas personajes</span></h2>
    </article>
    `

  let newItem = document.createElement('section')
  newItem.classList.add('message')
  newItem.innerHTML = output
  $observe.appendChild(newItem)
}
let h = 0
const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      console.log(`localstoeg${localStorage}`)

      h = h + 1

      if (!localStorage.getItem('next_fetch')) {
        localStorage.removeItem('next_fetch')
        console.log('ya no hay mas personajes22222')
      }
      if (h === 35) {
        localStorage.removeItem('next_fetch')
        console.log('ya no hay mas personajes')
        loadData(`${API}/?page=${h}`)
        printMessage()
        return (h = 0)
      }

      if (localStorage.getItem('next_fetch')) {
      }
      loadData(`${API}/?page=${h}`)
      console.log(localStorage.getItem('next_fetch'))
    }
  },
  {
    rootMargin: '0px 0px 100% 0px'
  }
)

intersectionObserver.observe($observe)