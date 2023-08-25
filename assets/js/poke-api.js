
const pokeApi = {}

function upperCaseFirstLetter (word) {
    return word[0].toUpperCase() + word.substring(1)
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.abilities = pokeDetail.abilities.map(({ability})=> upperCaseFirstLetter(ability.name)).join('')

    pokemon.height = pokeDetail.height / 10 + ' m'
    pokemon.stats = pokeDetail.stats.map((statistic)=>{
        return {
            statName: statistic.stat.name,
            statValue: statistic.base_stat
        }
    })

    pokemon.weight = pokeDetail.weight / 10 + ' kg'
    

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
