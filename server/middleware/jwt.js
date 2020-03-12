var passKey = "^&1238MESS1o2uENger";
var externalPassKey = "127hME$$Elkdafn55%%$$))!!="

module.exports = {
  generateToken: function (user) {
    //generate jwt token
    var jwt = require("jsonwebtoken");
    var token = jwt.sign(user, passKey);
    return token;
  },

  generateTokenForAPI: function (user) {
    //generate jwt token
    var jwt = require("jsonwebtoken");
    var token = jwt.sign(user, externalPassKey);
    return token;
  },
  

  generateTokenWithExpiry: function (user, expiry) {
    //generate jwt token
    var jwt = require("jsonwebtoken");
    var token = jwt.sign(user, passKey, {expiresIn: expiry});
    return token;
  },



  verifyToken: function (token, callback) {
    //token verify for socket
    var jwt = require("jsonwebtoken");
    jwt.verify(token, passKey, function (err, user) {
      callback(err, user)
    });
  },

  verifyTokenM: function (req, res, next) {
    //token verify for express routes
    //valid token proceed to next step
    var jwt = require("jsonwebtoken");
    var token = req.headers['authorization'];
    if(token == null || token == undefined || typeof(token) == undefined || typeof(token) == 'undefined') {
      res.send(403, "Unauthorized");
    } else {
      jwt.verify(token, passKey, function (err, user) {
        if (err) {
          res.send(403, "Unauthorized");
        } else {
          req.body.user_id = user.id;
          req.body.user_type = user.type;
          next();
        }
      });
    }
  }
};