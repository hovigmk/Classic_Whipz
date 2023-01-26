const User = require('./User');
const Car = require('./Car');
//const Payment = require('./Payment');

User.hasMany(Car, {
    foreignKey: 'userid',
    onDelete: 'CASCADE'
  });
  
  Car.belongsTo(User, {
    foreignKey: 'userid'
  });

module.exports = { User, Car };