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
    // res.redirect('dashboard');
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

router.get('/showincrement', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from increment`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('showincrement',{
                increment:JSON.parse(JSON.stringify(result))
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
        
        mysqldb.query(`select empID from Employees ORDER BY empID LIMIT ${i},1`,(err,result)=>{
            if (err) {
                //------------ Invalid registration Number ------------//
                // req.flash('error_msg',
                // 'Please enter valid Id.')
                console.log(err)
            }
            else{
                var empID=JSON.parse(JSON.stringify(result))[0].empID;
                mysqldb.query(`INSERT INTO lwp_temp (empID, month, year, days, lwp) VALUES (${empID }, '${data["month"][i]}', ${data["year"][i]}, ${days}, ${data["lwp"][i]})`
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
        })
    }
    res.redirect('showlwp');
});

router.get('/viewemployee', ensureAuthenticated, (req, res) => {
    // mysqldb.query(`select * from Employees`,(err,result)=>
    // {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Employees Details",JSON.parse(JSON.stringify(result)));
    //         res.render('viewemployee',{
    //             employees:JSON.parse(JSON.stringify(result))
    //         });
    //     }
    // })

    mysqldb.query(`select * from Salary natural join Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('viewemployee',{
                Salary:JSON.parse(JSON.stringify(result))
            });
        }
    })

});

router.get('/showlwp',  (req, res) => {
    mysqldb.query(`select * from lwp_temp`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('showlwp',{
                lwp:JSON.parse(JSON.stringify(result))
            });
        }
    })
    
});

router.get('/allowances',  (req, res) => {
    mysqldb.query(`select * from config`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('allowances',{
                data:JSON.parse(JSON.stringify(result))
            });
        }
    })
    
});

router.post('/allowances',  (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const {ta,cca,hra_MultFactor,da_MultFactor}=JSON.parse(JSON.stringify(req.body));
    mysqldb.query(`update config set ta=${ta},cca=${cca},hra_MultFactor=${hra_MultFactor},da_MultFactor=${da_MultFactor} where ID=1`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('viewallow');
        }
    })
    
});

