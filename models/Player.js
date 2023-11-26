module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    xid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    joinTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
   tableName: 'players'   
  })

  return Player
}
