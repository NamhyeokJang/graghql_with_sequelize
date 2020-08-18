const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Author = require('./author')(sequelize, Sequelize)
db.Book = require('./book')(sequelize, Sequelize)


db.Author.hasMany(db.Book, { foreignKey: 'authorId', sourceKey: 'id' })
db.Book.belongsTo(db.Author, { foreignKey: 'authorId', targetKey: 'id' })



module.exports = db;
