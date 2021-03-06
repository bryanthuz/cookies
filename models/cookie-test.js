module.exports = function(sequelize, DataTypes) {
  var CookieTest = sequelize.define("CookieTest", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
      defaultValue: "Example Cookie Name"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Default description"
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      },
      defaultValue: "example_cookies_image.jpg"
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Custom Cookies"
    }
  });
  return CookieTest;
};
