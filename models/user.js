module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        google_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_photo: DataTypes.STRING,
        google_name: DataTypes.STRING,
        given_name: DataTypes.STRING
    });
    return User;
}