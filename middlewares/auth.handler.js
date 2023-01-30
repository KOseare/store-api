const boom = require('@hapi/boom');

function checkRoles (...roles) {
  return (req, res, next) => {
    const {user} = req;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden(`${roles.join(' or ')} permissions are required`));
    }
  };
}

module.exports = {checkRoles};
