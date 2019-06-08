module.exports = function (sequelize, DataTypes) {
    var PublicData = sequelize.define("public_dataset", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        network: DataTypes.STRING,
        station_id: DataTypes.STRING,
        year: DataTypes.INTEGER,
        month: DataTypes.INTEGER,
        day: DataTypes.INTEGER,
        doy: DataTypes.INTEGER,
        sm_20: DataTypes.INTEGER,
        lat: DataTypes.INTEGER,
        lon: DataTypes.INTEGER
    });
    return PublicData;
}