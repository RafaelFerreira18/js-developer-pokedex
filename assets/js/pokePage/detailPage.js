function getPokemon(number){
    const pokemon = {}
    pokemon.url = `https://pokeapi.co/api/v2/pokemon/${number}`
    pokeApiDetails.getPokeDetail(pokemon)
    .then((pokeDetail) =>{
        sessionStorage.setItem('pokemon', JSON.stringify(pokeDetail))
        window.location.href = "pokePage.html"
    })
}