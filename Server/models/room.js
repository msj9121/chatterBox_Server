module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "rooms",
    {
      roomName: {
        type: DataTypes.CHAR,
        unique: true,
        allowNull: false
      },
      roomCtor: {
        type: DataTypes.CHAR,
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
};
