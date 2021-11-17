const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser=require('body-parser');
const passport = require('passport');
const mysql = require('mysql2');
// bodyParser = require('body-parser'),
const fs = require('fs'),
multer = require('multer');
app = express();

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

// //------------ DB Configuration ------------//
// const db = require('./config/key').MongoURI;

// //------------ Mongo Connection ------------//
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//     .then(() => console.log("Successfully connected to MongoDB"))
//     .catch(err => console.log(err));

//------------ MySQL Connection ------------//

// const mysqldb = mysql.createConnection ({
//     host: 'localhost',
//     user: 'root',
//     password: 'sunandroot',
//     database: 'employee',
//     multipleStatements: true
// });


const mysqldb = mysql.createConnection ({
    host: 'localhost',
    user: 'kshitij',
    password: 'salary123',
    database: 'employee'
});

// connect to database
mysqldb.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Connected to mysql database');
});
global.mysqldb = mysqldb;


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


//---------mail genie----------//
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
  	if(file.fieldname == "sheetSelected")
    	callback(null,  file.fieldname + ".csv");
    else
    	callback(null, file.fieldname + ".html")
  }
});

var upload = multer({ storage: storage })
var uploadOptions = upload.fields([{ name: 'templateSelected', maxCount: 1 }, { name: 'sheetSelected', maxCount: 1 }])

var routes = require('./routes/uiRoutes');
routes(app, uploadOptions);

//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
// app.use('/pdfmail', require('./routes/pdfmail'))

//---------mail genie----------//
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        if(file.fieldname == "sheetSelected")
          callback(null,  file.fieldname + ".csv");
      else
          callback(null, file.fieldname + ".html")
    }
  });
  
  var upload = multer({ storage: storage })
  var uploadOptions = upload.fields([{ name: 'templateSelected', maxCount: 1 }, { name: 'sheetSelected', maxCount: 1 }])
  
  var routes = require('./routes/uiRoutes');
  // var routes = require('./routes/uiRoutes2');  
  routes(app, uploadOptions);


//--------------upload csv part--------------//
const db = require('./config/db.config.js');

global.__basedir = __dirname;   
    
//force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {  //{force: true}
  console.log('Drop and Resync with { force: true }');
}).catch((e)=>{
  console.log(e)
});       

let router = require('./routes/excel.router.js');
app.use(express.static('resources'));
app.use('/uploadcsv', router); 

//--------------upload declaration part--------------//
const db1 = require('./config/db.config1.js');

global.__basedir = __dirname; 

db1.sequelize.sync({force: false}).then(() => {  //{force: true}
  console.log('Drop and Resync with { force: true }');
}).catch((e)=>{
  console.log(e)
});       

let router1 = require('./routes/excel1.router.js');
app.use(express.static('resources'));
app.use('/uploaddeclare', router1); 

//------------------------------------------------------//

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`)
);