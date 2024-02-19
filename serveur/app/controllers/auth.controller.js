const db = require("../models");
const config = require("../config/auth.config");
connection = require("../config/db");
const User = db.users;
const Role = db.roles;
const { isEmpty } = require('../utils/object_isEmpty');
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { hashSync, genSaltSync } = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const AppError = require('../utils/error');
const { USER_MODEL, USER_LOGIN_MODEL, FORGOT_PASSWORD_MODEL, RESET_PASSWORD_MODEL } = require('../validation_models/user');


  async function sendPasswordResetEmail(email, resetToken, origin) {
    let message;
     
    if (origin) {
        const resetUrl = `${origin}/apiRouter/resetPassword?token=${resetToken} email=${email}`;
        message = `<p>Please click the below link to reset your password, the following link will be valid for only 1 hour:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/apiRouter/reset-password</code> api route:</p>
                   <p><code>${resetToken}</code></p>`;
    }
 
    await sendEmail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: ' Reset your Password',
        html: `<h4>Reset Password</h4>
               ${message}`
    });
}


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setGroups([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      user.getGroups().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("GROUP_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          //firstname: user.firstname,
          //roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};

exports.user_forgotPassword = (req, res, next) => {

  if (isEmpty(req.body)) return next(new AppError('form data not found', 400));

  try {

      const { error } = FORGOT_PASSWORD_MODEL.validate(req.body);

      if (error) return next(new AppError(error.details[0].message, 400));

      connection.query("SELECT * FROM user WHERE email = ?", [[req.body.email]], async (err, data1, fields) => {
          if (err) return next(new AppError(err, 500));

          if (data1.length == 0) {
              return next(new AppError("user not exist", 400))
          }

          const otp = Math.floor(1000 + Math.random() * 9000);

          const otpExpier = new Date();
          otpExpier.setMinutes(otpExpier.getMinutes() + 5);

          connection.query("UPDATE user SET otp = ?, otpExpire = ? WHERE email = ?", [otp, otpExpier, req.body.email], (err, data2, fields) => {
              if (err) return next(new AppError(err, 500));

              const transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  secure: true,
                  port: 465,
                  auth: {
                      user: 'informatiquepoly@gmail.com',
                      pass: 'qbid zumd jrsm tyzw',
                  },
              });

              const mailOptions = {
                  from: 'informatiquepoly@gmail.com',
                  to: req.body.email,
                  subject: 'Password reset OTP',
                  text: `Your OTP (It is expired after 5 minutes) : ${otp}`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return next(new AppError(error, 500));
                  } else {
                      res.json({
                          data: "Your OTP send to the email"
                      })
                  }
              });

          })

      })

  }
  catch (err) {
      return next(new AppError(err, 500));
  }
}

exports.user_resetPassword = (req, res, next) => {

  const body = req.body;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  if (isEmpty(body)) return next(new AppError('form data not found', 400));

  try {

      const { error } = RESET_PASSWORD_MODEL.validate(body);

      if (error) return next(new AppError(error.details[0].message, 400));

      if (password.localeCompare(confirmPassword) != 0) return next(new AppError('passwords are not equal', 400));

      connection.query("SELECT * FROM user WHERE otp = ? AND otpExpire > NOW()", [[body.otp]], async (err, data, fields) => {
          if (err) return next(new AppError(err, 500));

          if (data.length == 0) return next(new AppError('Invalid or expired OTP', 400));

          const solt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, solt);

          connection.query("UPDATE user SET password = ?, otp = null, otpExpire = null WHERE otp = ?", [hashedPassword, body.otp], async (err, data, fields) => {
              if (err) return next(new AppError(err, 500));

              res.json({
                  data: 'Password reset successful'
              })

          })

      })

  }
  catch (err) {
      return next(new AppError(err, 500));
  }

}