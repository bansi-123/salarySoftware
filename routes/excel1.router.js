let express = require('express');
let router1 = express.Router();
let uploaddeclare = require('../config/multer.config1.js');
 
const csvWorker = require('../controllers/csv1.controller.js');

let path = __basedir + '/views/';

router1.get('/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "uploaddeclare.html");
    //res.render('upload');
});

router1.post('/api/file/upload', uploaddeclare.single("file"), csvWorker.uploadFile);
//router.post('/api/file/multiple/upload', upload.array('files', 4), csvWorker.uploadMultipleFiles);

router1.get('/api/file', csvWorker.downloadFile);

module.exports = router1;