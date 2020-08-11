const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/?page= ';
const PAGE = 1;

const getData = async api => {

  fetch(api)
  .then(response => response.json())
  .then(response => {
    //CUARTO PROBLEMA: La api ya cuenta con 31 paginas , al querer pasar a la 32 y verificar que respuesta no
    // trae ninguno resultado , se muestra un article con el enunciado "Ya no hay personajes".
    if (!response.info) {

      let output = `<article class="Card">
                      <img src="" />
                      <h2>YA NO HAY PERSONAJES</h2>
                    </article>`;  

      let newItem = document.createElement('section')
      newItem.classList.add('Items')
      newItem.innerHTML = output
      $app.appendChild(newItem)

    }
      const characters = response.results
     
        let output = characters.map(character => {
  
          return `<article class="Card">
                    <img src="${character.image}" />
                    <h2>${character.name}<span>${character.species}</span></h2>
                  </article>`
  
      }).join('')

    let newItem = document.createElement('section')
    newItem.classList.add('Items')
    newItem.innerHTML = output
    $app.appendChild(newItem)
    console.log(intersectionObserver)
          
    })
    .catch(error => console.log("ERROR:fail " + error))
}

 const loadData = async (api) => {
  try{
    
     const data = await getData(api)

  }catch (error){

    console.error(error)
  
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    if (!localStorage.getItem('next_fetch')) {
      
        loadData(API);
        //PRIMER PROBLEMA : Guardamos la URL de la siguiente petición (la segunda petición, en el else se llaman las demás) con el nombre de la llave 'next_fetch'
        localStorage.setItem('next_fetch',`${API}${PAGE + 1}`)
         
    }else{

      //SEGUNDO PROBLEMA: Obtenemos la información desde la llave 'next_fetch' de nuestro localStorage la funcion loadData() se actualiza a Async/Await
      loadData(localStorage.getItem('next_fetch'))

      antPage = localStorage.getItem('next_fetch').substr(-2)
      newPage = parseInt(antPage) + 1

      localStorage.clear();
      localStorage.setItem('next_fetch',`${API}${newPage}`)
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
})

//TERCER PROBLEMA: Al recargar la pagina limpiamos el localStorage, de esta forma se imprimen siempre los primeros 20 personajes al recargar.
window.onload = () => {
  localStorage.clear()
}

intersectionObserver.observe($observe)