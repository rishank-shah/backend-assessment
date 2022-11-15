const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'userID',
      });
    }
  }
  
  Movie.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      movie_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      cast: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: false,
      },
      genre: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      release_date: {
          type: DataTypes.DATE,
          allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      tableName: 'movies',
    }
  );

  return Movie;
};
