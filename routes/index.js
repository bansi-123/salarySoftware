const e = require('connect-flash');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');
const { route } = require('./auth');
const async = require('async');
const config = require('../config');

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome',{
    });
});

//------------ Dashboard Route ------------//
router.get('/dashboard', (req, res) => res.render('dash', {
}));

router.get('/index1', ensureAuthenticated, (req, res) => {
    res.render('index1', {
        name: req.user.name,
        role: req.user.role
    })
});

// router.get('/test', ensureAuthenticated, (req, res) => {
//     res.render('test');
// });
router.get('/newdeclaration', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('newdeclaration', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/newdeclaration', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees natural join form`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('newdeclaration', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/declaration2', ensureAuthenticated, (req, res) => {
    res.render('declaration2',
    {
        role: req.user.role
    });
});

router.get('/salcert/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    
    
    mlist = ["January", "February", "March", "April", "may", "june", "july", "august", "september", "october", "November", "December"];
    var cur_month = mlist[new Date().getMonth()];
    var cur_month_2 = mlist[new Date().getMonth()+1];
    var cur_month_3 = mlist[new Date().getMonth()-1];
    var cur_month_4 = mlist[new Date().getMonth()-2];   
    var cur_month_5 = mlist[new Date().getMonth()-3];
    var cur_month_1 = mlist[new Date().getMonth()-4];
    
    
    //var prev_month=mlist[prev_month.indexOf(cur_month.toLowerCase())-1].toLowerCase();
    //console.log(prev_month);
    
    var cur_year = new Date().getFullYear()
   // mysqldb.query(`select * from Salary natural join Employees where (month='${cur_month}' or month='${cur_month_2}' or month='${cur_month_3}'or month='${cur_month_4}'or month='${cur_month_5}'or month='${cur_month_1}') and year=${cur_year} and empID='${requestedTitle}' `, (err, result) => {
    mysqldb.query(`   SELECT * FROM salary natural join employees where empID="${requestedTitle}"    ORDER BY STR_TO_DATE(CONCAT(year, month, ' 01'), '%Y %M %d');  
    `, (err, result) => {
 
   if (err) {
            console.log(err);
        }
        else {
            //console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('salcert', {
                salary: JSON.parse(JSON.stringify(result)),
                salary1: JSON.parse(JSON.stringify(result)),

                requestedTitle: req.params.empID,
                cur_month: mlist[new Date().getMonth()],
                sunand:parseInt(sunand),
                duration:parseInt(duration),
                date:new Date(),
                role: req.user.role

            });
        }
    })
});

router.get('/salcert1/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    
    
    mlist = ["January", "February", "March", "April", "may", "june", "july", "august", "september", "october", "November", "December"];
    var cur_month = mlist[new Date().getMonth()];
    var cur_month_2 = mlist[new Date().getMonth()+1];
    var cur_month_3 = mlist[new Date().getMonth()-1];
    var cur_month_4 = mlist[new Date().getMonth()-2];   
    var cur_month_5 = mlist[new Date().getMonth()-3];
    var cur_month_1 = mlist[new Date().getMonth()-4];
    
    
    //var prev_month=mlist[prev_month.indexOf(cur_month.toLowerCase())-1].toLowerCase();
    //console.log(prev_month);
    
    var cur_year = new Date().getFullYear()
   // mysqldb.query(`select * from Salary natural join Employees where (month='${cur_month}' or month='${cur_month_2}' or month='${cur_month_3}'or month='${cur_month_4}'or month='${cur_month_5}'or month='${cur_month_1}') and year=${cur_year} and empID='${requestedTitle}' `, (err, result) => {
    mysqldb.query(`   SELECT * FROM salary natural join employees where empID="5"    ORDER BY STR_TO_DATE(CONCAT(year, month, ' 01'), '%Y %M %d');  
    `, (err, result) => {
 
   if (err) {
            console.log(err);
        }
        else {
            //console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('salcert1', {
                salary: JSON.parse(JSON.stringify(result)),
                salary1: JSON.parse(JSON.stringify(result)),

                requestedTitle: req.params.empID,
                cur_month: mlist[new Date().getMonth()],
                sunand:parseInt(sunand),
                dura:parseInt(dura),
                date:new Date(),
                role: req.user.role

            });
        }
    })
});

router.get('/salcert2/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;

    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select * from Salary natural join Employees where month='${cur_month}' and year=${cur_year}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('salcert2', {
                salary: JSON.parse(JSON.stringify(result)),
                requestedTitle: req.params.empID,
                cur_month: mlist[new Date().getMonth()],
                role: req.user.role

            });
        }
    })
});

router.get('/proposedDeclaration', ensureAuthenticated, (req, res) => {
    res.render('proposedDeclaration',{
        role: req.user.role
    });
});

router.get('/salsheet',  (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select * from Salary natural join Employees where month='${cur_month}' and year=${cur_year}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('salsheet', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
    // res.render("templateSelected2");
});

var sunand;
var dura;
router.get('/form-basic', ensureAuthenticated, (req, res) => res.render('form-basic', {
    name: req.user.name,
    role: req.user.role
}));

router.get('/editlimits', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from edit_limits`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select * from config`, (err, result2) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Edit Details", JSON.parse(JSON.stringify(result)));
                    res.render('editlimits', {
                        edit_limits: JSON.parse(JSON.stringify(result)),
                        config: JSON.parse(JSON.stringify(result2)),
                        role: req.user.role
                        
                    });
                }
            })
        }
    })

});

router.get('/showlimits', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from edit_limits`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Edit Details", JSON.parse(JSON.stringify(result)));
            res.render('showlimits', {
                edit_limits: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/editlimits', (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const {climit, glimit, dlimit1, dlimit2, ccclimit, ccdlimit, ddlimit}=JSON.parse(JSON.stringify(req.body));
    // var c = parseInt(climit);
    // console.log(c);
    
    mysqldb.query(`update edit_limits set climit=${climit},glimit=${glimit},dlimit1=${dlimit1},dlimit2=${dlimit2},ccclimit=${ccclimit}, ccdlimit=${ccdlimit}, ddlimit=${ddlimit} where ID=1`,(err,result)=>
    
    // mysqldb.query(`update edit_limits set climit=${c} where ID=1`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else {

            console.log("Limit Details", JSON.parse(JSON.stringify(result)));
            res.redirect('editlimits',{
                role: req.user.role
            });
        }
    })

});
router.post('/editcess', (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const { educess }=JSON.parse(JSON.stringify(req.body));
    // var c = parseInt(climit);
    // console.log(c);
    
    mysqldb.query(`update config set educess=${educess} where ID=1`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else {

            console.log("Limit Details", JSON.parse(JSON.stringify(result)));
            res.redirect('editlimits',{
                role: req.user.role
            });
        }
    })

});

router.post('/declarations', (req, res) => {

    console.log(req.body)
    //     var cur_month=new Date().getMonth()+1;
    //     const trip =JSON.parse(JSON.stringify(req.body));
    //     month= trip.trip.slice(5,7);
    //     sunand= cur_month-month;
    //    res.redirect('salcert/5');
    const dec = JSON.parse(JSON.stringify(req.body));
    const { g, empID, c, d, e, ccd, ccc, dd, age,gross_total} = dec;
    // var agebased;
    var gg = parseInt(g);
    var ded_c = parseInt(c);
    var ded_d = parseInt(d);
    var ded_e = parseInt(e);
    var ded_ccd = parseInt(ccd);
    var ded_ccc = parseInt(ccc);
    var ded_dd = parseInt(dd);
    var dec_age=parseInt(age);
    var gross_sal=parseInt(gross_total);

    // console.log("g=" + gg, Math.min(g, 60000), "c=" + ded_c, Math.min(c, 150000), d, e, ccd, ccc, dd)

    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select * from edit_limits`, (err, upper) => {

                console.log(upper)
                var climit=JSON.parse(JSON.stringify(upper))[0].climit
                var glimit=JSON.parse(JSON.stringify(upper))[0].glimit
                var dlimit1=JSON.parse(JSON.stringify(upper))[0].dlimit1
                var dlimit2=JSON.parse(JSON.stringify(upper))[0].dlimit2
                var ccclimit=JSON.parse(JSON.stringify(upper))[0].ccclimit
                var ccdlimit=JSON.parse(JSON.stringify(upper))[0].ccdlimit
                var ddlimit=JSON.parse(JSON.stringify(upper))[0].ddlimit
               

                var total = Math.min(gg, glimit) + Math.min(ded_c, climit) + ded_e + Math.min(ded_ccc, ccclimit) + Math.min(ded_ccd, ccdlimit) + Math.min(ded_dd, ddlimit);
                console.log(total);

                if (err) {
                    console.log(err);
                }

                else{
                    mysqldb.query(`update Employees set age=(floor(DATEDIFF(now(), dob)/ 365.2425)) where pay>0`, (err, result1) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(dec_age)
                            var limit_d = dlimit1
                            if (dec_age > 60) {
                                limit_d = dlimit2;
                            }
                            total+=Math.min(ded_d, limit_d) 
                            
                            mysqldb.query(`insert into form (empID,c,d,dd,g,e,ccc,ccd,total,gross_sal) VALUES('${empID}',${ded_c},${ded_d},${ded_dd},${gg},${ded_e},${ded_ccc},${ded_ccd},${total},${gross_sal})`,(err,result2)=>{
                                if(err)
                                {
                                    console.log(err)
                                }
                                else{
                                    res.render('incometax', {
                                            Employees: JSON.parse(JSON.stringify(result2))
                                        });
                                }
                            })
                        }
                  })
                }
        })

        }
    })
    res.redirect('/addincometax');
       

});

router.post('/check', (req, res)=> {
    
        console.log(req.body)
        console.log("abc")
               // Employees[2].empID .push("Hola");
        console.log(req.body)
                res.redirect('/index1')
               
            }
        )


