console.log("hello world! Index");

// Get references to page elements
var $ckeText = $("#cookie-text");
// var $ckeKeywords = $("#cookie-keywords");
var $ckeDescription = $("#cookie-description");
// var $ckeImg = $("#cookie-img");
// var $ckeCat = $("#cookie-category");
var $submitBtn = $("#submit");
var $ckeList = $("#cookie-list");

// The API object contains methods for each kind of request we'll make
var API = {
  savecookie: function(cke) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/cookies",
      data: JSON.stringify(cke)
    });
  },
  getcookies: function() {
    return $.ajax({
      url: "api/cookies",
      type: "GET"
    });
  },
  deletecookies: function(id) {
    return $.ajax({
      url: "api/cookies/" + id,
      type: "DELETE"
    });
  }
};

// refreshckes gets new ckes from the db and repopulates the list
var refreshcookies = function() {
  API.getcookies().then(function(data) {
    var $ckes = data.map(function(cke) {
      var $a = $("<a>")
        .text(cke.text)
        .attr("href", "/gallery/" + cke.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": cke.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $ckeList.empty();
    $ckeList.append($ckes);
  });
};

// handleFormSubmit is called whenever we submit a new cke
// Save the new cke to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("Submit Clicked!")
  var cke = {
    text: $ckeText.val().trim(),
    description: $ckeDescription.val().trim()
  };

  if (!(cke.text && cke.description)) {
    alert("You must enter an cke text and description!");
    return;
  }

  API.savecke(cke).then(function() {
    refreshcookies();
  });

  $ckeText.val("");
  $ckeDescription.val("");
};

// handleDeleteBtnClick is called when an cke's delete button is clicked
// Remove the cke from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletecke(idToDelete).then(function() {
    refreshcookies();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$ckeList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function(){
  $(".menu-btn").click(function() {
    $(".flex-nav").slideToggle(1000);
  })

  function fixMenu(mq) {
    if (mq.matches) {
      // 767px or smaller
      // document.body.style.backgroundColor = "yellow";
    } else {
      // 768px or greater
      $(".flex-nav").css("display", "");
    }
  }

  var mq = window.matchMedia("(max-width: 767px)");
  fixMenu(mq); // Call listener function at run time
  mq.addListener(fixMenu); // Attach listener function on state changes

  $("#textarea1").val("New Text");
  M.textareaAutoResize($("#textarea1"));
});
