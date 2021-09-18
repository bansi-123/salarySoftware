const e = require('connect-flash');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');
const { route } = require('./auth');
const async = require('async')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));

router.get('/index1', ensureAuthenticated, (req, res) => {

    res.render('index1', {
        name: req.user.name
    })
});

router.get('/test', ensureAuthenticated, (req, res) => {
    res.render('test');
});

router.get('/form-basic', ensureAuthenticated, (req, res) => res.render('form-basic', {
    name: req.user.name
}));

router.post('/form-basic', ensureAuthenticated, (req, res) => {

    console.log(req.body)
    // res.redirect('dashboard');
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
                    Employees: JSON.parse(JSON.stringify(result2))
                });
            }
        })

    }

    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle)
    }

});
router.post('/addEmployee', (req, res) => {

    const data = JSON.parse(JSON.stringify(req.body));
    const { empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory, emailID, groupInsurance, payBand, branchName, ifscCode, designationCategory, emailID2, nonteach, Subject, cca, ta, dop, doc, appointment, category, gender, status, mobile, address_correspondence, address_permanent, mis, biometric, vacation, seniority, dept_seniority, aadhar, Pan_No, onrole, phd, phdSub, phdUni, phdInsti, phdYr, pgSub, pgUni, pgYr, ugSub, ugUni, ugYr, grade, netset, othqual, exp, industry_exp, uni_approval, uni_app_date, uni_app_period, workexNT, dob, investment, emp_temp_regime, age, photo } = data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    // mysqldb.query(`INSERT INTO Employees (empName) VALUES ('${empName}')`
    //  empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , Type  , Type1 ,  onroll  , dop  , doc   ,appointment ,  Relieving  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,(err,result)=>{

    // console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
    mysqldb.query(`INSERT INTO Employees (empID,empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , dop  , doc   ,appointment  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,photo) VALUES ('${mis}','${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, '${bankAccNum}', '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}','${emailID2}','${nonteach}','${Subject}',${cca},${ta},'${dop}','${doc}','${appointment}','${category}','${gender}','${status}',${mobile},'${address_correspondence}','${address_permanent}','${mis}','${biometric}','${vacation}','${seniority}','${dept_seniority}','${aadhar}','${Pan_No}','${onrole}','${phd}','${phdSub}','${phdUni}','${phdInsti}',${phdYr},'${pgSub}','${pgUni}',${pgYr},'${ugSub}','${ugUni}',${ugYr},'${grade}','${netset}','${othqual}',${exp},${industry_exp},${uni_approval},'${uni_app_date}',${uni_app_period},${workexNT},'${dob}',${investment},'${emp_temp_regime}',${age},'${photo}')`
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

router.post('/editEmployee', (req, res) => {

    const data = JSON.parse(JSON.stringify(req.body));
    const { empID, empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory, emailID, groupInsurance, payBand, branchName, ifscCode, designationCategory, emailID2, nonteach, Subject, cca, ta, dop, doc, appointment, category, gender, status, mobile, address_correspondence, address_permanent, vacation, seniority, dept_seniority, aadhar, Pan_No, onrole, phd, phdSub, phdUni, phdInsti, phdYr, pgSub, pgUni, pgYr, ugSub, ugUni, ugYr, grade, netset, othqual, exp, industry_exp, uni_approval, uni_app_date, uni_app_period, workexNT, dob, investment, emp_temp_regime, age, workexpYr, photo } = data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    // mysqldb.query(`INSERT INTO Employees (empName) VALUES ('${empName}')`
    //  empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , Type  , Type1 ,  onroll  , dop  , doc   ,appointment ,  Relieving  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,(err,result)=>{

    // console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
    mysqldb.query(`UPDATE Employees 
    SET empName='${empName}', 
    uan='${uan}', 
    dept='${dept}', 
    designation='${designation}', 
    pay='${pay}', 
    gp='${gp}', 
    pf='${pf}', 
    bankAccNum='${bankAccNum}', 
    bankName='${bankName}', 
    doj='${doj}', 
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
    dob='${dob}', investment='${investment}', emp_temp_regime='${emp_temp_regime}', 
    age='${age}', workexpYr='${workexpYr}', photo='${photo}'
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
                res.redirect('/index1')
                // req.flash(
                //     'success_msg',
                //     'Employee found!'
                // );
            }
        })
})


router.get('/final', ensureAuthenticated, (req, res) => {
    res.render('final');
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
                Employees: JSON.parse(JSON.stringify(result))
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
                Employees: JSON.parse(JSON.stringify(result))
            });
        }
    })

});

router.get('/addincometax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('addincometax', {
                Employees: JSON.parse(JSON.stringify(result))
            });
        }
    })

});


router.get('/incometax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('incometax', {
                Employees: JSON.parse(JSON.stringify(result))
            });
        }
    })

});

router.get('/donations', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('donations', {
                Employees: JSON.parse(JSON.stringify(result))
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
    var donateDays=parseInt(data["donateDays"]);
    var cause=data["cause"];
    list=list.substring(0,list.length - 1);
    list+=")";
    console.log("list is",list2)
    for(var i in list2)
    {
        console.log(`insert into donation(empID,donationDays,month,year,cause) VALUES('${list2[i]}',${donateDays},'${cur_month}',${cur_year},'${cause}')`)
        mysqldb.query(`insert into donation(empID,donationDays,month,year,cause) VALUES('${list2[i]}',${donateDays},'${cur_month}',${cur_year},'${cause}')`,(err,result)=>{
            if(err)
            {
                console.log(err)
                console.log("error while inserting into donation table")
            }
            else {
                console.log("inserted in donation for employee with emp id", list2[i])

                //
            }
        })
    }

    res.redirect('viewdonations');

})

router.get('/viewdonations', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from donation`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('viewdonations', {
                donation: JSON.parse(JSON.stringify(result))
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
                Employees: JSON.parse(JSON.stringify(result))
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
    var newValue=parseInt(data["newValue"]);
    list=list.substring(0,list.length - 1);
    list+=")";
    console.log("list is",list2)
    console.log(`update Employees set ta=${newValue} where empID in ${list}`)
    mysqldb.query(`update Employees set ta=${newValue} where empID in ${list}`,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else {
            console.log("updated ta in employee")
        }
    })

    res.redirect('ta');

});

router.get('/cca', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('cca', {
                Employees: JSON.parse(JSON.stringify(result))
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
    var newValue = parseInt(data["newValue"]);
    list = list.substring(0, list.length - 1);
    list += ")";
    console.log("list is", list2)
    mysqldb.query(`update Employees set cca=${newValue} where empID in ${list}`, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("updated cca in employee")
        }
    })

    res.redirect('cca');

});


router.get('/differences', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('differences', {
                Employees: JSON.parse(JSON.stringify(result))
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
            }
            else {

            }
        })
    }

})

router.get('/otherdifferences', ensureAuthenticated, (req, res) => {
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
                        config: JSON.parse(JSON.stringify(result2))
                    });
                }
            })
        }
    })
});

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
    var da_difference = parseFloat(data.newdda) - parseFloat(data.presentdda)
    var hra_difference = parseFloat(data.newhra) - parseFloat(data.presenthra)
    mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = mlist[new Date().getMonth()];
    var year = new Date().getFullYear();
    var da_duration=0;
    var hra_duration=0;

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
        mysqldb.query(`insert into da_difference(empID,difference,month,duration,year) VALUES ('${list2[i]}',${da_difference},'${month}',${da_duration},${year})`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {

            }
        })
        mysqldb.query(`insert into hra_difference(empID,difference,month,duration,year) VALUES ('${list2[i]}',${hra_difference},'${month}',${hra_duration},${year})`, (err, result) => {
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
                increment: JSON.parse(JSON.stringify(result))
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
                salarydata: JSON.parse(JSON.stringify(result))
            });
        }
    })
}
)