router.post('/updateform', (req, res) => {

    console.log(req.body)
    //     var cur_month=new Date().getMonth()+1;
    //     const trip =JSON.parse(JSON.stringify(req.body));
    //     month= trip.trip.slice(5,7);
    //     sunand= cur_month-month;
    //    res.redirect('salcert/5');
    const dec = JSON.parse(JSON.stringify(req.body));
    const { g, empID, c, d, e, ccd, ccc, dd, age,gross_total} = dec;
    // var agebased;
    var gg = parseInt(g);
    var ded_c = parseInt(c);
    var ded_d = parseInt(d);
    var ded_e = parseInt(e);
    var ded_ccd = parseInt(ccd);
    var ded_ccc = parseInt(ccc);
    var ded_dd = parseInt(dd);
    var dec_age=parseInt(age);
    var gross_sal=parseInt(gross_total);

    // console.log("g=" + gg, Math.min(g, 60000), "c=" + ded_c, Math.min(c, 150000), d, e, ccd, ccc, dd)

    mysqldb.query(`select * from Employees natural join form`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select * from edit_limits`, (err, upper) => {

                console.log(upper)
                var climit=JSON.parse(JSON.stringify(upper))[0].climit
                var glimit=JSON.parse(JSON.stringify(upper))[0].glimit
                var dlimit1=JSON.parse(JSON.stringify(upper))[0].dlimit1
                var dlimit2=JSON.parse(JSON.stringify(upper))[0].dlimit2
                var ccclimit=JSON.parse(JSON.stringify(upper))[0].ccclimit
                var ccdlimit=JSON.parse(JSON.stringify(upper))[0].ccdlimit
                var ddlimit=JSON.parse(JSON.stringify(upper))[0].ddlimit
               

                var total = Math.min(gg, glimit) + Math.min(ded_c, climit) + ded_e + Math.min(ded_ccc, ccclimit) + Math.min(ded_ccd, ccdlimit) + Math.min(ded_dd, ddlimit);
                console.log(total);

                if (err) {
                    console.log(err);
                }

                else{
                    mysqldb.query(`update Employees set age=(floor(DATEDIFF(now(), dob)/ 365.2425)) where pay>0`, (err, result1) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(dec_age)
                            var limit_d = dlimit1
                            if (dec_age > 60) {
                                limit_d = dlimit2;
                            }
                            total+=Math.min(ded_d, limit_d) 
                            
                            mysqldb.query(`update form set c=${ded_c},
                            d=${ded_d},
                            dd=${ded_dd},
                            total=${total},
                            gross_sal=${gross_sal})`,(err,result2)=>{
                                if(err)
                                {
                                    console.log(err)
                                }
                                else{

                                    console.log("check" + result)
                                    res.render('incometax', {
                                            Employees: JSON.parse(JSON.stringify(result))
                                        });
                                }
                            })
                        }
                  })
                }
        })
        }
    })
       

});



router.get('/edit/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    // console.log(typeof(requestedTitle));

    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                // var set=new Set(JSON.parse(JSON.stringify(result)))
                console.log("result2 is", result2)
                res.render('edit', {
                    // Employees:JSON.parse(JSON.stringify(result)),
                    Employees: JSON.parse(JSON.stringify(result2)),
                    role: req.user.role
                });
            }
        })

    }

    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,{
            role: req.user.role
        })
    }

});

router.get('/editdates/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    // console.log(typeof(requestedTitle));

    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                // var set=new Set(JSON.parse(JSON.stringify(result)))
                console.log("result2 is", result2)
                res.render('editdates', {
                    // Employees:JSON.parse(JSON.stringify(result)),
                    Employees: JSON.parse(JSON.stringify(result2)),
                    role: req.user.role
                });
            }
        })

    }

    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,
            {
                role: req.user.role
            })
    }

});

router.post('/dates', (req, res) => {

    const data = JSON.parse(JSON.stringify(req.body));
    const { empID, doj, dob  } = data;
    // console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    mysqldb.query(`UPDATE Employees 
    SET 
    doj='${doj}', 
    dob='${dob}'
    WHERE 
    empID='${empID}'` 
        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else {
                // console.log(JSON.parse(JSON.stringify(result))[0])
                console.log(result);
                res.redirect('/viewemployee')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })
})

router.post('/dropdowns', (req, res) => {

    const data = JSON.parse(JSON.stringify(req.body));
    const { empID, status, salaryCategory  } = data;
    // console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    mysqldb.query(`UPDATE Employees 
    SET 
    status='${status}', 
    salaryCategory='${salaryCategory}'
    WHERE 
    empID='${empID}'` 
        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else {
                // console.log(JSON.parse(JSON.stringify(result))[0])
                console.log(result);
                res.redirect('edit/${empID}')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })
})
router.post('/editEmployee', (req, res) => {

    const data = JSON.parse(JSON.stringify(req.body));
    const { empID, empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, salaryCategory, emailID, groupInsurance, payBand, branchName, ifscCode, designationCategory, emailID2, nonteach, cca, ta, dop, doc, appointment, category, gender, status, mobile, address_correspondence, address_permanent, vacation, seniority, dept_seniority, aadhar, Pan_No, onrole, phd, phdSub, phdUni, phdInsti, phdYr, pgSub, pgUni, pgYr, ugSub, ugUni, ugYr, grade, netset, othqual, exp, industry_exp, uni_approval, uni_app_date, uni_app_period, workexNT, emp_temp_regime, photo } = data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    // mysqldb.query(`INSERT INTO Employees (empName) VALUES ('${empName}')`
    //  empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , Type  , Type1 ,  onroll  , dop  , doc   ,appointment ,  Relieving  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,(err,result)=>{

    // console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
    mysqldb.query(`UPDATE Employees 
    SET 
    empName='${empName}', 
    uan='${uan}', 
    dept='${dept}', 
    designation='${designation}', 
    pay='${pay}', 
    gp='${gp}', 
    pf='${pf}', 
    bankAccNum='${bankAccNum}', 
    bankName='${bankName}', 
    salaryCategory='${salaryCategory}', 
    emailID='${emailID}', 
    groupInsurance='${groupInsurance}', 
    payBand='${payBand}', 
    ifscCode='${ifscCode}', designationCategory='${designationCategory}', emailID2='${emailID2}', nonteach='${nonteach}', 
    Subject='${emailID}', cca='${cca}', ta='${ta}', dop='${dop}', doc='${doc}', appointment='${appointment}', 
    category='${category}', gender='${gender}', status='${status}', mobile='${mobile}', address_correspondence='${address_correspondence}', 
    address_permanent='${address_permanent}', vacation='${vacation}', seniority='${seniority}', dept_seniority='${dept_seniority}', 
    aadhar='${aadhar}', Pan_No='${Pan_No}', onrole='${onrole}', 
    phd='${phd}', phdSub='${phdSub}', phdUni='${phdUni}', phdInsti='${phdInsti}', phdYr='${phdYr}', 
    pgSub='${pgSub}', pgUni='${pgUni}', pgYr='${pgYr}', 
    ugSub='${ugSub}', ugUni='${ugUni}', ugYr='${ugYr}', 
    grade='${grade}', netset='${netset}', othqual='${othqual}', exp='${exp}', industry_exp='${industry_exp}', 
    uni_approval='${uni_approval}', uni_app_date='${uni_app_date}', uni_app_period='${uni_app_period}', workexNT='${workexNT}',
     emp_temp_regime='${emp_temp_regime}', 
    photo='${photo}'
    WHERE 
    empID='${empID}';` 
        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else {
                // console.log(JSON.parse(JSON.stringify(result))[0])
                console.log(result);
                res.redirect('/viewemployee')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })

        res.redirect('/viewemployee')

})


router.get('/final', ensureAuthenticated, (req, res) => {
    res.render('final',{
        role: req.user.role
    });
});

//------------ Search for Employee Details Route ------------//
router.post('/searchEmployee', (req, res) => {
    const id = req.body.id;
    console.log(req.body)
    mysqldb.query(`select * from Employees where empID='${id}'`, (err, result) => {
        if (result.length === 0) {
            //------------ Invalid registration Number ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log("invalid registration number")
        }
        else {
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
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('table-export', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/edit', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('edit', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/editdates', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('editdates', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/addincometax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select count(*) as empCount from Employees`, (err, result2) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select count(*) as formCount from form`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                        var render=false;
                        if( JSON.parse(JSON.stringify(result2)).empCount===JSON.parse(JSON.stringify(result)).formCount)
                        {
                            render=true;
                        }
                        console.log("Employees Details", JSON.parse(JSON.stringify(result)));
                        res.render('addincometax', {
                            role: req.user.role,
                            render
                        })
                }
            })
        }
    })

});


router.get('/incometax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from income_tax natural join form`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('incometax', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/updateincometax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees natural join form`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('update_home', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/updateincometax/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)

    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from form natural join Employees `, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                mysqldb.query(`select * from form natural join Employees where empID="${req.params.empID}"`, (err, result2) => {
                    if (err) {
                        console.log(err);
                    }
                    else {

                        mysqldb.query(`select * from edit_limits`, (err, result3) => {
                            if (err) {
                                console.log(err);
                            }
                            else {

                            // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                            // var set=new Set(JSON.parse(JSON.stringify(result)))
                                console.log("result3 is", result3)
                                res.render('updateincometax', {
                                    Employees: JSON.parse(JSON.stringify(result2)),
                                    name: JSON.parse(JSON.stringify(result2)),
                                    limits: JSON.parse(JSON.stringify(result3)),
                                    role: req.user.role
                                });
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,{
            role: req.user.role
        })
    }
});

router.get('/donations', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('donations', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/donations',ensureAuthenticated,(req,res)=>{
    mlist = [ "January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December" ];
    var cur_month=mlist[new Date().getMonth()].toLowerCase()
    var cur_year=new Date().getFullYear()
    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    var list = "(";
    var list2 = []
    for (var i in data) {

        if(i.includes("EMP"))
        {
            console.log(i)
            console.log(data[i])
            list += i.toString() + ","
            list2.push(i)
        }

    }
    if(list2.length==0)
    {
        res.json({status:"error", message:"Please Tick Atleast One Check Box"})

    }
    else
    {
        var donateDays=parseInt(data["donateDays"]);
        var cause=data["cause"];
        list=list.substring(0,list.length - 1);
        list+=")";
        console.log("list is",list2)
        for(var i in list2)
        {
            console.log(`insert into donation(empID,donationDays,month,year,cause) VALUES('${list2[i]}',${donateDays},'${cur_month}',${cur_year},'${cause}')`)
            mysqldb.query(`insert into donation(empID,donationDays,month,year,cause) VALUES('${list2[i]}',${donateDays},'${cur_month}',${cur_year},'${cause}') on duplicate key update donationDays=${donateDays}, cause='${cause}'`,(err,result)=>{
                if (err) {
                    console.log(err);
                    res.json({status:"error", message:"Please Fill No. of Days and Cause"})
                
                    
                }
                else {
                res.json({status:"success", message:"Donations Added Successfully!"})
                }
            })
        }
    }
    

   

})

router.get('/viewdonations', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from donation`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('viewdonations', {
                donation: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/ta', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('ta', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/ta', ensureAuthenticated, (req, res) => {

    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    var list = "(";
    var list2 = []
    for (var i in data) {

        if(i.includes("EMP"))
        {
            console.log(i)
            console.log(data[i])
            list+="'"+i.toString()+"'"+","
            list2.push(i)
        }

    }
    if(list2.length==0)
    {
        res.json({status:"error", message:"Please Tick Atleast One Check Box"})
    }

    else
    {
        var newValue=parseInt(data["newValue"]);
        list=list.substring(0,list.length - 1);
        list+=")";
        console.log("list is",list2)
        console.log(`update Employees set ta=${newValue} where empID in ${list}`)
        mysqldb.query(`update Employees set ta=${newValue} where empID in ${list}`,(err,result)=>{
            if (err) {
                console.log(err);
                res.json({status:"error", message:"Please Fill TA Amount"})
            
                
            }
            else {
            res.json({status:"success", message:"TA Added Successfully!"})
            }
        })
    }
    

    // res.redirect('ta');

});

router.get('/hra', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('hra', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/hra', ensureAuthenticated, (req, res) => {

    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    var list = "(";
    var list2 = []
    for (var i in data) {

        if(i.includes("EMP"))
        {
            console.log(i)
            console.log(data[i])
            list+="'"+i.toString()+"'"+","
            list2.push(i)
        }

    }

    if(list2.length==0)
    {
        res.json({status:"error", message:"Please Tick Atleast One Check Box"})

    }
    else
    {
        var newValue=data["newValue"];
        list=list.substring(0,list.length - 1);
        list+=")";
        console.log("list is",list2)
        console.log(`update Employees set hra=${newValue} where empID in ${list}`)
        mysqldb.query(`update Employees set hra=${newValue} where empID in ${list}`,(err,result)=>{
            if (err) {
                console.log(err);
                res.json({status:"error", message:"Please Fill HRA Amount"})
            
                
            }
            else {
            res.json({status:"success", message:"HRA Added Successfully!"})
            }
        })
    }
    

    // res.redirect('hra');

});

router.get('/da', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('da', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/da', ensureAuthenticated, (req, res) => {

    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    var list = "(";
    var list2 = []
    for (var i in data) {

        if(i.includes("EMP"))
        {
            console.log(i)
            console.log(data[i])
            list+="'"+i.toString()+"'"+","
            list2.push(i)
        }

    }

    if(list2.length==0)
    {
        res.json({status:"error", message:"Please Tick Atleast One Check Box"})
    }
    else
    {
        var newValue=data["newValue"];
        list=list.substring(0,list.length - 1);
        list+=")";
        console.log("list is",list2)
        console.log(`update Employees set da=${newValue} where empID in ${list}`)
        mysqldb.query(`update Employees set da=${newValue} where empID in ${list}`,(err,result)=>{
            if (err) {
                console.log(err);
                res.json({status:"error", message:"Please Fill DA Amount"})
            
                
            }
            else {
            res.json({status:"success", message:"DA Added Successfully!"})
            }
        })
    
    }
    
    // res.redirect('da');

});



router.get('/cca', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('cca', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/cca', ensureAuthenticated, (req, res) => {

    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    var list = "(";
    var list2 = []
    for (var i in data) {

        if(i.includes("EMP"))
        {
            console.log(i)
            console.log(data[i])
            list+="'"+i.toString()+"'"+","
            list2.push(i)
        }

    }
    if(list2.length==0)
    {
        res.json({status:"error", message:"Please Tick Atleast One Check Box"})

    }
    else
    {
        var newValue = parseInt(data["newValue"]);
        list = list.substring(0, list.length - 1);
        list += ")";
        console.log("list is", list2)
        mysqldb.query(`update Employees set cca=${newValue} where empID in ${list}`, (err, result) => {
            if (err) {
                console.log(err);
                res.json({status:"error", message:"Please Fill CCA Amount"})
            
                
            }
            else {
            res.json({status:"success", message:"CCA Added Successfully!"})
            
            }
        })
    }
   

    // res.redirect('cca');

});


router.get('/differences', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('differences', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/differences', ensureAuthenticated, (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    var list2 = []
    for (var i in data) {

        if (i.includes("EMP")) {
            console.log(i)
            console.log(data[i])
            list2.push(i)
        }

    }
    // if(list2.length==0)
    // {
    //     res.json({status:"error", message:"Please Tick Atleast One Check Box"})

    // }
    
        console.log("list is", list2);
        var duration=0;
        first_date=data.month[0];
        second_date=data.month[1];
        first_month=parseInt(first_date.split("-")[1]);
        second_month=parseInt(second_date.split("-")[1]);
        first_year=parseInt(first_date.split("-")[0]);
        second_year=parseInt(second_date.split("-")[0]);
        console.log(first_month,first_year)
        if( second_year>=first_year)
        {
                if(first_month>second_month)
                {
                    if(second_year===first_year+1)
                    {
                        duration=second_month+12-first_month+1;
                    }
                }
                else
                {
                        if(second_year===first_year)
                        {
                            
                            duration=second_month-first_month+1;
                        }
                        
                   
                }
        }
        else
        {
            //alert
        }
        mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = mlist[new Date().getMonth()].toLowerCase();
        var year = new Date().getFullYear()
        // var duration = data.months
        for (let i = 0; i < list2.length; i++) {
            console.log("i is", list2[i])
            mysqldb.query(`insert into increment_difference(empID,month,duration,year) VALUES ('${list2[i]}','${month}',${duration},${year})`, (err, result) => {
                if (err) {
                    console.log(err);
                    // res.json({status:"error", message:"Please Fill Start and End Month"})
                
                    
                }
                else {
                // res.json({status:"success", message:"Differences Added Successfully!"})
                }
            })
        }

        res.redirect('/index1');

    

})

router.get('/otherdifferences', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select distinct hra from Employees`, (err, result3) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select * from Employees`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    mysqldb.query(`select * from config`, (err, result2) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
                            res.render('otherdifferences', {
                                Employees: JSON.parse(JSON.stringify(result)),
                                oldHra:JSON.parse(JSON.stringify(result3)),
                                config: JSON.parse(JSON.stringify(result2)),
                                role: req.user.role
                            });
                        }
                    })
                }
            })
        }
    })
});

router.get('/dadifference', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select distinct da from Employees`, (err, result3) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select * from Employees`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    mysqldb.query(`select * from config`, (err, result2) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
                            res.render('dadifference', {
                                Employees: JSON.parse(JSON.stringify(result)),
                                oldDa:JSON.parse(JSON.stringify(result3)),
                                config: JSON.parse(JSON.stringify(result2)),
                                role: req.user.role
                            });
                        }
                    })
                }
            })
        }
    })
});

router.post('/dadifference', ensureAuthenticated, (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    var list2 = []
    for (var i in data) {

        if (i.includes("EMP")) {
            console.log(i)
            console.log(data[i])
            list2.push(i)
        }

    }
    console.log("list is", list2)
    var da_difference = parseFloat(data.newdda) - parseFloat(data["old_da"])
    // var hra_difference = parseFloat(data.newhra) - parseFloat(data.presenthra)
    mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = mlist[new Date().getMonth()];
    var year = new Date().getFullYear();
    var da_duration=0;
    // var hra_duration=0;

    first_date_da=data.month2[0];
    second_date_da=data.month2[1];
    first_month_da=parseInt(first_date_da.split("-")[1]);
    second_month_da=parseInt(second_date_da.split("-")[1]);
    first_year_da=parseInt(first_date_da.split("-")[0]);
    second_year_da=parseInt(second_date_da.split("-")[0]);
    console.log(first_month_da,first_year_da)
    if( second_year_da>=first_year_da)
    {
            if(first_month_da>second_month_da)
            {
                if(second_year_da===first_year_da+1)
                {
                    da_duration=second_month_da+12-first_month_da+1;
                }
            }
            else
            {
                    if(second_year_da===first_year_da)
                    {
                        
                        da_duration=second_month_da-first_month_da+1;
                    }
                    
               
            }
    }
    else
    {
        //alert
    }

    // first_date_hra=data.month1[0];
    // second_date_hra=data.month1[1];
    // first_month_hra=parseInt(first_date_hra.split("-")[1]);
    // second_month_hra=parseInt(second_date_hra.split("-")[1]);
    // first_year_hra=parseInt(first_date_hra.split("-")[0]);
    // second_year_hra=parseInt(second_date_hra.split("-")[0]);
    // console.log(first_month_hra,first_year_hra)
    // if( second_year_hra>=first_year_hra)
    // {
    //         if(first_month_hra>second_month_hra)
    //         {
    //             if(second_year_hra===first_year_hra+1)
    //             {
    //                 hra_duration=second_month_hra+12-first_month_hra+1;
    //             }
    //         }
    //         else
    //         {
    //                 if(second_year_hra===first_year_hra)
    //                 {
                        
    //                     hra_duration=second_month_hra-first_month_hra+1;
    //                 }
                    
               
    //         }
    // }
    // else
    // {
    //     //alert
    // }


    
    for (let i = 0; i < list2.length; i++) {
        console.log("i is", list2[i])
        mysqldb.query(`insert into da_difference(empID,difference,month,duration,year) VALUES ('${list2[i]}',${da_difference},'${month.toLowerCase()}',${da_duration},${year})`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {

            }
        })
        // mysqldb.query(`insert into hra_difference(empID,difference,month,duration,year) VALUES ('${list2[i]}',${hra_difference},'${month.toLowerCase()}',${hra_duration},${year})`, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {

        //     }
        // })
    }

})

router.post('/otherdifferences', ensureAuthenticated, (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    var list2 = []
    for (var i in data) {

        if (i.includes("EMP")) {
            console.log(i)
            console.log(data[i])
            list2.push(i)
        }

    }
    console.log("list is", list2)
    // var da_difference = parseFloat(data.newdda) - parseFloat(data.presentdda)
    var hra_difference = parseFloat(data.newhra) - parseFloat(data["old_hra"])
    mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = mlist[new Date().getMonth()];
    var year = new Date().getFullYear();
    // var da_duration=0;
    var hra_duration=0;

    // first_date_da=data.month2[0];
    // second_date_da=data.month2[1];
    // first_month_da=parseInt(first_date_da.split("-")[1]);
    // second_month_da=parseInt(second_date_da.split("-")[1]);
    // first_year_da=parseInt(first_date_da.split("-")[0]);
    // second_year_da=parseInt(second_date_da.split("-")[0]);
    // console.log(first_month_da,first_year_da)
    // if( second_year_da>=first_year_da)
    // {
    //         if(first_month_da>second_month_da)
    //         {
    //             if(second_year_da===first_year_da+1)
    //             {
    //                 da_duration=second_month_da+12-first_month_da+1;
    //             }
    //         }
    //         else
    //         {
    //                 if(second_year_da===first_year_da)
    //                 {
                        
    //                     da_duration=second_month_da-first_month_da+1;
    //                 }
                    
               
    //         }
    // }
    // else
    // {
    //     //alert
    // }

    first_date_hra=data.month1[0];
    second_date_hra=data.month1[1];
    first_month_hra=parseInt(first_date_hra.split("-")[1]);
    second_month_hra=parseInt(second_date_hra.split("-")[1]);
    first_year_hra=parseInt(first_date_hra.split("-")[0]);
    second_year_hra=parseInt(second_date_hra.split("-")[0]);
    console.log(first_month_hra,first_year_hra)
    if( second_year_hra>=first_year_hra)
    {
            if(first_month_hra>second_month_hra)
            {
                if(second_year_hra===first_year_hra+1)
                {
                    hra_duration=second_month_hra+12-first_month_hra+1;
                }
            }
            else
            {
                    if(second_year_hra===first_year_hra)
                    {
                        
                        hra_duration=second_month_hra-first_month_hra+1;
                    }
                    
               
            }
    }
    else
    {
        //alert
    }


    
    for (let i = 0; i < list2.length; i++) {
        console.log("i is", list2[i])
        // mysqldb.query(`insert into da_difference(empID,difference,month,duration,year) VALUES ('${list2[i]}',${da_difference},'${month.toLowerCase()}',${da_duration},${year})`, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {

        //     }
        // })
        mysqldb.query(`insert into hra_difference(empID,difference,month,duration,year) VALUES ('${list2[i]}',${hra_difference},'${month.toLowerCase()}',${hra_duration},${year})`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {

            }
        })
    }

})

router.get('/showincrement', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from increment`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showincrement', {
                increment: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});


router.get('/generatesalary', (req, res) => {
    mysqldb.query(`select * from Salary`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('generatesalary', {
                salarydata: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
}
)



router.get('/pdf', ensureAuthenticated, (req, res) => {
    res.render('pdf',{
        role: req.user.role
    })
})


router.get('/pay', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select empName,empID from Employees`, (err, result2) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Salary Details", JSON.parse(JSON.stringify(result)));
                    //var set=new Set(JSON.parse(JSON.stringify(result)))
                    console.log("result2 is", result2)
                    res.render('pay', {
                        lwp: JSON.parse(JSON.stringify(result)),
                        name: JSON.parse(JSON.stringify(result2)),
                        role: req.user.role
                    });
                }
            })

        }
    })
});

router.post('/pay', ensureAuthenticated, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    const empID = req.params.empID;
    console.log(JSON.parse(JSON.stringify(req.body)))
    // const length=data["lwp"].length
    var monthNames = [ "january", "february", "march", "april", "may", "june",
"july", "august", "september", "october", "november", "december" ];
    // if(data["beforeafter25"]==="after")
    // {
    //     data.month=monthNames[monthNames.indexOf(data.month.toLowerCase())+1].toLowerCase();
    // }
    // console.log(length)
    // for (let i = 0; i < length; i++) {
    var days;
    if (data["month"].toLowerCase() === "january") {
        days = 31;
    }
    else if (data["month"].toLowerCase() === "february") {
        if( (0 == data.year % 4) && (0 != data.year % 100) || (0 == data.year % 400) )
        {
            days=29
        }
        else
        {
            days=28
        }
    }
    else if (data["month"].toLowerCase() === "march") {
        days = 31;
    }
    else if (data["month"].toLowerCase() === "april") {
        days = 30;
    }
    else if (data["month"].toLowerCase() === "may") {
        days = 31;
    }
    else if (data["month"].toLowerCase() === "june") {
        days = 30
    }
    else if (data["month"].toLowerCase() === "july") {
        days = 31
    }
    else if (data["month"].toLowerCase() === "august") {
        days = 31
    }
    else if (data["month"].toLowerCase() === "september") {
        days = 30
    }
    else if (data["month"].toLowerCase() === "october") {
        days = 31
    }
    else if (data["month"].toLowerCase() === "november") {
        days = 30
    }
    else if (data["month"].toLowerCase() === "december") {
        days = 31
    }

    console.log(data["lwp"], data["month"], data["year"], days)

    // mysqldb.query(`select empID from Employees ORDER BY empID LIMIT ${i},1`,(err,result)=>{
    //     if (err) {
    //         //------------ Invalid registration Number ------------//
    //         // req.flash('error_msg',
    //         // 'Please enter valid Id.')
    //         console.log(err)
    //     }
    //     else{
    // var empID=JSON.parse(JSON.stringify(result))[0].empID;
    mysqldb.query(`INSERT INTO lwp (empID, month, year, days, lwp) VALUES ('${data.empID}', '${data["month"].toLowerCase()}', ${data["year"]}, ${days}, ${data["lwp"]}) ON DUPLICATE KEY UPDATE
        lwp=${data["lwp"]}`
        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else {
                // console.log(JSON.parse(JSON.stringify(result))[0])
                // res.redirect('/dashboard')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })
    //     }
    // })
    res.redirect('showlwp');
});
router.get('/viewemployee', ensureAuthenticated, (req, res) => {

    // var abc="update employees set age=(floor(DATEDIFF(now(), dob)/ 365.2425)) where pay>0;"
    // abc += "select * from Employees"
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`update Employees set age=(floor(DATEDIFF(now(), dob)/ 365.2425)) where pay>0`, (err, result2) => {
                if (err) {
                    console.log(err);
                }
                else {
                    mysqldb.query(`update Employees set workexpYr=(floor(DATEDIFF(now(), doj)/ 365.2425)) where pay>0`, (err, result2) => {
                        if (err) {
                            console.log(err);
                        }
                        else
                        {
                                console.log("Employees Details",JSON.parse(JSON.stringify(result)));
                                res.render('viewemployee',{
                                Employees:JSON.parse(JSON.stringify(result)),
                                role: req.user.role
                            });

                        }

                    })

                }
            })

        }
    })

});

router.get('/finalcheck', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees natural join lwp`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('finalcheck', {
                lwp: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/finalrecoveryamt', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees natural join recovery`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('finalrecoveryamt', {
                miscell: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/finaladvances', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees natural join advance_temp`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('finaladvances', {
                adv: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/miscellaneous', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('mis_home', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});


router.get('/recoveryamount', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('recamt_home', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/finalmiscellaneous', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees natural join miscellaneous`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('finalmiscellaneous', {
                miscell: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/finalattendance', ensureAuthenticated, (req, res) => {
    mysqldb.query(`SELECT *
    FROM Employees
    RIGHT JOIN late_attendance
    ON Employees.empID= late_attendance.empID`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('finalattendance', {
                late: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});




router.get('/trial', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('trial', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/showlwp', (req, res) => {
    //mysqldb.query(`select * from lwp natural join Employees`,(err,result)=>
    mysqldb.query(`delete from lwp where lwp=0`);
    mysqldb.query(`select * from lwp natural join Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            mysqldb.query(`select empName,empID from Employees`, (err, result2) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Salary Details", JSON.parse(JSON.stringify(result)));
                    //var set=new Set(JSON.parse(JSON.stringify(result)))
                    console.log("result2 is", result2)
                    res.render('showlwp', {
                        lwp: JSON.parse(JSON.stringify(result)),
                        name: JSON.parse(JSON.stringify(result2)),
                        role: req.user.role
                    });
                }
            })

        }
    })

});

router.get('/templwp', (req, res) => {
    mysqldb.query(`select * from lwp`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('templwp', {
                lwp: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.get('/allowances', (req, res) => {
    mysqldb.query(`select * from config`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('allowances', {
                data: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

// router.post('/allowances', (req, res) => {
//     console.log(JSON.parse(JSON.stringify(req.body)))
//     const {hra_MultFactor,da_MultFactor}=JSON.parse(JSON.stringify(req.body));
//     mysqldb.query(`update config set hra_MultFactor=${hra_MultFactor},da_MultFactor=${da_MultFactor} where ID=1`,(err,result)=>
//     {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Salary Details", JSON.parse(JSON.stringify(result)));
//             res.redirect('index1');
//         }
//     })

// });

// router.get('/viewallow', (req, res) => {
//     mysqldb.query(`select * from config`, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Salary Details", JSON.parse(JSON.stringify(result)));
//             res.render('viewallow', {
//                 data: JSON.parse(JSON.stringify(result))
//             });
//         }
//     })

// });

router.get('/salsheet', (req, res) => {
    res.render('salsheet',{
        role: req.user.role
    });
});

router.post('/salsheet', (req, res) => {
    console.log(req.body)
    res.redirect('index1');
});

// ------------ Search for Employee Details Route ------------//
router.post('/searchEmployee', (req, res) => {
    const id = req.body.id;
    console.log(req.body)
    db.query(`select * from Employees where empID='${id}'`, (err, result) => {
        if (result.length === 0) {
            //------------ Invalid registration Number ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log("invalid registration number")
        }
        else {
            console.log(JSON.parse(JSON.stringify(result))[0])
            res.send("Done");
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
        }
    })
})

router.post('/table-export', ensureAuthenticated, (req, res) => {
    console.log(req.body)
    res.redirect('index1');
});


// ------------ Add Employee Route ------------//
router.post('/addEmployee', (req, res) => {

    const data = JSON.parse(JSON.stringify(req.body));
    const { empID, empName, uan, dept, designation, 
        pay, gp, pf, bankAccNum, bankName, doj, salaryCategory, emailID, groupInsurance, payBand, 
        branchName, ifscCode, designationCategory, emailID2, nonteach, Subject, cca, ta, dop, doc, Relieving, 
        appointment, category, gender, status, mobile, address_correspondence, address_permanent, 
        vacation, seniority, dept_seniority, aadhar, Pan_No, onrole, phd, phdSub, phdUni, phdInsti, phdYr, 
        pgSub, pgUni, pgYr, ugSub, ugUni, ugYr, grade, netset, othqual, exp, industry_exp, 
        uni_approval, uni_app_date, uni_app_period, workexNT, dob, emp_temp_regime, photo, paycommission, 
        hra, da, bloodgrp } = data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    // mysqldb.query(`INSERT INTO Employees (empName) VALUES ('${empName}')`
    //  empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , Type  , Type1 ,  onroll  , dop  , doc   ,appointment ,  Relieving  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,(err,result)=>{

    // console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
    mysqldb.query(`INSERT INTO Employees 
    (empID,empName, uan,dept, designation, 
        pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , 
        branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , dop  , doc, Relieving  ,
        appointment  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent ,   
        vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  
        pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,
        uni_approval,uni_app_date,uni_app_period,workexNT,dob,emp_temp_regime,photo,paycommission, 
        hra, da, bloodgrp) VALUES 
        ('${empID}','${empName}', '${uan}', '${dept}', '${designation}', 
        ${pay}, ${gp}, ${pf}, '${bankAccNum}', '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}',
        '${branchName}','${ifscCode}','${designationCategory}','${emailID2}','${nonteach}','${Subject}',${cca},${ta},'${dop}','${doc}', '${Relieving}',
        '${appointment}','${category}','${gender}','${status}','${mobile}','${address_correspondence}','${address_permanent}',
        '${vacation}','${seniority}','${dept_seniority}','${aadhar}','${Pan_No}','${onrole}','${phd}','${phdSub}','${phdUni}','${phdInsti}','${phdYr}',
        '${pgSub}','${pgUni}','${pgYr}','${ugSub}','${ugUni}','${ugYr}','${grade}','${netset}','${othqual}',${exp},${industry_exp},
       '${uni_approval}','${uni_app_date}',${uni_app_period},${workexNT},'${dob}','${emp_temp_regime}','${photo}', ${paycommission},
       ${hra}, ${da}, '${bloodgrp}')`

        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else {
                // console.log(JSON.parse(JSON.stringify(result))[0])
                console.log(result);
                res.redirect('/index1')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })
})

router.get('/groupinsurance', ensureAuthenticated, (req, res) => {
    var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var d = new Date();
  var date = month[d.getMonth()];
  var year=d.getFullYear();
    mysqldb.query(`select * from Employees where empID not in (select empID from group_insurance where year=${year})`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('groupinsurance', {
                Employees: JSON.parse(JSON.stringify(result)),
                date: date,
                role: req.user.role
                
            });
        }
    })
});

router.post('/groupinsurance', ensureAuthenticated, (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    // const pay=data["increment"];
    // console.log(JSON.parse(JSON.stringify(req.body)))
    // var list=[];
    var list = "(";
    var index = "(";
    var IDlist = []
    var indexList = []
    var current = new Date();
    // var month=current.getMonth()+1;
    var year = current.getFullYear();
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()].toLowerCase();
    for (var i in data) {

        if (i.includes("EMP")) {
            console.log(i)
            console.log(data[i])
            IDlist.push(i)
        }

    }

    if(list2.length==0)
    {
        res.json({status:"error", message:"Please Tick Atleast One Check Box"})

    }
    else
    {
        console.log("id list is", IDlist)


        // console.log(data.month)
        // for(var i in indexList)
        for (let i = 0; i < IDlist.length; i++) {
            console.log(`insert into group_insurance (empID,month,year) VALUES ('${IDlist[i]}',${cur_month},${year})`)
            mysqldb.query(`insert into group_insurance (empID,month,year) VALUES ('${IDlist[i]}','${cur_month}','${year}') `, (err, result) => {
                if (err) {
                    console.log(err)
                    console.log("error in insert query from group insurance")
                }
                else {
                    console.log("group insurance added to table")
                    res.json({status:"success", message:"Group Insurance Added Successfully!"})
                }
            })
        }
    }

    

    res.redirect('index1');
})

router.get('/lateattendance', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('late_home', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/lateattendance/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees `, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
                    if (err) {
                        console.log(err);
                        
                    }
                    else {
                        // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                        // var set=new Set(JSON.parse(JSON.stringify(result)))
                        console.log("result2 is", result2)
                       
                        res.render('lateattendance', {
                            Employees: JSON.parse(JSON.stringify(result)),
                            name: JSON.parse(JSON.stringify(result2)),
                            role: req.user.role
                        });

                       
                    }
                })
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle)
    }

});


router.get('/miscellaneous/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)

    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees `, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                        // var set=new Set(JSON.parse(JSON.stringify(result)))
                        console.log("result2 is", result2)
                        res.render('miscellaneous', {
                            Employees: JSON.parse(JSON.stringify(result)),
                            name: JSON.parse(JSON.stringify(result2)),
                            role: req.user.role
                        });
                    }
                })
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,{
            role: req.user.role
        })
    }
});

router.get('/recoveryamount/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)
    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees `, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                        // var set=new Set(JSON.parse(JSON.stringify(result)))
                        console.log("result2 is", result2)
                        res.render('recoveryamount', {
                            Employees: JSON.parse(JSON.stringify(result)),
                            name: JSON.parse(JSON.stringify(result2)),
                            role: req.user.role
                        });
                    }
                })
            }
        })
    }

    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle)
    }
});


