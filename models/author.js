module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        name: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
    })
}