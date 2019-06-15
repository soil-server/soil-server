module.exports = function (sequelize, DataTypes) {
    var Plant = sequelize.define("Plant", {
        plant_name: DataTypes.STRING
    });

    Plant.associate = function(models) {
        Plant.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        }),
        Plant.hasMany(models.Reading)
        
    };
    // Plant.associate = function(models) {
    //     Plant.hasMany(models.Reading)
    // };

    return Plant;
}