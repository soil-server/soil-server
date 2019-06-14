module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });
    
    User.associate = function(models) {
        User.hasMany(models.Care),
        User.hasMany(models.Plant)
    };
    // User.associate = function(models) {
    //     User.hasMany(models.Plant)
    // };
    return User;
}