router.get('/advances', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('advances_home', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});
router.get('/declarations', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('declare_home', {
               Employees: JSON.parse(JSON.stringify(result)),
               role: req.user.role
            });
        }
    })
});

router.get('/declarations/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)

    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees `, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                        // var set=new Set(JSON.parse(JSON.stringify(result)))
                        console.log("result2 is", result2)
                        res.render('declarations', {
                            Employees: JSON.parse(JSON.stringify(result)),
                            name: JSON.parse(JSON.stringify(result2)),
                            role: req.user.role
                        });
                    }
                })
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,{
            role: req.user.role
        })
    }
});


router.get('/salarycert', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('salarycert', {
                Employees: JSON.parse(JSON.stringify(result)),
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.post('/salarycert',  (req, res) => {

    console.log(req.body)
    var cur_month=new Date().getMonth()+1;
    const trip =JSON.parse(JSON.stringify(req.body));
    month= trip.trip.slice(5,7);
    empID= trip.empID;
    dura=trip.dura;
    console.log(dura);
    sunand= cur_month-month;
    console.log(empID);
   res.redirect('salcert1/'+empID);
   //res.redirect('/?valid=' + string);
  
       

});

router.get('/advances/:empID', ensureAuthenticated, (req, res) => {
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)
    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Employees `, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                mysqldb.query(`select * from Employees where empID="${req.params.empID}"`, (err, result2) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                        // var set=new Set(JSON.parse(JSON.stringify(result)))
                        console.log("result2 is", result2)
                        res.render('advances', {
                            Employees: JSON.parse(JSON.stringify(result)),
                            name: JSON.parse(JSON.stringify(result2)),
                            role: req.user.role
                        });
                    }
                })
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle)
    }
});




