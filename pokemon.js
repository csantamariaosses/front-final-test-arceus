


$(document).ready(function () {

    $("#tabla").hide();
    llenaCbPokemon();
    llenaCbTipos();
    $(".gifAnimado").show();
    $('.carousel').carousel();
    $("#pokeboton").click(function () { getSelectPokemon(document.getElementById("txtBuscar").value)});
   
});


function inicio() {
    $('.carousel').show();
    $('.unPokemon').hide();
    $('#tabla').hide();
}

function getSelectPokemon(sel) {
    var nombrePoke = sel;
    $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${nombrePoke}`,
            type: "get",
            dataType: 'json',
    })
    .done(function (poke) {
       
        var imagen = `https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`;
        var stats = poke.stats;
        var statsLabel = [];
        var statsValues = [];
        var specie = poke.species.name;

        var listaTipos = "<ul>";
        poke.types.forEach(function (type) {
            listaTipos += "<li>" + type['type']['name'] + "</li>";
        });
        listaTipos += "</ul>";

        for (i = 0; i < stats.length; i++) {
            statsLabel[i] = stats[i].stat.name;
            statsValues[i] = stats[i].base_stat;
        }



        
        var tarjeta = `
        <div class="card"><img src="${imagen}" class="card-img-top" alt="..." style="padding:20px;">
            <div class="card-body">
            <h5 class="card-title">Nro: ${poke.id}</h5>
            <hr>
            <h5 class="card-title">${poke.name}</h5>
            <p class="card-text"></p>
                <hr>    
                <table border="1" style="padding:5px;" width="30%">
                    <tr align="center" style=""><td>Tipos</td></tr>
                    <tr align="center"><td>${listaTipos}</td></tr>
                </table>
                <table border="1" style="padding:5px;" width="80%">
                <hr>
                    <tr align="center" style=""><td>Altura</td><td>Peso</td><td>Especie</td></tr>
                    <tr align="center"><td>${poke.height}</td><td>${poke.weight}</td><td>${poke.species.name}</td></tr>
                </table>
                <hr>
                <canvas id="myChart" width="400" height="200"></canvas>

        </div></div>`;

        $("#unPokemon").html(tarjeta);
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'horizontalBar',

            // The data for our dataset

            //https://www.pokexperto.net/index2.php?seccion=nds/nationaldex/stats&pk=3
            data: {
                //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                labels: statsLabel,
                datasets: [{
                    label: '',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: statsValues
                }]
            },

            // Configuration options go here
            options: {}
        });
        $('.unPokemon').show();
        $('.carousel').hide();
        $(".gifAnimado").hide();
        $("#poke-container").hide();
        $("#tabla").hide();
    });
}


function llenaCbPokemon(){
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon", success: function (result) {
        
        var resultados = result.results
        var combo = `<select name='cbPokemon' id='cbPokemon' onChange="getSelectPokemon(this.value)">`; // 

        combo += "<option value='0'>Pokemon</option>";

        var imagen = "";
        resultados.forEach(pokemon => {
            combo += "<option value='" + pokemon.name + "'>" + pokemon.name + "</option>";
            //alert( element.name);    

        });
        combo += "</option>";
        $("#selectPokemon").html(combo);
        $("#selectPokemon").show();             
        }
    });
}



function llenaCbTipos(){
    $.ajax({
        url: "https://pokeapi.co/api/v2/type", success: function (result) {
       
        var resultados = result.results
        var combo = `<select name='cbTipos' id='cbTipos' onChange="getSelectTipos(this)">`;
        combo += "<option value='0'>Browse by Type</option>";

        var imagen = "";
        resultados.forEach(element => {
            combo += "<option value='" + element.name + "'>" + element.name + "</option>";
            
        });
        combo += "</option>";
        $('#selectTypes').html(combo);
        document.getElementById('selectTypes').innerHTML = combo;
        $("#selectTypes").show();             
        }
    });
}






const URL1 = 'https://pokeapi.co/api/v2/type/';

function getSelectTipos(sel) {
    var nombreTipo = sel.value;
    UrlTipo = URL1+nombreTipo
    fetch(UrlTipo, {method: 'GET'})
    .then( response => {
    return response.json()
    })
    .then( respuesta => respuesta.pokemon )
    .then( listaPokemones => {
    pokemoneHTML = "";
    listaPokemones.slice(0,20).forEach( (pokemon) => escribeTabla(pokemon.pokemon) );
    document.getElementById("cuerpoTabla").innerHTML = pokemoneHTML;

    })
    $("#tabla").show();
    $('.carousel').hide();
    $(".gifAnimado").hide();
    $("#poke-container").hide();
    $(".unPokemon").hide();
}



const escribeTabla = (pokemon) => {
            
            var pokeUrlSplit = pokemon.url.split("/");
            var pokeId = pokeUrlSplit[pokeUrlSplit.length - 2]
            console.log(pokeId)
        
            pokemoneHTML += `<tr>
                            <th><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png"></th>
                            <td> ${pokemon.name} </td>
                            <td> ${pokemon.url}</td>
                            <td><button class="btn text-light" onclick="getSelectPokemon('${pokemon.name}')">Detalle</button></td></tr>`
   
           

}

