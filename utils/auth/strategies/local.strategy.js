const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {Strategy} = require('passport-local');
const UserService = require('../../../services/user.service');

const service = new UserService();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          delete user.dataValues.password;
          return done(null, user);
        }
      }
      return done(boom.unauthorized(), false);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
