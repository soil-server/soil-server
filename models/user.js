module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      googleId: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      phone: DataTypes.STRING
    });
    return User;
  };