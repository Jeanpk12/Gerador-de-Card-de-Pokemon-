// Cores associadas aos tipos de Pokémon
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  
  // URL base da API Pokeapi
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const card = document.getElementById("card");
  const btn = document.getElementById("btn");
  
  // Função para obter dados de um Pokémon aleatório
  let getPokeData = () => {
    // Gera um número aleatório entre 1 e 150
    let id = Math.floor(Math.random() * 150) + 1;
    // Combina a URL da pokeapi com o ID do Pokémon
    const finalUrl = url + id;
    // Busca a URL gerada
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        generateCard(data);
      });
  };
  
  // Função para gerar o cartão do Pokémon
  let generateCard = (data) => {
    // Obtém os dados necessários e atribui a variáveis
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    // Define a cor do tema com base no tipo do Pokémon
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);
    card.innerHTML = `
        <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
         
        </div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Ataque</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defesa</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Velocidade</p>
          </div>
        </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
  };
  
  // Função para adicionar os tipos do Pokémon ao cartão
  let appendTypes = (types) => {
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };
  
  // Função para estilizar o cartão com a cor do tema
  let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  };
  
  // Adiciona um ouvinte de eventos para o botão e para o carregamento da página
  btn.addEventListener("click", getPokeData);
  window.addEventListener("load", getPokeData);
  