// router.get('/advances', ensureAuthenticated, (req, res) => 
// {
//     mysqldb.query(`select * from Employees`,(err,result)=>
//     {
//         if (err) {
//             console.log(err);
//         }
//         else{
//             console.log("Salary Details",JSON.parse(JSON.stringify(result)));
//             res.render('advances',{
//                 salary:JSON.parse(JSON.stringify(result))
//             });
//         }
//     })
// });

router.get('/tempadvances', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('tempadvances', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/showadvances', ensureAuthenticated, (req, res) => {
    mysqldb.query(`delete from advance_temp where amount=0`);
    mysqldb.query(`select * from advance_temp`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('showadvances', {
                advance: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.post('/advances', ensureAuthenticated, (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    var data = JSON.parse(JSON.stringify(req.body));
    var empID = data.empID;
    console.log(`INSERT INTO advance_temp (empID, ,amount, month, year, duration, outstanding) VALUES ('${empID}', ${data["amt"]}, '${data["month"]}', ${data["year"]}, ${data["duration"]}, ${data["amt"]})`)
    mysqldb.query(`INSERT INTO advance_temp (empID, amount, month, year, duration, outstanding) VALUES ('${empID}', ${data["amt"]}, '${data["month"]}', ${data["year"]}, ${data["duration"]}, ${data["amt"]}) ON DUPLICATE KEY UPDATE
    amount = ${data["amt"]},  
    outstanding = ${data["amt"]},  
    duration = ${data["duration"]}`
        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("invalid details");
            }
            else {
                // console.log(JSON.parse(JSON.stringify(result))[0])

                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }

    })

    res.redirect('/index1')
});

router.get('/view2', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Salary natural join Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('view_2', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});


// //------------ Update Basic Pay and Related Properties Route ------------//
router.post('/updatepay', (req, res) => {
    // const {empID,pay}=req.body;
    // var increment=3
    console.log(JSON.parse(JSON.stringify(req.body)))

    const data = JSON.parse(JSON.stringify(req.body));
    // const pay=data["increment"];
    // console.log(JSON.parse(JSON.stringify(req.body)))
    // var list=[];
    var list = "(";
    var list2 = []
    for (var i in data) {

        if (i.includes("EMP")) {
            console.log(i)
            console.log(data[i])
            list+="'"+i.toString()+"'"+","
            list2.push(i)
        }

    }
    // if(list2.length==0)
    // {
    //     res.json({status:"error", message:"Please Tick Atleast One Check Box"})

    // }
    
        var incrementPercent = parseFloat(data["increment"]);
        list = list.substring(0, list.length - 1);
        list += ")";
        console.log("list is", list2)
        var current = new Date();
    
        mlist = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        // var cur_month="august"
        var cur_month = mlist[new Date().getMonth()].toLowerCase()
        var year = current.getFullYear();
    
        mysqldb.query(`select empID,pay,gp from Employees where empID in ${list}`, (err, result) => {
            if (err) {
                //------------ Invalid Employement ID ------------//
                // req.flash('error_msg',
                // 'Please enter valid Id.')
                console.log(err);
                console.log("invalid employment ID")
                
            }
            else {
                // gp=JSON.parse(JSON.stringify(result))[0].gp;
                // pf=JSON.parse(JSON.stringify(result))[0].pf;
                var queryData = JSON.parse(JSON.stringify(result))
                console.log(JSON.parse(JSON.stringify(result)));
                for (let i = 0; i < queryData.length; i++) {
                    var multFactor = 1 + incrementPercent / 100
                    var increment = (queryData[i].pay + queryData[i].gp) * multFactor
                    if ((Math.floor(increment) % 10) === 0) {
    
                    }
                    else {
                        increment = Math.ceil(increment / 10) * 10
                    }
                    var finalpay=increment-queryData[i].gp;
                    console.log(`update Employees set pay=${finalpay} where empID='${list2[i]}')`)
                    
                    // alert(`update Employees set pay=${finalpay} where empID='${list2[i]}')`)
                    
    
                    mysqldb.query(`INSERT INTO increment (empID, month, year, increment,prevPay,updatedPay) VALUES ('${list2[i]}', '${cur_month}', ${year}, ${incrementPercent},${queryData[i].pay},${finalpay})`,(err,result)=>
                    {
                        if (err) {
                            console.log(err);
                            res.json({status:"error", message:"Please Fill Increment Percentage and Duration"})
                        }
                        else{
                            mysqldb.query(`update Employees set pay=${finalpay} where empID='${list2[i]}'`,(err,result)=>
                            {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                }
                            })
    
                        }
                    })
                }
            }
    
            // console.log("gp,pf selected",gp,pf);
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
    
    
        })
    
    

    res.redirect('index1');
})


router.get('/showsalary', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select S.empID,E.empName,E.salaryCategory,E.uan,E.bankName,E.bankAccNum,S.month,S.year,S.daysOfMonth,IFNULL(l.lwp,0) as lwp,S.workedDays,S.original_pay as original_pay,S.original_gp as original_gp,S.bp,S.gp,S.da,S.hra,S.cca,S.diff,S.oth_spl,S.ta,S.gross_sal,S.pf,S.prof_tax,S.in_tax,case when g.empID is NOT NULL then E.groupInsurance else 0 end as group_insurance,IFNULL(la.latedays,0) as latedays,IFNULL(d.donationDays,0) as donationDays,IFNULL(a.amount,0) as advance,IFNULL(r.recoveryAmount,0) as recovery,IFNULL(m.miscellaneous_amt,0) as miscellaneous,S.other_deductions,S.rev_stmp,S.total_ded,S.net_sal from Salary S left outer join Employees E on (S.empID=E.empID) left outer join lwp l on (S.empID=l.empID AND S.month=l.month and S.year=l.year) left outer join group_insurance g on (S.empId=g.empID and S.month=g.month and S.year=g.year) left outer join late_attendance la on (S.empId=la.empID and S.month=la.month and S.year=la.year) left outer join donation d on (S.empId=d.empID and S.month=d.month and S.year=d.year) left outer join advance a on (S.empId=a.empID and S.month=a.month and S.year=a.year) left outer join recovery r on (S.empId=r.empID and S.month=r.month and S.year=r.year) left outer join miscellaneous m on (S.empId=m.empID and S.month=m.month and S.year=m.year)`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showsalary', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/masterview', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select * from Salary natural join Employees where month="${cur_month}" and year="${cur_year}"`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('masterview', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/master-view-prev-month', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var prev_month = mlist[new Date().getMonth()-1]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select * from Salary natural join Employees where month="${prev_month}" and year="${cur_year}"`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('masterviewprev', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/bankform', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()+1]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select * from Salary natural join Employees `, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('bankform', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});


router.get('/showfinaldeductions', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select S.empID,E.empName,E.salaryCategory,E.uan,E.bankName,E.bankAccNum,S.month,S.year,S.daysOfMonth,IFNULL(l.lwp,0) as lwp,S.workedDays,S.original_pay as original_pay,S.original_gp as original_gp,S.bp,S.gp,S.da,S.hra,S.cca,S.diff,S.oth_spl,S.ta,S.gross_sal,S.pf,S.prof_tax,S.in_tax,case when g.empID is NOT NULL then E.groupInsurance else 0 end as group_insurance,IFNULL(la.latedays,0) as latedays,IFNULL(d.donationDays,0) as donationDays,IFNULL(a.amount,0) as advance,IFNULL(r.recoveryAmount,0) as recovery,IFNULL(m.miscellaneous_amt,0) as miscellaneous,S.other_deductions,S.rev_stmp,S.total_ded,S.net_sal from Salary S left outer join Employees E on (S.empID=E.empID) left outer join lwp l on (S.empID=l.empID AND S.month=l.month and S.year=l.year) left outer join group_insurance g on (S.empId=g.empID and S.month=g.month and S.year=g.year) left outer join late_attendance la on (S.empId=la.empID and S.month=la.month and S.year=la.year) left outer join donation d on (S.empId=d.empID and S.month=d.month and S.year=d.year) left outer join advance a on (S.empId=a.empID and S.month=a.month and S.year=a.year) left outer join recovery r on (S.empId=r.empID and S.month=r.month and S.year=r.year) left outer join miscellaneous m on (S.empId=m.empID and S.month=m.month and S.year=m.year)`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showfinaldeductions', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});

router.get('/showmasterview', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select S.empID,E.empName,E.salaryCategory,E.uan,E.bankName,E.bankAccNum,S.month,S.year,S.daysOfMonth,IFNULL(l.lwp,0) as lwp,S.workedDays,S.original_pay as original_pay,S.original_gp as original_gp,S.bp,S.gp,S.da,S.hra,S.cca,S.diff,S.oth_spl,S.ta,S.gross_sal,S.pf,S.prof_tax,S.in_tax,case when g.empID is NOT NULL then E.groupInsurance else 0 end as group_insurance,IFNULL(la.latedays,0) as latedays,IFNULL(d.donationDays,0) as donationDays,IFNULL(a.amount,0) as advance,IFNULL(r.recoveryAmount,0) as recovery,IFNULL(m.miscellaneous_amt,0) as miscellaneous,S.other_deductions,S.rev_stmp,S.total_ded,S.net_sal from Salary S left outer join Employees E on (S.empID=E.empID) left outer join lwp l on (S.empID=l.empID AND S.month=l.month and S.year=l.year) left outer join group_insurance g on (S.empId=g.empID and S.month=g.month and S.year=g.year) left outer join late_attendance la on (S.empId=la.empID and S.month=la.month and S.year=la.year) left outer join donation d on (S.empId=d.empID and S.month=d.month and S.year=d.year) left outer join advance a on (S.empId=a.empID and S.month=a.month and S.year=a.year) left outer join recovery r on (S.empId=r.empID and S.month=r.month and S.year=r.year) left outer join miscellaneous m on (S.empId=m.empID and S.month=m.month and S.year=m.year)`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showmasterview', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
});


//to calculate salary
router.post('/generateSalary',(req,res)=>{
    console.log("body is",JSON.parse(JSON.stringify(req.body)))
    var length;

    function calculateSalary(item,i,callback)
    {
        
        //to choose config variables from database
        mysqldb.query(`select * from config`,(err,result)=>{
            if (err) {
            
                console.log(err)
                console.log("error while select from config query")
            }
            else{
                // var da_MultFactor=JSON.parse(JSON.stringify(result))[0].da_MultFactor
                // var hra_MultFactor=JSON.parse(JSON.stringify(result))[0].hra_MultFactor
                // var ta=JSON.parse(JSON.stringify(result))[0].ta
                // var cca=JSON.parse(JSON.stringify(result))[0].cca
                var prov_fund_DNA=JSON.parse(JSON.stringify(result))[0].prov_fund_DNA
                var prov_fund_Percent=JSON.parse(JSON.stringify(result))[0].prov_fund_Percent
                var prov_fund_Max=JSON.parse(JSON.stringify(result))[0].prov_fund_Max
                var prof_tax_DNA=JSON.parse(JSON.stringify(result))[0].prof_tax_DNA
                var prof_tax_Percent=JSON.parse(JSON.stringify(result))[0].prof_tax_Percent
                var prof_tax_Max=JSON.parse(JSON.stringify(result))[0].prof_tax_Max
                var rev_stamp_DNA=JSON.parse(JSON.stringify(result))[0].rev_stamp_DNA
                var rev_stamp_max=JSON.parse(JSON.stringify(result))[0].rev_stamp_max

               
               
                // for (let i = 1; i < length+1; i++) {
               
                //to get employee specific properties for calculation
                mysqldb.query(`select pay,gp,pf,empID,ta,cca,hra,da from Employees ORDER BY empID LIMIT ${i},1`,(err,result)=>{
                    if (err) {

                        console.log(err)
                        console.log("error in select query of Employee")
                    }
                    else{
                        console.log(result)
                        var empID=(JSON.parse(JSON.stringify(result))[0].empID);
                        var gp=parseInt(JSON.parse(JSON.stringify(result))[0].gp);
                        var pf=parseInt(JSON.parse(JSON.stringify(result))[0].pf);
                        var pay=parseInt(JSON.parse(JSON.stringify(result))[0].pay);
                        var ta_temp=parseInt(JSON.parse(JSON.stringify(result))[0].ta);
                        var cca_temp=parseInt(JSON.parse(JSON.stringify(result))[0].cca);
                        var da_MultFactor=parseFloat(JSON.parse(JSON.stringify(result))[0].da);
                        var hra_MultFactor=parseFloat(JSON.parse(JSON.stringify(result))[0].hra);

                        console.log(JSON.parse(JSON.stringify(result))[0]);
                        console.log("gp,pf,bp,da,hra selected for empid",gp,pf,pay,da_MultFactor,hra_MultFactor,empID);
                        // req.flash(
                        //     'success_msg',
                        //     'Employee found!'
                        // );
                        var diff=0
                        var oth_spl=0;
                        var adv_deduction=0;
                        var prof_tax;
                        var in_tax=3000;
                        var rev_stmp=1
                        var sal_adv=0;
                        var da=(pay+parseFloat(gp))*da_MultFactor;
                        console.log("da is",da);
                        var hra=(pay+parseFloat(gp))*hra_MultFactor;
                        console.log("hra is",hra);

                        var month=JSON.parse(JSON.stringify(req.body)).month.toLowerCase()
                        var year=parseInt(JSON.parse(JSON.stringify(req.body)).year)

                        //to calculate hra_dda_differences
                        mysqldb.query(`select * from hra_difference where empID='${empID}' and month='${month}' and year=${year}`,(err,result)=>{
                            if (err) {
                                
                                console.log(err)
                                console.log("invalid select from hra_difference query")
                            }
                            else{
                                var hra_final_difference=0;
                                if(result.length===0)
                                {

                                }
                                else{
                                    var data=JSON.parse(JSON.stringify(result))[0];
                                    console.log("Data is",data)
                                    var hra_difference=data.difference;
                                    var hra_duration=data.duration;                              
                                    var monthNames = [ "january", "february", "march", "april", "may", "june",
                                        "july", "august", "september", "october", "november", "december" ];
                                    // for(let j=1;j<duration+1;j++)
                                    function hraLoop(item,j,callback)
                                    {
                                        var temp_month=monthNames[monthNames.indexOf(data.month.toLowerCase())-j-1].toLowerCase();

                                        mysqldb.query(`select bp,gp from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,(err,result)=>{
                                            if (err) {
                                                
                                                console.log(err)
                                                console.log("for loop error for hra difference")
                                            }
                                            else{
                                                if(result.length===0)
                                                {
                                                    console.log("hra difference is not calculated for month",month,"for empID",empID)
                                                }
                                                else
                                                {
                                                    var data=JSON.parse(JSON.stringify(result))[0];
                                                    hra_final_difference+=(data.bp+data.gp)*hra_difference
                                                }
                                               
                                            }
                                        })
                                    }
                                    var hraArray=[];
                                    for (let i = 1; i < hra_duration+1; i++) {
                                        hraArray.push(i);
                                    }
                                    async.forEachOf(hraArray, hraLoop, function (err) {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log("Done with hra difference for empid",empID)
                                        }
                                    })
                                    // hra_final_difference=(pay+gp)*hra_difference*hra_duration/100
                                    // hra_final_difference=(pay+gp)*hra_difference*hra_duration
                                }
                                mysqldb.query(`select * from da_difference where empID='${empID}' and month='${month}' and year=${year}`,(err,result)=>{
                                    if (err) {
                                        
                                        console.log(err)
                                        console.log("invalid select from d_difference query")
                                    }
                                    else{
                                        var da_final_difference=0;
                                        if(result.length===0)
                                        {

                                        }
                                        else{
                                            var data=JSON.parse(JSON.stringify(result))[0];
                                            var da_difference=data.difference;
                                            var da_duration=data.duration;
                                            var monthNames = [ "january", "february", "march", "april", "may", "june",
                                            "july", "august", "september", "october", "november", "december" ];
                                            // for(let j=1;j<duration+1;j++)
                                            function daLoop(item,k,callback)
                                            {
                                                var temp_month=monthNames[monthNames.indexOf(data.month.toLowerCase())-k-1].toLowerCase();
        
                                                mysqldb.query(`select bp,gp from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,(err,result)=>{
                                                    if (err) {
                                                        
                                                        console.log(err)
                                                        console.log("for loop error for da difference")
                                                    }
                                                    else{
                                                        if(result.length===0)
                                                        {

                                                        }
                                                        else
                                                        {
                                                            var data=JSON.parse(JSON.stringify(result))[0];
                                                            da_final_difference+=(data.bp+data.gp)*da_difference
                                                        }
                                                    }
                                                })
                                            }
                                            var daArray=[];
                                            for (let i = 1; i < da_duration+1; i++) {
                                                daArray.push(i);
                                            }
                                            async.forEachOf(daArray, daLoop, function (err) {
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    console.log("Done with da difference for empid",empID)

                                                }
                                            })

                                            // da_final_difference=(pay+gp)*da_difference*da_duration/100
                                            // da_final_difference=(pay+gp)*da_difference*da_duration
                                        }
                                    
                                        //variable to calc advances
                                        mysqldb.query(`select * from advance_temp where empID='${empID}'`,(err,result)=>{
                                            if (err) {
                                                
                                                console.log(err)
                                                console.log("error in select from advance_temp query")
                                            }
                                            else{
                                                console.log("results after advance temp is",result)
                                                
                                                var month_num=0;
                                                var days;
                                                if(month.toLowerCase()==="january")
                                                    {
                                                        days=31;
                                                        month_num=1;
                                                    }
                                                    else if(month.toLowerCase()==="february")
                                                    {
                                                        if( (0 == year % 4) && (0 != year % 100) || (0 == year % 400) )
                                                        {
                                                            days=29
                                                        }
                                                        else
                                                        {
                                                            days=28
                                                        }
                
                                                        month_num=2;
                                                    }
                                                    else if(month.toLowerCase()==="march")
                                                    {
                                                        days=31;
                                                        month_num=3;
                                                    }
                                                    else if(month.toLowerCase()==="april")
                                                    {
                                                        days=30;
                                                        month_num=4;
                                                    }
                                                    else if(month.toLowerCase()==="may")
                                                    {
                                                        days=31;
                                                        month_num=5;
                                                    }
                                                    else if(month.toLowerCase()==="june")
                                                    {
                                                        days=30
                                                        month_num=6;
                                                    }
                                                    else if(month.toLowerCase()==="july")
                                                    {
                                                        days=31
                                                        month_num=7;
                                                    }
                                                    else if(month.toLowerCase()==="august")
                                                    {
                                                        days=31
                                                        month_num=8;
                                                    }
                                                    else if(month.toLowerCase()==="september")
                                                    {
                                                        days=30
                                                        month_num=9;
                                                    }
                                                    else if(month.toLowerCase()==="october")
                                                    {
                                                        days=31
                                                        month_num=10;
                                                    }
                                                    else if(month.toLowerCase()==="november")
                                                    {
                                                        days=30
                                                        month_num=11;
                                                    }
                                                    else if(month.toLowerCase()==="december")
                                                    {
                                                        days=31
                                                        month_num=12;
                                                    }
                                                if(JSON.parse(JSON.stringify(result.length===0)))
                                                {

                                                }
                                                else
                                                {
                                                    var results=JSON.parse(JSON.stringify(result))[0]
                                                    console.log("in else of advance, results is",results)
                                                    var adv_amount=results.amount
                                                    
                                                    var monthNames = ["january", "february", "march", "april", "may", "june",
                                                    "july", "august", "september", "october", "november", "december"];
                                                    
                                                    var adv_month = monthNames.indexOf(results.month.toLowerCase());
                                                    var adv_year=results.year
                                                    var adv_duration=results.duration
                                                    var adv_outstanding=results.outstanding
                                                
                                                    console.log("year,month in advanced",year,month_num);
                                                    console.log("adv_year,adv_month,adv_duration is",adv_year,adv_month,adv_duration)
                                                    if( year>=adv_year)
                                                    {
                                                        // var curr_month=new Date().getMonth()+1
                                                        // if(month_num>=adv_month)
                                                        // {
                                                            //if duration isn't over yet
                                                            if(adv_month>month_num-1)
                                                            {
                                                                if(year===adv_year+1)
                                                                {
                                                                    if((adv_month+adv_duration)%12>month_num-1)
                                                                    {
                                                                        
                                                                        adv_deduction=adv_amount/adv_duration;
                                                                        console.log("advance deducted!",adv_deduction,"for empID",empID)
                                                                        
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                if((adv_month+adv_duration)>month_num-1)
                                                                {
                                                                    if(year===adv_year)
                                                                    {
                                                                        
                                                                        adv_deduction=adv_amount/adv_duration;
                                                                        console.log("advance deducted!",adv_deduction,"for empID",empID)
                                                                        
                                                                    }
                                                                    
                                                                }
                                                            }
                                                            //independant query
                                                            mysqldb.query(`update advance_temp set outstanding=outstanding-${adv_deduction} where empID='${empID}'`,(err,result)=>{
                                                                if(err)
                                                                {
                                                                    console.log(err)
                                                                    console.log("error in advance temp table query")
                                                                }
                                                                else
                                                                {
                                                                    console.log("outstanding updated in advance_temp")
                                                                }
                                                                if(parseInt(adv_outstanding-adv_deduction)===0)
                                                                {
                                                                    mysqldb.query(`insert into advance (empID,amount,month,year,duration,outstanding) values ('${empID}',${adv_amount},${adv_month},${adv_year},${adv_duration},${adv_outstanding-adv_deduction})`,(err,result)=>{
                                                                        if(err)
                                                                        {
                                                                            console.log(err)
                                                                            console.log("error in advance permanent table query")
                                                                        }
                                                                        else
                                                                        {
                                                                            mysqldb.query(`delete from advance_temp where empID='${empID}'`,(err,result)=>{
                                                                                if(err)
                                                                                {
                                                                                    console.log(err)
                                                                                    console.log("error in deletion of advance temp table query")
                                                                                }
                                                                                else
                                                                                {
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                                
                                                            })
                                                        
                                                        // }
                                                    }

                                                }
                                                

                                                var groupInsurance=0;
                                                mysqldb.query(`select groupInsurance from group_insurance natural join Employees where empID='${empID}' and month='${month}' and year=${year}`,(err,result)=>{
                                                    if(err)
                                                    {
                                                        console.log(err)
                                                        console.log("error in groupinsurance table read query")
                                                    }
                                                    else
                                                    {
                                                        console.log("group insurance read result",result)
                                                        
                                                        if(result.length===0)
                                                        {

                                                        }
                                                        else
                                                        {
                                                            groupInsurance+=JSON.parse(JSON.stringify(result))[0].groupInsurance
                                                        }
                                                        console.log("group insurance is",groupInsurance,"for empID",empID)
                                                        //to get lwp data for calculating part of deduction value
                                                        // console.log(`select days,lwp from lwp where empID='${empID}' and month=${month} and year=${year}`);

                                                        mysqldb.query(`select lwp.days as days,IFNULL(lwp.lwp,0) as lwp,IFNULL(late.latedays,0) as latedays from lwp lwp left outer join late_attendance late on (lwp.empID=late.empID) where lwp.empID="${empID}" and lwp.year=${year} and lwp.month="${month}" union all select lwp.days as days,IFNULL(lwp.lwp,0) as lwp,IFNULL(late.latedays,0) as latedays from late_attendance late left outer join lwp lwp on (late.empID=lwp.empID) where late.empID="${empID}" and late.year=${year} and late.month="${month}"`,(err,result)=>{
                                                            if (err) {
                                                                
                                                                console.log(err)
                                                                console.log("invalid select from lwp query")
                                                            }
                                                            else{
                                                                // var month=JSON.parse(JSON.stringify(req.body)).month
                                                                // var year=JSON.parse(JSON.stringify(req.body)).year
                                                                // var days;
                                                                var lwp=0;
                                                                var late_days=0;
                                                                if(result.length===0)
                                                                {

                                                                }
                                                                else{
                                                                    console.log("RESULT FOR LWPPP",JSON.parse(JSON.stringify(result)))
                                                                    lwp=JSON.parse(JSON.stringify(result))[0].lwp;
                                                                    late_days=JSON.parse(JSON.stringify(result))[0].latedays;
                                                                    // lwp+=late_days;
                                                                }
                                                                
                                                                var daysOfMonth=days;
                                                                console.log("days are",days)
                                                                
                                                                var workedDays=daysOfMonth-lwp-late_days;
                                                                var original_pay=pay;
                                                                var original_gp=gp;
                                                                pay*=workedDays/daysOfMonth;
                                                                gp*=workedDays/daysOfMonth;
                                                                da*=workedDays/daysOfMonth;
                                                                hra*=workedDays/daysOfMonth;
                                                                // ta_temp=ta;
                                                                // cca_temp=cca;
                                                                ta_temp*=workedDays/daysOfMonth;
                                                                cca_temp*=workedDays/daysOfMonth;
                                                                console.log("TA,cca ISSS",ta_temp,cca_temp)
                                                                console.log("pay,gp,da,hra,ta_temp,cca_temp 1",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                var pfcheck=prov_fund_Percent/100*(pay+gp+da)
                                                                if(pf>pfcheck)
                                                                {
                                                                    pf=pfcheck
                                                                }
                                                                if(pf>prov_fund_Max)
                                                                {
                                                                    pf=prov_fund_Max
                                                                }
                                                                // var lwp_amt=(parseInt(gross_sal)/parseInt(daysOfMonth))*parseInt(lwp);
                                                            
                                                                // console.log("lwp_amt=",lwp_amt)

                                                                //pay+gp
                                                                //(15600+6000)*0.03
                                                                //648 is increment
                                                                //ceil the increment=650 * workedDays/daysOfMonth
                                                                //650* workedDays/daysOfMonth x (da_factor+hra_factor) i.e 1.59=1033.5
                                                                //increment=1033.5 + 650* workedDays/daysOfMonth
                                                                //x number of months is final difference NOT REQUIRED.

                                                                //get new basic pay, diff calculated on old basic pay.

                                                                //hra difference ,da change in percent x (pay+gp) on current only.
                                                                
                                                                oth_spl+=parseInt(adv_deduction);
                                                                oth_spl+=parseInt(groupInsurance);
                                                                diff+=parseInt(hra_final_difference);
                                                                console.log("pay,gp,da,hra,ta_temp,cca_temp 2",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                console.log("hra difference is",hra_final_difference,"for empID",empID)
                                                                diff+=parseInt(da_final_difference);
                                                                console.log("da difference is",da_final_difference,"for empID",empID)
                                                                
                                                                console.log("logging")
                                                                var gross_sal=pay+parseFloat(gp)+parseFloat(da)+parseFloat(hra)+parseFloat(cca_temp)+parseFloat(diff)+parseFloat(ta_temp);
                                                                console.log("gross salary,days of month,lwp are",gross_sal,daysOfMonth,lwp,"for empID",empID)
                                                                
                                                                if(gross_sal>10000)
                                                                {
                                                                    prof_tax=200;
                                                                }
                                                                else if(gross_sal>7500 && gross_sal<10000)
                                                                {
                                                                    prof_tax=175;
                                                                }
                                                                else if(gross_sal<7500)
                                                                {
                                                                    prof_tax=0;
                                                                }

                                                                if(prof_tax>prof_tax_Max)
                                                                {
                                                                    prof_tax=prof_tax_Max
                                                                }

                                                                if(gross_sal===rev_stamp_DNA)
                                                                {
                                                                    rev_stmp=0
                                                                }
                                                                if(rev_stmp>rev_stamp_max)
                                                                {
                                                                    rev_stmp=rev_stamp_max
                                                                }
                                                                //independant query
                                                                // mysqldb.query(`insert into lwp (empID,month,year,days,lwp) values ('${empID}','${month}',${year},${daysOfMonth},${lwp})`,(err,result)=>{
                                                                //     if(err)
                                                                //     {
                                                                //         console.log(err)
                                                                //         console.log("error in lwp permanent table insert query")
                                                                //     }
                                                                //     else
                                                                //     {
                                                                //         mysqldb.query(`delete from lwp_temp where empID='${empID}'`,(err,result)=>{
                                                                //             if(err)
                                                                //             {
                                                                //                 console.log(err)
                                                                //                 console.log("error in deletion of lwp temp table query")
                                                                //             }
                                                                //             else
                                                                //             {
                                                                //             }
                                                                //         })
                                                                //     }
                                                                // })

                                                                console.log("pay,gp,da,hra,ta_temp,cca_temp 3",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)
                                                                mysqldb.query(`select * from miscellaneous where empID='${empID}' and month='${month}' and year=${year}`
                                                                ,(err,result)=>{
                                                                    if (err) {
                                                                        console.log(err)
                                                                        console.log("error while selecting from miscellaneous table")
                                                                    }
                                                                    else{
                                                                        var miscellaneous_deduction=0;
                                                                        if(result.length===0)
                                                                        {

                                                                        }
                                                                        else
                                                                        {
                                                                            var data=JSON.parse(JSON.stringify(result))[0];
                                                                            miscellaneous_deduction=data.miscellaneous_amt

                                                                        }
                                                                        oth_spl+=parseInt(miscellaneous_deduction)
                                                                        console.log("pay,gp,da,hra,ta_temp,cca_temp 4",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                        console.log("miscellaneous deductions is",miscellaneous_deduction,"for empID",empID)
                                                                        
                                                                        mysqldb.query(`select * from increment_difference where empID='${empID}' and month='${month}' and year=${year}`,(err,result)=>{
                                                                            if (err) {
                                                                                console.log(err)
                                                                                console.log("error while calculating from increment difference table,select query")
                                                                            }
                                                                            else{
                                                                                if(result.length==0)
                                                                                {
                                                                                    console.log("for empid",empID,"not found in increment difference", month,year)
                                                                                }
                                                                                else
                                                                                {
                                                                                    var durationIncrement=JSON.parse(JSON.stringify(result))[0].duration
                                                                                    var monthNames = [ "january", "february", "march", "april", "may", "june",
                                                                                        "july", "august", "september", "october", "november", "december" ];
                                                                                    // for(let j=1;j<duration+1;j++)
                                                                                    //take latest increment value
                                                                                    mysqldb.query(`select * from increment where empID='${empID}' order by year desc,month desc limit 1`,(err,result)=>{
                                                                                        if (err) {
                                                                                            console.log(err)
                                                                                            console.log("error while calculating from increment table,select query")
                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            var finalIncrement=0
                                                                                            if(result.length===0)
                                                                                            {
                                                                                                console.log("no prior increment history")
                                                                                            }
                                                                                            else
                                                                                            {   
                                                                                                var increment=JSON.parse(JSON.stringify(result))[0].increment;
                                                                                                var prevPay=JSON.parse(JSON.stringify(result))[0].prevPay;


                                                                                                function incrementLoop(item,j,callback)
                                                                                                {
                                                                                                    var temp_month=monthNames[monthNames.indexOf(month.toLowerCase())-j-1].toLowerCase();
            
                                                                                                    mysqldb.query(`select workedDays,daysOfMonth from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,(err,result)=>{
                                                                                                        if (err) {
                                                                                                            
                                                                                                            console.log(err)
                                                                                                            console.log("for loop error for hra difference")
                                                                                                        }
                                                                                                        else{
                                                                                                            if(result.length===0)
                                                                                                            {
                                                                                                                console.log("not found for month",temp_month,"for empId",empID)
                                                                                                            }
                                                                                                            else
                                                                                                            {
                                                                                                                var data=JSON.parse(JSON.stringify(result))[0];
                                                                                                                var workedDays=data.workedDays;
                                                                                                                var daysOfMonth=data.daysOfMonth;
                                                                                                                var incrementvalue=((prevPay+original_gp))*(increment/100)
                                                                                                                if((Math.floor(incrementvalue)%10)===0)
                                                                                                                {
                
                                                                                                                }
                                                                                                                else{
                                                                                                                    incrementvalue=Math.ceil(incrementvalue/10)*10
                                                                                                                }
                                                                                                                incrementvalue*=workedDays/daysOfMonth;
                                                                                                                var toAddValue=(hra_MultFactor+da_MultFactor)*incrementvalue
                                                                                                                finalIncrement=Math.ceil(toAddValue+incrementvalue)
                                                                                                                diff+=parseInt(finalIncrement)
                                                                                                                console.log("calculated increment difference for empID",empID,"for month",temp_month)
                                                                                                            }
                                                                                                            
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                                var incrementArray=[];
                                                                                                for (let i = 1; i < durationIncrement+1; i++) {
                                                                                                    incrementArray.push(i);
                                                                                                }
                                                                                                async.forEachOf(incrementArray, incrementLoop, function (err) {
                                                                                                    if (err) {
                                                                                                        console.error(err);
                                                                                                    } else {
                                                                                                    }
                                                                                                })
        
                                                                                                // var durationIncrement=JSON.parse(JSON.stringify())
                                                                                                console.log("increment difference is ",finalIncrement,"for empID",empID)
                                                                                                console.log("pay,gp,da,hra,ta_temp,cca_temp 5",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)
                                                                                            }

                                                                                        }
                                                                                    })
                                                                                                                              
                                                                                }
                                                                                mysqldb.query(`select * from donation where empID='${empID}'`
                                                                                ,(err,result)=>{
                                                                                    if (err) {
                                                                                        console.log(err)
                                                                                        console.log("error while selecting from donation table")
                                                                                    }
                                                                                    else{
                                                                                        if(result.length===0)
                                                                                        {
                                                                                            console.log("no donations for employee with empID",empID)
                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            var donationDays=JSON.parse(JSON.stringify(result))[0].donationDays;
                                                                                            var amount=gross_sal/daysOfMonth*donationDays
                                                                                            oth_spl+=parseInt(amount)
                                                                                            console.log("donation amount is ",amount,"for empID ",empID)
                                                                                        }
                                                                                        mysqldb.query(`select * from recovery where empID='${empID}' and month='${month}' and year=${year}`
                                                                                        ,(err,result)=>{
                                                                                            if (err) {
                                                                                                console.log(err)
                                                                                                console.log("error while selecting from recovery table")
                                                                                            }
                                                                                            else{
                                                                                                if(result.length===0)
                                                                                                {
                                                                                                    console.log("no recovery for employee with empID",empID)
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                    var recovery=JSON.parse(JSON.stringify(result))[0].recoveryAmount;
                                                                                    
                                                                                                    oth_spl+=parseInt(recovery)
                                                                                                    console.log("recovery amount is ",recovery,"for empID ",empID)
                                                                                                    console.log("pay,gp,da,hra,ta_temp,cca_temp 6",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                                                }
                                                                                                mysqldb.query(`select * from income_tax where empID='${empID}' ORDER BY STR_TO_DATE(CONCAT(year, month, ' 01'), '%Y %M %d') desc limit 1`
                                                                                                ,(err,result)=>{
                                                                                                    if (err) {
                                                                                                        console.log(err)
                                                                                                        console.log("error while selecting from income_tax table")
                                                                                                    }
                                                                                                    else{
                                                                                                        var tds=0;
                                                                                                        if(result.length===0)
                                                                                                        {
                                                                                                            console.log("pay,gp,da,hra,ta_temp,cca_temp 7",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                                                            console.log("no income_tax for employee with empID",empID)
                                                                                                        }
                                                                                                        else
                                                                                                        {
                                                                                                            tds=JSON.parse(JSON.stringify(result))[0].tds_per_month;
                                                                                            
                                                                                                            // oth_spl+=tds 
                                                                                                            console.log("tds is ",tds,"for empID ",empID)
                                                                                                            //independant query
                                                                                                            mysqldb.query(`update income_tax set balance=balance-tds_per_month where empID='${empID}' and month='${month}' and year=${year}`
                                                                                                            ,(err,result)=>{
                                                                                                                if (err) {
                                                                                                                    console.log(err)
                                                                                                                    console.log("error while updating income_tax table")
                                                                                                                }
                                                                                                                else{
                                                                                                                    console.log("updated balance in income_tax table for empID",empID)
                                                                                                                }
                                                                                                            })
                                                                                                        }
                                                                                                        var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(rev_stmp)+parseFloat(oth_spl)+tds; //+parseFloat(lwp_amt);
                                                                                                        var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);
                                                                                                        
                                                                                                        console.log("pay,gp,da,hra,ta_temp,cca_temp 8    ",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                                                        console.log(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,original_pay,bp,original_gp,gp,pf,other_deductions) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${tds}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${original_pay},${pay},${original_gp},${gp},${pf},${oth_spl})`)
                                                                                                        mysqldb.query(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,original_pay,bp,original_gp,gp,pf,other_deductions) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${tds}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${original_pay},${pay},${original_gp},${gp},${pf},${oth_spl})`
                                                                                                        ,(err,result)=>{
                                                                                                            if (err) {
                                                                                                                console.log(err)
                                                                                                                console.log("error while inserting into salary table")
                                                                                                            }
                                                                                                            else{
                                                                                                                // console.log(JSON.parse(JSON.stringify(result))[0])
                                                                                                                // res.send("Done");
                                                                                                                // req.flash(
                                                                                                                //     'success_msg',
                                                                                                                //     'Employee found!'
                                                                                                                // );
                                                                                                                console.log("YAYYYYY")
                                                                                                                console.log("i,length is ",i,length)
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })                                
                                                                            }
                                                                        })
                                                                    }
                                                                })   
                                                            
                                                                
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })

                        
               
            }
        })
    }

     //to get total number of employees
    mysqldb.query(`select count(*) from Employees`,(err,result)=>{
        if (result.length===0) {
            console.log("no employees")
        }
        else{
                // to make it async
            length=JSON.parse(JSON.stringify(result))[0]['count(*)'];
            var array=[];
            for (let i = 1; i < length+1; i++) {
                array.push(i);
            }

            async.forEachOf(array, calculateSalary, function (err) {
                if (err) {
                    console.error(err);
                } else {
                }
            })
        }
    })
    res.redirect('index1');
    
})

