const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));


router.get('/index1', ensureAuthenticated, (req, res) => {
    res.render('index1');
});

router.get('/form-basic', ensureAuthenticated, (req, res) => {
    res.render('form-basic');
});

router.post('/form-basic', ensureAuthenticated, (req, res) => {
    console.log(req.body)
    res.redirect('dashboard');
});

//------------ Search for Employee Details Route ------------//
router.post('/searchEmployee',(req,res)=>{
    const id=req.body.id;
    console.log(req.body)
    db.query(`select name,email from Users where UserID=${id}`,(err,result)=>{
        if (result.length===0) {
            //------------ Invalid registration Number ------------//
            req.flash('error_msg',
            'Please enter valid Id.')
        }
        else{
            console.log(JSON.parse(JSON.stringify(result))[0])
            req.flash(
                'success_msg',
                'Employee found!'
            );
        }
    })
})

module.exports = router;