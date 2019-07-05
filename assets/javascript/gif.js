////// IMPORTANT GIPHY PARAMETERS ////////
//// q - search query term or phrase
//// limit - maximum number of objects to return, the default is 25
//// rating - filters results by rating. If not specified, results will include all possible ratings

/// STARTING ARRAY OF DOGS TO HAVE LISTED ON THE PAGE ///
var topics = [
  "Shetland Sheepdog",
  "Bulldog",
  "Labrador",
  "Husky",
  "Boxer (dog)",
  "Border collie",
  "Collie",
  "Dalmation",
  "German Shepherd",
  "Australian Shepherd",
  "Pomeranian"
];

/// FUNCTION FOR INITIAL SET OF DOG BREED BUTTONS ON THE PAGE FROM THE ARRAY ABOVE ///
function makeButtons() {

  $("#topics").empty();

  for (var i = 0; i < topics.length; i++) {
    $("#topics").append('<button class="topic-buttons btn btn-primary">' + topics[i] + '</button>');
  }
}

/// TO ADD ADDITIONAL BUTTONS TO BE DISPLAYED WHEN THE USER ENTERS SOMETHING INTO THE TEXT BOX /// 
$(document).on('click', '#addTopic', function (event) {

  event.preventDefault();

  var newTopic = $("#new-item").val().trim();
  topics.push(newTopic);

  $("#topics").append('<button class="topic-buttons btn btn-primary">' + newTopic + '</button>');

  /// TO CLEAR WHATEVER USER TYPED INTO THE INPUT BOX ///
  $("#new-item").val("");   
});

/// EVENT LISTENER ////
$(document).on('click', '.topic-buttons', function (event) {

  /// STORING OUR GIPHY API URL FOR DOG IMAGE ///
  var type = this.innerText;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    type + "&api_key=A1xDFiGHVrU0HZH3N2kAt6m0llY8Vurw&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {

        $("#gifs-go-here").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
      }
    });

  $("#gifs-go-here").empty();

});
makeButtons();


/// MAKE GIFS START AND STOP WHEN CLICKED ON ///
$('body').on('click', '.gif', function () {
  var src = $(this).attr("src");
  if ($(this).hasClass('playing')) {
  /// STOP ///
    $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
    $(this).removeClass('playing');
  } else {
  /// PLAY ///
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});