router.get('/uploads/:empID', (req, res) => {
    var requestedTitle = req.params.empID;
    //console.log("the param is", req.params.empID);
    if (requestedTitle.includes("EMP")) {
        mysqldb.query(`select * from Salary natural join Employees`, (err, result) => {
            if (err) {
                //console.log(err);
            }
            else {
                //console.log("Employees Details",JSON.parse(JSON.stringify(result)));
                res.render('templateSelected', {
                    salary: JSON.parse(JSON.stringify(result)),
                    requestedTitle: req.params.empID,
                    role: req.user.role
                    //added the name field here to get the name wise reciept
                });
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,{
            role: req.user.role
        })
    }
    // res.render("templateSelected");
});
router.get('/lwp/:empID', (req, res) => {
    var requestedTitle = req.params.empID;
    //console.log("the param is", req.params.empID);
    if (requestedTitle.includes("EMP")) {
        const data = JSON.parse(JSON.stringify(req.params));
        mysqldb.query(`select * from Employees where empID="${requestedTitle}"`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Employees Details", JSON.parse(JSON.stringify(result)));
                res.render('templwp-2', {
                    Employees: JSON.parse(JSON.stringify(result)),
                    role: req.user.role
                });
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle,{ role: req.user.role})
    }
});

router.get('/templwp-2', (req, res) => {

    // mysqldb.query(`select * from Employees`,(err,result)=>
    // {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Employees Details",JSON.parse(JSON.stringify(result)));
    //         res.render('templwp-2',{
    //             Employees:JSON.parse(JSON.stringify(result))
    //         });
    //     }
    // })

    var requestedTitle = req.params.empID;
    //console.log("the param is", req.params.empID);
    const data = JSON.parse(JSON.stringify(req.params));
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('templwp', {
                Employees: JSON.parse(JSON.stringify(result)),
                requestedTitle: req.params.empID,
                role: req.user.role
            });
        }
    })
});



