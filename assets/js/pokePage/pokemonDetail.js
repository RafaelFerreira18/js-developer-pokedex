const pokeApiDetails = {}

function convertPokeApiToDetailPokeModel(pokeDetail){
    const pokemon = new PokeDetail()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default

    pokemon.species = pokeDetail.species
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities.join(", ")

    pokemon.stats = pokeDetail.stats

    pokemon.moves = pokeDetail.moves

    return pokemon
}

function convertPokeApiSpecieToDetailPokeModel(specie, pokemon){
    pokemon.gender = getGenderPercentages(specie.gender_rate)
    pokemon.egg_groups = specie.egg_groups.map((egg_groupSlot) => egg_groupSlot.name).join(', ')
    pokemon.egg_cycle = specie.hatch_counter
    pokemon.specie = pokemon.species.name

    return pokemon
}

// Attempt to take pokemon evolutions
// pokeApiDetails.getEvolutions = async (number) =>{
//     try{
//         const pokemon = {}
//         const url = `https://pokeapi.co/api/v2/evolution-chain/${number}`
//         const response = await fetch(url)
//         const jsonBody = await response.json()
//         const chain = await jsonBody.chain
//         const evolvesTo = await chain.evolves_to
//         const zero = await evolvesTo['0']
//         const species = await zero.species
//         const pokeUrl = await species.url
//         pokemon.url = pokeUrl
//         const pokeDetail = await pokeApiDetails.getPokeDetail(pokemon)
//         console.log(pokeDetail)
//         // sessionStorage.setItem('evolution', pokeDetail)
//     } catch(error){return console.log(error)}
// }

pokeApiDetails.getGender = (pokemon) =>{
    return fetch(pokemon.species.url)
    .then((response) => response.json())
    .then((jsonBody) => convertPokeApiSpecieToDetailPokeModel(jsonBody, pokemon))
    .catch((error) => console.log(error))

}

pokeApiDetails.getPokeDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToDetailPokeModel)
    .then(pokeApiDetails.getGender)
    .catch((error) => console.log(error))
}

function getGenderPercentages(genderRate) {
    switch (genderRate) {
        case -1:
            return { male: 0, female: 0, genderless: 100 };
        case 0:
            return { male: 100, female: 0 };
        case 1:
            return { male: 87.5, female: 12.5 };
        case 2:
            return { male: 75, female: 25 };
        case 3:
            return { male: 62.5, female: 37.5 };
        case 4:
            return { male: 50, female: 50 };
        case 5:
            return { male: 37.5, female: 62.5 };
        case 6:
            return { male: 25, female: 75 };
        case 7:
            return { male: 12.5, female: 87.5 };
        case 8:
            return { male: 0, female: 100 };
        default:
            throw new Error("Invalid gender rate value");
    }
}


