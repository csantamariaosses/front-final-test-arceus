$(document).ready(function () {

    llenaCbPokemon();
    $(".gifAnimado").show();
    $(".info-group").hide();
    $('.carousel').carousel();
    $(".lupa").click(function () {
        var nombre = $("#txtBuscar").val();
        nombre = nombre.toLowerCase();
        //alert("buscar ajax");

        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${nombre}`,
            type: "get",
            dataType: 'json',
        })
        .done(function (result) {
            var pokeID = result.id;
            var nombre = result.name;
            var imagen = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
            var types = result.types;
            var altura = result.height;
            var peso = result.weight;
            var genero = result.genre;
            var color = result.color;
            var stats = result.stats;
            var statsLabel = [];
            var statsValues = [];
            var specie = result.species.name;

            var listaTipos = "<ul>";
            types.forEach(function (type) {
                listaTipos += "<li>" + type['type']['name'] + "</li>";
            });
            listaTipos += "</lu>";

            for (i = 0; i < stats.length; i++) {
                statsLabel[i] = stats[i].stat.name;
                statsValues[i] = stats[i].base_stat;
            }



            var tarjeta = '<div class="card">';
            tarjeta += `<img src="${imagen}" class="card-img-top" alt="..." style="padding:20px;">
            <div class="card-body">
                <h5 class="card-title">Nro: ${pokeID}</h5>
                <hr>
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
                    <hr>    
                    <table border='1' width="30%" padding="5px"; border-radius="5px"; >
                        <tr align="center" style=""><td>Tipos</td></tr>
                        <tr align="center"><td>${listaTipos}</td></tr>
                    </table>
                    <table border="1" padding="5px"; width="80%";>
                    <hr>
                        <tr align="center" style=""><td>Altura</td><td>Peso</td><td>Especie</td></tr>
                        <tr align="center"><td>${altura}</td><td>${peso}</td><td>${specie}</td></tr>
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
            
            $('.carousel').hide();
            $(".gifAnimado").hide();
            $("#poke-container").hide();
            $(".info-group").hide();
            $("#unPokemon").show();
            
        });
    });
});

/*
$('#txtBuscar').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){

        alert('You pressed a "enter" key in textbox'); 

    }
    event.stopPropagation();
});
*/


function inicio() {
    $('.carousel').show();
    $('.unPokemon').hide();
    $(".info-group").hide();

}

function getSelectPokemon(sel) {
    var nombre = sel.value;
    $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${nombre}`,
            type: "get",
            dataType: 'json',
    })
    .done(function (result) {
        var pokeID = result.id;
        var nombre = result.name;
        var imagen = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
        var types = result.types;
        var altura = result.height;
        var peso = result.weight;
        var genero = result.genre;
        var color = result.color;
        var stats = result.stats;
        var statsLabel = [];
        var statsValues = [];
        var specie = result.species.name;

        var listaTipos = "<ul>";
        types.forEach(function (type) {
            listaTipos += "<li>" + type['type']['name'] + "</li>";
        });
        listaTipos += "</lu>";

        for (i = 0; i < stats.length; i++) {
            statsLabel[i] = stats[i].stat.name;
            statsValues[i] = stats[i].base_stat;
        }



        var tarjeta = '<div class="card">';
        tarjeta += `<img src="${imagen}" class="card-img-top" alt="..." style="padding:20px;">
        <div class="card-body">
            <h5 class="card-title">Nro: ${pokeID}</h5>
            <hr>
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
                <hr>    
                <table border="1" style="padding:5px;" width="30%">
                    <tr align="center" style=""><td>Tipos</td></tr>
                    <tr align="center"><td>${listaTipos}</td></tr>
                </table>
                <table border="1" style="padding:5px;" width="80%">
                <hr>
                    <tr align="center" style=""><td>Altura</td><td>Peso</td><td>Especie</td></tr>
                    <tr align="center"><td>${altura}</td><td>${peso}</td><td>${specie}</td></tr>
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
        $('.carousel').hide();
        $(".gifAnimado").hide();
        $(".info-group").hide();
        $("#poke-container").hide();
        $("#unPokemon").show();

    });
}


function llenaCbPokemon(){
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon", success: function (result) {
        var count = result.count
        var resultados = result.results
        var combo = `<select name='cbPokemon' id='cbPokemon' onChange="getSelectPokemon(this)">`;
        combo += "<option value='0'>Pokemon</option>";

        var imagen = "";
        resultados.forEach(element => {
            combo += "<option value='" + element.name + "'>" + element.name + "</option>";
            //alert( element.name);    

        });
        combo += "</option>";
        $("#selectPokemon").html(combo);
        $("#selectPokemon").show();             
        }
    });
}

function buscar(){
    //alert("buscar");
    $('.unPokemon').show();
}


function csFunction(){
  
    if ( event.keyCode == 13) {
        //alert('enter key is pressed');
        var nombre = $("#txtBuscar").val();
        nombre = nombre.toLowerCase();
        //alert("buscar ajax");

        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${nombre}`,
            type: "get",
            dataType: 'json',
        })
        .done(function (result) {
            var pokeID = result.id;
            var nombre = result.name;
            var imagen = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
            var types = result.types;
            var altura = result.height;
            var peso = result.weight;
            var genero = result.genre;
            var color = result.color;
            var stats = result.stats;
            var statsLabel = [];
            var statsValues = [];
            var specie = result.species.name;

            var listaTipos = "<ul>";
            types.forEach(function (type) {
                listaTipos += "<li>" + type['type']['name'] + "</li>";
            });
            listaTipos += "</lu>";

            for (i = 0; i < stats.length; i++) {
                statsLabel[i] = stats[i].stat.name;
                statsValues[i] = stats[i].base_stat;
            }



            var tarjeta = '<div class="card">';
            tarjeta += `<img src="${imagen}" class="card-img-top" alt="..." style="padding:20px;">
            <div class="card-body">
                <h5 class="card-title">Nro: ${pokeID}</h5>
                <hr>
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
                    <hr>    
                    <table border='1' width="30%" padding="5px"; border-radius="5px"; >
                        <tr align="center" style=""><td>Tipos</td></tr>
                        <tr align="center"><td>${listaTipos}</td></tr>
                    </table>
                    <table border="1" padding="5px"; width="80%";>
                    <hr>
                        <tr align="center" style=""><td>Altura</td><td>Peso</td><td>Especie</td></tr>
                        <tr align="center"><td>${altura}</td><td>${peso}</td><td>${specie}</td></tr>
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
            
            $('.carousel').hide();
            $(".gifAnimado").hide();
            $(".info-group").hide();
            $("#poke-container").hide();
            $("#unPokemon").show();
            
        });
    }
}

function showCreditos(){
    $('.carousel').hide();
    $(".gifAnimado").hide();
    $("#poke-container").hide();
    $("#unPokemon").hide();
    $(".info-group").show();
}