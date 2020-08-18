module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book', {
        name: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false,
    })
}