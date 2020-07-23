const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';


const getData = api => {
  fetch(API)
    .then(response =>{
      return response.json()
      
    })
    .then(response => {
      localStorage.setItem("next_fetch",response.info.next);
      var valor=localStorage.getItem("next_fetch");
      if(valor==null)
      {
        console.log("no hay llaves guardadas en el localStorage")
      }
      else {
          const characters = response.results;
          localStorage.removeItem("next_fetch");
          let output = characters.map((character,index) => {
            
                return `
                <article class="Card">
                <img src="${character.image}" />
                <h2>${character.name}<span>${character.species}</span></h2>
                </article>`
              // }
                // el metodo join funciona para convertir todo el array o objeto en una cadena 
            // }
            
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }
    })
    .catch(error => console.log(error));
}
  //async no funciona con arrow function
 async function loadData(){
  var numero=[0]
  var promesas=numero.map(id=>
    {
      getData(API);
    })
  

  try
  {
    await Promise.all(promesas) 
  }
  catch(id)
  {
    error(id);
  }
  
}







function page(api)
{
  console.log(api)
  fetch(api)
  .then(response=>
    {
      
      return response.json();
    })
   .then(response=>
   {  
     if(response.info.next==null)
    {
      console.log( "Ya no hay personajes...")
    }
   }) 
    
}



async function paginas()
{

  var recorre=new Array(30)
  var valor=0;
  var promesas=recorre.fill(1).map(id=>
    {
      valor++
       page(`https://rickandmortyapi.com/api/character/?page=${valor}`)
    })

try{
    var valo= await Promise.all(promesas)

  }
 catch(id)
 {
   console.log("error")
 }
}

paginas()
loadData();
// los entries son todos los objetos que se estan observando, es decir $app un  solo objeto en esta caso 
// el metodo
const intersectionObserver = new IntersectionObserver(entries => {
  // entries[0] es el unico que esta en la lista es decir el $app
  if (entries[0].isIntersecting) {  
  }
  
}, {
  // es el objeto de configuracion
  rootMargin: '0px 0px 100% 0px',
  
}); 
// aqui esta observando el contenedor div adonde estan las imagenes
// intersectionObserver.observe($app);
