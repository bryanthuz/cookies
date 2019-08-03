var path = require("path");

var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/admin", function(req, res) {
    res.render("admin");
  });

  app.get("/gallery", function(req, res) {
    db.Cookie.findAll({
      order: [["id", "DESC"]]
    }).then(function(dbCookies) {
      res.render("gallery", {
        cookies: dbCookies
      });
    });
  });

  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  app.get("/about", function(req, res) {
    res.render("about");
  });

  app.get("/order", function(req, res) {
    res.render("order");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
