let pokeData, userInput;

const $name = $("#name");
const $sprite = $("#pokemonSprite");
const $shiny = $("#shinySprite");
const $stats = $("#baseStats");
// const promise = $.ajax({
//     url:'https://pokeapi.co/api/v2/pokemon/1'});
// console.log(promise);
//Right now the console.log only shows Pokemon 1-20. How do I get it to show all 1000+ pokemon?


$('form').on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();
       // calling preventDefault() on a 'submit' event will prevent a page refresh  
    userInput = $("#pokemonInput").val();
       // getting the user input
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + userInput
      }).then(
        (data) => {
         pokeData = data;
         render();
        },
        (error) => {
         console.log('bad request', error);
         alert("No Pokemon Detected");
        }
    );    
}

$("#baseStats").map(function() {
    return this.$stats;
})

function render() {
    $name.text(pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1));
    $sprite.attr("src", pokeData.sprites.front_default);
    $shiny.attr("src", pokeData.sprites.front_shiny);
    $stats.empty();
    pokeData.stats.forEach(function(stat) {
        $stats.append(`<div>${stat.stat.name}: ${stat.base_stat}</div>`);
    });
}
