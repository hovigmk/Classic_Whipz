const User = require('./User');
const Car = require('./Car');
const Comment = require('./Comment');


User.hasMany(Car, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Car.belongsTo(User, {
  foreignKey: 'userid',
});

Car.hasMany(Comment, {
  foreignKey: 'carid',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'carid'
});

User.hasMany(Comment, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userid'
});

module.exports = { User, Car, Comment };