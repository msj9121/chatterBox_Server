module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "comments",
    {
      comment: {
        type: DataTypes.TEXT,
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