router.get('/viewallow',  (req, res) => {
    mysqldb.query(`select * from config`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('viewallow',{
                data:JSON.parse(JSON.stringify(result))
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

// ------------ Search for Employee Details Route ------------//
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

router.post('/table-export', ensureAuthenticated, (req, res) => {
    console.log(req.body)
    res.redirect('dashboard');
});


// ------------ Add Employee Route ------------//
router.post('/addEmployee',(req,res)=>{
    const data=JSON.parse(JSON.stringify(req.body));
    const {empName,uan,dept,designation,pay,gp,pf,bankAccNum,bankName,doj,salaryCategory,emailID,groupInsurance,payBand,branchName,ifscCode,designationCategory}=data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName},${ifscCode},'${designationCategory}')`)
    mysqldb.query(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}',${ifscCode},'${designationCategory}')`
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



router.get('/advances', ensureAuthenticated, (req, res) => 
{
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('advances',{
                salary:JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/showadvances', ensureAuthenticated, (req, res) => 
{
    mysqldb.query(`select * from advance`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('showadvances',{
                advance:JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.post('/advances', ensureAuthenticated, (req, res) => 
{
    console.log(JSON.parse(JSON.stringify(req.body)))
    var data=JSON.parse(JSON.stringify(req.body));
    var length=data['duration'].length;
    for (let i = 0; i < length; i++) {
        mysqldb.query(`select empID from Employees ORDER BY empID LIMIT ${i},1`,(err,result)=>{
            if (err) {
                //------------ Invalid registration Number ------------//
                // req.flash('error_msg',
                // 'Please enter valid Id.')
                console.log(err)
            }
            else{
                console.log(result)
                var empID=JSON.parse(JSON.stringify(result))[0].empID;
                console.log(`INSERT INTO advance (empID, ,amount, month, year, duration, outstanding) VALUES (${empID}, ${data["amount"][i]}, ${data["month"][i]}, ${data["year"][i]}, ${data["duration"][i]}, ${data["amount"][i]})`)
                mysqldb.query(`INSERT INTO advance (empID, amount, month, year, duration, outstanding) VALUES (${empID}, ${data["amount"][i]}, ${data["month"][i]}, ${data["year"][i]}, ${data["duration"][i]}, ${data["amount"][i]})`
                ,(err,result)=>{
                    if (err) {
                        console.log(err);
                        console.log("invalid details");
                    }
                    else{
                        // console.log(JSON.parse(JSON.stringify(result))[0])
                        
                        // req.flash(
                        //     'success_msg',
                        //     'Employee found!'
                        // );
                    }
                })
            }
        })
    }
    res.redirect('/index1')
});

router.get('/view2', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Salary natural join Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('view_2',{
                salary:JSON.parse(JSON.stringify(result))
            });
        }
    })

});


// //------------ Update Basic Pay and Related Properties Route ------------//
router.post('/updatepay',(req,res)=>{
    // const {empID,pay}=req.body;
    // var increment=3
    console.log(JSON.parse(JSON.stringify(req.body)))

    const data=JSON.parse(JSON.stringify(req.body));
    // const pay=data["increment"];
    // console.log(JSON.parse(JSON.stringify(req.body)))
    // var list=[];
    var list="(";
    var list2=[]
    for(var i in data)
    {

        if(Number.isInteger(parseInt(i)))
        {
            console.log(i)
            console.log(data[i])
            list+=i.toString()+","
            list2.push(i)
        }

    }
    var incrementPercent=parseInt(data["increment"]);
    list=list.substring(0,list.length - 1);
    list+=")";
    console.log("list is",list2)
    var current = new Date();
    var month=current.getMonth();
    var year=current.getFullYear();
    
    mysqldb.query(`select empID,pay,gp from Employees where empID in ${list}`,(err,result)=>    {
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
            var queryData=JSON.parse(JSON.stringify(result))
            console.log(JSON.parse(JSON.stringify(result)));
            for (let i = 0; i < queryData.length; i++) {
                var multFactor=1+incrementPercent/100
                var increment=(queryData[i].pay + queryData[i].gp)*multFactor
                if((Math.floor(increment)%10)===0)
                {

                }
                else{
                    increment=Math.ceil(increment/10)*10
                }
                var finalpay=increment-queryData[i].gp;
                console.log(`update Employees set pay=${finalpay} where empID=${parseInt(list2[i])})`)
                
                mysqldb.query(`INSERT INTO increment (empID, month, year, increment) VALUES (${parseInt(list2[i])}, ${month}, ${year}, ${incrementPercent})`,(err,result)=>
                {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        mysqldb.query(`update Employees set pay=${finalpay} where empID=${parseInt(list2[i])}`,(err,result)=>
                        {
                            if (err) {
                                console.log(err);
                            }
                            else{
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
    mysqldb.query(`select * from Salary natural join Employees`,(err,result)=>
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
    console.log("body is",JSON.parse(JSON.stringify(req.body)))
    var length;
    mysqldb.query(`select * from config`,(err,result)=>{
        if (err) {
           
            console.log(err)
        }
        else{
            var da_MultFactor=JSON.parse(JSON.stringify(result))[0].da_MultFactor
            var hra_MultFactor=JSON.parse(JSON.stringify(result))[0].hra_MultFactor
            var ta=JSON.parse(JSON.stringify(result))[0].ta
            var cca=JSON.parse(JSON.stringify(result))[0].cca
            var prov_fund_DNA=JSON.parse(JSON.stringify(result))[0].prov_fund_DNA
            var prov_fund_Percent=JSON.parse(JSON.stringify(result))[0].prov_fund_Percent
            var prov_fund_Max=JSON.parse(JSON.stringify(result))[0].prov_fund_Max
            var prof_tax_DNA=JSON.parse(JSON.stringify(result))[0].prof_tax_DNA
            var prof_tax_Percent=JSON.parse(JSON.stringify(result))[0].prof_tax_Percent
            var prof_tax_Max=JSON.parse(JSON.stringify(result))[0].prof_tax_Max
            var rev_stamp_DNA=JSON.parse(JSON.stringify(result))[0].rev_stamp_DNA
            var rev_stamp_max=JSON.parse(JSON.stringify(result))[0].rev_stamp_max

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
                        mysqldb.query(`select pay,gp,pf,empID from Employees ORDER BY empID LIMIT ${i-1},1`,(err,result)=>{
                            if (err) {
                                //------------ Invalid registration Number ------------//
                                // req.flash('error_msg',
                                // 'Please enter valid Id.')
                                console.log(err)
                            }
                            else{
                                console.log(result)
                                var empID=parseInt(JSON.parse(JSON.stringify(result))[0].empID);
                                var gp=parseInt(JSON.parse(JSON.stringify(result))[0].gp);
                                var pf=parseInt(JSON.parse(JSON.stringify(result))[0].pf);
                                var pay=parseInt(JSON.parse(JSON.stringify(result))[0].pay);
                                console.log(JSON.parse(JSON.stringify(result))[0]);
                                console.log("gp,pf,bp selected",gp,pf,pay);
                                // req.flash(
                                //     'success_msg',
                                //     'Employee found!'
                                // );
                                var diff=0
                                var oth_spl=0;
                                var prof_tax;
                                var in_tax=3000;
                                var rev_stmp=1
                                var sal_adv=0;
                                var da=(pay+parseFloat(gp))*da_MultFactor;
                                console.log("da is",da);
                                var hra=(pay+parseFloat(gp))*hra_MultFactor;
                                console.log("hra is",hra);
                                
                                mysqldb.query(`select month,year,days,lwp from lwp_temp where empID=${empID}`,(err,result)=>{
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
                                        // var month=JSON.parse(JSON.stringify(result))[0].month;
                                        // var year=JSON.parse(JSON.stringify(result))[0].year;
                                        var month=JSON.parse(JSON.stringify(req.body)).month
                                        var year=JSON.parse(JSON.stringify(req.body)).year
                                        var days;
                                        if(month==="january")
                                        {
                                            days=31;
                                        }
                                        else if(month==="february")
                                        {
                                            days=28;
                                        }
                                        else if(month==="march")
                                        {
                                            days=31;
                                        }
                                        else if(month==="april")
                                        {
                                            days=30;
                                        }
                                        else if(month==="may")
                                        {
                                            days=31;
                                        }
                                        else if(month==="june")
                                        {
                                            days=30
                                        }
                                        else if(month==="july")
                                        {
                                            days=31
                                        }
                                        else if(month==="august")
                                        {
                                            days=31
                                        }
                                        else if(month==="september")
                                        {
                                            days=30
                                        }
                                        else if(month==="october")
                                        {
                                            days=31
                                        }
                                        else if(month==="november")
                                        {
                                            days=30
                                        }
                                        else if(month==="december")
                                        {
                                            days=31
                                        }

                                        var daysOfMonth=days;
                                        var lwp=JSON.parse(JSON.stringify(result))[0].lwp;
                                        var workedDays=daysOfMonth-lwp;
                                        pay*=workedDays/daysOfMonth;
                                        gp*=workedDays/daysOfMonth;
                                        da*=workedDays/daysOfMonth;
                                        hra*=workedDays/daysOfMonth;
                                        ta*=workedDays/daysOfMonth;
                                        cca*=workedDays/daysOfMonth;
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
                                        console.log("gross salary,days of month,lwp",gross_sal,daysOfMonth,lwp)
                                        // console.log("lwp_amt=",lwp_amt)
                                        var gross_sal=pay+parseFloat(gp)+parseFloat(da)+parseFloat(hra)+parseFloat(cca)+parseFloat(diff)+parseFloat(oth_spl)+parseFloat(ta);
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
                                        var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(in_tax)+parseFloat(rev_stmp)+parseFloat(sal_adv); //+parseFloat(lwp_amt);
                                        var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);
                                        console.log("logging")
                                        console.log(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal) VALUES (${i}, '${month}', ${year}, ${da}, ${hra}, ${cca}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta}, ${prof_tax}, ${in_tax}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal})`)
                                        mysqldb.query(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal) VALUES (${empID}, '${month}', ${year}, ${da}, ${hra}, ${cca}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta}, ${prof_tax}, ${in_tax}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal})`
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
                                                console.log("i,length is ",i,length)
                                                // if(i===length)
                                                // {
                                                //     mysqldb.query('truncate table lwp_temp')
                                                //     ,(err,result)=>{
                                                //         if (err) {
                                                //             //------------ Invalid registration Number ------------//
                                                //             // req.flash('error_msg',
                                                //             // 'Please enter valid Id.')
                                                //             console.log(err)
                                                //             console.log("invalid update salary 2")
                                                //         }
                                                //         else{
                                                //             console.log("SUCCESS!")
                                                //         }
                                                //     }
                                                        
                                                // }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }

                }
            })
        }
    })
})

router.get('/uploads/:empID',  (req, res) => {
    var requestedTitle = req.params.empID;
     //console.log("the param is", req.params.empID);
 
     mysqldb.query(`select * from Salary natural join Employees`,(err,result)=>
     {
         if (err) {
             //console.log(err);
         }
         else{
             //console.log("Employees Details",JSON.parse(JSON.stringify(result)));
             res.render('templateSelected',{
                 salary:JSON.parse(JSON.stringify(result)),
                 requestedTitle: req.params.empID
                  //added the name field here to get the name wise reciept
             });
         }
     })
    // res.render("templateSelected");
 });

 router.get('/deductions', ensureAuthenticated, (req, res) => 
 {
     mysqldb.query(`select * from config`,(err,result)=>
     {
         if (err) {
             console.log(err);
         }
         else{
             console.log("Config Details",JSON.parse(JSON.stringify(result)));
             res.render('deductions',{
                 data:JSON.parse(JSON.stringify(result))
             });
         }
     })
 
 });

 router.post('/deductions',  (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const {prov_fund_DNA,prov_fund_Percent,prov_fund_Max,prof_tax_Max,prof_tax_Percent,prof_tax_DNA,rev_stamp_max,rev_stamp_DNA}=JSON.parse(JSON.stringify(req.body));
    mysqldb.query(`update config set prov_fund_DNA=${prov_fund_DNA},prov_fund_Percent=${prov_fund_Percent},prov_fund_Max=${prov_fund_Max},prof_tax_Max=${prof_tax_Max},prof_tax_Percent=${prof_tax_Percent},prof_tax_DNA=${prof_tax_DNA},rev_stamp_max=${rev_stamp_max},rev_stamp_DNA=${rev_stamp_DNA} where ID=1`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            
            res.render('index1');
        }
    })
    
});

router.get('/viewdeductions', ensureAuthenticated, (req, res) => 
{
    mysqldb.query(`select * from config`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Config Details",JSON.parse(JSON.stringify(result)));
            res.render('viewdeduction',{
                data:JSON.parse(JSON.stringify(result))
            });
        }
    })

});


 router.post('/deleteEmployee',(req,res)=>{
     console.log("in route")
     console.log(req.body.id)
     mysqldb.query(`delete from Employees where empID=${req.body.id}`,(err,result)=>{
        if (err) {
            //------------ Invalid registration Number ------------//
            // req.flash('error_msg',
            // 'Please enter valid Id.')
            console.log(err)
            res.send({"status":"failure"})
        }
        else{
            res.send(
                {
                    "status":"success"
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


module.exports = router;