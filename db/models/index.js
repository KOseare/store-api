const {User, UserSchema} = require('./user.model');
const {Customer, CustomerSchema} = require('./customer.model');

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  User.init(CustomerSchema, Customer.config(sequelize));
}

module.exports = setupModels;
