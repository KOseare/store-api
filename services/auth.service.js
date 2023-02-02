const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const {config} = require('../config');

const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        delete user.dataValues.password;
        return user;
      }
    }
    throw boom.unauthorized();
  }

  signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {user, token};
  }

  async sendRecovery (email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtRecoverySecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;

    await service.update(user.id, {recoveryToken: token});

    const mail = {
      from: config.smtpUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Password recovery', // Subject line
      html: `<b>Access this link to recover your password: ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
          user: config.smtpUser,
          pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoMail);

    return {message: 'Mail sent!'};
  }

  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecoverySecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return {message: 'Password changed!'};
    } catch (error) {
      throw boom.unauthorized();
    }
  }

}

module.exports = AuthService;
