let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const csvWorker = require('../controllers/csv1.controller.js');

let path = __basedir + '/views/';

router.get('/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "uploaddeclare.html");
    //res.render('upload');
});

router.post('/api/file/uploaddeclare', upload.single("file"), csvWorker.uploadFile);
//router.post('/api/file/multiple/upload', upload.array('files', 4), csvWorker.uploadMultipleFiles);

router.get('/api/file', csvWorker.downloadFile);

module.exports = router;