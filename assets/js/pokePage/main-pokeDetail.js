const pokePageHeader = document.getElementById("pokemon-header")
const pokePageDetailContainer = document.getElementById("detail-container")

document.addEventListener('DOMContentLoaded', () => {
    var pokemonDetail = JSON.parse(sessionStorage.getItem('pokemon'))
    if (pokemonDetail){
        title = pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)
        document.title = title
        pokePageHeader.innerHTML = makeHeader(pokemonDetail)
        pokePageDetailContainer.innerHTML = makeDetailContainer(pokemonDetail)
        document.body.classList.add(pokemonDetail.type)
    }
});

function makeHeader(pokemonDetails){
    return `
            <a href="index.html">&larr;</a>
            <div class="name-number">
                <Span class="pokeName">${pokemonDetails.name}</Span>
                <span class="pokeNumber">#${pokemonDetails.number}</span>
            </div>
            <div class="pokemon-types">
                <ol>
                    ${pokemonDetails.types.map((type) => `<li class="types ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img src="${pokemonDetails.photo}"
            alt="${pokemonDetails.name}">` 
}


function makeDetailContainer(pokemonDetails){
    return `
    <div class="detail-tabs">
        <button class="tablinks" onclick="showAbout()">About</button>
        <button class="tablinks" onclick="showBaseStats()">Base Stats</button>
        <button class="tablinks" onclick="showEvolution()">Evolution</button>
        <button class="tablinks" onclick="showMoves()">Moves</button>
    </div>
    <div class="tabcontent" id="about">
        <table>
            <tr>
                <td>Species</td>
                <th>${pokemonDetails.specie}</th>
            </tr>
            <tr>
                <td>Height</td>
                <th>${pokemonDetails.height}dm</th>
            </tr>
            <tr>
                <td>Weight</td>
                <th>${pokemonDetails.weight}hg</th>
            </tr>
            <tr>
                <td>Abilities</td>
                <th>${pokemonDetails.abilities}</th>
            </tr>
        </table>
        <h3>Breeding</h3>
        <table>
            <tr>
                <td>Gender</td>
                <th>&male; ${pokemonDetails.gender.male}% &female; ${pokemonDetails.gender.female}%</th>
            </tr>
            <tr>
                <td>Egg Groups</td>
                <th>${pokemonDetails.egg_groups}</th>
            </tr>
            <tr>
                <td>Egg Cycle</td>
                <th>${pokemonDetails.egg_cycle}</th>
            </tr>
        </table>
    </div>
    <div class="tabcontent hide" id="base-stat">
        <table>
            <tr>
                <td>HP</td>
                <th>${pokemonDetails.stats['0'].base_stat}</th>
            </tr>
            <tr>
                <td>Attack</td>
                <th>${pokemonDetails.stats['1'].base_stat}</th>
            </tr>
            <tr>
                <td>Defense</td>
                <th>${pokemonDetails.stats['2'].base_stat}</th>
            </tr>
            <tr>
                <td>Special Attack</td>
                <th>${pokemonDetails.stats['3'].base_stat}</th>
            </tr>
            <tr>
                <td>Special Defense</td>
                <th>${pokemonDetails.stats['4'].base_stat}</th>
            </tr>
            <tr>
                <td>Speed</td>
                <th>${pokemonDetails.stats['5'].base_stat}</th>
            </tr>            
        </table>
    </div>
    <div class="tabcontent hide" id="evolution">
    </div>
    <div class="tabcontent hide" id="moves">
        <div class="listbox-area">
            <div>
                <ul id="ss_elem_list"
                    tabindex="0"
                    role="listbox"
                    aria-labelledby="ss_elem">
                    ${pokemonDetails.moves.map((move) => `<li class="moves">${move.move.name}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
    `
}



function showBaseStats(){
    document.getElementById("base-stat").className = "tabcontent"
    document.getElementById("about").className = "tabcontent hide"
    document.getElementById("evolution").className = "tabcontent hide"
    document.getElementById("moves").className = "tabcontent hide"   
}

function showAbout(){
    document.getElementById("base-stat").className = "tabcontent hide"
    document.getElementById("about").className = "tabcontent"
    document.getElementById("evolution").className = "tabcontent hide"
    document.getElementById("moves").className = "tabcontent hide"
}

function showMoves(){
    document.getElementById("base-stat").className = "tabcontent hide"
    document.getElementById("about").className = "tabcontent hide"
    document.getElementById("evolution").className = "tabcontent hide"
    document.getElementById("moves").className = "tabcontent"
}

function showEvolution(){
    document.getElementById("base-stat").className = "tabcontent hide"
    document.getElementById("about").className = "tabcontent hide"
    document.getElementById("evolution").className = "tabcontent"
    document.getElementById("moves").className = "tabcontent hide"   
}
