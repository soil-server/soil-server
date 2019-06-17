module.exports = function (sequelize, DataTypes) {
    var Usercare = sequelize.define("Usercare", {
        google_id: {
            type: DataTypes.STRING
        },
        user_photo: DataTypes.STRING,
        google_name: DataTypes.STRING,
        first_name: DataTypes.STRING,
        plant: DataTypes.STRING
    });

    return Usercare;
}