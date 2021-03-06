module.exports = (sequelize, DataTypes) => {
  // 테이블명과 각 컬럼의 스펙을 입력한다.
  return sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.CHAR,
        unique: true,
        allowNull: false
      },
      password: {
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
