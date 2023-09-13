const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 152
let offset = 0
const maxRecords = 520


function loadMorePokemon(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" onclick="getPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
        </li>
    `).join('')
        pokemonOl.innerHTML += newHtml
    })
}

loadMorePokemon(offset,limit)



loadMoreButton.addEventListener('click', () =>{
    offset +=limit
    const qtdRecords = offset + limit

    if(qtdRecords >= maxRecords){
        const newLimit =  maxRecords - offset
        loadMorePokemon(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }

    else{
        loadMorePokemon(offset,limit)
    }
})





