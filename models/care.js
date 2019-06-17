module.exports = function (sequelize, DataTypes) {
    var Care = sequelize.define("Care", {
        name: DataTypes.STRING
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