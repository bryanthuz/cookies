$(document).ready(function(){
  $(".materialboxed").materialbox();
  $("select").formSelect();

  $("#category").on("click", function() {
    var userCategory = $(this).val();
    console.log(userCategory)

    $.get("/api/cookies/category/" + userCategory, function(data) {
      console.log(data);
      showCategory(data);
    });

    function showCategory(data) {
      if (data.length !== 0) {
        $("#container").empty();
        $("#container").show();

        for (var i = 0; i < data.length; i++) {
          var div = $("<div>");

          div.append("<img>" + data[i].image + "</img>");
          div.append("<p> " + data[i].name + "</p>");

          $("#container").append(div);
        }
      }
    }
  });
});
