console.log("hello world! Admin");

$(function() {
  // Add a new burger.
  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    console.log("Submit Clicked!")

    var newCookie = {
      name: $("#cookie-text")
        .val()
        .trim(),
      description: $("#cookie-description")
        .val()
        .trim(),
      image: $("#cookie-file-name")
        .val()
        .trim(),
      category: $("#cookie-category")
        .val()
        .trim()
    };

    console.log(newCookie)

    // Send the POST request.
    $.ajax("/api/cookies", {
      type: "POST",
      data: newCookie
    }).then(function() {
      console.log("Added new cookie");
      // Reload the page to get the updated burger list.
      location.reload();
    });
  });

  $(".updateCookie").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");
    var devouredState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/cookies/" + id, {
      type: "PUT",
      data: devouredState
    }).then(function() {
      console.log("Burger devoured");
      location.reload();
    });
  });

  $(".deleteCookie").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax({
      type: "DELETE",
      url: "/api/cookie/" + id
    }).then(location.reload());
  });
});
