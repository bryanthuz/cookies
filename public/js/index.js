// Get references to page elements
var $cookieText = $("#cookie-text");
var $cookieKeywords = $("#cookie-keywords");
var $cookieDescription = $("#cookie-description");
var $cookieImg = $("#cookie-img");
var $cookieCat = $("#cookie-category");
var $submitBtn = $("#submit");
var $cookieList = $("#cookie-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveCookie: function(cookie) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/cookies",
      data: JSON.stringify(cookie)
    });
  },
  getCookies: function() {
    return $.ajax({
      url: "api/cookies",
      type: "GET"
    });
  },
  deleteCookies: function(id) {
    return $.ajax({
      url: "api/cookies/" + id,
      type: "DELETE"
    });
  }
};

// refreshcookies gets new cookies from the db and repopulates the list
var refreshcookies = function() {
  API.getCookies().then(function(data) {
    var $cookies = data.map(function(cookie) {
      var $a = $("<a>")
        .text(cookie.text)
        .attr("href", "/cookie/" + cookie.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": cookie.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $cookieList.empty();
    $cookieList.append($cookies);
  });
};

// handleFormSubmit is called whenever we submit a new cookie
// Save the new cookie to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("Submit Clicked!")
  var cookie = {
    text: $cookieText.val().trim(),
    description: $cookieDescription.val().trim()
  };

  if (!(cookie.text && cookie.description)) {
    alert("You must enter an cookie text and description!");
    return;
  }

  API.savecookie(cookie).then(function() {
    refreshcookies();
  });

  $cookieText.val("");
  $cookieDescription.val("");
};

// handleDeleteBtnClick is called when an cookie's delete button is clicked
// Remove the cookie from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletecookie(idToDelete).then(function() {
    refreshcookies();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$cookieList.on("click", ".delete", handleDeleteBtnClick);
