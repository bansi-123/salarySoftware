// const express = require('express');
// const router = express.Router();

// app = express();
// //port = process.env.PORT || 3000,
// // bodyParser = require('body-parser'),
// // fs = require('fs'),
// // multer = require('multer');

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// app.set('views', __dirname + '/views'); // general config
// app.set('view engine', 'ejs');
// router.get('/pdf',  (req, res) => {
//     res.render('index'); //uploads hota ithe
// });
// var storage =   multer.diskStorage({
// destination: function (req, file, callback) {
// callback(null, './uploads');
// },
// filename: function (req, file, callback) {
//   if(file.fieldname == "sheetSelected")
//     callback(null,  file.fieldname + ".csv");
// else
//     callback(null, file.fieldname + ".html")
// }
// });

// var upload = multer({ storage: storage })
// var uploadOptions = upload.fields([{ name: 'templateSelected', maxCount: 1 }, { name: 'sheetSelected', maxCount: 1 }])

// var routes = require('./uiRoutes');
// routes(app, uploadOptions);



// module.exports = router;