router.get('/deductions', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from config`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Config Details", JSON.parse(JSON.stringify(result)));
            res.render('deductions', {
                data: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});

router.post('/deductions', (req, res) => {
    console.log("IN")
    console.log(req.body)
    console.log(JSON.parse(JSON.stringify(req.body)))
    const { prov_fund_DNA, prov_fund_Percent, prov_fund_Max, prof_tax_Max, prof_tax_Percent, prof_tax_DNA, rev_stamp_max, rev_stamp_DNA } = JSON.parse(JSON.stringify(req.body));
    // const {prov_fund_DNA}=req.body;
    mysqldb.query(`update config set prov_fund_DNA=${prov_fund_DNA},prov_fund_Percent=${prov_fund_Percent},prov_fund_Max=${prov_fund_Max},prof_tax_Max=${prof_tax_Max},prof_tax_Percent=${prof_tax_Percent},prof_tax_DNA=${prof_tax_DNA},rev_stamp_max=${rev_stamp_max},rev_stamp_DNA=${rev_stamp_DNA} where ID=1`, (err, result) => {
        if (err) {
            console.log(err);
        res.json({status:"error", message:"Please fill all the fields"})
        
            
        }
        else {
        
        res.json({status:"success", message:"Deductions Edited Successfully"})
 
            
        }
    })
    //res.redirect('index1');

});

router.post('/trial', (req, res) => {
    
    res.redirect('index1');

});

router.get('/viewdeductions', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from config`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Config Details", JSON.parse(JSON.stringify(result)));
            res.render('viewdeduction', {
                data: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })

});


