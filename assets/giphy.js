//Array animals 
var topics = ['Sloth', 'Puppy', 'Lama', 'Elephant', 'Lemur', 'Jaguar', 'Kitten', 'Tucan', 'Monkey'];

// Array buttons 
function renderButtons() {
    $('#animalButtons').empty();
    //Loop through the animal array 
    for (var i = 0; i < topics.length; i++) {
        var animalBut = $('<button>');
        animalBut.addClass('animal btn btn-info');
        animalBut.attr('type', 'button');
        animalBut.attr('data-name', topics[i]);
        animalBut.text(topics[i]);
        $('#animalButtons').append(animalBut);
    }

}

renderButtons();


//On button click Ajax request(uses document.on('click') so it also works for dynamically made new buttons)
$(document).on('click', '.animal', function () {

    var animal = $(this).data('name');
    var apikey = "QzmZUdwIV58QlqYnpEIdUwCEosj0zCQr"
    var queryURL = "https://developers.giphy.com/dashboard/" + animal + "&apikey=QzmZUdwIV58QlqYnpEIdUwCEosj0zCQr";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $('<div>');
                var animalImage = $('<img>');
                var rating = results[i].rating;
                var ratingDisplay = $('<p>').text('Rating: ' + rating);

                animalImage.attr('src', results[i].images.fixed_height_still.url);
                //Animate and pause gifs
                animalImage.addClass('gif');
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);
                animalImage.attr('data-state', 'still');
                animalDiv.append(animalImage);
                animalDiv.append(ratingDisplay);

                $('#animal-gifs').prepend(animalDiv);
            }
        });
});

//On click animating and pausing
$(document).on('click', '.gif', function () {

    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

//Add user animal
$('#add-animal').on('click', function () {
    var userInputAnimal = $('#animal-input').val().trim();
    topics.push(userInputAnimal);
    renderButtons();
    return false;

});