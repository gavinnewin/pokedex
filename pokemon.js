let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon";
const pokemon_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");
const modal = document.getElementById("myModal");
const body = document.body;
const modalNumber = document.getElementById("modalNumber"); 
const modalText = document.getElementById("modalText");
const span = document.getElementsByClassName("close")[0];

const fetchPokemons = async () =>{
    for(let i = 1; i <= pokemon_number; i ++){
        await getAllPokemon(i);   
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removablePokemons = [];
    for(let i = 0; i < pokemonEls.length; i++){
        const pokemonEl = pokemonEls[i];
        removablePokemons = [...removablePokemons, pokemonEl];
    }
    removablePokemons.forEach((remPoke) => remPoke.remove());
};

const getPokemon  =  async (id) =>{
    const serachPokemons = pokemons.filter((poke) => poke.name == id);
    let searchPokemons;
    
    removePokemon();
    serachPokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const getAllPokemon  =  async (id) =>{
    const res = await fetch(`${url}/${id}`)
    const pokemon = await res.json();
    pokemons = [...pokemons, pokemon];
};
fetchPokemons();

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
};

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const poke_types = pokemon.types.map((el) => el.type.name).slice(0,1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_stat = pokemon.stats.map((el) => el.stat.name);
    const stats = poke_stat.slice(0,3);
    const base_value = pokemon.stats.map((el) => el.base_stat);
    const base_stat = base_value.slice(0,3);
    const stat = stats.map((stat) => {
        return `<li class= "names">${stat}</li>`
    }).join("");
    const base = base_stat.map((base) => {
        return `<li class= "base">${base}</li>`
    }).join("");
    const pokeInnerHTML = `
        <div class = "img-container">
             <img src="images/pokemon-images/${pokemon.id}.png" alt="${name}"/>
        </div>
        <div class = "info">
            <span class = "number">#${pokemon.id.toString().padStart(3, "0")}</span>
            <h3 class = "name">${name}</h3>
            <!--<small class = "type"><span>${poke_types}</span>/<small> v
        </div>
        <div class = "stats">
            <h2>Stats</h2>
        </div>`;
        pokemonEl.innerHTML = pokeInnerHTML;


        pokemonEl.addEventListener("click", () => {
            modalImage.src = `images/pokemon-images/${pokemon.id}.png`;
            modalText.innerText = `${name}`;
            modalNumber.innerText = `#${pokemon.id.toString().padStart(3, "0")}`; // Added: Display Pokémon number in modal
            const type = poke_types[0]; // Get the primary type
            const typeColor = typeColors[type]; 
            modalType.innerText = type;
            modalType.style.backgroundColor = typeColor;
            const statsHTML = `
                
                <ul>
                    <li><strong>HP</strong>: ${base_stat[0]}</li>
                    <li><strong>ATK</strong>: ${base_stat[1]}</li>
                    <li><strong>DEF</strong>: ${base_stat[2]}</li>       
                </ul>`;
            modalStats.innerHTML = statsHTML;
            
            modal.style.display = "block";
            document.body.classList.add('no-scroll');
        });
    
        poke_container.appendChild(pokemonEl);
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
    body.classList.remove('no-scroll');
}
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getPokemon(searchTerm);
        search.value = "";
    }
    else if(searchTerm == ""){
        pokemons = [];
        removePokemon();
        fetchPokemons();
    }
});
