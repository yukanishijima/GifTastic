var topics = ["Ryan Gosling", "Leonardo DiCaprio", "Ryan Reynolds", "Jennifer Aniston", "Brad Pitt", "Johnny Depp", "Rachel McAdams"];
var gifCount = 0;

//display buttons
function displayButtons() {
  //delete buttons before adding new buttons
  $("#button-appear-here").empty();
  for (var i = 0; i < topics.length; i++) {
    var buttons = $("<button>" + topics[i] + "</button>").attr("data-name", topics[i]);
    $("#button-appear-here").append(buttons);
  }
}

//display gif images to page
$(document.body).on("click", "button", function () {
  var myAPIKey = "5F5rFtQgjLKdiiUfI8X8zInqhKd0Aztw";
  var actor = $(this).attr("data-name").toUpperCase();
  console.log(actor);

  // check if user click the same button as before
  if (actor === $("#gif-appear-here").attr("data-actor")) {
    gifCount = gifCount + 5;
  } else {
    //if not, clear all gifs first!
    $("#gif-appear-here").empty();
    console.log("gifs have been cleared!");
  }

  // constructing a URL to search Giphy
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    actor +
    "&api_key=" +
    myAPIKey +
    "&limit=" +
    70;

  // performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //store results to array
    var result = response.data;

    console.log(result);
    console.log(gifCount);

    //loop through array to get a result item
    for (var j = gifCount; j < gifCount + 5; j++) {
      console.log(result[j]);
      //runs only if the rating is appropriate
      // if (result[j].rating !== "r" && result[j].rating !== "pg-13") {
      if (result[j].rating !== "r") {

        var newDiv = $("<div id='newDiv'>");
        //set image
        var gifImage = $("<img>")
          .attr("src", result[j].images.fixed_height_still.url)
          .attr("data-animate", result[j].images.fixed_height.url)
          .attr("data-still", result[j].images.fixed_height_still.url)
          .attr("data-state", "still");
        newDiv.append(gifImage);

        //set title
        var gifTitle = $("<p class='gifTitle'>").text(result[j].title);
        newDiv.append(gifTitle);

        //set rating
        var gifRating = $("<p>").text(result[j].rating.toUpperCase());
        newDiv.append(gifRating);
      }
      //display rating and image
      $("#gif-appear-here").append(newDiv);

      // add data-actor of the button clicked!
      $("#gif-appear-here").attr("data-actor", actor);
    }

    //add load more button at the end of gifs
    $("#loadMore").remove();
    var loadMore = $("<button id='loadMore'>Load more Giphy!</button>").attr("data-name", actor);
    loadMore.insertAfter($("#gif-appear-here"));
  });
});

//delete the load more button once clicked!
$(document.body).on("click", "#loadMore", function () {
  $("#loadMore").remove();
});

//animate the gif when clicked
$(document.body).on("click", "img", function () {
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
$("#submit").on("click", function (event) {
  event.preventDefault();
  //runs only when there's a value
  if (($("#user-input").val().length) !== 0) {
    var userInput = $("#user-input")
      .val()
      .trim();
    topics.push(userInput);
    displayButtons();
    // delete the input after displaying the new button
    $("#user-input").val("");
  }
});

$(document).ready(function () {
  displayButtons();
});


//go up button function
var pagetop = $('#page-top');
pagetop.hide();
$(window).scroll(function () {
  //when scrolled more than 400px
  if ($(this).scrollTop() > 400) {
    pagetop.fadeIn();
  } else {
    pagetop.fadeOut();
  }
});
pagetop.click(function () {
  //go up to the top in 0.5sec
  $('body,html').animate({
    scrollTop: 0
  }, 500);
  return false;
});
