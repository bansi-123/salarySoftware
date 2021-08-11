const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser=require('body-parser');
const passport = require('passport');
const mysql = require('mysql2');

const app = express();

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

// //------------ DB Configuration ------------//
// const db = require('./config/key').MongoURI;

// //------------ Mongo Connection ------------//
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//     .then(() => console.log("Successfully connected to MongoDB"))
//     .catch(err => console.log(err));

//------------ MySQL Connection ------------//
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Vineet@nexa1',
    database: 'employee'
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to mysql database');
});
global.db = db;


//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');

//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);



//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));