router.get('/pdf', ensureAuthenticated, (req, res) => {
    res.render('pdf')
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
                        name: JSON.parse(JSON.stringify(result2))
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
    if(data["beforeafter25"]==="after")
    {
        data.month=monthNames[monthNames.indexOf(data.month.toLowerCase())+1].toLowerCase();
    }
    // console.log(length)
    // for (let i = 0; i < length; i++) {
    var days;
    if (data["month"].toLowerCase() === "january") {
        days = 31;
    }
    else if (data["month"].toLowerCase() === "february") {
        days = 28;
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
    mysqldb.query(`INSERT INTO lwp (empID, month, year, days, lwp) VALUES ('${data.empID}', '${data["month"]}', ${data["year"]}, ${days}, ${data["lwp"]}) ON DUPLICATE KEY UPDATE
        lwp=lwp+${data["lwp"]}`
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
                                Employees:JSON.parse(JSON.stringify(result))
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
                lwp: JSON.parse(JSON.stringify(result))
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
                miscell: JSON.parse(JSON.stringify(result))
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
                adv: JSON.parse(JSON.stringify(result))
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
                Employees: JSON.parse(JSON.stringify(result))
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
                Employees: JSON.parse(JSON.stringify(result))
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
                miscell: JSON.parse(JSON.stringify(result))
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
                late: JSON.parse(JSON.stringify(result))
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
                Employees: JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/showlwp', (req, res) => {
    //mysqldb.query(`select * from lwp natural join Employees`,(err,result)=>
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
                        name: JSON.parse(JSON.stringify(result2))
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
                lwp: JSON.parse(JSON.stringify(result))
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
                data: JSON.parse(JSON.stringify(result))
            });
        }
    })

});

