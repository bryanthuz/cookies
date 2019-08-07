var nameInput = $("#cookie-text");
var descInput = $("#cookie-description");
var imageInput = $("#cookie-fl-name");
var categoryInput = $("#cookie-categories");
var updating = false;
var url = window.location.search;
var cookieId;

$(document).ready(function() {
  $("select").formSelect();

  function getCookieData(cookieId) {
    $.get("/api/cookies/" + cookieId, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        nameInput.text(data.name);
        descInput.text(data.description);
        imageInput.text(data.image);
        categoryInput.children().each(function() {
          if ($(this).val() === data.category) {
            $(this).attr("selected", true)
          }
        });
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        // updating = true;
      }
      console.log(nameInput + descInput + imageInput + categoryInput);
      console.log("Getting Cookie Data!" + cookieId + updating);
      // window.location.href = "/admin?cookie_id=" + cookieId;
    });
  }

  if (url.indexOf("?cookie_id=") !== -1) {
    cookieId = url.split("=")[1];
    getCookieData(cookieId);
  }

  $(function() {
    // Add a new cookie.
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
      console.log("Submit Clicked!");

      var userCategory = $(this).val();
      console.log("User Category Selected" + userCategory)

      var newCookie = {
        name: $("#cookie-text")
          .val()
          .trim(),
        description: $("#cookie-description")
          .val()
          .trim(),
        image: $("#cookie-fl-name")
          .val()
          .trim(),
        category: userCategory
      };

      console.log(newCookie);

      if (updating) {
        newCookie.id = cookieId;
        updateCookie(newCookie);
      } else {
        createCookie(newCookie);
      }
    });

    $(".category-form").on("submit", function(event) {
      event.preventDefault();
      console.log("Submit Clicked!");

      var newCategory = {
        name: $("#cookie-category")
          .val()
          .trim()
      };
      console.log(newCategory);
      createCategory(newCategory);
    });

    function createCookie(newCookie) {
      // Send the POST request.
      $.ajax("/api/cookies", {
        type: "POST",
        data: newCookie
      }).then(function() {
        console.log("Added new cookie");
        // Reload the page to get the updated cookie list.
        // location.reload();
      });
    }

    function createCategory(newCategory) {
      // Send the POST request.
      $.ajax("/api/cookies/cats", {
        type: "POST",
        data: newCategory
      }).then(function() {
        console.log("Added new category");
        // Reload the page to get the updated category list.
        // location.reload();
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
        console.log("Update Button Clicked");
        location.reload();
      });
    }

    // function handleCookieEdit() {
    //   var currentCookie = $(this)
    //     .parent()
    //     .parent()
    //     .data("cookie");
    //   window.location.href = "/admin?cookie_id=" + currentCookie.id;
    // }

    $(".updateCookie").on("click", function(event) {
      event.preventDefault();
      updating = false;
      cookieId = $(this).data("id");
      console.log("Update Cookie Clicked!");
      getCookieData(cookieId);
    });

    $(".deleteCookie").on("click", function(event) {
      event.preventDefault();
      console.log("Delete clicked!");
      cookieId = $(this).data("id");
      console.log(cookieId);

      // Send the DELETE request.
      $.ajax({
        type: "DELETE",
        url: "/api/cookies/" + cookieId
      }).then(location.reload());
    });
  });
});
