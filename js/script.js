const cep = document.querySelector("#cep")

const showData = (result)=>{
  for(const campo in result){
    if(document.querySelector("#"+campo))
        document.querySelector("#"+campo).value= result[campo]
  }
}
cep.addEventListener("blur",(e)=>{
  let search = cep.value.replace("-","");

  const options = {
    method: 'GET',
    mode:'cors',
    cache:'default'
  };

  fetch(`https://viacep.com.br/ws/${search}/json/`)
  .then(response =>{ 
    return response.json()})
  .then( (res) => {
    console.log(res);
      showData(res);
      buscarCidade(res.localidade);
      
      buscaNoticia(res.localidade);
  })
  .catch(e => console.log('deu erro: '+ e, message));
})




/* js.. clima*/

let chave = "b08e3dad32073d511511d8d4ff3d7620"


function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"
    
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
}

async function buscarCidade(cidade){
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    cidade + 
    "&appid=" + 
    chave + 
    "&lang=pt_br" +
    "&units=metric"
    )
    .then(resposta => resposta.json())

    colocarNaTela(dados)
//aqui para baixo

// API Mapa 
if(map === undefined) {
  map = L.map('map').setView([dados.coord.lat, dados.coord.lon], 15);
} else {
  map.remove();
  map = L.map('map').setView([dados.coord.lat, dados.coord.lon], 15);
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
      // marcador no map
L.marker([dados.coord.lat, dados.coord.lon]).addTo(map)
  .bindPopup('Posição Atual')     // menssagem 
  .openPopup();

};
// MAP GlOBAL - para poder atualizar!
let map;










// NOTICIA IBGE


//Api de Notias NEWSAPI
const buscaNoticia = (localidade) => {
    console.log(localidade);
  const apiKeyNoticia = 'ebc5012c6d754246be9dcadc83bd739b';
  const apiNoticiasUrl = ` https://newsapi.org/v2/everything?q=brasil&from=2023-12-01&sortBy=popularity&language=pt&pageSize=4&apiKey=664840b9855f445aaa96b43b7fe83226`;

  fetch(apiNoticiasUrl)
      .then((res) => res.json())
      .then((data) => {
          exibeNoticias(data.articles);
          
      })
      .catch((error) => {
          console.error('Erro na busca de notícias:', erro);
      });
      
};

const exibeNoticias = (noticias) => {
  const divNoticias = document.querySelector('#notic');
  divNoticias.innerHTML = '';

  if (noticias.length > 0) {
      const ul = document.createElement('ul');

      noticias.forEach((noticia) => {
        console.log(noticia);
          const li = document.createElement('li');
          li.innerHTML = `<strong>${noticia.title}</strong>: ${noticia.description}`;
          ul.appendChild(li);
      });

      divNoticias.appendChild(ul);
  } else {
      divNoticias.textContent = 'Nenhuma notícia encontrada para esta região.';
  }
};
















//b08e3dad32073d511511d8d4ff3d7620
//para saber se api vai estar funcionando 
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b08e3dad32073d511511d8d4ff3d7620
/*
Sua chave de API é:ebc5012c6d754246be9dcadc83bd739b 
site: https://newsapi.org/register/success*/





// Api key maps...AIzaSyAUKHXS44Jo3ZPljIboqd9zTUoO5jqkpFM 
