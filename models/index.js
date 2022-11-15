const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres',
    }
);

const db = {};

const User = require("./user")(sequelize, Sequelize.DataTypes)
const Movie = require("./movie")(sequelize, Sequelize.DataTypes)

db["user"] = User
db["movie"] = Movie 

const createTables = async() =>{
    await User.sync();
    await Movie.sync();
}

createTables();

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;