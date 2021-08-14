const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');
const { route } = require('./auth');

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
    mysqldb.query(`select * from Employees where empID=${id}`,(err,result)=>{
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
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('table-export',{
                employees:JSON.parse(JSON.stringify(result))
            });
        }
    })
    
});

router.get('/generatesalary',(req,res)=>{
    mysqldb.query(`select * from Salary`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('generatesalary',{
                salarydata:JSON.parse(JSON.stringify(result))
            });
        }
    })
}
)



router.get('/pdf',ensureAuthenticated,(req,res)=>{
    res.render('pdf')
})


router.get('/pay', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('pay',{
                employees:JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.post('/pay', ensureAuthenticated, (req, res) => {
    const data=JSON.parse(JSON.stringify(req.body));
    console.log(JSON.parse(JSON.stringify(req.body)))
    const length=data["lwp"].length
    console.log(length)
    for (let i = 0; i < length; i++) {
        var days;
        if(data["month"][i]==="january")
        {
            days=31;
        }
        else if(data["month"][i]==="february")
        {
            days=28;
        }
        else if(data["month"][i]==="march")
        {
            days=31;
        }
        else if(data["month"][i]==="april")
        {
            days=30;
        }
        else if(data["month"][i]==="may")
        {
            days=31;
        }
        else if(data["month"][i]==="june")
        {
            days=30
        }
        else if(data["month"][i]==="july")
        {
            days=31
        }
        else if(data["month"][i]==="august")
        {
            days=31
        }
        else if(data["month"][i]==="september")
        {
            days=30
        }
        else if(data["month"][i]==="october")
        {
            days=31
        }
        else if(data["month"][i]==="november")
        {
            days=30
        }
        else if(data["month"][i]==="december")
        {
            days=31
        }

        console.log(data["lwp"][i],data["month"][i],data["year"][i],days)
        
        
    
        mysqldb.query(`INSERT INTO lwp_temp (empID, month, year, days, lwp) VALUES (${i+1}, '${data["month"][i]}', ${data["year"][i]}, ${days}, ${data["lwp"][i]})`
        ,(err,result)=>{
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else{
                // console.log(JSON.parse(JSON.stringify(result))[0])
                // res.redirect('/dashboard')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })
    }
    res.redirect('dashboard');
});

router.get('/viewemployee', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('viewemployee',{
                employees:JSON.parse(JSON.stringify(result))
            });
        }
    })

});



router.get('/salsheet',  (req, res) => {
    res.render('salsheet');
});

router.post('/salsheet',  (req, res) => {
    console.log(req.body)
    res.redirect('dashboard');
});

//------------ Search for Employee Details Route ------------//
// router.post('/searchEmployee',(req,res)=>{
//     const id=req.body.id;
//     console.log(req.body)
//     db.query(`select * from Employees where empID=${id}`,(err,result)=>{
//         if (result.length===0) {
//             //------------ Invalid registration Number ------------//
//             // req.flash('error_msg',
//             // 'Please enter valid Id.')
//             console.log("invalid registration number")
//         }
//         else{
//             console.log(JSON.parse(JSON.stringify(result))[0])
//             res.send("Done");
//             // req.flash(
//             //     'success_msg',
//             //     'Employee found!'
//             // );
//         }
//     })
// })

router.post('/table-export', ensureAuthenticated, (req, res) => {
    console.log(req.body)
    res.redirect('dashboard');
});


// ------------ Add Employee Route ------------//
router.post('/addEmployee',(req,res)=>{
    const data=JSON.parse(JSON.stringify(req.body));
    const {empName,uan,dept,designation,basicPay,gp,bankAccNum,bankName,doj,salaryCategory}=data;
    const emailid="kshitij.deshpan@gmail.com"
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    console.log(`INSERT INTO Employees (empName, uan, dept, designation, basicPay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${basicPay}, ${gp}, 1000, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailid}')`)
    mysqldb.query(`INSERT INTO Employees (empName, uan, dept, designation, basicPay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${basicPay}, ${gp}, 1000, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailid}')`
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
    
//     mysqldb.query(`select gp,pf from Employees where empID=${empID}`,(err,result)=>{
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
//             mysqlmysqldb.query(`UPDATE Employees SET basicPay=${basicPay} where empID=${empID}`,(err,result)=>{
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
//                     mysqldb.query(`select cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv from Salary where empID=${empID}`,(err,result)=>{
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

//                             mysqldb.query(`UPDATE Salary SET da=${da}, hra=${hra},  gross_sal=${gross_sal}, total_ded=${total_ded}, net_sal=${net_sal} where empID=${empID}`
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

// <<<<<<< HEAD
// router.post('/updateBasicPay',(req,res)=>{
//     const {empID,basicPay}=req.body;
//     db.query(`UPDATE Employees SET basicPay=${basicPay} where empID=${empID}`,(err,result)=>
//     {
//         if (err) {
//             //------------ Invalid Employement ID ------------//
//             // req.flash('error_msg',
//             // 'Please enter valid Id.')
//             console.log(err);
//             console.log("invalid employment ID")
//         }
//         else{
//             console.log("basic pay updated to ",basicPay);
//         }
//     })
// })

router.post('/updateBasicPay',(req,res)=>{
    // const {empID,basicPay}=req.body;
    console.log(JSON.parse(JSON.stringify(req.body)))

    const data=JSON.parse(JSON.stringify(req.body));
    const basicPay=data["increment"];
    // console.log(JSON.parse(JSON.stringify(req.body)))
    // var list=[];
    var list="(";
    for(var i in data)
    {

        if(Number.isInteger(parseInt(i)))
        {
            console.log(i)
            console.log(data[i])
            list+=i.toString()+","
        }

    }
    list=list.substring(0,list.length - 1);
    list+=")";
    console.log(list)
    mysqldb.query(`UPDATE Employees SET basicPay=${basicPay} where empID in ${list}`,(err,result)=>
    {
        if (err) {
            //------------ Invalid Employement ID ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log(err);
            console.log("invalid employment ID")
        }
        else{
            // gp=JSON.parse(JSON.stringify(result))[0].gp;
            // pf=JSON.parse(JSON.stringify(result))[0].pf;
            console.log(JSON.parse(JSON.stringify(result))[0]);
            // console.log("gp,pf selected",gp,pf);
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
        }
        
    })
    res.redirect('dashboard');
})


// router.post('/storeInTempTable',(req,res)=>{

// router.get('/viewAllEmployeeDetails',(req,res)=>{
//     mysqldb.query(`select * from Employees`,(err,result)=>
//     {
//         if (err) {
//             console.log(err);
//         }
//         else{
//             console.log("Employees Details",JSON.parse(JSON.stringify(result)));
//             res.send("Done")
            // for (let i = 1; i < length+1; i++) {
    //     mysqldb.query(`select gp,pf from Employees where empID=${empID}`,(err,result)=>{
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
    //             mysqlmysqldb.query(`UPDATE Employees SET basicPay=${basicPay} where empID=${empID}`,(err,result)=>{
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
    //                     mysqldb.query(`select cca,diff,oth_spl,ta,prof_tax,in_tax,rev_stmp,sal_adv from Salary where empID=${empID}`,(err,result)=>{
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

    //                             mysqldb.query(`UPDATE Salary SET da=${da}, hra=${hra},  gross_sal=${gross_sal}, total_ded=${total_ded}, net_sal=${net_sal} where empID=${empID}`
    //                                     ,(err,result)=>{
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
    // }

//         }
//     })
// })

router.get('/showsalary', ensureAuthenticated, (req, res) => {

    mysqldb.query(`select * from salary natural join Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('showsalary',{
                salary:JSON.parse(JSON.stringify(result))
            });
        }
    })
});



router.post('/generateSalary',(req,res)=>{
    var length;
    mysqldb.query(`select count(*) from Employees`,(err,result)=>{
        if (result.length===0) {
            //------------ Invalid registration Number ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log("invalid registration number")
        }
        else{
            length=JSON.parse(JSON.stringify(result))[0]['count(*)'];
            for (let i = 1; i < length+1; i++) {
                mysqldb.query(`select basicPay,gp,pf from Employees where empID=${i}`,(err,result)=>{
                    if (result.length===0) {
                        //------------ Invalid registration Number ------------//
                        // req.flash('error_msg',
                        // 'Please enter valid Id.')
                        console.log("invalid registration number")
                    }
                    else{
                        var gp=parseInt(JSON.parse(JSON.stringify(result))[0].gp);
                        var pf=parseInt(JSON.parse(JSON.stringify(result))[0].pf);
                        var basicPay=parseInt(JSON.parse(JSON.stringify(result))[0].basicPay);
                        console.log(JSON.parse(JSON.stringify(result))[0]);
                        console.log("gp,pf,bp selected",gp,pf,basicPay);
                        // req.flash(
                        //     'success_msg',
                        //     'Employee found!'
                        // );
                        var cca=240
                        var diff=0
                        var oth_spl=0;
                        var ta=1600;
                        var prof_tax=200;
                        var in_tax=3000;
                        var rev_stmp=1
                        var sal_adv=0;
                        var da=(basicPay+parseFloat(gp))*1.39;
                        console.log("da is",da);
                        var hra=(basicPay+parseFloat(gp))*0.2;
                        console.log("hra is",hra);
                        var gross_sal=basicPay+parseFloat(gp)+parseFloat(da)+parseFloat(hra)+parseFloat(cca)+parseFloat(diff)+parseFloat(oth_spl)+parseFloat(ta);
                        
                        mysqldb.query(`select month,year,days,lwp from lwp_temp where empID=${i}`,(err,result)=>{
                            if (err) {
                                //------------ Invalid registration Number ------------//
                                // req.flash('error_msg',
                                // 'Please enter valid Id.')
                                console.log(err)
                                console.log("invalid update salary 1")
                            }
                            else{
                                // console.log(JSON.parse(JSON.stringify(result))[0])
                                // res.send("Done");
                                // req.flash(
                                //     'success_msg',
                                //     'Employee found!'
                                // );
                                var month=JSON.parse(JSON.stringify(result))[0].month;
                                var year=JSON.parse(JSON.stringify(result))[0].year;
                                var daysOfMonth=JSON.parse(JSON.stringify(result))[0].days;
                                var lwp=JSON.parse(JSON.stringify(result))[0].lwp;
                                var workedDays=daysOfMonth-lwp;
                                var lwp_amt=(parseInt(gross_sal)/parseInt(daysOfMonth))*parseInt(lwp);
                                console.log("gross salary,days of month,lwp",gross_sal,daysOfMonth,lwp)
                                console.log("lwp_amt=",lwp_amt)
                                var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(in_tax)+parseFloat(rev_stmp)+parseFloat(sal_adv)+parseFloat(lwp_amt);
                                var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);
                                console.log("logging")
                                console.log(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal) VALUES (${i}, '${month}', ${year}, ${da}, ${hra}, ${cca}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta}, ${prof_tax}, ${in_tax}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal})`)
                                mysqldb.query(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal) VALUES (${i}, '${month}', ${year}, ${da}, ${hra}, ${cca}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta}, ${prof_tax}, ${in_tax}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal})`
                                ,(err,result)=>{
                                    if (err) {
                                        //------------ Invalid registration Number ------------//
                                        // req.flash('error_msg',
                                        // 'Please enter valid Id.')
                                        console.log(err)
                                        console.log("invalid update salary 2")
                                    }
                                    else{
                                        // console.log(JSON.parse(JSON.stringify(result))[0])
                                        // res.send("Done");
                                        // req.flash(
                                        //     'success_msg',
                                        //     'Employee found!'
                                        // );
                                        console.log("YAYYYYY")
                                        if(i===length)
                                        {
                                            mysqldb.query('truncate table lwp_temp')
                                            ,(err,result)=>{
                                                if (err) {
                                                    //------------ Invalid registration Number ------------//
                                                    // req.flash('error_msg',
                                                    // 'Please enter valid Id.')
                                                    console.log(err)
                                                    console.log("invalid update salary 2")
                                                }
                                                else{
                                                    console.log("SUCCESS!")
                                                }
                                            }
                                                 
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }

        }
    })
    
    
})




module.exports = router;