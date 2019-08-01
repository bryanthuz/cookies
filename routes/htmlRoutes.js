var path = require("path");

var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/example", function(req, res) {
    res.render("example");
  });

  app.get("/gallery", function(req, res) {
    db.Cookie.findAll({}).then(function(dbCookies) {
      res.render("gallery", {
        cookies: dbCookies
      });
    });
  });
  
  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  app.get("/about", function(req, res) {
    res.render("public");
  });

  // app.get("/cms", function(req,res) {
  //   //put code here
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
