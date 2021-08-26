const e = require('connect-flash');
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
                Employees:JSON.parse(JSON.stringify(result))
            });
        }
    })
    
});

router.get('/differences', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('differences',{
                Employees:JSON.parse(JSON.stringify(result))
            });
        }
    })
    
});

router.post('/differences',ensureAuthenticated,(req,res)=>{
    var data=JSON.parse(JSON.stringify(req.body))

})

router.get('/otherdifferences', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            mysqldb.query(`select * from config`,(err,result2)=>
            {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("Employees Details",JSON.parse(JSON.stringify(result)));
                    res.render('otherdifferences',{
                        Employees:JSON.parse(JSON.stringify(result)),
                        config:JSON.parse(JSON.stringify(result2))
                    });
                }
            })
        }
    })
});

router.post('/otherdifferences',ensureAuthenticated,(req,res)=>{
    var data=JSON.parse(JSON.stringify(req.body))
    console.log(data)
    var list2=[]
    for(var i in data)
    {

        if(Number.isInteger(parseInt(i)))
        {
            console.log(i)
            console.log(data[i])
            list2.push(parseInt(i))
        }

    }
    console.log("list is",list2)
    var da_difference=parseFloat(data.newdda)-parseFloat(data.presentdda)
    var hra_difference=parseFloat(data.newhra)-parseFloat(data.presenthra)
    mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var month=mlist[new Date().getMonth()]
    var year=new Date().getFullYear()
    var da_duration=data.monthdda;
    var hra_duration=data.monthhra;
    for(let i = 0; i < list2.length; i++)
    {
        console.log("i is",list2[i])
        mysqldb.query(`insert into da_difference(empID,difference,month,duration,year) VALUES (${list2[i]},${da_difference},'${month}',${da_duration},${year})`,(err,result)=>
        {
            if (err) {
                console.log(err);
            }
            else{
                
            }
        })
        mysqldb.query(`insert into hra_difference(empID,difference,month,duration,year) VALUES (${list2[i]},${hra_difference},'${month}',${hra_duration},${year})`,(err,result)=>
        {
            if (err) {
                console.log(err);
            }
            else{
                
            }
        })
    }

})

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
    const empID=req.params.empID;   
    console.log(JSON.parse(JSON.stringify(req.body)))
    // const length=data["lwp"].length
    var monthNames = [ "january", "february", "march", "april", "may", "june",
"july", "august", "september", "october", "november", "december" ];
    if(data["beforeafter25"]==="after")
    {
        data.month=monthNames[monthNames.indexOf(data.month.toLowerCase())+1]
    }
    // console.log(length)
    // for (let i = 0; i < length; i++) {
        var days;
        if(data["month"].toLowerCase()==="january")
        {
            days=31;
        }
        else if(data["month"].toLowerCase()==="february")
        {
            days=28;
        }
        else if(data["month"].toLowerCase()==="march")
        {
            days=31;
        }
        else if(data["month"].toLowerCase()==="april")
        {
            days=30;
        }
        else if(data["month"].toLowerCase()==="may")
        {
            days=31;
        }
        else if(data["month"].toLowerCase()==="june")
        {
            days=30
        }
        else if(data["month"].toLowerCase()==="july")
        {
            days=31
        }
        else if(data["month"].toLowerCase()==="august")
        {
            days=31
        }
        else if(data["month"].toLowerCase()==="september")
        {
            days=30
        }
        else if(data["month"].toLowerCase()==="october")
        {
            days=31
        }
        else if(data["month"].toLowerCase()==="november")
        {
            days=30
        }
        else if(data["month"].toLowerCase()==="december")
        {
            days=31
        }

        console.log(data["lwp"],data["month"],data["year"],days)
        
        // mysqldb.query(`select empID from Employees ORDER BY empID LIMIT ${i},1`,(err,result)=>{
        //     if (err) {
        //         //------------ Invalid registration Number ------------//
        //         // req.flash('error_msg',
        //         // 'Please enter valid Id.')
        //         console.log(err)
        //     }
        //     else{
        // var empID=JSON.parse(JSON.stringify(result))[0].empID;
        mysqldb.query(`INSERT INTO lwp (empID, month, year, days, lwp) VALUES (${data.empID}, '${data["month"]}', ${data["year"]}, ${days}, ${data["lwp"]}) ON DUPLICATE KEY UPDATE
        lwp=lwp+${data["lwp"]}`
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
        //     }
        // })
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

    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('viewemployee',{
                Employees:JSON.parse(JSON.stringify(result))
            });
        }
    })

});


