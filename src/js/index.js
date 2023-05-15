const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonUrl = (id) => `${BASE_URL}${id}`;

const generatePokemonPromises = () =>
  Array.from({ length: 200 }, (_, index) =>
    fetch(getPokemonUrl(index + 1)).then((response) => response.json())
  );

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const generateHTML = (pokemons) =>
  pokemons.reduce(
    (accumulator, { name, id, types }) =>
      (accumulator += `
        <li class="cartao-pokemon ${types[0].type.name} ${
        types[1] ? types[1].type.name : ""
      }">
          <div class="informacoes">
            <span>${name.toUpperCase()}</span>
            <span>#${id}</span>
          </div>
          <img
            class="gif"
            alt="${name}"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif"
          />
          <ul class="tipos">
            <li class="tipo ${types[0].type.name}">
              ${capitalize(types[0].type.name)}
            </li>
            ${
              types[1]
                ? `<li class="tipo ${types[1].type.name}">${capitalize(
                    types[1].type.name
                  )}</li>`
                : ""
            }
          </ul>
        </li>`),
    ""
  );

const insertPokemonsIntoPage = (pokemons) =>
  (document.querySelector('[data-js="pokedex"]').innerHTML = pokemons);

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);

const botaoAlterarTema = document.getElementById("botao-alterar-tema");
const body = document.querySelector("body");
const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");

botaoAlterarTema.addEventListener("click", () => {
  const modoEscuroEstaAtivo = body.classList.contains("modo-escuro");

  body.classList.toggle("modo-escuro");

  if (modoEscuroEstaAtivo) {
    imagemBotaoTrocaDeTema.setAttribute("src", "./src/IMGS/sun.png");
  } else {
    imagemBotaoTrocaDeTema.setAttribute("src", "./src/IMGS/moon.png");
  }
});
