module.exports = function (sequelize, DataTypes) {
    var Reading = sequelize.define("Reading", {
        soil_moisture: DataTypes.INTEGER,
        temperature: DataTypes.INTEGER,
        humidity: DataTypes.INTEGER
        
    });
    Reading.associate = function(models) {
        Reading.belongsTo(models.Plant, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Reading;
};