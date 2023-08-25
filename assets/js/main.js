const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecord = 151
const limit = 10
let offset = 0 


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=> {
    const newPokemonList = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}" onClick="showPokemonModal('${pokemon.name}')">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}" />
        </div> 
      </li>
    `).join('')

    pokemonList.innerHTML += newPokemonList
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const countRecordinTheNextPage = offset + limit

  if(countRecordinTheNextPage >= maxRecord){
    const newLimit = maxRecord - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }  
})

function showPokemonModal(pokemonName) {
  pokeApi.getPokemonDetail({name:pokemonName}).then(pokemon => {

    const modalContent = `
      <div class="modal-content ${pokemon.type}">
        <header class="modal-header">
          <i class="fa-solid fa-x" onclick="modal.close()"></i>
          <div class="modal-title">
            <h3>${pokemon.name}</h3>
            <span>#${pokemon.number}</span>
          </div>
          <ol class="modal-types">
            ${pokemon.types.map(type => `<li class="${type}">${type}</li>`).join('')}
          </ol>
        </header>
        <div class="modal-details">
          <img src="${pokemon.photo}" alt="imagem do ${pokemon.name}">
          <div class="modal-info">
            <table class="info-table">
              <tbody>
                <tr>
                  <td>Height</td>
                  <td>${pokemon.height}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>${pokemon.weight}</td>
                </tr>
                <tr>
                  <td>Abilities</td>
                  <td>${pokemon.abilities}</td>
                </tr>
              </tbody>
            </table>
            <div class="stats">
              <span class="section-title">Base statistics</span>
              <table>
                <tbody>
                ${pokemon.stats.map(stat => `
                  <tr>
                    <td>${stat.statName}</td>
                    <td>${stat.statValue}</td>
                    <td><meter min="0" max="100" value="${stat.statValue}" low="50" /></td>
                  </tr>
                `).join('')}              
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `
    modal.show(modalContent)
  })
  
}