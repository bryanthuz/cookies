module.exports = function(sequelize, DataTypes) {
  var Cookie = sequelize.define("Cookie", {
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
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Custom Cookies"
    }
  });
  return Cookie;
};
