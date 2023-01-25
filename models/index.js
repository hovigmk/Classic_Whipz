const User = require('./user');
const Car = require('./car');
const Payment = require('./payment');

User.hasMany(Car, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Car.belongsTo(User, {
    foreignKey: 'userId',
});

User.hasOne(Payment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Payment.belongsTo(User, {
    foreignKey: 'userId',
});

Car.hasOne(Payment, {
    foreignKey: 'carId',
    onDelete: 'CASCADE',
});

module.exports = { User, Car, Payment };