router.post('/allowances', (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const {hra_MultFactor,da_MultFactor}=JSON.parse(JSON.stringify(req.body));
    mysqldb.query(`update config set hra_MultFactor=${hra_MultFactor},da_MultFactor=${da_MultFactor} where ID=1`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('index1');
        }
    })

});

router.get('/viewallow', (req, res) => {
    mysqldb.query(`select * from config`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('viewallow', {
                data: JSON.parse(JSON.stringify(result))
            });
        }
    })

});

router.get('/salsheet', (req, res) => {
    res.render('salsheet');
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
    const { empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory, emailID, groupInsurance, payBand, branchName, ifscCode, designationCategory, emailID2, nonteach, Subject, cca, ta, dop, doc, appointment, category, gender, status, mobile, address_correspondence, address_permanent, mis, biometric, vacation, seniority, dept_seniority, aadhar, Pan_No, onrole, phd, phdSub, phdUni, phdInsti, phdYr, pgSub, pgUni, pgYr, ugSub, ugUni, ugYr, grade, netset, othqual, exp, industry_exp, uni_approval, uni_app_date, uni_app_period, workexNT, dob, investment, emp_temp_regime, age, photo } = data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    // mysqldb.query(`INSERT INTO Employees (empName) VALUES ('${empName}')`
    //  empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , Type  , Type1 ,  onroll  , dop  , doc   ,appointment ,  Relieving  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,(err,result)=>{

    // console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
    mysqldb.query(`INSERT INTO Employees (empID,empName, uan,dept, designation, pay,  gp ,  pf ,  bankAccNum , bankName , doj , salaryCategory , emailID , groupInsurance , payBand , branchName,  ifscCode,  designationCategory,   emailID2,  nonteach,  Subject,    cca,   ta , dop  , doc   ,appointment  , category ,  gender ,  status ,  mobile,    address_correspondence ,  address_permanent , mis ,  biometric ,  vacation  , seniority,  dept_seniority ,   aadhar , Pan_No,   onrole  , phd , phdSub ,phdUni ,phdInsti,   phdYr,  pgSub,  pgUni,  pgYr,ugSub,ugUni,ugYr,grade,netset,othqual,exp,industry_exp,uni_approval,uni_app_date,uni_app_period,workexNT,dob,investment,emp_temp_regime,age,photo) VALUES ('${mis}','${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, '${bankAccNum}', '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}','${emailID2}','${nonteach}','${Subject}',${cca},${ta},'${dop}','${doc}','${appointment}','${category}','${gender}','${status}',${mobile},'${address_correspondence}','${address_permanent}','${mis}','${biometric}','${vacation}','${seniority}','${dept_seniority}','${aadhar}','${Pan_No}','${onrole}','${phd}','${phdSub}','${phdUni}','${phdInsti}',${phdYr},'${pgSub}','${pgUni}',${pgYr},'${ugSub}','${ugUni}',${ugYr},'${grade}','${netset}','${othqual}',${exp},${industry_exp},${uni_approval},'${uni_app_date}',${uni_app_period},${workexNT},'${dob}',${investment},'${emp_temp_regime}',${age},'${photo}')`
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
    mysqldb.query(`select * from Employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('groupinsurance', {
                Employees: JSON.parse(JSON.stringify(result))
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

    console.log("id list is", IDlist)


    // console.log(data.month)
    // for(var i in indexList)
    for (let i = 0; i < IDlist.length; i++) {
        console.log(`insert into group_insurance (empID,month,year) VALUES ('${IDlist[i]}',${cur_month},${year})`)
        mysqldb.query(`insert into group_insurance (empID,month,year) VALUES ('${IDlist[i]}','${cur_month}','${year}')`, (err, result) => {
            if (err) {
                console.log(err)
                console.log("error in insert query from group insurance")
            }
            else {
                console.log("group insurance added to table")
            }
        })
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
                Employees: JSON.parse(JSON.stringify(result))
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
                            name: JSON.parse(JSON.stringify(result2))
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
                            name: JSON.parse(JSON.stringify(result2))
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
                            name: JSON.parse(JSON.stringify(result2))
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
                Employees: JSON.parse(JSON.stringify(result))
            });
        }
    })
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
                            name: JSON.parse(JSON.stringify(result2))
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
                salary: JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/showadvances', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from advance`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Salary Details", JSON.parse(JSON.stringify(result)));
            res.render('showadvances', {
                advance: JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.post('/advances', ensureAuthenticated, (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    var data = JSON.parse(JSON.stringify(req.body));
    var empID = data.empID;
    console.log(`INSERT INTO advance_temp (empID, ,amount, month, year, duration, outstanding) VALUES ('${empID}', ${data["amt"]}, '${data["month"]}', ${data["year"]}, ${data["duration"]}, ${data["amt"]})`)
    mysqldb.query(`INSERT INTO advance_temp (empID, amount, month, year, duration, outstanding) VALUES ('${empID}', ${data["amt"]}, '${data["month"]}', ${data["year"]}, ${data["duration"]}, ${data["amt"]})`
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
                salary: JSON.parse(JSON.stringify(result))
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
    var incrementPercent = parseInt(data["increment"]);
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
                
                mysqldb.query(`INSERT INTO increment (empID, month, year, increment,prevPay,updatedPay) VALUES ('${list2[i]}', '${cur_month}', ${year}, ${incrementPercent},${queryData[i].pay},${finalpay})`,(err,result)=>
                {
                    if (err) {
                        console.log(err);
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
    mysqldb.query(`select S.empID,E.empName,E.salaryCategory,E.uan,E.bankName,E.bankAccNum,S.month,S.year,S.daysOfMonth,IFNULL(l.lwp,0) as lwp,S.workedDays,E.pay as original_pay,E.gp as original_gp,S.bp,S.gp,S.da,S.hra,S.cca,S.diff,S.oth_spl,S.ta,S.gross_sal,S.pf,S.prof_tax,S.in_tax,case when g.empID is NOT NULL then "applicable" else 0 end as group_insurance,IFNULL(la.latedays,0) as latedays,IFNULL(d.donationDays,0) as donationDays,IFNULL(a.amount,0) as advance,IFNULL(r.recoveryAmount,0) as recovery,IFNULL(m.miscellaneous_amt,0) as miscellaneous,S.other_deductions,S.rev_stmp,S.total_ded,S.net_sal from Salary S left outer join Employees E on (S.empID=E.empID) left outer join lwp l on (S.empID=l.empID AND S.month=l.month and S.year=l.year) left outer join group_insurance g on (S.empId=g.empID and S.month=g.month and S.year=g.year) left outer join late_attendance la on (S.empId=la.empID and S.month=la.month and S.year=la.year) left outer join donation d on (S.empId=d.empID and S.month=d.month and S.year=d.year) left outer join advance a on (S.empId=a.empID and S.month=a.month and S.year=a.year) left outer join recovery r on (S.empId=r.empID and S.month=r.month and S.year=r.year) left outer join miscellaneous m on (S.empId=m.empID and S.month=m.month and S.year=m.year)`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showsalary', {
                salary: JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/showfinaldeductions', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select S.empID,E.empName,E.salaryCategory,E.uan,E.bankName,E.bankAccNum,S.month,S.year,S.daysOfMonth,IFNULL(l.lwp,0) as lwp,S.workedDays,E.pay as original_pay,E.gp as original_gp,S.bp,S.gp,S.da,S.hra,S.cca,S.diff,S.oth_spl,S.ta,S.gross_sal,S.pf,S.prof_tax,S.in_tax,case when g.empID is NOT NULL then "applicable" else 0 end as group_insurance,IFNULL(la.latedays,0) as latedays,IFNULL(d.donationDays,0) as donationDays,IFNULL(a.amount,0) as advance,IFNULL(r.recoveryAmount,0) as recovery,IFNULL(m.miscellaneous_amt,0) as miscellaneous,S.other_deductions,S.rev_stmp,S.total_ded,S.net_sal from Salary S left outer join Employees E on (S.empID=E.empID) left outer join lwp l on (S.empID=l.empID AND S.month=l.month and S.year=l.year) left outer join group_insurance g on (S.empId=g.empID and S.month=g.month and S.year=g.year) left outer join late_attendance la on (S.empId=la.empID and S.month=la.month and S.year=la.year) left outer join donation d on (S.empId=d.empID and S.month=d.month and S.year=d.year) left outer join advance a on (S.empId=a.empID and S.month=a.month and S.year=a.year) left outer join recovery r on (S.empId=r.empID and S.month=r.month and S.year=r.year) left outer join miscellaneous m on (S.empId=m.empID and S.month=m.month and S.year=m.year)`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showfinaldeductions', {
                salary: JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/showmasterview', ensureAuthenticated, (req, res) => {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
    var cur_month = mlist[new Date().getMonth()]
    var cur_year = new Date().getFullYear()
    mysqldb.query(`select S.empID,E.empName,E.salaryCategory,E.uan,E.bankName,E.bankAccNum,S.month,S.year,S.daysOfMonth,IFNULL(l.lwp,0) as lwp,S.workedDays,E.pay as original_pay,E.gp as original_gp,S.bp,S.gp,S.da,S.hra,S.cca,S.diff,S.oth_spl,S.ta,S.gross_sal,S.pf,S.prof_tax,S.in_tax,case when g.empID is NOT NULL then "applicable" else 0 end as group_insurance,IFNULL(la.latedays,0) as latedays,IFNULL(d.donationDays,0) as donationDays,IFNULL(a.amount,0) as advance,IFNULL(r.recoveryAmount,0) as recovery,IFNULL(m.miscellaneous_amt,0) as miscellaneous,S.other_deductions,S.rev_stmp,S.total_ded,S.net_sal from Salary S left outer join Employees E on (S.empID=E.empID) left outer join lwp l on (S.empID=l.empID AND S.month=l.month and S.year=l.year) left outer join group_insurance g on (S.empId=g.empID and S.month=g.month and S.year=g.year) left outer join late_attendance la on (S.empId=la.empID and S.month=la.month and S.year=la.year) left outer join donation d on (S.empId=d.empID and S.month=d.month and S.year=d.year) left outer join advance a on (S.empId=a.empID and S.month=a.month and S.year=a.year) left outer join recovery r on (S.empId=r.empID and S.month=r.month and S.year=r.year) left outer join miscellaneous m on (S.empId=m.empID and S.month=m.month and S.year=m.year)`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('showmasterview', {
                salary: JSON.parse(JSON.stringify(result))
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
                var da_MultFactor=JSON.parse(JSON.stringify(result))[0].da_MultFactor
                var hra_MultFactor=JSON.parse(JSON.stringify(result))[0].hra_MultFactor
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
                mysqldb.query(`select pay,gp,pf,empID,ta,cca from Employees ORDER BY empID LIMIT ${i},1`,(err,result)=>{
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

                        console.log(JSON.parse(JSON.stringify(result))[0]);
                        console.log("gp,pf,bp selected for empid",gp,pf,pay,empID);
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
                                    // hra_final_difference=(pay+gp)*hra_difference*hra_duration/100
                                    hra_final_difference=(pay+gp)*hra_difference*hra_duration
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
                                            // da_final_difference=(pay+gp)*da_difference*da_duration/100
                                            da_final_difference=(pay+gp)*da_difference*da_duration
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
                                                        days=28;
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

                                                        mysqldb.query(`select days,lwp from lwp where empID='${empID}' and month='${month}' and year=${year}`,(err,result)=>{
                                                            if (err) {
                                                                
                                                                console.log(err)
                                                                console.log("invalid select from lwp query")
                                                            }
                                                            else{
                                                                // var month=JSON.parse(JSON.stringify(req.body)).month
                                                                // var year=JSON.parse(JSON.stringify(req.body)).year
                                                                // var days;
                                                                var lwp=0;
                                                                if(result.length===0)
                                                                {

                                                                }
                                                                else{
                                                                    lwp=JSON.parse(JSON.stringify(result))[0].lwp;
                                                                }
                                                                
                                                                var daysOfMonth=days;
                                                                console.log("days are",days)
                                                                
                                                                var workedDays=daysOfMonth-lwp;
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
                                                                //ceil the increment=650
                                                                //650 x (da_factor+hra_factor) i.e 1.59=1033.5
                                                                //increment=1033.5 + 650
                                                                //x number of months is final difference

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
                                                                mysqldb.query(`select * from late_attendance where empID='${empID}' and month='${month}' and year=${year}`
                                                                ,(err,result)=>{
                                                                    if (err) {
                                                                        console.log(err)
                                                                        console.log("error while selecting from late attendance table")
                                                                    }
                                                                    else{
                                                                        var late_attendance_deduction=0;
                                                                        if(result.length===0)
                                                                        {

                                                                        }
                                                                        else
                                                                        {
                                                                            var data=JSON.parse(JSON.stringify(result))[0];
                                                                            var latedays=data.latedays;
                                                                            var prevdays=data.prevdays;
                                                                            late_attendance_deduction=gross_sal/prevdays*latedays

                                                                        }
                                                                        oth_spl+=parseInt(late_attendance_deduction)
                                                                        console.log("late attendance deductions is",late_attendance_deduction,"for empid",empID)
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
                                                                                            //take latest increment value
                                                                                            mysqldb.query(`select * from increment where empID='${empID}' order by year desc,month desc limit 1`,(err,result)=>{
                                                                                                if (err) {
                                                                                                    console.log(err)
                                                                                                    console.log("error while calculating from increment table,select query")
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                    // var finalIncrement=0
                                                                                                    if(result.length===0)
                                                                                                    {
                                                                                                        console.log("no prior increment history")
                                                                                                    }
                                                                                                    else{
                                                                                                        var prevPay=JSON.parse(JSON.stringify(result))[0].prevPay;
                                                                                                        var increment=JSON.parse(JSON.stringify(result))[0].increment;
                                                                                                        // var durationIncrement=JSON.parse(JSON.stringify())
                                                                                                        var incrementvalue=(prevPay+gp*daysOfMonth/workedDays)*(increment/100)
                                                                                                        if((Math.floor(incrementvalue)%10)===0)
                                                                                                        {

                                                                                                        }
                                                                                                        else{
                                                                                                            incrementvalue=Math.ceil(incrementvalue/10)*10
                                                                                                        }
                                                                                                        var toAddValue=(hra_MultFactor+da_MultFactor)*incrementvalue
                                                                                                        finalIncrement=Math.ceil((toAddValue+incrementvalue)*durationIncrement)
                                                                                                        diff+=parseInt(finalIncrement)
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
                                                                                                        mysqldb.query(`select * from income_tax where empID='${empID}' and month='${month}' and year=${year}`
                                                                                                        ,(err,result)=>{
                                                                                                            if (err) {
                                                                                                                console.log(err)
                                                                                                                console.log("error while selecting from income_tax table")
                                                                                                            }
                                                                                                            else{
                                                                                                                if(result.length===0)
                                                                                                                {
                                                                                                                    console.log("pay,gp,da,hra,ta_temp,cca_temp 7",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                                                                    console.log("no income_tax for employee with empID",empID)
                                                                                                                }
                                                                                                                else
                                                                                                                {
                                                                                                                    var tds=JSON.parse(JSON.stringify(result))[0].tds_per_month;
                                                                                                    
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
                                                                                                                var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(rev_stmp)+parseFloat(sal_adv)+parseFloat(oth_spl)+3000; //+parseFloat(lwp_amt);
                                                                                                                var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);
                                                                                                                
                                                                                                                console.log("pay,gp,da,hra,ta_temp,cca_temp 8    ",pay,gp,da,hra,ta_temp,cca_temp,"for empID",empID)

                                                                                                                console.log(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,bp,gp,pf,other_deductions) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, 3000, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${pay},${gp},${pf},${oth_spl})`)
                                                                                                                mysqldb.query(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,bp,gp,pf,other_deductions) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, 3000, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${pay},${gp},${pf},${oth_spl})`
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
                    requestedTitle: req.params.empID
                    //added the name field here to get the name wise reciept
                });
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle)
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
                    Employees: JSON.parse(JSON.stringify(result))
                });
            }
        })
    }
    else {
        requestedTitle = "/" + requestedTitle
        res.redirect(requestedTitle)
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
                requestedTitle: req.params.empID
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
                data: JSON.parse(JSON.stringify(result))
            });
        }
    })

});

router.post('/deductions', (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const { prov_fund_DNA, prov_fund_Percent, prov_fund_Max, prof_tax_Max, prof_tax_Percent, prof_tax_DNA, rev_stamp_max, rev_stamp_DNA } = JSON.parse(JSON.stringify(req.body));
    mysqldb.query(`update config set prov_fund_DNA=${prov_fund_DNA},prov_fund_Percent=${prov_fund_Percent},prov_fund_Max=${prov_fund_Max},prof_tax_Max=${prof_tax_Max},prof_tax_Percent=${prof_tax_Percent},prof_tax_DNA=${prof_tax_DNA},rev_stamp_max=${rev_stamp_max},rev_stamp_DNA=${rev_stamp_DNA} where ID=1`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            res.render('index1');
        }
    })

});

router.get('/viewdeductions', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from config`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Config Details", JSON.parse(JSON.stringify(result)));
            res.render('viewdeduction', {
                data: JSON.parse(JSON.stringify(result))
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
    var prev = data.month;
    prev = monthNames[monthNames.indexOf(prev.toLowerCase()) - 1]
    // console.log(length)
    // for (let i = 0; i < length; i++) {
    var prevdays;
    console.log("prev", prev)
    if (prev === "january") {
        prevdays = 31;
    }
    else if (prev === "february") {
        prevdays = 28;
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
    mysqldb.query(`INSERT INTO late_attendance (empID, empName, latedays,month, year, prevdays) VALUES ('${data.empID}', '${data.empName}', ${data.latedays}, '${data["month"]}', ${data["year"]}, ${prevdays})`, (err, result) => {
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
    res.redirect('index1');
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
    mysqldb.query(`INSERT INTO miscellaneous (empID, empName, miscellaneous_amt ,month, year, note) VALUES ('${data.empID}', '${data.empName}', ${data.amt}, '${data["month"]}', ${data["year"]}, '${data.note}')`, (err, result) => {
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
    res.redirect('index1');
});

router.get('/storeIncomeTax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from income_tax natural join Salary`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('incometax', {
                Employees: JSON.parse(JSON.stringify(result))
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
            mlist = ["January", "February", "March", "April", "May", "June", "July", "august", "September", "October", "November", "December"];
            var cur_month = mlist[new Date().getMonth()].toLowerCase();
            // var cur_month="august"
            var cur_year = new Date().getFullYear()
            for (let i = 1; i < length + 1; i++) {
                console.log(`select * from Employees natural join Salary where month='${cur_month}' and year=${cur_year} ORDER BY empID LIMIT ${i},1`)
                //to get employee specific properties for calculation
                mysqldb.query(`select * from Employees natural join Salary where month='${cur_month}' and year=${cur_year} ORDER BY empID LIMIT ${i},1`, (err, result) => {
                    if (err) {

                        console.log(err)
                        console.log("error in select query of Employee")
                    }
                    else {
                        console.log("Result is", result, "for i-1", i - 1)
                        //tax regime,age,investment
                        var empID = parseInt(JSON.parse(JSON.stringify(result))[0].empID);
                        var age = parseInt(JSON.parse(JSON.stringify(result))[0].age);
                        var investment = parseInt(JSON.parse(JSON.stringify(result))[0].investment);
                        var emp_temp_regime = JSON.parse(JSON.stringify(result))[0].emp_temp_regime;
                        var gross_sal = parseInt(JSON.parse(JSON.stringify(result))[0].gross_sal);
                        var gross_total_income = gross_sal * 12;
                        console.log(JSON.parse(JSON.stringify(result))[0]);
                        var tax_on_income;
                        var exemption = 250000 + investment
                        var net_taxable_income = gross_sal - exemption;
                        console.log("regime is", emp_temp_regime)
                        if (emp_temp_regime === "old") {
                            console.log("in if")
                            if (gross_total_income < 250000) {
                                console.log("in less")
                                tax_on_income = 0;
                            }
                            else if (gross_total_income < 300000 && age >= 60 && age < 80) {
                                tax_on_income = 0;
                            }
                            else if (gross_total_income < 500000 && age > 80) {
                                tax_on_income = 0;
                            }
                            else if (gross_total_income >= 250000 && gross_sal < 500000) {
                                tax_on_income = net_taxable_income * 0.05
                            }
                            else if (gross_total_income >= 500000 && gross_sal < 1000000) {
                                tax_on_income = net_taxable_income * 0.20
                            }
                            else if (gross_total_income >= 1000000) {
                                tax_on_income = net_taxable_income * 0.30
                            }

                        }
                        else if (emp_temp_regime === "new") {
                            if (gross_total_income < 250000) {
                                tax_on_income = 0;
                            }

                            else if (gross_total_income >= 250000 && gross_sal < 500000) {
                                tax_on_income = net_taxable_income * 0.05
                            }
                            else if (gross_total_income >= 500000 && gross_sal < 750000) {
                                tax_on_income = net_taxable_income * 0.10
                            }
                            else if (gross_total_income >= 750000 && gross_sal < 1000000) {
                                tax_on_income = net_taxable_income * 0.15
                            }
                            else if (gross_total_income >= 1000000 && gross_sal < 1250000) {
                                tax_on_income = net_taxable_income * 0.20
                            }
                            else if (gross_total_income >= 1250000 && gross_sal < 1500000) {
                                tax_on_income = net_taxable_income * 0.25
                            }
                            else if (gross_total_income >= 1500000) {
                                tax_on_income = net_taxable_income * 0.30
                            }

                        }
                        var health_and_edu_cess = 0.04 * tax_on_income;
                        var total_tax = tax_on_income + health_and_edu_cess;
                        var tds_per_month = total_tax / 12;
                        var balance = total_tax;
                        console.log(`insert into income_tax (empID,exemption,prev_investment,total_investments,tax_on_income,rebate,health_and_edu_cess,total_tax,tds_per_month,balance,month,year) VALUES ('${empID}',${exemption},${investment},${investment},${tax_on_income},0,${health_and_edu_cess},${total_tax},${tds_per_month},${balance},'${cur_month}',${cur_year})`)
                        mysqldb.query(`insert into income_tax (empID,exemption,prev_investment,total_investments,net_taxable_income,tax_on_income,rebate,health_and_edu_cess,total_tax,tds_per_month,balance,month,year,type) VALUES ('${empID}',${exemption},${investment},${investment},${net_taxable_income},${tax_on_income},0,${health_and_edu_cess},${total_tax},${tds_per_month},${balance},'${cur_month}',${cur_year},"initial")`, (err, result) => {
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

})

router.get('/register/teaching', (req, res) => {
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
                //requestedTitle = req.params.empID
                //added the name field here to get the name wise reciept
            });
        }
    })
    // res.render("templateSelected2");
});


router.get('/updateIncomeTax', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from income_tax natural join Salary`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employees Details", JSON.parse(JSON.stringify(result)));
            res.render('addincometax', {
                Employees: JSON.parse(JSON.stringify(result))
            });
        }
    })
})

router.post('/updateIncomeTax', ensureAuthenticated, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    console.log(data)
    var indexList = []
    var valueList = []
    for (var i in data) {

        if (Number.isInteger(parseInt(i))) {
            console.log(i)
            console.log(data[i])
            indexList.push(i)
            valueList.push(data[i])
        }

    }
    console.log(indexList)
    console.log(valueList)
    var current = new Date();
    var currmonth = current.getMonth() + 1;

    function updateIncomeTax(item, i, callback) {

        mysqldb.query(`update Employees set investment=${valueList[i]} where empID='${indexList[i]}'`, (err, result) => {
            if (err) {
                console.log(err)
                console.log("error in update query of Employee")
            }
            else {

                mlist = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
                // var cur_month="august"
                var cur_month = mlist[new Date().getMonth()].toLowerCase()
                var cur_year = new Date().getFullYear()
                console.log(valueList, indexList, i, "in query")
                console.log(`select * from Employees natural join Salary where month='${cur_month}' and year=${cur_year} and empID='${indexList[i]}'`)
                //to get employee specific properties for calculation
                mysqldb.query(`select * from Employees natural join Salary where month='${cur_month}' and year=${cur_year} and empID='${indexList[i]}'`, (err, result) => {
                    if (err) {
                        console.log(err)
                        console.log("error in select query of Employee")
                    }
                    else {
                        console.log("Result is", result, "for empID", indexList[i])
                        //tax regime,age,investment
                        var empID = parseInt(JSON.parse(JSON.stringify(result))[0].empID);
                        var age = parseInt(JSON.parse(JSON.stringify(result))[0].age);
                        // var investment=parseInt(JSON.parse(JSON.stringify(result))[0].investment);
                        var investment = parseInt(JSON.parse(JSON.stringify(result))[0].investment);
                        var emp_temp_regime = JSON.parse(JSON.stringify(result))[0].emp_temp_regime;
                        var gross_sal = parseInt(JSON.parse(JSON.stringify(result))[0].gross_sal);
                        var gross_total_income = gross_sal * 12;
                        console.log(JSON.parse(JSON.stringify(result))[0]);
                        var tax_on_income;
                        var exemption = 250000 + investment
                        var net_taxable_income = gross_sal - exemption;
                        console.log("regime is", emp_temp_regime)
                        if (emp_temp_regime === "old") {
                            console.log("in if")
                            if (gross_total_income < 250000) {
                                console.log("in less")
                                tax_on_income = 0;
                            }
                            else if (gross_total_income < 300000 && age >= 60 && age < 80) {
                                tax_on_income = 0;
                            }
                            else if (gross_total_income < 500000 && age > 80) {
                                tax_on_income = 0;
                            }
                            else if (gross_total_income >= 250000 && gross_sal < 500000) {
                                tax_on_income = net_taxable_income * 0.05
                            }
                            else if (gross_total_income >= 500000 && gross_sal < 1000000) {
                                tax_on_income = net_taxable_income * 0.20
                            }
                            else if (gross_total_income >= 1000000) {
                                tax_on_income = net_taxable_income * 0.30
                            }

                        }
                        else if (emp_temp_regime === "new") {
                            if (gross_total_income < 250000) {
                                tax_on_income = 0;
                            }

                            else if (gross_total_income >= 250000 && gross_sal < 500000) {
                                tax_on_income = net_taxable_income * 0.05
                            }
                            else if (gross_total_income >= 500000 && gross_sal < 750000) {
                                tax_on_income = net_taxable_income * 0.10
                            }
                            else if (gross_total_income >= 750000 && gross_sal < 1000000) {
                                tax_on_income = net_taxable_income * 0.15
                            }
                            else if (gross_total_income >= 1000000 && gross_sal < 1250000) {
                                tax_on_income = net_taxable_income * 0.20
                            }
                            else if (gross_total_income >= 1250000 && gross_sal < 1500000) {
                                tax_on_income = net_taxable_income * 0.25
                            }
                            else if (gross_total_income >= 1500000) {
                                tax_on_income = net_taxable_income * 0.30
                            }

                        }
                        var health_and_edu_cess = 0.04 * tax_on_income;
                        var total_tax = tax_on_income + health_and_edu_cess;
                        var tds_per_month = total_tax / 12;
                        // var balance=total_tax;
                        mysqldb.query(`select * from income_tax where empID='${indexList[i]}' and type="initial"`
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
                                    var monthsPassed = currmonth - (mlist.indexOf(monthIssued) + 1);
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


    mysqldb.query(`INSERT INTO recovery (empID, month, year, recoveryAmount, note) VALUES ('${data.empID}', '${data["month"]}', ${data["year"]}, ${data.recoveryAmount}, '${data.note}')`
        , (err, result) => {
            if (err) {
                console.log(err);
                console.log("error in insert query for recovery");
            }
            else {
                res.redirect('index1');
            }
        })

})

module.exports = router;