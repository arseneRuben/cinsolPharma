const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { hashSync, genSaltSync } = require("bcrypt");

const nodemailer = require('nodemailer');
const crypto = require('crypto');

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
  
   
  const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASS // generated ethereal password
          }
  })
      
 
 await transporter.sendMail({ from, to, subject, html });
 
  console.log("email sent sucessfully");
      
  };

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

exports.recover= async(req, res, next)=>{
  try{
    const email = req.body.email;
     
    const origin = req.header('Origin'); // we are  getting the request origin from  the origin header.
     
    const user = await db.getUserByEmail(email);
    
     
    if(!user){
        // here we always return ok response to prevent email enumeration
       return res.json({status: 'ok'});
    }
    // Get all the tokens that were previously set for this user and set used to 1. This will prevent old and expired tokens  from being used. 
    await db.expireOldTokens(email, 1);
 
    // create reset token that expires after 1 hours
 
   const resetToken = crypto.randomBytes(40).toString('hex');
   const resetTokenExpires = new Date(Date.now() + 60*60*1000);
   const createdAt = new Date(Date.now());
  const expiredAt = resetTokenExpires;
    
    
   //insert the new token into resetPasswordToken table
   await db.insertResetToken(email, resetToken,createdAt, expiredAt, 0);
 
   // send email
   await sendPasswordResetEmail(email,resetToken, origin);
   res.json({ message: 'Please check your email for a new password' });
     
 
    } catch(e){
        console.log(e);
    }
};

//  Reset token validate
exports.validateResetToken = async (req, res, next) =>{
  try{
           
    const newPassword = req.body.password;
    const email = req.body.email;
     
    if  (!newPassword) {
      return res.sendStatus(400);
     }
 
   const user = await db.getUserByEmail(email);

   const salt = genSaltSync(10);
   const  password = hashSync(newPassword, salt);
    
   await db.updateUserPassword(password, user.id);
    
   res.json({ message: 'Password reset successful, you can now login with the new password' });

} catch(e){
    console.log(e);
}
  };