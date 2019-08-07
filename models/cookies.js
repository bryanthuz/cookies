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

  Cookie.associate = function(models) {
    // We're saying that a Cookie should belong to an Cat
    // A Cookie can't be created without an Cat due to the foreign key constraint
    Cookie.belongsTo(models.Cat, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Cookie;
};
