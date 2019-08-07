var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/cookies-test", function(req, res) {
    db.CookieTest.findAll({}).then(function(dbCookies) {
      res.json(dbCookies);
    });
  });

  app.get("/api/cookies", function(req, res) {
    db.Cookie.findAll({}).then(function(dbCookies) {
      res.json(dbCookies);
    });
  });

  app.get("/api/cookies/category", function(req, res) {
    db.Cat.findAll({}).then(function(dbCats) {
      res.json(dbCats);
    });
  });

  //Get route for returning posts of a specific category
  app.get("/api/cookies/category/:category", function(req, res) {
    db.Cookie.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(cookieCats) {
      res.json(cookieCats);
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

  app.get("/api/instagram", function(req, res) {
    axios({
      method: "get",
      url:
        "https://api.instagram.com/v1/users/self/media/recent/?access_token=" +
        process.env.INSTAGRAM_CODE
    })
      .then(function(response) {
        res.json(response.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  // POST route for saving a new cookie
  app.post("/api/cookies/cms", function(req, res) {
    db.Cookie.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category
    }).then(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new category
  app.post("/api/cookies/cats", function(req, res) {
    db.Cat.create({
      name: req.body.name
    }).then(function(results) {
      res.json(results);
    });
  });
};
