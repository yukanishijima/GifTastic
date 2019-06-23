var topics = ["Ryan Gosling", "Keanu Reeves", "Jennifer Aniston", "Brad Pitt"];

//display buttons
function displayButtons() {
  //delete buttons before adding new buttons
  $("#button-appear-here").empty();
  for (var i = 0; i < topics.length; i++) {
    var buttons = $("<button>" + topics[i] + "</button>");
    $("#button-appear-here").append(buttons);
  }
}

//display gif images to page
$(document.body).on("click", "button", function() {
  //clear all gifs first!
  $("#gif-appear-here").empty();

  var myAPIKey = "5F5rFtQgjLKdiiUfI8X8zInqhKd0Aztw";
  var actor = $(this).text();
  console.log(actor);

  // constructing a URL to search Giphy
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    actor +
    "&api_key=" +
    myAPIKey +
    "&limit=" +
    10;

  // performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //store results to array
    var result = response.data;
    console.log(result);

    //loop through array to get a result item
    for (var j = 0; j < result.length; j++) {
      console.log(result[j]);
      //runs only if the rating is appropriate
      if (result[j].rating !== "r" && result[j].rating !== "pg-13") {
        var newDiv = $("<div id='newDiv'>");
        //set title
        var gifTitle = $("<p class='gifTitle'>").text(result[j].title);
        newDiv.append(gifTitle);

        //set rating
        var gifRating = $("<p>").text("Rating: " + result[j].rating);
        newDiv.append(gifRating);

        //set image
        var gifImage = $("<img>")
          .attr("src", result[j].images.fixed_height_still.url)
          .attr("data-animate", result[j].images.fixed_height.url)
          .attr("data-still", result[j].images.fixed_height_still.url)
          .attr("data-state", "still");
        newDiv.append(gifImage);
      }
      //display rating and image
      $("#gif-appear-here").append(newDiv);
    }
  });
});

//animate the gif when clicked
$(document.body).on("click", "img", function() {
  //get data state
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

//create new buttons with a form!
$("#submit").on("click", function(event) {
  event.preventDefault();
  var userInput = $("#user-input")
    .val()
    .trim();
  topics.push(userInput);
  displayButtons();
  // delete the input after displaying the new button
  $("#user-input").val("");
});

$("document").ready(function() {
  displayButtons();
});
