$(document).ready(function() {
  $.ajax({
    url: "/api/instagram",
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    var profile = results[0].user.profile_picture;
    $("#profile").append(
      $("<img/>")
        .attr("src", profile)
        .width(35)
    );

    for (var i = 0; i < 6; i++) {
      var insta = results[i].images.thumbnail.url;
      var test = results[10].id;
      //   var link = results[i].link;
      console.log(test);
      console.log(insta);

      $("#instagram-" + i).append($("<img/>").attr("src", insta));
    }
  });
});

$(document).ready(function() {
  $(".parallax").parallax();
});
