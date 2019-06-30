//////IMPORTANT GIPHY PARAMETERS ////////
//// q - search query term or phrase
//// limit - maximum number of objects to return, the default is 25
//// rating - filters results by rating. If not specified, results will include all possible ratings

// ARRAY OF DOGS TO HAVE LISTED ON THE PAGE TO START (not currently doing it this way)
var topics = [
  "sheltie",
  "bulldog",
  "labrador",
  "husky",
  "boxer (dog)",
  "border collie",
  "collie",
  "dalmation",
  "german shepherd",
  "australian shepherd",
  "pomeranian"
];

// TESTING FUNCTIONALITY OF ADDING BUTTONS TO TOPICS
function addButton() {
topics.push("big dog");
topics.push("small-dog");
topics.push("lazy dog");
}
addButton();
////////////////////////////////////////////////////////////
// FUNCTION TO MAKE A BUTTON FOR EACH DOG BRED
for(var i = 0; i < topics.length; i++)  {

  // Inside the loop...

  // 2. Create a variable named "topicsButton" equal to $("<button>");

      var topicsButton = $("<button>");

  // 3. Then give each "topicsButton" the following classes: "topics-button" "topics" "topics-button-color".
      topicsButton.addClass("topics-button topics topics-button-color");

  // 4. Then give each "topicsButton" an attribute called "data-anaimal", with a value eqaual to "topics[i]"
      topicsButton.attr("data-animal", topics[i]);

  // 5. Then give each "topicsButton" a text equal to "topics[i]".
      topicsButton.text(topics[i]);

  // 6. Finally, append each "topicsButton" to the "#buttons" div (provided).
      $("#buttons").append(topicsButton);
}
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
/// ONCLICK EVENT TO ATTACH DATA-ANIMAL ATTRIBUTE ///


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
      // console.log(queryURL);

      // console.log(response);
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