router.get('/trial', ensureAuthenticated, (req, res) => {
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Employees Details",JSON.parse(JSON.stringify(result)));
            res.render('trial',{
                Employees:JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/showlwp',  (req, res) => {
    //mysqldb.query(`select * from lwp natural join Employees`,(err,result)=>
    mysqldb.query(`select * from lwp natural join Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            mysqldb.query(`select empName,empID from Employees`,(err,result2)=>
            {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                    //var set=new Set(JSON.parse(JSON.stringify(result)))
                    console.log("result2 is",result2)
                    res.render('showlwp',{
                        lwp:JSON.parse(JSON.stringify(result)),
                        name:JSON.parse(JSON.stringify(result2))
                    });
                }
            })
           
        }
    })
    
});

router.get('/templwp',  (req, res) => {
    mysqldb.query(`select * from lwp`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('templwp',{
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
            res.render('index1');
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
    res.redirect('index1');
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
    res.redirect('index1');
});


// ------------ Add Employee Route ------------//
router.post('/addEmployee',(req,res)=>{
    const data=JSON.parse(JSON.stringify(req.body));
    const {empName,uan,dept,designation,pay,gp,pf,bankAccNum,bankName,doj,salaryCategory,emailID,groupInsurance,payBand,branchName,ifscCode,designationCategory}=data;
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log("here")
    console.log(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`)
    mysqldb.query(`INSERT INTO Employees (empName, uan, dept, designation, pay, gp, pf, bankAccNum, bankName, doj, salaryCategory,emailID, groupInsurance,payBand,branchName,ifscCode,designationCategory) VALUES ('${empName}', ${uan}, '${dept}', '${designation}', ${pay}, ${gp}, ${pf}, ${bankAccNum}, '${bankName}', '${doj}', '${salaryCategory}','${emailID}',${groupInsurance},'${payBand}','${branchName}','${ifscCode}','${designationCategory}')`
    ,(err,result)=>{
        if (err) {
            console.log(err);
            console.log("invalid details");
        }
        else{
            // console.log(JSON.parse(JSON.stringify(result))[0])
            res.redirect('/index1')
            // req.flash(
            //     'success_msg',
            //     'Employee found!'
            // );
        }
    })
})

router.get('/groupinsurance', ensureAuthenticated, (req, res) => 
{
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('groupinsurance',{
                Employees:JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.post('/groupinsurance',ensureAuthenticated,(req,res)=>{
    console.log(JSON.parse(JSON.stringify(req.body)))

    const data=JSON.parse(JSON.stringify(req.body));
    // const pay=data["increment"];
    // console.log(JSON.parse(JSON.stringify(req.body)))
    // var list=[];
    var list="(";
    var index="(";
    var IDlist=[]
    var indexList=[]
    for(var i in data)
    {

        if(Number.isInteger(parseInt(i)))
        {
            console.log(i)
            console.log(data[i])
            list+=i.toString()+","
            index+=data[i].toString()+","
            IDlist.push(i)
            indexList.push(data[i])
        }

    }
    // var incrementPercent=parseInt(data["increment"]);
    list=list.substring(0,list.length - 1);
    list+=")";
    index=index.substring(0,index.length - 1);
    index+=")";
    console.log("id list is",IDlist)
    console.log("index list is",indexList)
    console.log("index is",index)

    console.log(data.month)
    // for(var i in indexList)
    for (let i = 0; i < indexList.length; i++)
    {
        console.log(`insert into group_insurance (empID,month,year) VALUES (${IDlist[i]},${data.month[indexList[i]]},${data.year[indexList[i]]})`)
        mysqldb.query(`insert into group_insurance (empID,month,year) VALUES (${IDlist[i]},'${data.month[indexList[i]]}','${data.year[indexList[i]]}')`,(err,result)=>{
            if(err)
            {
                console.log(err)
                console.log("error in insert query from group insurance")
            }
            else
            {
                console.log("group insurance added to table")
            }
        })
    }
    
    res.redirect('index1');
})

router.get('/lateattendance', ensureAuthenticated, (req, res) => 
{
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('lateattendance',{
                salary:JSON.parse(JSON.stringify(result))
            });
        }
    })
});

router.get('/lateattendance/:empID', ensureAuthenticated, (req, res) => 
{
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)
    mysqldb.query(`select * from Employees `,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            mysqldb.query(`select * from Employees where empID=${req.params.empID}`,(err,result2)=>
            {
                if (err) {
                    console.log(err);
                }
                else{
                    // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                    // var set=new Set(JSON.parse(JSON.stringify(result)))
                   console.log("result2 is",result2)
                    res.render('lateattendance',{
                        Employees:JSON.parse(JSON.stringify(result)),
                        name:JSON.parse(JSON.stringify(result2))
                    });
                }
            })
        }
    })
});


