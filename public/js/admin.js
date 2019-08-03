var nameInput = $("#cookie-name");
var descInput = $("#cookie-description");
var imageInput = $("#cookie-file-name");
var categoryInput = $("#cookie-category");
var updating = false;
var url = window.location.search;
var cookieId;

if (url.indexOf("?cookie_id=") !== -1) {
  cookieId = url.split("=")[1];
  getPostData(cookieId);
}

$(function() {
  // Add a new burger.
  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    console.log("Submit Clicked!");

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

    console.log(newCookie);

    if (updating) {
      newCookie.id = cookieId;
      updateCookie(newCookie);
    } else {
      createCookie(newCookie);
    }
  });

  function createCookie(newCookie) {
    // Send the POST request.
    $.ajax("/api/cookies", {
      type: "POST",
      data: newCookie
    }).then(function() {
      console.log("Added new cookie");
      // Reload the page to get the updated cookie list.
      location.reload();
    });
  }

  function updateCookie(cookieId) {
    // Send the PUT request.
    $.ajax(
      "/api/cookies/" + cookieId,
      {
        type: "PUT",
        url: "/api/cookies",
        data: cookies
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function() {
      console.log("Cookie Updated");
      location.reload();
    });
  }

  function getCookieData(id) {
    $.get("/api/cookie/" + id, function(data) {
      console.log("Getting Cookie Data!");
      if (data) {
        // If this post exists, prefill our cms forms with its data
        nameInput.val(data.name);
        descInput.val(data.description);
        imageInput.val(data.image);
        categoryInput.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  $(".updateCookie").on("click", function(event) {
    event.preventDefault();
    updating = false;
    cookieId = $(this).data("id");
    console.log("Update Cookie Clicked!");
    getCookieData(cookieId);
  });

  $(".deleteCookie").on("click", function(event) {
    event.preventDefault();
    console.log("Delete clicked!")
    cookieId = $(this).data("id");
    console.log(cookieId);

    // Send the DELETE request.
    $.ajax({
      type: "DELETE",
      url: "/api/cookies/" + cookieId
    }).then(location.reload());
  });
});
