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
    db.query(`select * from Employees where empID=${id}`,(err,result)=>{
        if (result.length===0) {
            //------------ Invalid registration Number ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log("invalid registration number")
        }
        else{
            console.log(JSON.parse(JSON.stringify(result))[0])
            res.send("Done");
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
        }
    })
})

router.get('/table-export', ensureAuthenticated, (req, res) => {
    res.render('table-export');
});

router.post('/table-export', ensureAuthenticated, (req, res) => {
    console.log(req.body)
    res.redirect('dashboard');
});


router.get('/pay', ensureAuthenticated, (req, res) => {
    res.render('pay');
});

router.post('/pay', ensureAuthenticated, (req, res) => {
    console.log(req.body)
    res.redirect('dashboard');
});



//------------ Add Employee Route ------------//
router.post('/addEmployee',(req,res)=>{
    const data=JSON.parse(JSON.stringify(req.body));
    const {empName,uan,dept,designation,basicPay,gp,bankAccNum,bankName,doj,salaryCategory}=data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log(empName)
    db.query(`INSERT INTO Employees (empName, uan, dept, designation, basicPay, gp, pf, bankAccNum, bankName, doj, salaryCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${basicPay}, ${gp}, 1000, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}')`
    ,(err,result)=>{
        if (err) {
            console.log(err);
            console.log("invalid details");
        }
        else{
            // console.log(JSON.parse(JSON.stringify(result))[0])
            res.redirect('/dashboard')
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
        }
    })
})

// //------------ Update Basic Pay and Related Properties Route ------------//
// router.post('/updateSalary',(req,res)=>{
//     const {empID,basicPay}=req.body;
// //     UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
//     console.log(req.body)
//     var gp,pf;
    
//     db.query(`select gp,pf from Employees where empID=${empID}`,(err,result)=>{
//         if (result.length===0) {
//             //------------ Invalid registration Number ------------//
//             // req.flash('error_msg',
//             // 'Please enter valid Id.')
//             console.log("invalid registration number")
//         }
//         else{
//             gp=JSON.parse(JSON.stringify(result))[0].gp;
//             pf=JSON.parse(JSON.stringify(result))[0].pf;
//             console.log(JSON.parse(JSON.stringify(result))[0]);
//             console.log("gp,pf selected",gp,pf);
//             // req.flash(
//             //     'success_msg',
//             //     'Employee found!'
//             // );
//             db.query(`UPDATE Employees SET basicPay=${basicPay} where empID=${empID}`,(err,result)=>{
//                 if (err) {
//                     //------------ Invalid registration Number ------------//
//                     // req.flash('error_msg',
//                     // 'Please enter valid Id.')
//                     console.log(err);
//                     console.log("invalid registration number")
//                 }
//                 else{
//                     // console.log(JSON.parse(JSON.stringify(result))[0])
//                     console.log("basic pay updated to ",basicPay);
//                     // req.flash(
//                     //     'success_msg',
//                     //     'Employee found!'
//                     // );
//                     var cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv;
//                     console.log(`select cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv from Salary where empID=${empID}`)
//                     db.query(`select cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv from Salary where empID=${empID}`,(err,result)=>{
//                         if (err) {
//                             //------------ Invalid registration Number ------------//
//                             // req.flash('error_msg',
//                             // 'Please enter valid Id.')
//                             console.log(err);
//                             console.log("invalid registration number");
//                         }
//                         else{
//                             cca=JSON.parse(JSON.stringify(result))[0].cca;
//                             diff=JSON.parse(JSON.stringify(result))[0].diff;
//                             oth_spl=JSON.parse(JSON.stringify(result))[0].oth_spl;
//                             ta=JSON.parse(JSON.stringify(result))[0].ta;
//                             prof_tax=JSON.parse(JSON.stringify(result))[0].prof_tax;
//                             in_tax=JSON.parse(JSON.stringify(result))[0].in_tax;
//                             rev_stmp=JSON.parse(JSON.stringify(result))[0].rev_stmp;
//                             sal_adv=JSON.parse(JSON.stringify(result))[0].sal_adv;
//                             console.log(JSON.parse(JSON.stringify(result))[0])
//                             res.send("Done");
//                             // req.flash(
//                             //     'success_msg',
//                             //     'Employee found!'
//                             // );
//                             console.log("GP is",gp)
//                             var da=(basicPay+parseFloat(gp))*1.39;
//                             console.log(da);
//                             var hra=(basicPay+parseFloat(gp))*0.2;
//                             var gross_sal=basicPay+parseFloat(gp)+parseFloat(da)+parseFloat(hra)+parseFloat(cca)+parseFloat(diff)+parseFloat(oth_spl)+parseFloat(ta);
//                             var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(in_tax)+parseFloat(rev_stmp)+parseFloat(sal_adv);
//                             var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);