router.post('/deleteEmployee', (req, res) => {
    console.log("in route")
    console.log(req.body.id)
    mysqldb.query(`delete from Employees where empID='${req.body.id}'`, (err, result) => {
        if (err) {
            //------------ Invalid registration Number ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log(err)
            res.send({ "status": "failure" })
        }
        else {
            res.send(
                {
                    "status": "success"
                }
            );
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
        }
    })
    // res.send({"status":"success"});
})


router.post('/lateattendance', ensureAuthenticated, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    // const empID=req.params.empID;   
    console.log(JSON.parse(JSON.stringify(req.body)))
    // const length=data["lwp"].length
    var monthNames = ["january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"];
    var prev = data.month.toLowerCase();
    prev = monthNames[monthNames.indexOf(prev.toLowerCase()) - 1].toLowerCase()
    // console.log(length)
    // for (let i = 0; i < length; i++) {
    var prevdays;
    console.log("prev", prev)
    if (prev === "january") {
        prevdays = 31;
    }
    else if (prev === "february") {
        if( (0 == data.year % 4) && (0 != data.year % 100) || (0 == data.year % 400) )
        {
            prevDays=29
        }
        else
        {
            prevDays=28
        }
    }
    else if (prev === "march") {
        prevdays = 31;
    }
    else if (prev === "april") {
        prevdays = 30;
    }
    else if (prev === "may") {
        prevdays = 31;
    }
    else if (prev === "june") {
        prevdays = 30
    }
    else if (prev === "july") {
        prevdays = 31
    }
    else if (prev === "august") {
        prevdays = 31
    }
    else if (prev === "september") {
        prevdays = 30
    }
    else if (prev === "october") {
        prevdays = 31
    }
    else if (prev === "november") {
        prevdays = 30
    }
    else if (prev === "december") {
        prevdays = 31
    }

    // console.log(data["lwp"],data["month"],data["year"],days)
    // console.log(`INSERT INTO late_attendance (empID, empName, latedays,month, year, days) VALUES (${data.empID}, '${data.empName}', ${data.latedays}, '${data["month"]}', ${data["year"]}, ${days})`)
    mysqldb.query(`INSERT INTO late_attendance (empID, empName, latedays,month, year, prevdays) VALUES ('${data.empID}', '${data.empName}', ${data.latedays}, '${data["month"].toLowerCase()}', ${data["year"]}, ${prevdays}) on duplicate key update latedays=${data.latedays}`, (err, result) => {
        if (err) {
            console.log(err);
            
            res.json({status:"error", message:"Please fill all fields"})
        
            
        }
        else {
        res.json({status:"success", message:"Late Attendance Added Successfully!"})
        }
    })
    //     }
    // })
   
});


router.post('/miscellaneous', ensureAuthenticated, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    const empID = req.params.empID;
    console.log(JSON.parse(JSON.stringify(req.body)))
    // const length=data["lwp"].length
    var monthNames = ["january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"];


    // console.log(data["lwp"],data["month"],data["year"],days)
    // console.log(`INSERT INTO late_attendance (empID, empName, latedays,month, year, days) VALUES (${data.empID}, '${data.empName}', ${data.latedays}, '${data["month"]}', ${data["year"]}, ${days})`)
    mysqldb.query(`INSERT INTO miscellaneous (empID, empName, miscellaneous_amt ,month, year, note) VALUES ('${data.empID}', '${data.empName}', ${data.amt}, '${data["month"]}', ${data["year"]}, '${data.note}') on duplicate key update miscellaneous_amt=${data.amt},note='${data.note}'`, (err, result) => {
        if (err) {
            console.log(err);
            res.json({status:"error", message:"Please Fill All The Fields"})
        }
        else {
        res.json({status:"success", message:"Miscellaneous Amount Added Successfully!"})
        }
    })
    //     }
    // })
   
});

router.get('/storeIncomeTax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from income_tax natural join Salary`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('incometax', {
                Employees: JSON.parse(JSON.stringify(result)),
                role: req.user.role
            });
        }
    })
})



router.post('/storeIncomeTax', (req, res) => {
    //to get total number of employees
    mysqldb.query(`select count(*) from Employees`, (err, result) => {
        if (result.length === 0) {
            console.log("no employees")
        }
        else {
            length = JSON.parse(JSON.stringify(result))[0]['count(*)'];
            mysqldb.query(`select * from config`, (err, result4) => {
                if (result.length === 0) {
                    console.log("no employees")
                }
                else {
                   
                    var educess=JSON.parse(JSON.stringify(result4))[0].educess;
                    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
                    var cur_month = mlist[new Date().getMonth()].toLowerCase();
                    // var cur_month="august"
                    var cur_year = new Date().getFullYear()
                    for (let i = 0; i < length; i++) {
                        console.log(`select * from Employees left join form ORDER BY empID LIMIT ${i},1`)
                        //to get employee specific properties for calculation
                        mysqldb.query(`select E.empID,E.age,IFNULL(f.total,0) as total,E.emp_temp_regime,IFNULL(f.gross_sal,50000) as gross_sal from Employees E left join form f on(E.empID=f.empID) ORDER BY E.empID LIMIT ${i},1`, (err, result) => {
                            if (err) {

                                console.log(err)
                                console.log("error in select query of Employee")
                            }
                            else {
                                console.log("Result is", result, "for i-1", i - 1)
                                // var investment,gross_sal;
                                // if(JSON.parse(JSON.stringify(result))[0].total==null)
                                // {
                                //     investment=0;
                                //     gross_sal=100000;
                                // }
                                //tax regime,age,investment
                                var empID = JSON.parse(JSON.stringify(result))[0].empID;
                                var age = parseInt(JSON.parse(JSON.stringify(result))[0].age);
                                // var investment=parseInt(JSON.parse(JSON.stringify(result))[0].investment);
                                var investment = parseInt(JSON.parse(JSON.stringify(result))[0].total);
                                var emp_temp_regime = JSON.parse(JSON.stringify(result))[0].emp_temp_regime;
                                var gross_total_income = parseInt(JSON.parse(JSON.stringify(result))[0].gross_sal);
                                // var gross_total_income = gross_sal * 12;
                                console.log(JSON.parse(JSON.stringify(result))[0]);
                                var tax_on_income = 0;
                                var exemption = investment;
                                if (emp_temp_regime == "new") {
                                    exemption = 0;
                                }
                                var net_taxable_income = gross_total_income - exemption-50000;
                                if(net_taxable_income<0)
                                {
                                    net_taxable_income=0;
                                }
                                var remaining = net_taxable_income;
                                console.log("regime is", emp_temp_regime)
                                if (emp_temp_regime === "old") {
                                    console.log("in if")
                                    // if (net_taxable_income <= 250000) {
                                    console.log("in less")
                                    if (remaining >= 250000) {
                                        tax_on_income += 0;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += 0;
                                        remaining = 0;
                                    }
                                    // }
                                    if (age >= 60) {
                                        if (remaining >= 50000) {
                                            tax_on_income += 0;
                                            remaining -= 50000;
                                        }

                                        else {
                                            tax_on_income += 0;
                                            remaining = 0;
                                        }

                                    }
                                    // net_taxable_income > 250000 && net_taxable_income <=300000 &&
                                    else if (age < 60) {
                                        if (remaining >= 50000) {
                                            tax_on_income += 50000 * 5 / 100;
                                            remaining -= 50000;
                                        }

                                        else {
                                            tax_on_income += remaining * 5 / 100;
                                            remaining = 0;
                                        }
                                    }
                                    if (age >= 80) {
                                        if (remaining >= 200000) {
                                            tax_on_income += 0;
                                            remaining -= 200000;
                                        }

                                        else {
                                            tax_on_income += 0;
                                            remaining = 0;
                                        }
                                    }
                                    // net_taxable_income > 300000 && net_taxable_income <= 500000
                                    else {
                                        if (remaining >= 200000) {
                                            tax_on_income += 200000 * 5 / 100;
                                            remaining -= 200000;
                                        }

                                        else {
                                            tax_on_income += remaining * 5 / 100;
                                            remaining = 0;
                                        }
                                    }
                                    // if (net_taxable_income > 500000 && net_taxable_income <= 1000000) {
                                    if (remaining >= 500000) {
                                        tax_on_income += 500000 * 20 / 100;
                                        remaining -= 500000;
                                    }

                                    else {
                                        tax_on_income += remaining * 20 / 100;
                                        remaining = 0;
                                    }
                                    // }
                                    // if (net_taxable_income > 1000000) { 
                                    tax_on_income += remaining * 30 / 100;
                                    remaining = 0;
                                    //}

                                }
                                else if (emp_temp_regime === "new") {
                                    // if (net_taxable_income <= 250000) {
                                    if (remaining >= 250000) {
                                        tax_on_income += 0;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += 0;
                                        remaining = 0;
                                    }
                                    // }

                                    // if (net_taxable_income > 250000 && gross_sal <= 500000) {
                                    if (remaining >= 250000) {
                                        tax_on_income += 250000 * 5 / 100;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += remaining * 5 / 100;
                                        remaining = 0;
                                    }
                                    // }
                                    // if (net_taxable_income > 500000 && gross_sal <= 750000) {
                                    if (remaining >= 250000) {
                                        tax_on_income += 250000 * 10 / 100;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += remaining * 10 / 100;
                                        remaining = 0;
                                    }
                                    // }
                                    // if (net_taxable_income > 750000 && gross_sal <= 1000000) {
                                    if (remaining >= 250000) {
                                        tax_on_income += 250000 * 15 / 100;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += remaining * 15 / 100;
                                        remaining = 0;
                                    }
                                    // }
                                    // if (net_taxable_income > 1000000 && gross_sal <= 1250000) {
                                    if (remaining >= 250000) {
                                        tax_on_income += 250000 * 20 / 100;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += remaining * 20 / 100;
                                        remaining = 0;
                                    }
                                    // }
                                    // if (net_taxable_income > 1250000 && gross_sal <= 1500000) {
                                    if (remaining >= 250000) {
                                        tax_on_income += 250000 * 25 / 100;
                                        remaining -= 250000;
                                    }

                                    else {
                                        tax_on_income += remaining * 25 / 100;
                                        remaining = 0;
                                    }
                                    // }
                                    // if (net_taxable_income > 1500000) {

                                    tax_on_income += remaining * 30 / 100;
                                    remaining = 0;

                                    // }

                                }
                                var rebate = 0;
                                if (net_taxable_income <= 500000) {
                                    rebate += tax_on_income;
                                    tax_on_income = 0;
                                }
                                var health_and_edu_cess = educess * tax_on_income / 100;
                                var total_tax = tax_on_income + health_and_edu_cess;
                                var tds_per_month = total_tax / 12;
                                var balance = total_tax;
                                console.log(`insert into income_tax (empID,exemption,prev_investment,total_investments,tax_on_income,rebate,health_and_edu_cess,total_tax,tds_per_month,balance,month,year) VALUES ('${empID}',${exemption},${investment},${investment},${tax_on_income},0,${health_and_edu_cess},${total_tax},${tds_per_month},${balance},'${cur_month}',${cur_year})`)
                                mysqldb.query(`insert into income_tax (empID,exemption,prev_investment,total_investments,net_taxable_income,tax_on_income,rebate,health_and_edu_cess,total_tax,tds_per_month,balance,month,year,type) VALUES ('${empID}',${exemption},${investment},${investment},${net_taxable_income},${tax_on_income},${rebate},${health_and_edu_cess},${total_tax},${tds_per_month},${balance},'${cur_month}',${cur_year},"initial")`, (err, result) => {
                                    if (err) {

                                        console.log(err)
                                        console.log("error in insert query of income_tax")
                                    }
                                    else {
                                        // res.redirect('/index1')

                                    }
                                })

                            }
                        })
                    }
                }
            })
        }
            res.redirect('incometax');

        })
    }
)
// router.post('/declaration',(req,res)=>{
    
