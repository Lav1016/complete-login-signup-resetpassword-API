const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
// const crypto = require('crypto');
// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 512});
// let secret ='SECRET#123';

const User = require("./../models/user");
const { sendMail, emailValidation, sendMailCustomer } = require("../util/mail");
const { exceptionlogs, diff } = require("../util/utilCommon");
let moment = require("moment");
const jwt = require("jsonwebtoken");
let url = require("url");
var mongoose = require("mongoose");
const mail = require('../config/mail')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let uniqueValue = String(Math.floor(100000 + Math.random() * 900000));
const { validationResult } = require("express-validator");
var resourcehelper = require('../helper/resourcehelper');
const { result, reject, findKey } = require("lodash");
const { resolve } = require("path");
const { response } = require("../app");
const { error } = require("console");
const { transporter } = require("../config/mail");
const { json } = require("express");
const { token } = require("morgan");
const { generate } = require("generate-password");
const db = mongoose.connection;

//call for add new users
module.exports.signup = async (req, res, next) => {
    let ipAddress = req.connection.remoteAddress;
    console.log('h1')

    try {
        if (req.body.password == req.body.confirmPassword) {

            const userSignup = new User({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                userType: req.body.userType,
                gender: req.body.gender,
                address: req.body.address,
                phone: req.body.phone,
                password: req.body.password
            });

            console.log('obj', userSignup)

            const emailbyphone = await User.findOne({ email: req.body.email }); //check record where it present or not

            if (Boolean(emailbyphone)) {
                res.status(201).json({
                    responseMsg: resourcehelper.duplicate_email_phone,
                })

            } else {
                console.log('h2')
                const saveRecord = await userSignup.save();    //save the record 
                const mailoption = {
                    email: saveRecord.email,
                    firstName: saveRecord.firstName,
                    customerId: saveRecord._id
                }
                console.log('h1')
                const sendMail = await sendMailCustomer(mailoption);

                console.log(sendMail)

                res.status(resourcehelper.msg_save_code).json({
                    responseMsg: resourcehelper.msg_save_text,
                    user: saveRecord
                })

            }

        } else {
            res.status(201).json({
                responseMsg: resourcehelper.password_not_exist
            })
        }
        // const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    } catch (ex) {
        res.status(400).json({
            responseCode: resourcehelper.exception_msg_code,
            error: resourcehelper.exception_msg_text,
            err: ex
        });
    }
};
module.exports.login = async (req, res, next) => {
    // console.log(req.body);
    let ipAddress = req.connection.remoteAddress;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            let users = new User();
            //  const passwordmatch=user.verifyPassword(req.body.password);
            // const passwordmatch= await bcrypt.compare(req.body.password, user.password);
            const passwordmatch = user.verifyPassword(req.body.password);
            if (passwordmatch) {
                let objdetails = {
                    emailId: req.body.email,
                    userID: user._id
                };
                let tokenValue = users.generateJwt(objdetails);
                res.status(200).json({
                    msg: 'login successfully',
                    status: true,
                    loginUser: user,
                    token: tokenValue
                })
            } else {
                res.status(201).json({
                    status: false,
                    msg: 'record not found'
                })
            }
        } else {
            res.status(201).json({
                status: false,
                msg: 'record not found'
            })
        }
    } catch (ex) {
        res.status(400).json({
            responseCode: resourcehelper.exception_msg_code,
            error: resourcehelper.exception_msg_text,
            err: ex,
            status: false,
        });
    }
};

module.exports.designerList = async (req, res, next) => {

    try {

        let designerlist = await User.find();
        console.log(designerlist)
        if (Boolean(designerlist)) {
            res.status(resourcehelper.msg_save_code).json({
                responseCode: "record Found",
                designerList: designerlist,
                status: true,
            });
        } else {
            res.status(resourcehelper.notfound_code).json({
                responseCode: resourcehelper.notfound_text,
                designerList: designerlist,
                status: false,
            });
        }

    } catch (ex) {
        res.status(resourcehelper.exception_msg_code).json({
            responseCode: resourcehelper.exception_msg_code,
            error: resourcehelper.exception_msg_text,
            err: ex,
            status: false,
        });
    }
}
module.exports.forgotPassword = async (req, res, next) => {
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            console.log('userObj', findUser)
            // let password = findUser.password
            // console.log('password', password)

            let pwd = Math.random().toString(36).slice(2)
            console.log(pwd, pwd.length)
            const hash = bcrypt.hashSync(pwd, salt);
            console.log(hash)
            User.updateOne({ email: req.body.email },
                { $set: { password: hash } }, { upsert: true }, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("password update")
                    }
                });
            res.status(200).json({
                "msg": "password will send"
            });

            let mailoption = findUser
            const sendMail = await sendMailCustomer(mailoption, pwd)
            console.log(sendMail);

            res.status(resourcehelper.msg_save_code).json({
                responseMsg: resourcehelper.msg_save_text,
                user: saveRecord
            })
            res.status(200).json({
                msg: ' forgot successfully '
            })

        } else {
            res.status(201).json({
                status: false,
                msg: 'Invalid email you have enter!.'
            })
        }

    } catch (ex) {

    }
}
module.exports.passwordreset = async (req, res) => {
    // try {
        const currentPassword = req.body.currentPassword
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword
        const findUser = await User.findOne({ email: req.body.email })
        console.log(findUser)
        if (!findUser) {
            res.json({
                status: "failed",
                Message: "No user found with that email address"
            });
        }
        else {
            console.log('hello', findUser.password, currentPassword)
            // const comparePassword = bcrypt.compare(findUser.password, currentPassword)
            const comparePassword = await bcrypt.compare(currentPassword,findUser.password )
            console.log('Ali');
            console.log(comparePassword)
            console.log('Ali2');
            if (!comparePassword) {
                res.json({
                    status: "failed",
                    Message: "Your current password is wrong!"
                });
            }
            else {
                if (newPassword!==confirmPassword) {
                    res.json({
                        status: "false",
                        message: "Your new password and confirm password not matched"
                    });
                }
                else {
                    bcrypt.hash(newPassword, 10, (err, result) => {
                        // console.log('hash', hash)
                        if (err) {
                            res.send('err', err)
                        }
                        if (result) {
                            console.log('result', result)
                            console.log('hello')
                            // if(user.updatePassword ==true){}
                            User.updateOne(
                                { email: req.body.email },
                                { $set: { password: result } },
                                 { upsert: true },
                                //  {new:true},
                                  function (err) {
                                    if (err) {
                                        res.json({
                                            status: "failed",
                                            msg: "enter the wrong credential"
                                        });
                                    } else {
                                        console.log("password update")
                                    }
                                });
                            res.status(200).json({
                                "msg": "password update successfully"
                            });
                        }
                    });
                }
            }
        }
    }
    // catch {
    //     res.send('error')
    // }
