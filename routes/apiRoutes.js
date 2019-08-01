var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/cookies", function(req, res) {
    db.Cookie.findAll({}).then(function(dbCookies) {
      res.json(dbCookies);
      console.log("hello")
    });
  });

  //Get route for returning posts of a specific category
  app.get("/api/cookies/category/:category", function(req, res) {
    db.Cookie.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbCookies) {
      res.json(dbCookies);
    });
  });

  // Create a new example
  app.post("/api/cookies", function(req, res) {
    db.Cookie.create(req.body).then(function(dbCookies) {
      res.json(dbCookies);
    });
  });

  // Delete an example by id
  app.delete("/api/cookies/:id", function(req, res) {
    db.Cookie.destroy({ where: { id: req.params.id } }).then(function(
      dbCookies
    ) {
      res.json(dbCookies);
    });
  });

  app.get("/api/cookies/:id", function(req, res) {
    db.Cookie.findOne({ where: { id: req.params.id } }).then(function(
      dbCookies
    ) {
      res.json(dbCookies);
    });
  });

  //PUT route for updating cookies
  app.put("/api/cookies", function(req, res) {
    db.Cookie.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbCookies) {
      res.json(dbCookies);
    });
  });

  // POST route for saving a new post
  app.post("/api/cookies/cms", function(req, res) {
    db.Cookie.create({
      name: req.body.name,
      keywords: req.body.keywords,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category
    }).then(function(results) {
      res.json(results);
    });
  });
};
