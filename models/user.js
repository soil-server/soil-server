module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        google_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_photo: DataTypes.STRING,
        google_name: DataTypes.STRING,
        first_name: DataTypes.STRING
    });

    User.associate = function(models) {
        User.hasMany(models.Care, {
          onDelete: "cascade"
        });
      };
    return User;
}