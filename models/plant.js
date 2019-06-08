module.exports = function (sequelize, DataTypes) {
    var Plant = sequelize.define("Plant", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        plant_name: DataTypes.STRING,
        moisture_level: DataTypes.INTEGER
    });
    return Plant;
}