//                             db.query(`UPDATE Salary SET da=${da}, hra=${hra},  gross_sal=${gross_sal}, total_ded=${total_ded}, net_sal=${net_sal} where empID=${empID}`
//                                       ,(err,result)=>{
//                                 if (err) {
//                                     //------------ Invalid registration Number ------------//
//                                     // req.flash('error_msg',
//                                     // 'Please enter valid Id.')
//                                     console.log(err)
//                                     console.log("invalid update salary")
//                                 }
//                                 else{
//                                     // console.log(JSON.parse(JSON.stringify(result))[0])
//                                     // res.send("Done");
//                                     // req.flash(
//                                     //     'success_msg',
//                                     //     'Employee found!'
//                                     // );
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })
        
//         }
//     })
// })

router.post('/updateBasicPay',(req,res)=>{
    const {empID,basicPay}=req.body;
    db.query(`UPDATE Employees SET basicPay=${basicPay} where empID=${empID}`,(err,result)=>
    {
        if (err) {
            //------------ Invalid Employement ID ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log(err);
            console.log("invalid employment ID")
        }
        else{
            gp=JSON.parse(JSON.stringify(result))[0].gp;
            pf=JSON.parse(JSON.stringify(result))[0].pf;
            console.log(JSON.parse(JSON.stringify(result))[0]);
            console.log("gp,pf selected",gp,pf);
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
            db.query(`UPDATE Employees SET basicPay=${basicPay} where empID=${empID}`,(err,result)=>{
                if (err) {
                    //------------ Invalid registration Number ------------//
                    // req.flash('error_msg',
                    // 'Please enter valid Id.')
                    console.log(err);
                    console.log("invalid registration number")
                }
                else{
                    // console.log(JSON.parse(JSON.stringify(result))[0])
                    console.log("basic pay updated to ",basicPay);
                    // req.flash(
                    //     'success_msg',
                    //     'Employee found!'
                    // );
                    var cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv;
                    console.log(`select cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv from Salary where empID=${empID}`)
                    db.query(`select cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv from Salary where empID=${empID}`,(err,result)=>{
                        if (err) {
                            //------------ Invalid registration Number ------------//
                            // req.flash('error_msg',
                            // 'Please enter valid Id.')
                            console.log(err);
                            console.log("invalid registration number");
                        }
                        else{
                            cca=JSON.parse(JSON.stringify(result))[0].cca;
                            diff=JSON.parse(JSON.stringify(result))[0].diff;
                            oth_spl=JSON.parse(JSON.stringify(result))[0].oth_spl;
                            ta=JSON.parse(JSON.stringify(result))[0].ta;
                            prof_tax=JSON.parse(JSON.stringify(result))[0].prof_tax;
                            in_tax=JSON.parse(JSON.stringify(result))[0].in_tax;
                            rev_stmp=JSON.parse(JSON.stringify(result))[0].rev_stmp;
                            sal_adv=JSON.parse(JSON.stringify(result))[0].sal_adv;
                            console.log(JSON.parse(JSON.stringify(result))[0])
                            res.send("Done");
                            // req.flash(
                            //     'success_msg',
                            //     'Employee found!'
                            // );
                            console.log("GP is",gp)
                            var da=(basicPay+parseFloat(gp))*1.39;
                            console.log(da);
                            var hra=(basicPay+parseFloat(gp))*0.2;
                            var gross_sal=basicPay+parseFloat(gp)+parseFloat(da)+parseFloat(hra)+parseFloat(cca)+parseFloat(diff)+parseFloat(oth_spl)+parseFloat(ta);
                            var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(in_tax)+parseFloat(rev_stmp)+parseFloat(sal_adv);
                            var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);

                            db.query(`UPDATE Salary SET da=${da}, hra=${hra},  gross_sal=${gross_sal}, total_ded=${total_ded}, net_sal=${net_sal} where empID=${empID}`
                                      ,(err,result)=>{
                                if (err) {
                                    //------------ Invalid registration Number ------------//
                                    // req.flash('error_msg',
                                    // 'Please enter valid Id.')
                                    console.log(err)
                                    console.log("invalid update salary")
                                }
                                else{
                                    // console.log(JSON.parse(JSON.stringify(result))[0])
                                    // res.send("Done");
                                    // req.flash(
                                    //     'success_msg',
                                    //     'Employee found!'
                                    // );
                                }
                            })
                        }
                    })
                }
            })
        
        }
    })
})

router.post('/storeInTempTable',(req,res)=>{

})

router.get('/viewAllEmployeeDetails',(req,res)=>{
    db.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.send("Done")
        }
    })
})

router.post('/salaryGeneration',(req,res)=>{
    

})

module.exports = router;