router.get('/miscellaneous/:empID', ensureAuthenticated, (req, res) => 
{
    var requestedTitle = req.params.empID;
    console.log(req.params.empID)
    mysqldb.query(`select * from Employees `,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            mysqldb.query(`select * from Employees where empID=${req.params.empID}`,(err,result2)=>
            {
                if (err) {
                    console.log(err);
                }
                else{
                    // console.log("Salary Details",JSON.parse(JSON.stringify(result)));
                    // var set=new Set(JSON.parse(JSON.stringify(result)))
                   console.log("result2 is",result2)
                    res.render('miscellaneous',{
                        Employees:JSON.parse(JSON.stringify(result)),
                        name:JSON.parse(JSON.stringify(result2))
                    });
                }
            })
        }
    })
});


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

router.get('/tempadvances', ensureAuthenticated, (req, res) => 
{
    mysqldb.query(`select * from Employees`,(err,result)=>
    {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Salary Details",JSON.parse(JSON.stringify(result)));
            res.render('tempadvances',{
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
                console.log(`INSERT INTO advance_temp (empID, ,amount, month, year, duration, outstanding) VALUES (${empID}, ${data["amount"][i]}, ${data["month"][i]}, ${data["year"][i]}, ${data["duration"][i]}, ${data["amount"][i]})`)
                mysqldb.query(`INSERT INTO advance_temp (empID, amount, month, year, duration, outstanding) VALUES (${empID}, ${data["amount"][i]}, ${data["month"][i]}, ${data["year"][i]}, ${data["duration"][i]}, ${data["amount"][i]})`
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
    var month=current.getMonth()+1;
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


//to calculate salary
router.post('/generateSalary',(req,res)=>{
    console.log("body is",JSON.parse(JSON.stringify(req.body)))
    var length;
    //to choose config variables from database
    mysqldb.query(`select * from config`,(err,result)=>{
        if (err) {
           
            console.log(err)
            console.log("error while select from config query")
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

            //to get total number of employees
            mysqldb.query(`select count(*) from Employees`,(err,result)=>{
                if (result.length===0) {
                    console.log("no employees")
                }
                else{
                    var ta_temp=ta
                    var cca_temp=cca
                    length=JSON.parse(JSON.stringify(result))[0]['count(*)'];
                    for (let i = 1; i < length+1; i++) {
                        ta_temp=ta;
                        cca_temp=cca
                        console.log("ta temp is ",ta_temp)
                        //to get employee specific properties for calculation
                        mysqldb.query(`select pay,gp,pf,empID from Employees ORDER BY empID LIMIT ${i-1},1`,(err,result)=>{
                            if (err) {
    
                                console.log(err)
                                console.log("error in select query of Employee")
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
                                mysqldb.query(`select * from hra_difference where empID=${empID} and month='${month}' and year=${year}`,(err,result)=>{
                                    if (err) {
                                        
                                        console.log(err)
                                        console.log("invalid select from lwp query")
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
                                            hra_final_difference=(pay+gp)*hra_difference*hra_duration/100
                                        }
                                        mysqldb.query(`select * from da_difference where empID=${empID} and month='${month}' and year=${year}`,(err,result)=>{
                                            if (err) {
                                                
                                                console.log(err)
                                                console.log("invalid select from lwp query")
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
                                                    da_final_difference=(pay+gp)*da_difference*da_duration/100
                                                }
                                               
                                                //variable to calc advances
                                                mysqldb.query(`select * from advance_temp where empID=${empID}`,(err,result)=>{
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
                                                            var adv_month=results.month
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
                                                                    if(adv_month>month_num)
                                                                    {
                                                                        if(year===adv_year+1)
                                                                        {
                                                                            if((adv_month+adv_duration)%12>month_num)
                                                                            {
                                                                                
                                                                                adv_deduction=adv_amount/adv_duration;
                                                                                console.log("advance deducted!",adv_deduction)
                                                                                
                                                                            }
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        if((adv_month+adv_duration)>month_num)
                                                                        {
                                                                            if(year===adv_year)
                                                                            {
                                                                                console.log("advance deducted!",adv_deduction)
                                                                                adv_deduction=adv_amount/adv_duration;
                                                                                console.log(adv_deduction)
                                                                            }
                                                                            
                                                                        }
                                                                    }
                                                                    //independant query
                                                                    mysqldb.query(`update advance_temp set outstanding=outstanding-${adv_deduction} where empID=${empID}`,(err,result)=>{
                                                                        if(err)
                                                                        {
                                                                            console.log(err)
                                                                            console.log("error in advance temp table query")
                                                                        }
                                                                        else
                                                                        {
                                                                            console.log("outstanding updated in advance_temp")
                                                                        }
                                                                        if((adv_outstanding-adv_deduction)===0)
                                                                        {
                                                                            mysqldb.query(`insert into advance (empID,amount,month,year,duration,outstanding) values (${empID},${adv_amount},${adv_month},${adv_year},${adv_duration},${adv_outstanding-adv_deduction})`,(err,result)=>{
                                                                                if(err)
                                                                                {
                                                                                    console.log(err)
                                                                                    console.log("error in advance permanent table query")
                                                                                }
                                                                                else
                                                                                {
                                                                                    mysqldb.query(`delete from advance_temp where empID=${empID}`,(err,result)=>{
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
                                                        mysqldb.query(`select groupInsurance from group_insurance natural join Employees where empID=${empID} and month='${month}' and year=${year}`,(err,result)=>{
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
                                                                console.log("group insurance is",groupInsurance)
                                                                //to get lwp data for calculating part of deduction value
                                                                // console.log(`select days,lwp from lwp where empID=${empID} and month=${month} and year=${year}`);

                                                                mysqldb.query(`select days,lwp from lwp where empID=${empID} and month='${month}' and year=${year}`,(err,result)=>{
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
                                                                        ta_temp=ta;
                                                                        cca_temp=cca;
                                                                        ta_temp*=workedDays/daysOfMonth;
                                                                        cca_temp*=workedDays/daysOfMonth;
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
                                                                        //(15600+6000)*1.03
                                                                        //648 is increment
                                                                        //ceil the increment=650
                                                                        //650 x (da_factor+hra_factor) i.e 1.59=1033.5
                                                                        //increment=1033.5 + 650
                                                                        //x number of months is final difference

                                                                        //get new basic pay, diff calculated on old basic pay.

                                                                    //hra difference ,da change in percent x (pay+gp) on current only.
                                                                        var gross_sal=pay+parseFloat(gp)+parseFloat(da)+parseFloat(hra)+parseFloat(cca_temp)+parseFloat(diff)+parseFloat(ta_temp);
                                                                        console.log("gross salary,days of month,lwp",gross_sal,daysOfMonth,lwp)
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
                                                                        oth_spl+=adv_deduction;
                                                                        oth_spl+=groupInsurance;
                                                                        oth_spl+=hra_final_difference;
                                                                        console.log("hra difference is",hra_final_difference)
                                                                        oth_spl+=da_final_difference;
                                                                        console.log("da difference is",hra_final_difference)
                                                                        var total_ded=parseFloat(pf)+parseFloat(prof_tax)+parseFloat(in_tax)+parseFloat(rev_stmp)+parseFloat(sal_adv)+parseFloat(oth_spl); //+parseFloat(lwp_amt);
                                                                        var net_sal=parseFloat(gross_sal)-parseFloat(total_ded);
                                                                        console.log("logging")

                                                                        //independant query
                                                                        // mysqldb.query(`insert into lwp (empID,month,year,days,lwp) values (${empID},'${month}',${year},${daysOfMonth},${lwp})`,(err,result)=>{
                                                                        //     if(err)
                                                                        //     {
                                                                        //         console.log(err)
                                                                        //         console.log("error in lwp permanent table insert query")
                                                                        //     }
                                                                        //     else
                                                                        //     {
                                                                        //         mysqldb.query(`delete from lwp_temp where empID=${empID}`,(err,result)=>{
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
                                                                        console.log(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal) VALUES (${i}, '${month}', ${year}, ${da}, ${hra}, ${cca}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta}, ${prof_tax}, ${in_tax}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal})`)
                                                                        mysqldb.query(`INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal) VALUES (${empID}, '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${in_tax}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal})`
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
                                                })
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
    // res.redirect('showsalary')
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
 router.get('/lwp/:empID',  (req, res) => {
    var requestedTitle = req.params.empID;
     //console.log("the param is", req.params.empID);
     const data=JSON.parse(JSON.stringify(req.params));
     mysqldb.query(`select * from Employees where empID=${requestedTitle}`,(err,result)=>
     {
         if (err) {
             console.log(err);
         }
         else{
             console.log("Employees Details",JSON.parse(JSON.stringify(result)));
             res.render('templwp-2',{
                 Employees:JSON.parse(JSON.stringify(result))
            });
         }
     })
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
     const data=JSON.parse(JSON.stringify(req.params));
     mysqldb.query(`select * from Employees`,(err,result)=>
     {
         if (err) {
             console.log(err);
         }
         else{
             console.log("Employees Details",JSON.parse(JSON.stringify(result)));
             res.render('templwp',{
                 Employees:JSON.parse(JSON.stringify(result)),
                 requestedTitle: req.params.empID
            });
         }
     })
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


 router.post('/lateattendance', ensureAuthenticated, (req, res) => {
    const data=JSON.parse(JSON.stringify(req.body));
    const empID=req.params.empID;   
    console.log(JSON.parse(JSON.stringify(req.body)))
    // const length=data["lwp"].length
    var monthNames = [ "january", "february", "march", "april", "may", "june",
"july", "august", "september", "october", "november", "december" ];
            var prev=data.month;
            prev=monthNames[monthNames.indexOf(prev.toLowerCase())-1]
    // console.log(length)
    // for (let i = 0; i < length; i++) {
        var prevdays;
        console.log("prev" ,prev)
        if(prev.toLowerCase()==="january")
        {
            prevdays=31;
        }
        else if(prev.toLowerCase()==="february")
        {
            prevdays=28;
        }
        else if(prev.toLowerCase()==="march")
        {
            prevdays=31;
        }
        else if(prev.toLowerCase()==="april")
        {
            prevdays=30;
        }
        else if(prev.toLowerCase()==="may")
        {
            prevdays=31;
        }
        else if(prev.toLowerCase()==="june")
        {
            prevdays=30
        }
        else if(prev.toLowerCase()==="july")
        {
            prevdays=31
        }
        else if(prev.toLowerCase()==="august")
        {
            prevdays=31
        }
        else if(prev.toLowerCase()==="september")
        {
            prevdays=30
        }
        else if(prev.toLowerCase()==="october")
        {
            prevdays=31
        }
        else if(prev.toLowerCase()==="november")
        {
            prevdays=30
        }
        else if(prev.toLowerCase()==="december")
        {
            prevdays=31
        }

        // console.log(data["lwp"],data["month"],data["year"],days)
        // console.log(`INSERT INTO late_attendance (empID, empName, latedays,month, year, days) VALUES (${data.empID}, '${data.empName}', ${data.latedays}, '${data["month"]}', ${data["year"]}, ${days})`)
        mysqldb.query(`INSERT INTO late_attendance (empID, empName, latedays,month, year, prevdays) VALUES (${data.empID}, '${data.empName}', ${data.latedays}, '${data["month"]}', ${data["year"]}, ${prevdays})`,(err,result)=>{
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
        //     }
        // })
    res.redirect('index1');
});


router.post('/miscellaneous', ensureAuthenticated, (req, res) => {
    const data=JSON.parse(JSON.stringify(req.body));
    const empID=req.params.empID;   
    console.log(JSON.parse(JSON.stringify(req.body)))
    // const length=data["lwp"].length
    var monthNames = [ "january", "february", "march", "april", "may", "june",
"july", "august", "september", "october", "november", "december" ];
           

        // console.log(data["lwp"],data["month"],data["year"],days)
        // console.log(`INSERT INTO late_attendance (empID, empName, latedays,month, year, days) VALUES (${data.empID}, '${data.empName}', ${data.latedays}, '${data["month"]}', ${data["year"]}, ${days})`)
        mysqldb.query(`INSERT INTO miscellaneous (empID, empName, miscellaneous_amt,month, year) VALUES (${data.empID}, '${data.empName}', ${data.amt}, '${data["month"]}', ${data["year"]})`,(err,result)=>{
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
        //     }
        // })
    res.redirect('index1');
});



module.exports = router;