module.exports = function (sequelize, DataTypes) {
    var Care = sequelize.define("Care", {
        common_name: DataTypes.STRING,
        binomial_name: DataTypes.STRING,
        description: DataTypes.STRING,
        sowing_method: DataTypes.STRING,
        sun_requirements: DataTypes.STRING
    });
    Care.associate = function(models) {
        Care.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Care;
};