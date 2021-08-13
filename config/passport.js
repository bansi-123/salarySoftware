const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//------------ Local User Model ------------//
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //------------ User Matching ------------//
            // User.findOne({
            //     email: email
            // }).then(user => {
            mysqldb.query(`select * from Users where email="${email}"`,(err,user)=>{

                if (user.length===0) {
                    return done(null, false, { message: 'This email ID is not registered' });
                }
                var stringUser=JSON.stringify(user);
                var jsonUser=JSON.parse(stringUser)[0];
                console.log(jsonUser);
                console.log(jsonUser.UserID)
                //------------ Password Matching ------------//
                bcrypt.compare(password, jsonUser.password, (err, isMatch) => {
                    if (err) console.log(err);
                    if (isMatch) {
                        return done(null, jsonUser);
                    } else {
                        return done(null, false, { message: 'Password incorrect! Please try again.' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.UserID);
    });

    passport.deserializeUser(function (id, done) {
        // User.finmysqldbyId(id, function (err, user) {
        mysqldb.query(`select * from Users where UserID="${id}"`,(err,user)=>{
            done(err, JSON.parse(JSON.stringify(user))[0]);
        });

    });
};