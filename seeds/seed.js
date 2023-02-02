const sequelize = require('../config/connection');
const { User, Car, Comment } = require('../models');

const userData = require('./userData.json');
const carData = require('./carData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const car of carData) {
    await Car.create({
      ...car,
      //userid: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,

    });
  }

  process.exit(0);
};

seedDatabase();
