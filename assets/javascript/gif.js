//////IMPORTANT GIPHY PARAMETERS ////////
//// q
//// limit
//// rating

// ARRAY OF DOGS TO HAVE LISTED ON THE PAGE TO START (not currently doing it this way)
var topics = [
  "Shetlie",
  "Bulldog",
  "Labrador",
  "German Shepherd",
  "Husky",
  "Boxer",
  "Border Collie",
  "Collie",
  "Dalmation",
  "Poodle"
];
///////////////////////////////////////////////////////////// (buttons were right next to each other, no space between them)
// FUNCTION TO MAKE A BUTTON FOR EACH DOG BRED
// function makeButton () {
//     var more = document.getElementById("dog-button");
//     for (var i = 0; i < topics.length; i++) {
//       var newButton = document.createElement("button");
//       newButton.innerHTML=topics[i];
//       more.appendChild(newButton);
//     }
//   }
//   makeButton();
///////////////////////////////////////////////////////////////

// Adding click event listen listener to all buttons
$("button").on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  var animal = $(this).attr("data-animal");

// Constructing a queryURL using the animal name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=A1xDFiGHVrU0HZH3N2kAt6m0llY8Vurw&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
});
