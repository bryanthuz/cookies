module.exports = function(sequelize, DataTypes) {
  var Cat = sequelize.define("Cat", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
      defaultValue: "Custom Sugar Cookies"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    }
  });

  Cat.associate = function(models) {
    // Associating Cats with Cookies
    // When an Cat is deleted, also delete any associated Posts
    Cat.hasMany(models.Cookie, {
      onDelete: "cascade"
    });
  };

  return Cat;
};