//     const data=JSON.parse(JSON.stringify(req.body));
//     const {empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , dop  , doc   ,appointment   , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,photo}=data;
//     console.log(JSON.parse(JSON.stringify(req.body)))
//     console.log("here")
//     // mysqldb.query(`INSERT INTO Employees (empName) VALUES ('${empName}')`
//  //  empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , Type  , Type1 ,  onroll  , dop  , doc   ,appointment ,  Relieving  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,(err,result)=>{
   
//     // console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
//     mysqldb.query(`INSERT INTO Employees (empID,empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , dop  , doc   ,appointment  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,photo) VALUES ('${mis}','${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, '${bankAccNum}', '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}','${emailID2}','${nonteach}','${Subject}',${cca},${ta},'${dop}','${doc}','${appointment}','${category}','${gender}','${status}',${mobile},'${address_correspondence}','${address_permanent}','${mis}','${biometric}','${vacation}','${seniority}','${dept_seniority}','${aadhar}','${Pan_No}','${onrole}','${phd}','${phdSub}','${phdUni}','${phdInsti}',${phdYr},'${pgSub}','${pgUni}',${pgYr},'${ugSub}','${ugUni}',${ugYr},'${grade}','${netset}','${othqual}',${exp},${industry_exp},${uni_approval},'${uni_app_date}',${uni_app_period},${workexNT},'${dob}',${investment},'${emp_temp_regime}',${age},'${photo}')`
//     ,(err,result)=>{
//             if (err) {
//             console.log(err);
//             console.log("invalid details");
//         }
//         else{
//             // console.log(JSON.parse(JSON.stringify(result))[0])
//             console.log(result);
//             res.redirect('/declaration')
//             // req.flash(
//             //     'success_msg',
//             //     'Employee found!'
//             // );
//         }
//     })
// })

router.get('/register/teaching',  (req, res) => {
    //var requestedTitle = req.params.designationCategory;
    //console.log("the param is", req.params.empID);
    var teaching = "teaching";
    mysqldb.query(`select * from employees right join salary  ON Employees.empID= salary.empID where designationCategory= 'teaching'`, (err, result) => {
        if (err) {
            //console.log(err);
        }
        else {
            //console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('salregister', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
                //requestedTitle = req.params.empID
                //added the name field here to get the name wise reciept
            });
        }
    })
    // res.render("templateSelected2");
});

router.get('/register/nonteaching', (req, res) => {
    //var requestedTitle = req.params.designationCategory;
    //console.log("the param is", req.params.empID);
    var nonteaching = "nonteaching";
    mysqldb.query(`select * from employees right join salary  ON Employees.empID= salary.empID where designationCategory= 'Non-Teaching'`, (err, result) => {
        if (err) {
            //console.log(err);
        }
        else {
            //console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('salregister', {
                salary: JSON.parse(JSON.stringify(result)),
                role: req.user.role
                //requestedTitle = req.params.empID
                //added the name field here to get the name wise reciept
            });
        }
    })
    // res.render("templateSelected2");
});


// router.get('/updateincometax', ensureAuthenticated, (req, res) => {
//     mysqldb.query(`select * from Employees`, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Employees Details", JSON.parse(JSON.stringify(result)));
//             res.render('updateincome', {
//                 Employees: JSON.parse(JSON.stringify(result))
//             });
//         }
//     })
// });
// router.get('/updateIncomeTax', ensureAuthenticated, (req, res) => {
//     mysqldb.query(`select * from income_tax natural join Salary`, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Employees Details", JSON.parse(JSON.stringify(result)));
//             res.render('addincometax', {
//                 Employees: JSON.parse(JSON.stringify(result))
//             });
//         }
//     })
// })

router.post('/updateIncomeTax', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    // console.log(data.empID[1])
    mysqldb.query(`update form set c=${data.c}, d=${data.d}, dd=${data.dd},
    total=${data[`${data.empID}`][1]},
    gross_sal=${data[`${data.empID}`][0]} where empID ='${data.empID}' `
        , (res, error) => {

            if (error) {
                console.log(error)
            }
        }
    )
    var indexList = []
    var grossTotalList = []
    var investmentList=[]
    for (var i in data) {

        if (i.includes("EMP")) {
            console.log(i)
            console.log(data[i][0])
            indexList.push(i)
            grossTotalList.push(parseInt(data[i][0]))
            investmentList.push(parseInt(data[i][1]))
        }

    }
    console.log(indexList)
    console.log(grossTotalList)
    console.log(investmentList)
    var current = new Date();
    var currmonth = current.getMonth();

    function updateIncomeTax(item, i, callback) {

       

        mlist = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        // var cur_month="august"
        var cur_month = mlist[new Date().getMonth()].toLowerCase()
        var cur_year = new Date().getFullYear()
        console.log(grossTotalList, indexList, i, "in query")
        console.log(`select * from Employees where month='${cur_month}' and year=${cur_year} and empID='${indexList[i]}'`)           //to get employee specific properties for calculation
        mysqldb.query(`select * from Employees where empID='${indexList[i]}'`, (err, result) => {            
            if (err) {
                console.log(err)
                console.log("error in select query of Employee")
            }
            else {
                console.log("Result is", result, "for empID", indexList[i])
                //tax regime,age,investment
                var empID = JSON.parse(JSON.stringify(result))[0].empID;
                var age = parseInt(JSON.parse(JSON.stringify(result))[0].age);
                // var investment=parseInt(JSON.parse(JSON.stringify(result))[0].investment);
                var investment = investmentList[i];
                var emp_temp_regime = JSON.parse(JSON.stringify(result))[0].emp_temp_regime;
                var gross_total_income = grossTotalList[i];
                console.log(JSON.parse(JSON.stringify(result))[0]);
                var tax_on_income=0;
                var exemption = investment;
                if(emp_temp_regime=="new")
                {
                    exemption=0;
                }
                var net_taxable_income = gross_total_income - exemption;
                var remaining=net_taxable_income;
                console.log("regime is", emp_temp_regime)
                if (emp_temp_regime === "old") {
                    console.log("in if")
                    // if (net_taxable_income <= 250000) {
                        console.log("in less")
                        if(remaining>=250000)
                        {
                            tax_on_income+=0;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += 0;
                            remaining=0;
                        }
                    // }
                    if (age >= 60 ) {
                        if(remaining>=50000)
                        {
                            tax_on_income+=0;
                            remaining-=50000;
                        }
                        
                        else
                        {
                            tax_on_income += 0;
                            remaining=0;
                        }

                    }
                    // net_taxable_income > 250000 && net_taxable_income <=300000 &&
                    else if ( age<60) {
                        if(remaining>=50000)
                        {
                            tax_on_income+=50000*5/100;
                            remaining-=50000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*5/100;
                            remaining=0;
                        }
                    }
                    if (age>=80) {
                        if(remaining>=200000)
                        {
                            tax_on_income+=0;
                            remaining-=200000;
                        }
                        
                        else
                        {
                            tax_on_income += 0;
                            remaining=0;
                        }
                    }
                    // net_taxable_income > 300000 && net_taxable_income <= 500000
                    else {
                        if(remaining>=200000)
                        {
                            tax_on_income+=200000*5/100;
                            remaining-=200000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*5/100;
                            remaining=0;
                        }
                    }
                    // if (net_taxable_income > 500000 && net_taxable_income <= 1000000) {
                        if(remaining>=500000)
                        {
                            tax_on_income+=500000*20/100;
                            remaining-=500000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*20/100;
                            remaining=0;
                        }
                    // }
                    // if (net_taxable_income > 1000000) { 
                        tax_on_income += remaining*30/100;
                        remaining=0;
                    //}

                }
                else if (emp_temp_regime === "new") {
                    // if (net_taxable_income <= 250000) {
                        if(remaining>=250000)
                        {
                            tax_on_income+=0;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += 0;
                            remaining=0;
                        }
                    // }

                    // if (net_taxable_income > 250000 && gross_sal <= 500000) {
                        if(remaining>=250000)
                        {
                            tax_on_income+=250000*5/100;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*5/100;
                            remaining=0;
                        }
                    // }
                    // if (net_taxable_income > 500000 && gross_sal <= 750000) {
                        if(remaining>=250000)
                        {
                            tax_on_income+=250000*10/100;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*10/100;
                            remaining=0;
                        }
                    // }
                    // if (net_taxable_income > 750000 && gross_sal <= 1000000) {
                        if(remaining>=250000)
                        {
                            tax_on_income+=250000*15/100;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*15/100;
                            remaining=0;
                        }
                    // }
                    // if (net_taxable_income > 1000000 && gross_sal <= 1250000) {
                        if(remaining>=250000)
                        {
                            tax_on_income+=250000*20/100;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*20/100;
                            remaining=0;
                        }
                    // }
                    // if (net_taxable_income > 1250000 && gross_sal <= 1500000) {
                        if(remaining>=250000)
                        {
                            tax_on_income+=250000*25/100;
                            remaining-=250000;
                        }
                        
                        else
                        {
                            tax_on_income += remaining*25/100;
                            remaining=0;
                        }
                    // }
                    // if (net_taxable_income > 1500000) {
                    
                            tax_on_income += remaining*30/100;
                            remaining=0;
                        
                    // }

                }
                var rebate=0;
                if(net_taxable_income<=500000)
                {
                    rebate+=tax_on_income;
                    tax_on_income=0;
                }
                var health_and_edu_cess = (educess/100) * tax_on_income ;
                var total_tax = tax_on_income + health_and_edu_cess;
                var tds_per_month = total_tax / 12;
                var balance = total_tax;


                // var balance=total_tax;
                mysqldb.query(`select * from income_tax where empID='${indexList[i]}' ORDER BY STR_TO_DATE(CONCAT(year, month, ' 01'), '%Y %M %d') desc limit 1`
                    , (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log("invalid details");
                        }
                        //take directly from salary slip
                        else {
                            console.log(JSON.parse(JSON.stringify(result)))
                            var monthIssued = JSON.parse(JSON.stringify(result))[0].month;
                            // var currBalance=JSON.parse(JSON.stringify(result)).balance;
                            var tds_per_month_prev = JSON.parse(JSON.stringify(result))[0].tds_per_month;
                            // var total_tax_prev=JSON.parse(JSON.stringify(result)).total_tax;

                            //change logic to accomodate allround months
                            if(mlist.indexOf(monthIssued)>currmonth)
                            {
                                currmonth+=12;
                            }
                            var monthsPassed = currmonth - (mlist.indexOf(monthIssued));
                            var tax_payed = tds_per_month_prev * monthsPassed;
                            var monthsRemaining = 12 - monthsPassed;
                            var balance_new = total_tax - tax_payed;
                            tds_per_month = balance_new / monthsRemaining;
                            console.log("months passed,tax_payed,monthsRemaining,balance_new,tds_per_month", monthsPassed, tax_payed, monthsRemaining, balance_new, tds_per_month_prev)

                            console.log(`insert into income_tax (empID,exemption,prev_investment,total_investments,tax_on_income,rebate,health_and_edu_cess,total_tax,tds_per_month,balance,month,year) VALUES ('${empID}',${exemption},${investment},${investment},${tax_on_income},0,${health_and_edu_cess},${total_tax},${tds_per_month},${balance_new},'${cur_month}',${cur_year})`)
                            mysqldb.query(`insert into income_tax (empID,exemption,prev_investment,total_investments,net_taxable_income,tax_on_income,rebate,health_and_edu_cess,total_tax,tds_per_month,balance,month,year,type) VALUES ('${empID}',${exemption},${investment},${investment},${net_taxable_income},${tax_on_income},0,${health_and_edu_cess},${total_tax},${tds_per_month},${balance_new},'${cur_month}',${cur_year},"update")`, (err, result) => {
                                if (err) {

                                    console.log(err)
                                    console.log("error in insert query of income_tax update")
                                }
                                else {
                                    // res.redirect('/index1')

                                }
                            })
                        }
                    })

            }
        })
            
    }
    // to make it async
    async.forEachOf(indexList, updateIncomeTax, function (err) {
        if (err) {
            console.error(err);
        } else {

        }
    });

})

//make authenticated
router.post('/recovery', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.parse(JSON.stringify(req.body)))
    // var 
    // var empID=r

    // console.log(data["lwp"],data["month"],data["year"],days)


    mysqldb.query(`INSERT INTO recovery (empID, month, year, recoveryAmount, note) VALUES ('${data.empID}', '${data["month"]}', ${data["year"]}, ${data.recoveryAmount}, '${data.note}') on duplicate key update recoveryAmount=${data.recoveryAmount},note='${data.note}'`
        , (err, result) => {
            if (err) {
                console.log(err);
                
                res.json({status:"error", message:"Please Fill All The Fields"})
            
                
            }
            else {
            res.json({status:"success", message:"Recovery Amount Added Successfully!"})
            }
        })

})

router.post('/truncate',(req,res)=>{
    mlist = ["January", "February", "March", "April", "may", "june", "july", "august", "september", "october", "November", "December"];
    var cur_month = mlist[new Date().getMonth()].toLowerCase();
    var table = JSON.parse(JSON.stringify(req.body)).table;
    
    mysqldb.query(`delete from ${table} where month='${cur_month}'`
    , (err, result) => {
        if (err) {
            console.log(err);
            console.log("error in delete query");
        }
        else {
            res.redirect('index1');
        }
    })

    
})

module.exports = router;