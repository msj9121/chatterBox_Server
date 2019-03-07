const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "production";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Room = require("./room")(sequelize, Sequelize);

// db.Room.hasMany(db.Comment, {foreignKey: "roomId", sourceKey: "id"});
// db.Comment.belongsTo(db.Room, {foreignKey: "roomId", targetKey: "id"});

db.User.hasMany(db.Comment, {foreignKey: "commenter", sourceKey: "email"});
db.Room.hasMany(db.Comment, {foreignKey: "roomName", sourceKey: "roomName"});
// db.Comment.belongsTo(db.User, {foreignKey: "commenter", targetKey: "id"});

module.exports = db;
