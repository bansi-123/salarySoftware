router.post("/generateSalary", (req, res) => {
    console.log("body is", JSON.parse(JSON.stringify(req.body)));
    var length;
  
    function calculateSalary(item, i, callback) {
      //to choose config variables from database
      mysqldb.query(`select * from config`, (err, result) => {
        if (err) {
          console.log(err);
          console.log("error while select from config query");
        } else {
          // var da_MultFactor=JSON.parse(JSON.stringify(result))[0].da_MultFactor
          // var hra_MultFactor=JSON.parse(JSON.stringify(result))[0].hra_MultFactor
          // var ta=JSON.parse(JSON.stringify(result))[0].ta
          // var cca=JSON.parse(JSON.stringify(result))[0].cca
          var prov_fund_DNA = JSON.parse(JSON.stringify(result))[0].prov_fund_DNA;
          var prov_fund_Percent = JSON.parse(JSON.stringify(result))[0]
            .prov_fund_Percent;
          var prov_fund_Max = JSON.parse(JSON.stringify(result))[0].prov_fund_Max;
          var prof_tax_DNA = JSON.parse(JSON.stringify(result))[0].prof_tax_DNA;
          var prof_tax_Percent = JSON.parse(JSON.stringify(result))[0]
            .prof_tax_Percent;
          var prof_tax_Max = JSON.parse(JSON.stringify(result))[0].prof_tax_Max;
          var rev_stamp_DNA = JSON.parse(JSON.stringify(result))[0].rev_stamp_DNA;
          var rev_stamp_max = JSON.parse(JSON.stringify(result))[0].rev_stamp_max;
  
          // for (let i = 1; i < length+1; i++) {
  
          //to get employee specific properties for calculation
          mysqldb.query(
            `select pay,gp,pf,empID,ta,cca,hra,da from Employees ORDER BY empID LIMIT ${i},1`,
            (err, result) => {
              if (err) {
                console.log(err);
                console.log("error in select query of Employee");
              } else {
                console.log(result);
                var empID = JSON.parse(JSON.stringify(result))[0].empID;
                var gp = parseInt(JSON.parse(JSON.stringify(result))[0].gp);
                var pf = parseInt(JSON.parse(JSON.stringify(result))[0].pf);
                var pay = parseInt(JSON.parse(JSON.stringify(result))[0].pay);
                var ta_temp = parseInt(JSON.parse(JSON.stringify(result))[0].ta);
                var cca_temp = parseInt(
                  JSON.parse(JSON.stringify(result))[0].cca
                );
                var da_MultFactor = parseFloat(
                  JSON.parse(JSON.stringify(result))[0].da
                );
                var hra_MultFactor = parseFloat(
                  JSON.parse(JSON.stringify(result))[0].hra
                );
  
                console.log(JSON.parse(JSON.stringify(result))[0]);
                console.log(
                  "gp,pf,bp,da,hra selected for empid",
                  gp,
                  pf,
                  pay,
                  da_MultFactor,
                  hra_MultFactor,
                  empID
                );
  
                var diff = 0;
                var oth_spl = 0;
                var adv_deduction = 0;
                var prof_tax;
                var in_tax = 3000;
                var rev_stmp = 1;
                var sal_adv = 0;
                var da = (pay + parseFloat(gp)) * da_MultFactor;
                console.log("da is", da);
                var hra = (pay + parseFloat(gp)) * hra_MultFactor;
                console.log("hra is", hra);
  
                var month = JSON.parse(
                  JSON.stringify(req.body)
                ).month.toLowerCase();
                var year = parseInt(JSON.parse(JSON.stringify(req.body)).year);
  
                //to calculate hra_dda_differences
                mysqldb.query(
                  `select * from hra_difference where empID='${empID}' and month='${month}' and year=${year}`,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      console.log("invalid select from hra_difference query");
                    } else {
                      var hra_final_difference = 0;
                      if (result.length === 0) {} else {
                        var data = JSON.parse(JSON.stringify(result))[0];
                        console.log("Data is", data);
                        var hra_difference = data.difference;
                        var hra_duration = data.duration;
                        var monthNames = [
                          "january",
                          "february",
                          "march",
                          "april",
                          "may",
                          "june",
                          "july",
                          "august",
                          "september",
                          "october",
                          "november",
                          "december",
                        ];
                        // for(let j=1;j<duration+1;j++)
                        function hraLoop(item, j, callback) {
                          var temp_month =
                            monthNames[
                              monthNames.indexOf(data.month.toLowerCase()) - j - 1
                            ].toLowerCase();
  
                          mysqldb.query(
                            `select bp,gp from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,
                            (err, result) => {
                              if (err) {
                                console.log(err);
                                console.log("for loop error for hra difference");
                              } else {
                                if (result.length === 0) {
                                  console.log(
                                    "hra difference is not calculated for month",
                                    month,
                                    "for empID",
                                    empID
                                  );
                                } else {
                                  var data = JSON.parse(
                                    JSON.stringify(result)
                                  )[0];
                                  hra_final_difference +=
                                    (data.bp + data.gp) * hra_difference;
                                }
                              }
                            }
                          );
                        }
                        var hraArray = [];
                        for (let i = 1; i < hra_duration + 1; i++) {
                          hraArray.push(i);
                        }
                        async.forEachOf(hraArray, hraLoop, function (err) {
                          if (err) {
                            console.error(err);
                          } else {
                            console.log(
                              "Done with hra difference for empid",
                              empID
                            );
                          }
                        });
                        // hra_final_difference=(pay+gp)*hra_difference*hra_duration/100
                        // hra_final_difference=(pay+gp)*hra_difference*hra_duration
                      }
                      mysqldb.query(
                        `select * from da_difference where empID='${empID}' and month='${month}' and year=${year}`,
                        (err, result) => {
                          if (err) {
                            console.log(err);
                            console.log("invalid select from d_difference query");
                          } else {
                            var da_final_difference = 0;
                            if (result.length === 0) {} else {
                              var data = JSON.parse(JSON.stringify(result))[0];
                              var da_difference = data.difference;
                              var da_duration = data.duration;
                              var monthNames = [
                                "january",
                                "february",
                                "march",
                                "april",
                                "may",
                                "june",
                                "july",
                                "august",
                                "september",
                                "october",
                                "november",
                                "december",
                              ];
                              // for(let j=1;j<duration+1;j++)
                              function daLoop(item, k, callback) {
                                var temp_month =
                                  monthNames[
                                    monthNames.indexOf(data.month.toLowerCase()) -
                                    k -
                                    1
                                  ].toLowerCase();
  
                                mysqldb.query(
                                  `select bp,gp from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,
                                  (err, result) => {
                                    if (err) {
                                      console.log(err);
                                      console.log(
                                        "for loop error for da difference"
                                      );
                                    } else {
                                      if (result.length === 0) {} else {
                                        var data = JSON.parse(
                                          JSON.stringify(result)
                                        )[0];
                                        da_final_difference +=
                                          (data.bp + data.gp) * da_difference;
                                      }
                                    }
                                  }
                                );
                              }
                              var daArray = [];
                              for (let i = 1; i < da_duration + 1; i++) {
                                daArray.push(i);
                              }
                              async.forEachOf(daArray, daLoop, function (err) {
                                if (err) {
                                  console.error(err);
                                } else {
                                  console.log(
                                    "Done with da difference for empid",
                                    empID
                                  );
                                }
                              });
  
                              // da_final_difference=(pay+gp)*da_difference*da_duration/100
                              // da_final_difference=(pay+gp)*da_difference*da_duration
                            }
  
                            //variable to calc advances
                            mysqldb.query(
                              `select * from advance_temp where empID='${empID}'`,
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                  console.log(
                                    "error in select from advance_temp query"
                                  );
                                } else {
                                  console.log(
                                    "results after advance temp is",
                                    result
                                  );
  
                                  var month_num = 0;
                                  var days;
                                  if (month.toLowerCase() === "january") {
                                    days = 31;
                                    month_num = 1;
                                  } else if (month.toLowerCase() === "february") {
                                    if (
                                      (0 == year % 4 && 0 != year % 100) ||
                                      0 == year % 400
                                    ) {
                                      days = 29;
                                    } else {
                                      days = 28;
                                    }
  
                                    month_num = 2;
                                  } else if (month.toLowerCase() === "march") {
                                    days = 31;
                                    month_num = 3;
                                  } else if (month.toLowerCase() === "april") {
                                    days = 30;
                                    month_num = 4;
                                  } else if (month.toLowerCase() === "may") {
                                    days = 31;
                                    month_num = 5;
                                  } else if (month.toLowerCase() === "june") {
                                    days = 30;
                                    month_num = 6;
                                  } else if (month.toLowerCase() === "july") {
                                    days = 31;
                                    month_num = 7;
                                  } else if (month.toLowerCase() === "august") {
                                    days = 31;
                                    month_num = 8;
                                  } else if (
                                    month.toLowerCase() === "september"
                                  ) {
                                    days = 30;
                                    month_num = 9;
                                  } else if (month.toLowerCase() === "october") {
                                    days = 31;
                                    month_num = 10;
                                  } else if (month.toLowerCase() === "november") {
                                    days = 30;
                                    month_num = 11;
                                  } else if (month.toLowerCase() === "december") {
                                    days = 31;
                                    month_num = 12;
                                  }
                                  if (
                                    JSON.parse(
                                      JSON.stringify(result.length === 0)
                                    )
                                  ) {} else {
                                    var results = JSON.parse(
                                      JSON.stringify(result)
                                    )[0];
                                    console.log(
                                      "in else of advance, results is",
                                      results
                                    );
                                    var adv_amount = results.amount;
  
                                    var monthNames = [
                                      "january",
                                      "february",
                                      "march",
                                      "april",
                                      "may",
                                      "june",
                                      "july",
                                      "august",
                                      "september",
                                      "october",
                                      "november",
                                      "december",
                                    ];
  
                                    var adv_month = monthNames.indexOf(
                                      results.month.toLowerCase()
                                    );
                                    var adv_year = results.year;
                                    var adv_duration = results.duration;
                                    var adv_outstanding = results.outstanding;
  
                                    console.log(
                                      "year,month in advanced",
                                      year,
                                      month_num
                                    );
                                    console.log(
                                      "adv_year,adv_month,adv_duration is",
                                      adv_year,
                                      adv_month,
                                      adv_duration
                                    );
                                    if (year >= adv_year) {
                                      // var curr_month=new Date().getMonth()+1
                                      // if(month_num>=adv_month)
                                      // {
                                      //if duration isn't over yet
                                      var extra = 0;
                                      if (adv_month > month_num - 1) {
                                        if (year === adv_year + 1) {
                                          if (
                                            (adv_month + adv_duration) % 12 >
                                            month_num - 1
                                          ) {
                                            if (adv_month == month_num - 1) {
                                              extra = adv_amount % adv_duration;
                                            }
                                            adv_deduction =
                                              Math.floor(
                                                adv_amount / adv_duration
                                              ) + extra;
                                            console.log(
                                              "advance deducted!",
                                              adv_deduction,
                                              "for empID",
                                              empID
                                            );
                                          }
                                        }
                                      } else {
                                        if (
                                          adv_month + adv_duration >
                                          month_num - 1
                                        ) {
                                          if (year === adv_year) {
                                            if (adv_month == month_num - 1) {
                                              extra = adv_amount % adv_duration;
                                            }
                                            adv_deduction =
                                              Math.floor(
                                                adv_amount / adv_duration
                                              ) + extra;
                                            console.log(
                                              "advance deducted!",
                                              adv_deduction,
                                              "for empID",
                                              empID
                                            );
                                          }
                                        }
                                      }
                                      //independant query
                                      mysqldb.query(
                                        `update advance_temp set outstanding=outstanding-${adv_deduction} where empID='${empID}'`,
                                        (err, result) => {
                                          if (err) {
                                            console.log(err);
                                            console.log(
                                              "error in advance temp table query"
                                            );
                                          } else {
                                            console.log(
                                              "outstanding updated in advance_temp"
                                            );
                                          }
                                          if (
                                            parseInt(
                                              adv_outstanding - adv_deduction
                                            ) === 0
                                          ) {
                                            mysqldb.query(
                                              `insert into advance (empID,amount,month,year,duration,outstanding) values ('${empID}',${adv_amount},${adv_month},${adv_year},${adv_duration},${
                                                adv_outstanding - adv_deduction
                                              })`,
                                              (err, result) => {
                                                if (err) {
                                                  console.log(err);
                                                  console.log(
                                                    "error in advance permanent table query"
                                                  );
                                                } else {
                                                  mysqldb.query(
                                                    `delete from advance_temp where empID='${empID}'`,
                                                    (err, result) => {
                                                      if (err) {
                                                        console.log(err);
                                                        console.log(
                                                          "error in deletion of advance temp table query"
                                                        );
                                                      } else {}
                                                    }
                                                  );
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
  
                                      // }
                                    }
                                  }
  
                                  var groupInsurance = 0;
                                  mysqldb.query(
                                    `select groupInsurance from group_insurance natural join Employees where Employees.empID='${empID}' and month='${month}' and year=${year}`,
                                    (err, result) => {
                                      if (err) {
                                        console.log(err);
                                        console.log(
                                          "error in groupinsurance table read query"
                                        );
                                      } else {
                                        console.log(
                                          "group insurance read result",
                                          result
                                        );
  
                                        if (result.length === 0) {} else {
                                          groupInsurance += JSON.parse(
                                            JSON.stringify(result)
                                          )[0].groupInsurance;
                                        }
                                        console.log(
                                          "group insurance is",
                                          groupInsurance,
                                          "for empID",
                                          empID
                                        );
                                        //to get lwp data for calculating part of deduction value
                                        // console.log(`select days,lwp from lwp where empID='${empID}' and month=${month} and year=${year}`);
  
                                        mysqldb.query(
                                          `select lwp.days as days,IFNULL(lwp.lwp,0) as lwp,IFNULL(late.latedays,0) as latedays
                                          from lwp lwp left outer join late_attendance late on (lwp.empID=late.empID) 
                                          where lwp.empID="${empID}" and lwp.year=${year} and lwp.month="${month}"
                                           union all select lwp.days as days,IFNULL(lwp.lwp,0) as lwp,IFNULL(late.latedays,0) as latedays 
                                           from late_attendance late left outer join lwp lwp on (late.empID=lwp.empID) 
                                           where late.empID="${empID}" and late.year=${year} and late.month="${month}"`,
                                          (err, result) => {
                                            if (err) {
                                              console.log(err);
                                              console.log(
                                                "invalid select from lwp query"
                                              );
                                            } else {
                                              // var month=JSON.parse(JSON.stringify(req.body)).month
                                              // var year=JSON.parse(JSON.stringify(req.body)).year
                                              // var days;
                                              var lwp = 0;
                                              var late_days = 0;
                                              if (result.length === 0) {} else {
                                                console.log(
                                                  "RESULT FOR LWPPP",
                                                  JSON.parse(
                                                    JSON.stringify(result)
                                                  )
                                                );
                                                lwp = JSON.parse(
                                                  JSON.stringify(result)
                                                )[0].lwp;
                                                late_days = JSON.parse(
                                                  JSON.stringify(result)
                                                )[0].latedays;
                                                // lwp+=late_days;
                                              }
  
                                              var daysOfMonth = days;
                                              console.log("days are", days);
  
                                              var workedDays =
                                                daysOfMonth - lwp - late_days;
                                              var original_pay = pay;
                                              var original_gp = gp;
                                              pay *= workedDays / daysOfMonth;
                                              gp *= workedDays / daysOfMonth;
                                              da *= workedDays / daysOfMonth;
                                              hra *= workedDays / daysOfMonth;
                                              // ta_temp=ta;
                                              // cca_temp=cca;
                                              ta_temp *= workedDays / daysOfMonth;
                                              cca_temp *=
                                                workedDays / daysOfMonth;
                                              console.log(
                                                "TA,cca ISSS",
                                                ta_temp,
                                                cca_temp
                                              );
                                              console.log(
                                                "pay,gp,da,hra,ta_temp,cca_temp 1",
                                                pay,
                                                gp,
                                                da,
                                                hra,
                                                ta_temp,
                                                cca_temp,
                                                "for empID",
                                                empID
                                              );
  
                                              var pfcheck =
                                                (prov_fund_Percent / 100) *
                                                (pay + gp + da);
                                              if (pf > pfcheck) {
                                                pf = pfcheck;
                                              }
                                              if (pf > prov_fund_Max) {
                                                pf = prov_fund_Max;
                                              }
                                              if (pf < prov_fund_DNA) {
                                                pf = 0;
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
  
                                              // oth_spl+=parseInt(adv_deduction);
                                              oth_spl += parseInt(groupInsurance);
                                              diff +=
                                                parseInt(hra_final_difference);
                                              console.log(
                                                "pay,gp,da,hra,ta_temp,cca_temp 2",
                                                pay,
                                                gp,
                                                da,
                                                hra,
                                                ta_temp,
                                                cca_temp,
                                                "for empID",
                                                empID
                                              );
  
                                              console.log(
                                                "hra difference is",
                                                hra_final_difference,
                                                "for empID",
                                                empID
                                              );
                                              diff +=
                                                parseInt(da_final_difference);
                                              console.log(
                                                "da difference is",
                                                da_final_difference,
                                                "for empID",
                                                empID
                                              );
  
                                              console.log("logging");
                                              var gross_sal =
                                                pay +
                                                parseFloat(gp) +
                                                parseFloat(da) +
                                                parseFloat(hra) +
                                                parseFloat(cca_temp) +
                                                parseFloat(diff) +
                                                parseFloat(ta_temp);
                                              console.log(
                                                "gross salary,days of month,lwp are",
                                                gross_sal,
                                                daysOfMonth,
                                                lwp,
                                                "for empID",
                                                empID
                                              );
  
                                              if (gross_sal > 10000) {
                                                prof_tax = 200;
                                              } else if (
                                                gross_sal > 7500 &&
                                                gross_sal < 10000
                                              ) {
                                                prof_tax = 175;
                                              } else if (gross_sal < 7500) {
                                                prof_tax = 0;
                                              }
  
                                              if (prof_tax > prof_tax_Max) {
                                                prof_tax = prof_tax_Max;
                                              }
                                              if (prof_tax < prof_tax_DNA) {
                                                prof_tax = 0;
                                              }
                                              if (gross_sal < rev_stamp_DNA) {
                                                rev_stmp = 0;
                                              }
                                              if (rev_stmp > rev_stamp_max) {
                                                rev_stmp = rev_stamp_max;
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
  
                                              console.log(
                                                "pay,gp,da,hra,ta_temp,cca_temp 3",
                                                pay,
                                                gp,
                                                da,
                                                hra,
                                                ta_temp,
                                                cca_temp,
                                                "for empID",
                                                empID
                                              );
                                              mysqldb.query(
                                                `select * from miscellaneous where empID='${empID}' and month='${month}' and year=${year}`,
                                                (err, result) => {
                                                  if (err) {
                                                    console.log(err);
                                                    console.log(
                                                      "error while selecting from miscellaneous table"
                                                    );
                                                  } else {
                                                    var miscellaneous_deduction = 0;
                                                    if (result.length === 0) {} else {
                                                      var data = JSON.parse(
                                                        JSON.stringify(result)
                                                      )[0];
                                                      miscellaneous_deduction =
                                                        data.miscellaneous_amt;
                                                    }
                                                    oth_spl += parseInt(
                                                      miscellaneous_deduction
                                                    );
                                                    console.log(
                                                      "pay,gp,da,hra,ta_temp,cca_temp 4",
                                                      pay,
                                                      gp,
                                                      da,
                                                      hra,
                                                      ta_temp,
                                                      cca_temp,
                                                      "for empID",
                                                      empID
                                                    );
  
                                                    console.log(
                                                      "miscellaneous deductions is",
                                                      miscellaneous_deduction,
                                                      "for empID",
                                                      empID
                                                    );
  
                                                    mysqldb.query(
                                                      `select * from increment_difference where empID='${empID}' and month='${month}' and year=${year}`,
                                                      (err, result) => {
                                                        if (err) {
                                                          console.log(err);
                                                          console.log(
                                                            "error while calculating from increment difference table,select query"
                                                          );
                                                        } else {
                                                          if (
                                                            result.length == 0
                                                          ) {
                                                            console.log(
                                                              "for empid",
                                                              empID,
                                                              "not found in increment difference",
                                                              month,
                                                              year
                                                            );
                                                          } else {
                                                            var durationIncrement =
                                                              JSON.parse(
                                                                JSON.stringify(
                                                                  result
                                                                )
                                                              )[0].duration;
                                                            var startMonth = JSON.parse(JSON.stringify(result))[0].start_month;
                                                            var startYear = JSON.parse(JSON.stringify(result))[0].start_year;
                                                            var monthNames = [
                                                              "january",
                                                              "february",
                                                              "march",
                                                              "april",
                                                              "may",
                                                              "june",
                                                              "july",
                                                              "august",
                                                              "september",
                                                              "october",
                                                              "november",
                                                              "december",
                                                            ];
                                                            // for(let j=1;j<duration+1;j++)
                                                            //take latest increment value
                                                            mysqldb.query(
                                                              `select * from increment where empID='${empID}' order by year desc,month desc limit 1`,
                                                              (err, result) => {
                                                                if (err) {
                                                                  console.log(
                                                                    err
                                                                  );
                                                                  console.log(
                                                                    "error while calculating from increment table,select query"
                                                                  );
                                                                } else {
                                                                  var finalIncrement = 0;
                                                                  if (
                                                                    result.length ===
                                                                    0
                                                                  ) {
                                                                    console.log(
                                                                      "no prior increment history"
                                                                    );
                                                                  } else {
                                                                    var increment =
                                                                      JSON.parse(
                                                                        JSON.stringify(
                                                                          result
                                                                        )
                                                                      )[0]
                                                                      .increment;
                                                                    var prevPay =
                                                                      JSON.parse(
                                                                        JSON.stringify(
                                                                          result
                                                                        )
                                                                      )[0]
                                                                      .prevPay;
  
                                                                    function incrementLoop(
                                                                      item,
                                                                      j,
                                                                      callback
                                                                    ) {
                                                                      //var temp_month = monthNames[monthNames.indexOf(month.toLowerCase()) - j - 1].toLowerCase();
                                                                      var indexUsed = (monthNames.indexOf(startMonth) + j);
  
                                                                      var temp_month = monthNames[indexUsed % 12].toLowerCase();
                                                                      var temp_year;
                                                                      if (indexUsed >= 12) {
                                                                        temp_year = startYear + 1;
                                                                      } else {
                                                                        temp_year = startYear;
                                                                      }
  
  
  
  
                                                                      mysqldb.query(
                                                                        `select workedDays,daysOfMonth from Salary where empID='${empID}' and month='${temp_month}' and year=${temp_year}`,
                                                                        (
                                                                          err,
                                                                          result
                                                                        ) => {
                                                                          if (
                                                                            err
                                                                          ) {
                                                                            console.log(
                                                                              err
                                                                            );
                                                                            console.log(
                                                                              "for loop error for increment difference"
                                                                            );
                                                                          } else {
                                                                            if (
                                                                              result.length === 0
                                                                            ) {
                                                                              console.log(
                                                                                "not found for month",
                                                                                temp_month,
                                                                                "for empId",
                                                                                empID
                                                                              );
                                                                            } else {
                                                                              var data =
                                                                                JSON.parse(
                                                                                  JSON.stringify(
                                                                                    result
                                                                                  )
                                                                                )[0];
                                                                              var workedDays =
                                                                                data.workedDays;
                                                                              var daysOfMonth =
                                                                                data.daysOfMonth;
                                                                              var incrementvalue =
                                                                                (prevPay +
                                                                                  original_gp) *
                                                                                (increment /
                                                                                  100);
                                                                              if (
                                                                                Math.floor(
                                                                                  incrementvalue
                                                                                ) %
                                                                                10 ===
                                                                                0
                                                                              ) {} else {
                                                                                incrementvalue =
                                                                                  Math.ceil(
                                                                                    incrementvalue /
                                                                                    10
                                                                                  ) *
                                                                                  10;
                                                                              }
                                                                              incrementvalue *=
                                                                                workedDays /
                                                                                daysOfMonth;
                                                                              var toAddValue =
                                                                                (hra_MultFactor +
                                                                                  da_MultFactor) *
                                                                                incrementvalue;
                                                                              finalIncrement =
                                                                                Math.ceil(
                                                                                  toAddValue +
                                                                                  incrementvalue
                                                                                );
                                                                              diff +=
                                                                                parseInt(
                                                                                  finalIncrement
                                                                                );
                                                                              console.log(
                                                                                "calculated increment difference for empID",
                                                                                empID,
                                                                                "for month",
                                                                                temp_month
                                                                              );
                                                                            }
                                                                          }
                                                                        }
                                                                      );
                                                                    }
                                                                    var incrementArray = [];
                                                                    for (
                                                                      let i = 1; i <
                                                                      durationIncrement +
                                                                      1; i++
                                                                    ) {
                                                                      incrementArray.push(
                                                                        i
                                                                      );
                                                                    }
                                                                    async.forEachOf(
                                                                      incrementArray,
                                                                      incrementLoop,
                                                                      function (
                                                                        err
                                                                      ) {
                                                                        if (err) {
                                                                          console.error(
                                                                            err
                                                                          );
                                                                        } else {}
                                                                      }
                                                                    );
  
                                                                    // var durationIncrement=JSON.parse(JSON.stringify())
                                                                    console.log(
                                                                      "increment difference is ",
                                                                      finalIncrement,
                                                                      "for empID",
                                                                      empID
                                                                    );
                                                                    console.log(
                                                                      "pay,gp,da,hra,ta_temp,cca_temp 5",
                                                                      pay,
                                                                      gp,
                                                                      da,
                                                                      hra,
                                                                      ta_temp,
                                                                      cca_temp,
                                                                      "for empID",
                                                                      empID
                                                                    );
                                                                  }
                                                                }
                                                              }
                                                            );
                                                          }
                                                          mysqldb.query(
                                                            `select * from donation where empID='${empID}'`,
                                                            (err, result) => {
                                                              if (err) {
                                                                console.log(err);
                                                                console.log(
                                                                  "error while selecting from donation table"
                                                                );
                                                              } else {
                                                                if (
                                                                  result.length ===
                                                                  0
                                                                ) {
                                                                  console.log(
                                                                    "no donations for employee with empID",
                                                                    empID
                                                                  );
                                                                } else {
                                                                  var donationDays =
                                                                    JSON.parse(
                                                                      JSON.stringify(
                                                                        result
                                                                      )
                                                                    )[0]
                                                                    .donationDays;
                                                                  var amount =
                                                                    (gross_sal /
                                                                      daysOfMonth) *
                                                                    donationDays;
                                                                  oth_spl +=
                                                                    parseInt(
                                                                      amount
                                                                    );
                                                                  console.log(
                                                                    "donation amount is ",
                                                                    amount,
                                                                    "for empID ",
                                                                    empID
                                                                  );
                                                                }
                                                                mysqldb.query(
                                                                  `select * from recovery where empID='${empID}' and month='${month}' and year=${year}`,
                                                                  (
                                                                    err,
                                                                    result
                                                                  ) => {
                                                                    if (err) {
                                                                      console.log(
                                                                        err
                                                                      );
                                                                      console.log(
                                                                        "error while selecting from recovery table"
                                                                      );
                                                                    } else {
                                                                      if (
                                                                        result.length ===
                                                                        0
                                                                      ) {
                                                                        console.log(
                                                                          "no recovery for employee with empID",
                                                                          empID
                                                                        );
                                                                      } else {
                                                                        var recovery =
                                                                          JSON.parse(
                                                                            JSON.stringify(
                                                                              result
                                                                            )
                                                                          )[0]
                                                                          .recoveryAmount;
  
                                                                        oth_spl +=
                                                                          parseInt(
                                                                            recovery
                                                                          );
                                                                        console.log(
                                                                          "recovery amount is ",
                                                                          recovery,
                                                                          "for empID ",
                                                                          empID
                                                                        );
                                                                        console.log(
                                                                          "pay,gp,da,hra,ta_temp,cca_temp 6",
                                                                          pay,
                                                                          gp,
                                                                          da,
                                                                          hra,
                                                                          ta_temp,
                                                                          cca_temp,
                                                                          "for empID",
                                                                          empID
                                                                        );
                                                                      }
                                                                      mysqldb.query(
                                                                        `select * from income_tax where empID='${empID}' ORDER BY STR_TO_DATE(CONCAT(year, month, ' 01'), '%Y %M %d') desc limit 1`,
                                                                        (
                                                                          err,
                                                                          result
                                                                        ) => {
                                                                          if (
                                                                            err
                                                                          ) {
                                                                            console.log(
                                                                              err
                                                                            );
                                                                            console.log(
                                                                              "error while selecting from income_tax table"
                                                                            );
                                                                          } else {
                                                                            var tds = 0;
                                                                            if (
                                                                              result.length ===
                                                                              0
                                                                            ) {
                                                                              console.log(
                                                                                "pay,gp,da,hra,ta_temp,cca_temp 7",
                                                                                pay,
                                                                                gp,
                                                                                da,
                                                                                hra,
                                                                                ta_temp,
                                                                                cca_temp,
                                                                                "for empID",
                                                                                empID
                                                                              );
  
                                                                              console.log(
                                                                                "no income_tax for employee with empID",
                                                                                empID
                                                                              );
                                                                            } else {
                                                                              tds =
                                                                                JSON.parse(
                                                                                  JSON.stringify(
                                                                                    result
                                                                                  )
                                                                                )[0]
                                                                                .tds_per_month;
  
                                                                              // oth_spl+=tds
                                                                              console.log(
                                                                                "tds is ",
                                                                                tds,
                                                                                "for empID ",
                                                                                empID
                                                                              );
                                                                              //independant query
                                                                              mysqldb.query(
                                                                                `update income_tax set balance=balance-tds_per_month where empID='${empID}' and month='${month}' and year=${year}`,
                                                                                (
                                                                                  err,
                                                                                  result
                                                                                ) => {
                                                                                  if (
                                                                                    err
                                                                                  ) {
                                                                                    console.log(
                                                                                      err
                                                                                    );
                                                                                    console.log(
                                                                                      "error while updating income_tax table"
                                                                                    );
                                                                                  } else {
                                                                                    console.log(
                                                                                      "updated balance in income_tax table for empID",
                                                                                      empID
                                                                                    );
                                                                                  }
                                                                                }
                                                                              );
                                                                            }
                                                                            var total_ded =
                                                                              parseFloat(
                                                                                pf
                                                                              ) +
                                                                              parseFloat(
                                                                                prof_tax
                                                                              ) +
                                                                              parseFloat(
                                                                                rev_stmp
                                                                              ) +
                                                                              parseFloat(
                                                                                oth_spl
                                                                              ) +
                                                                              tds; //+parseFloat(lwp_amt);
                                                                            var net_sal =
                                                                              parseFloat(
                                                                                gross_sal
                                                                              ) -
                                                                              parseFloat(
                                                                                total_ded
                                                                              );
  
                                                                            console.log(
                                                                              "pay,gp,da,hra,ta_temp,cca_temp 8    ",
                                                                              pay,
                                                                              gp,
                                                                              da,
                                                                              hra,
                                                                              ta_temp,
                                                                              cca_temp,
                                                                              "for empID",
                                                                              empID
                                                                            );
  
                                                                            console.log(
                                                                              `INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,original_pay,bp,original_gp,gp,pf,other_deductions) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${tds}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${original_pay},${pay},${original_gp},${gp},${pf},${oth_spl})`
                                                                            );
                                                                            mysqldb.query(
                                                                              `INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,original_pay,bp,original_gp,gp,pf,other_deductions,advance) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${tds}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${original_pay},${pay},${original_gp},${gp},${pf},${oth_spl},${adv_deduction})`,
                                                                              (
                                                                                err,
                                                                                result
                                                                              ) => {
                                                                                if (
                                                                                  err
                                                                                ) {
                                                                                  console.log(
                                                                                    err
                                                                                  );
                                                                                  console.log(
                                                                                    "error while inserting into salary table"
                                                                                  );
                                                                                } else {
                                                                                  // console.log(JSON.parse(JSON.stringify(result))[0])
                                                                                  // res.send("Done");
                                                                                  // req.flash(
                                                                                  //     'success_msg',
                                                                                  //     'Employee found!'
                                                                                  // );
                                                                                  console.log(
                                                                                    "YAYYYYY"
                                                                                  );
                                                                                  console.log(
                                                                                    "i,length is ",
                                                                                    i,
                                                                                    length
                                                                                  );
                                                                                }
                                                                              }
                                                                            );
                                                                          }
                                                                        }
                                                                      );
                                                                    }
                                                                  }
                                                                );
                                                              }
                                                            }
                                                          );
                                                        }
                                                      }
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }

     //to get total number of employees
  mysqldb.query(`select count(*) from Employees`, (err, result) => {
    if (result.length === 0) {
      console.log("no employees");
    } else {
      // to make it async
      length = JSON.parse(JSON.stringify(result))[0]["count(*)"];
      var array = [];
      for (let i = 1; i < length + 1; i++) {
        array.push(i);
      }

      async.forEachOf(array, calculateSalary, function (err) {
        if (err) {
          console.error(err);
        } else {}
      });
    }
  });
  res.redirect("index1");
});



    router.post("/generateSalary", (req, res) => {
      console.log("body is", JSON.parse(JSON.stringify(req.body)));
      var length;
    
      function calculateSalary(item, i, callback) {
        //to choose config variables from database
        mysqldb.query(`select * from config`, (err, result) => {
          if (err) {
            console.log(err);
            console.log("error while select from config query");
          } else {
            // var da_MultFactor=JSON.parse(JSON.stringify(result))[0].da_MultFactor
            // var hra_MultFactor=JSON.parse(JSON.stringify(result))[0].hra_MultFactor
            // var ta=JSON.parse(JSON.stringify(result))[0].ta
            // var cca=JSON.parse(JSON.stringify(result))[0].cca
            var prov_fund_DNA = JSON.parse(JSON.stringify(result))[0].prov_fund_DNA;
            var prov_fund_Percent = JSON.parse(JSON.stringify(result))[0]
              .prov_fund_Percent;
            var prov_fund_Max = JSON.parse(JSON.stringify(result))[0].prov_fund_Max;
            var prof_tax_DNA = JSON.parse(JSON.stringify(result))[0].prof_tax_DNA;
            var prof_tax_Percent = JSON.parse(JSON.stringify(result))[0]
              .prof_tax_Percent;
            var prof_tax_Max = JSON.parse(JSON.stringify(result))[0].prof_tax_Max;
            var rev_stamp_DNA = JSON.parse(JSON.stringify(result))[0].rev_stamp_DNA;
            var rev_stamp_max = JSON.parse(JSON.stringify(result))[0].rev_stamp_max;
    
            // for (let i = 1; i < length+1; i++) {
    
            //to get employee specific properties for calculation
            mysqldb.query(
              `select pay,gp,pf,empID,ta,cca,hra,da from Employees ORDER BY empID LIMIT ${i},1`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  console.log("error in select query of Employee");
                } else {
                  console.log(result);
                  var empID = JSON.parse(JSON.stringify(result))[0].empID;
                  var gp = parseInt(JSON.parse(JSON.stringify(result))[0].gp);
                  var pf = parseInt(JSON.parse(JSON.stringify(result))[0].pf);
                  var pay = parseInt(JSON.parse(JSON.stringify(result))[0].pay);
                  var ta_temp = parseInt(JSON.parse(JSON.stringify(result))[0].ta);
                  var cca_temp = parseInt(
                    JSON.parse(JSON.stringify(result))[0].cca
                  );
                  var da_MultFactor = parseFloat(
                    JSON.parse(JSON.stringify(result))[0].da
                  );
                  var hra_MultFactor = parseFloat(
                    JSON.parse(JSON.stringify(result))[0].hra
                  );
    
                  console.log(JSON.parse(JSON.stringify(result))[0]);
                  console.log(
                    "gp,pf,bp,da,hra selected for empid",
                    gp,
                    pf,
                    pay,
                    da_MultFactor,
                    hra_MultFactor,
                    empID
                  );
    
                  var diff = 0;
                  var oth_spl = 0;
                  var adv_deduction = 0;
                  var prof_tax;
                  var in_tax = 3000;
                  var rev_stmp = 1;
                  var sal_adv = 0;
                  var da = (pay + parseFloat(gp)) * da_MultFactor;
                  console.log("da is", da);
                  var hra = (pay + parseFloat(gp)) * hra_MultFactor;
                  console.log("hra is", hra);
    
                  var month = JSON.parse(
                    JSON.stringify(req.body)
                  ).month.toLowerCase();
    
    
    
                  var year = parseInt(JSON.parse(JSON.stringify(req.body)).year);
    
                  //to calculate hra_dda_differences
                  mysqldb.query(
                    `select * from hra_difference where empID='${empID}' and month='${month}' and year=${year}`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        console.log("invalid select from hra_difference query");
                      } else {
                        var hra_final_difference = 0;
                        if (result.length === 0) {} else {
                          var data = JSON.parse(JSON.stringify(result))[0];
                          console.log("Data is", data);
                          var hra_difference = data.difference;
                          var hra_duration = data.duration;
                          var monthNames = [
                            "january",
                            "february",
                            "march",
                            "april",
                            "may",
                            "june",
                            "july",
                            "august",
                            "september",
                            "october",
                            "november",
                            "december",
                          ];
                          // for(let j=1;j<duration+1;j++)
                          function hraLoop(item, j, callback) {
                            var temp_month =
                              monthNames[
                                monthNames.indexOf(data.month.toLowerCase()) - j - 1
                              ].toLowerCase();
    
                            mysqldb.query(
                              `select bp,gp from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                  console.log("for loop error for hra difference");
                                } else {
                                  if (result.length === 0) {
                                    console.log(
                                      "hra difference is not calculated for month",
                                      month,
                                      "for empID",
                                      empID
                                    );
                                  } else {
                                    var data = JSON.parse(
                                      JSON.stringify(result)
                                    )[0];
                                    hra_final_difference +=
                                      (data.bp + data.gp) * hra_difference;
                                  }
                                }
                              }
                            );
                          }
                          var hraArray = [];
                          for (let i = 1; i < hra_duration + 1; i++) {
                            hraArray.push(i);
                          }
                          async.forEachOf(hraArray, hraLoop, function (err) {
                            if (err) {
                              console.error(err);
                            } else {
                              console.log(
                                "Done with hra difference for empid",
                                empID
                              );
                            }
                          });
                          // hra_final_difference=(pay+gp)*hra_difference*hra_duration/100
                          // hra_final_difference=(pay+gp)*hra_difference*hra_duration
                        }
                        mysqldb.query(
                          `select * from da_difference where empID='${empID}' and month='${month}' and year=${year}`,
                          (err, result) => {
                            if (err) {
                              console.log(err);
                              console.log("invalid select from d_difference query");
                            } else {
                              var da_final_difference = 0;
                              if (result.length === 0) {} else {
                                var data = JSON.parse(JSON.stringify(result))[0];
                                var da_difference = data.difference;
                                var da_duration = data.duration;
                                var monthNames = [
                                  "january",
                                  "february",
                                  "march",
                                  "april",
                                  "may",
                                  "june",
                                  "july",
                                  "august",
                                  "september",
                                  "october",
                                  "november",
                                  "december",
                                ];
                                // for(let j=1;j<duration+1;j++)
                                function daLoop(item, k, callback) {
                                  var temp_month =
                                    monthNames[
                                      monthNames.indexOf(data.month.toLowerCase()) -
                                      k -
                                      1
                                    ].toLowerCase();
    
                                  mysqldb.query(
                                    `select bp,gp from Salary where empID='${empID}' and month='${temp_month}' and year=${year}`,
                                    (err, result) => {
                                      if (err) {
                                        console.log(err);
                                        console.log(
                                          "for loop error for da difference"
                                        );
                                      } else {
                                        if (result.length === 0) {} else {
                                          var data = JSON.parse(
                                            JSON.stringify(result)
                                          )[0];
                                          da_final_difference +=
                                            (data.bp + data.gp) * da_difference;
                                        }
                                      }
                                    }
                                  );
                                }
                                var daArray = [];
                                for (let i = 1; i < da_duration + 1; i++) {
                                  daArray.push(i);
                                }
                                async.forEachOf(daArray, daLoop, function (err) {
                                  if (err) {
                                    console.error(err);
                                  } else {
                                    console.log(
                                      "Done with da difference for empid",
                                      empID
                                    );
                                  }
                                });
    
                                // da_final_difference=(pay+gp)*da_difference*da_duration/100
                                // da_final_difference=(pay+gp)*da_difference*da_duration
                              }
    
                              //variable to calc advances
                              mysqldb.query(
                                `select * from advance_temp where empID='${empID}'`,
                                (err, result) => {
                                  if (err) {
                                    console.log(err);
                                    console.log(
                                      "error in select from advance_temp query"
                                    );
                                  } else {
                                    console.log(
                                      "results after advance temp is",
                                      result
                                    );
    
                                    var month_num = 0;
                                    var days;
                                    if (month.toLowerCase() === "january") {
                                      days = 31;
                                      month_num = 1;
                                    } else if (month.toLowerCase() === "february") {
                                      if (
                                        (0 == year % 4 && 0 != year % 100) ||
                                        0 == year % 400
                                      ) {
                                        days = 29;
                                      } else {
                                        days = 28;
                                      }
    
                                      month_num = 2;
                                    } else if (month.toLowerCase() === "march") {
                                      days = 31;
                                      month_num = 3;
                                    } else if (month.toLowerCase() === "april") {
                                      days = 30;
                                      month_num = 4;
                                    } else if (month.toLowerCase() === "may") {
                                      days = 31;
                                      month_num = 5;
                                    } else if (month.toLowerCase() === "june") {
                                      days = 30;
                                      month_num = 6;
                                    } else if (month.toLowerCase() === "july") {
                                      days = 31;
                                      month_num = 7;
                                    } else if (month.toLowerCase() === "august") {
                                      days = 31;
                                      month_num = 8;
                                    } else if (
                                      month.toLowerCase() === "september"
                                    ) {
                                      days = 30;
                                      month_num = 9;
                                    } else if (month.toLowerCase() === "october") {
                                      days = 31;
                                      month_num = 10;
                                    } else if (month.toLowerCase() === "november") {
                                      days = 30;
                                      month_num = 11;
                                    } else if (month.toLowerCase() === "december") {
                                      days = 31;
                                      month_num = 12;
                                    }
                                    if (
                                      JSON.parse(
                                        JSON.stringify(result.length === 0)
                                      )
                                    ) {} else {
                                      var results = JSON.parse(
                                        JSON.stringify(result)
                                      )[0];
                                      console.log(
                                        "in else of advance, results is",
                                        results
                                      );
                                      var adv_amount = results.amount;
    
                                      var monthNames = [
                                        "january",
                                        "february",
                                        "march",
                                        "april",
                                        "may",
                                        "june",
                                        "july",
                                        "august",
                                        "september",
                                        "october",
                                        "november",
                                        "december",
                                      ];
    
                                      var adv_month = monthNames.indexOf(
                                        results.month.toLowerCase()
                                      );
                                      var adv_year = results.year;
                                      var adv_duration = results.duration;
                                      var adv_outstanding = results.outstanding;
    
                                      console.log(
                                        "year,month in advanced",
                                        year,
                                        month_num
                                      );
                                      console.log(
                                        "adv_year,adv_month,adv_duration is",
                                        adv_year,
                                        adv_month,
                                        adv_duration
                                      );
                                      if (year >= adv_year) {
                                        // var curr_month=new Date().getMonth()+1
                                        // if(month_num>=adv_month)
                                        // {
                                        //if duration isn't over yet
                                        var extra = 0;
                                        if (adv_month > month_num - 1) {
                                          if (year === adv_year + 1) {
                                            if (
                                              (adv_month + adv_duration) % 12 >
                                              month_num - 1
                                            ) {
                                              if (adv_month == month_num - 1) {
                                                extra = adv_amount % adv_duration;
                                              }
                                              adv_deduction =
                                                Math.floor(
                                                  adv_amount / adv_duration
                                                ) + extra;
                                              console.log(
                                                "advance deducted!",
                                                adv_deduction,
                                                "for empID",
                                                empID
                                              );
                                            }
                                          }
                                        } else {
                                          if (
                                            adv_month + adv_duration >
                                            month_num - 1
                                          ) {
                                            if (year === adv_year) {
                                              if (adv_month == month_num - 1) {
                                                extra = adv_amount % adv_duration;
                                              }
                                              adv_deduction =
                                                Math.floor(
                                                  adv_amount / adv_duration
                                                ) + extra;
                                              console.log(
                                                "advance deducted!",
                                                adv_deduction,
                                                "for empID",
                                                empID
                                              );
                                            }
                                          }
                                        }
                                        //independant query
                                        mysqldb.query(
                                          `update advance_temp set outstanding=outstanding-${adv_deduction} where empID='${empID}'`,
                                          (err, result) => {
                                            if (err) {
                                              console.log(err);
                                              console.log(
                                                "error in advance temp table query"
                                              );
                                            } else {
                                              console.log(
                                                "outstanding updated in advance_temp"
                                              );
                                            }
                                            if (
                                              parseInt(
                                                adv_outstanding - adv_deduction
                                              ) === 0
                                            ) {
                                              mysqldb.query(
                                                `insert into advance (empID,amount,month,year,duration,outstanding) values ('${empID}',${adv_amount},${adv_month},${adv_year},${adv_duration},${
                                                  adv_outstanding - adv_deduction
                                                })`,
                                                (err, result) => {
                                                  if (err) {
                                                    console.log(err);
                                                    console.log(
                                                      "error in advance permanent table query"
                                                    );
                                                  } else {
                                                    mysqldb.query(
                                                      `delete from advance_temp where empID='${empID}'`,
                                                      (err, result) => {
                                                        if (err) {
                                                          console.log(err);
                                                          console.log(
                                                            "error in deletion of advance temp table query"
                                                          );
                                                        } else {}
                                                      }
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        );
    
                                        // }
                                      }
                                    }
    
                                    var groupInsurance = 0;
                                    mysqldb.query(
                                      `select groupInsurance from group_insurance natural join Employees where Employees.empID='${empID}' and month='${month}' and year=${year}`,
                                      (err, result) => {
                                        if (err) {
                                          console.log(err);
                                          console.log(
                                            "error in groupinsurance table read query"
                                          );
                                        } else {
                                          console.log(
                                            "group insurance read result",
                                            result
                                          );
    
                                          if (result.length === 0) {} else {
                                            groupInsurance += JSON.parse(
                                              JSON.stringify(result)
                                            )[0].groupInsurance;
                                          }
                                          console.log(
                                            "group insurance is",
                                            groupInsurance,
                                            "for empID",
                                            empID
                                          );
                                          //to get lwp data for calculating part of deduction value
                                          // console.log(`select days,lwp from lwp where empID='${empID}' and month=${month} and year=${year}`);
    
                                          var prev =
                                          monthNames[
                                            monthNames.indexOf(data.month.toLowerCase()) - 1
                                          ].toLowerCase();
    
                                          if (prev === "january") {
                                            prevdays = 31;
                                          } else if (prev === "february") {
                                            if ((0 == data.year % 4 && 0 != data.year % 100) || 0 == data.year % 400) {
                                              prevDays = 29;
                                            } else {
                                              prevDays = 28;
                                            }
                                          } else if (prev === "march") {
                                            prevdays = 31;
                                          } else if (prev === "april") {
                                            prevdays = 30;
                                          } else if (prev === "may") {
                                            prevdays = 31;
                                          } else if (prev === "june") {
                                            prevdays = 30;
                                          } else if (prev === "july") {
                                            prevdays = 31;
                                          } else if (prev === "august") {
                                            prevdays = 31;
                                          } else if (prev === "september") {
                                            prevdays = 30;
                                          } else if (prev === "october") {
                                            prevdays = 31;
                                          } else if (prev === "november") {
                                            prevdays = 30;
                                          } else if (prev === "december") {
                                            prevdays = 31;
                                          }
                                          mysqldb.query(
                                            `select lwp.days as days,IFNULL(lwp.lwp,0) as lwp,IFNULL(late.latedays,0) as latedays
                                            from lwp lwp left outer join late_attendance late on (lwp.empID=late.empID) 
                                            where lwp.empID="${empID}" and lwp.year=${year} and lwp.month="${prev}"
                                             union all select lwp.days as days,IFNULL(lwp.lwp,0) as lwp,IFNULL(late.latedays,0) as latedays 
                                             from late_attendance late left outer join lwp lwp on (late.empID=lwp.empID) 
                                             where late.empID="${empID}" and late.year=${year} and late.month="${prev}"`,
                                            (err, result) => {
                                              if (err) {
                                                console.log(err);
                                                console.log(
                                                  "invalid select from lwp query"
                                                );
                                              } else {
                                                // var month=JSON.parse(JSON.stringify(req.body)).month
                                                // var year=JSON.parse(JSON.stringify(req.body)).year
                                                // var days;
                                                var lwp = 0;
                                                var late_days = 0;
                                                if (result.length === 0) {} else {
                                                  console.log(
                                                    "RESULT FOR LWPPP",
                                                    JSON.parse(
                                                      JSON.stringify(result)
                                                    )
                                                  );
                                                  lwp = JSON.parse(
                                                    JSON.stringify(result)
                                                  )[0].lwp;
                                                  late_days = JSON.parse(
                                                    JSON.stringify(result)
                                                  )[0].latedays;
                                                  // lwp+=late_days;
                                                }
    
                                                var daysOfMonth = prevdays;
                                                console.log("days are", prevdays);
    
                                                var workedDays =
                                                  daysOfMonth - lwp - late_days;
                                                var original_pay = pay;
                                                var original_gp = gp;
                                                pay *= workedDays / daysOfMonth;
                                                gp *= workedDays / daysOfMonth;
                                                da *= workedDays / daysOfMonth;
                                                hra *= workedDays / daysOfMonth;
                                                // ta_temp=ta;
                                                // cca_temp=cca;
                                                ta_temp *= workedDays / daysOfMonth;
                                                cca_temp *=
                                                  workedDays / daysOfMonth;
                                                console.log(
                                                  "TA,cca ISSS",
                                                  ta_temp,
                                                  cca_temp
                                                );
                                                console.log(
                                                  "pay,gp,da,hra,ta_temp,cca_temp 1",
                                                  pay,
                                                  gp,
                                                  da,
                                                  hra,
                                                  ta_temp,
                                                  cca_temp,
                                                  "for empID",
                                                  empID
                                                );
    
                                                var pfcheck =
                                                  (prov_fund_Percent / 100) *
                                                  (pay + gp + da);
                                                if (pf > pfcheck) {
                                                  pf = pfcheck;
                                                }
                                                if (pf > prov_fund_Max) {
                                                  pf = prov_fund_Max;
                                                }
                                                if (pf < prov_fund_DNA) {
                                                  pf = 0;
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
    
                                                // oth_spl+=parseInt(adv_deduction);
                                                oth_spl += parseInt(groupInsurance);
                                                diff +=
                                                  parseInt(hra_final_difference);
                                                console.log(
                                                  "pay,gp,da,hra,ta_temp,cca_temp 2",
                                                  pay,
                                                  gp,
                                                  da,
                                                  hra,
                                                  ta_temp,
                                                  cca_temp,
                                                  "for empID",
                                                  empID
                                                );
    
                                                console.log(
                                                  "hra difference is",
                                                  hra_final_difference,
                                                  "for empID",
                                                  empID
                                                );
                                                diff +=
                                                  parseInt(da_final_difference);
                                                console.log(
                                                  "da difference is",
                                                  da_final_difference,
                                                  "for empID",
                                                  empID
                                                );
    
                                                console.log("logging");
                                                var gross_sal =
                                                  pay +
                                                  parseFloat(gp) +
                                                  parseFloat(da) +
                                                  parseFloat(hra) +
                                                  parseFloat(cca_temp) +
                                                  parseFloat(diff) +
                                                  parseFloat(ta_temp);
                                                console.log(
                                                  "gross salary,days of month,lwp are",
                                                  gross_sal,
                                                  daysOfMonth,
                                                  lwp,
                                                  "for empID",
                                                  empID
                                                );
    
                                                if (gross_sal > 10000) {
                                                  prof_tax = 200;
                                                } else if (
                                                  gross_sal > 7500 &&
                                                  gross_sal < 10000
                                                ) {
                                                  prof_tax = 175;
                                                } else if (gross_sal < 7500) {
                                                  prof_tax = 0;
                                                }
    
                                                if (prof_tax > prof_tax_Max) {
                                                  prof_tax = prof_tax_Max;
                                                }
                                                if (prof_tax < prof_tax_DNA) {
                                                  prof_tax = 0;
                                                }
                                                if (gross_sal < rev_stamp_DNA) {
                                                  rev_stmp = 0;
                                                }
                                                if (rev_stmp > rev_stamp_max) {
                                                  rev_stmp = rev_stamp_max;
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
    
                                                console.log(
                                                  "pay,gp,da,hra,ta_temp,cca_temp 3",
                                                  pay,
                                                  gp,
                                                  da,
                                                  hra,
                                                  ta_temp,
                                                  cca_temp,
                                                  "for empID",
                                                  empID
                                                );
                                                mysqldb.query(
                                                  `select * from miscellaneous where empID='${empID}' and month='${month}' and year=${year}`,
                                                  (err, result) => {
                                                    if (err) {
                                                      console.log(err);
                                                      console.log(
                                                        "error while selecting from miscellaneous table"
                                                      );
                                                    } else {
                                                      var miscellaneous_deduction = 0;
                                                      if (result.length === 0) {} else {
                                                        var data = JSON.parse(
                                                          JSON.stringify(result)
                                                        )[0];
                                                        miscellaneous_deduction =
                                                          data.miscellaneous_amt;
                                                      }
                                                      oth_spl += parseInt(
                                                        miscellaneous_deduction
                                                      );
                                                      console.log(
                                                        "pay,gp,da,hra,ta_temp,cca_temp 4",
                                                        pay,
                                                        gp,
                                                        da,
                                                        hra,
                                                        ta_temp,
                                                        cca_temp,
                                                        "for empID",
                                                        empID
                                                      );
    
                                                      console.log(
                                                        "miscellaneous deductions is",
                                                        miscellaneous_deduction,
                                                        "for empID",
                                                        empID
                                                      );
    
                                                      mysqldb.query(
                                                        `select * from increment_difference where empID='${empID}' and month='${month}' and year=${year}`,
                                                        (err, result) => {
                                                          if (err) {
                                                            console.log(err);
                                                            console.log(
                                                              "error while calculating from increment difference table,select query"
                                                            );
                                                          } else {
                                                            if (
                                                              result.length == 0
                                                            ) {
                                                              console.log(
                                                                "for empid",
                                                                empID,
                                                                "not found in increment difference",
                                                                month,
                                                                year
                                                              );
                                                            } else {
                                                              var durationIncrement =
                                                                JSON.parse(
                                                                  JSON.stringify(
                                                                    result
                                                                  )
                                                                )[0].duration;
                                                              var startMonth = JSON.parse(JSON.stringify(result))[0].start_month;
                                                              var startYear = JSON.parse(JSON.stringify(result))[0].start_year;
                                                              var monthNames = [
                                                                "january",
                                                                "february",
                                                                "march",
                                                                "april",
                                                                "may",
                                                                "june",
                                                                "july",
                                                                "august",
                                                                "september",
                                                                "october",
                                                                "november",
                                                                "december",
                                                              ];
                                                              // for(let j=1;j<duration+1;j++)
                                                              //take latest increment value
                                                              mysqldb.query(
                                                                `select * from increment where empID='${empID}' order by year desc,month desc limit 1`,
                                                                (err, result) => {
                                                                  if (err) {
                                                                    console.log(
                                                                      err
                                                                    );
                                                                    console.log(
                                                                      "error while calculating from increment table,select query"
                                                                    );
                                                                  } else {
                                                                    var finalIncrement = 0;
                                                                    if (
                                                                      result.length ===
                                                                      0
                                                                    ) {
                                                                      console.log(
                                                                        "no prior increment history"
                                                                      );
                                                                    } else {
                                                                      var increment =
                                                                        JSON.parse(
                                                                          JSON.stringify(
                                                                            result
                                                                          )
                                                                        )[0]
                                                                        .increment;
                                                                      var prevPay =
                                                                        JSON.parse(
                                                                          JSON.stringify(
                                                                            result
                                                                          )
                                                                        )[0]
                                                                        .prevPay;
    
                                                                      function incrementLoop(
                                                                        item,
                                                                        j,
                                                                        callback
                                                                      ) {
                                                                        //var temp_month = monthNames[monthNames.indexOf(month.toLowerCase()) - j - 1].toLowerCase();
                                                                        var indexUsed = (monthNames.indexOf(startMonth) + j);
    
                                                                        var temp_month = monthNames[indexUsed % 12].toLowerCase();
                                                                        var temp_year;
                                                                        if (indexUsed >= 12) {
                                                                          temp_year = startYear + 1;
                                                                        } else {
                                                                          temp_year = startYear;
                                                                        }
    
    
    
    
                                                                        mysqldb.query(
                                                                          `select workedDays,daysOfMonth from Salary where empID='${empID}' and month='${temp_month}' and year=${temp_year}`,
                                                                          (
                                                                            err,
                                                                            result
                                                                          ) => {
                                                                            if (
                                                                              err
                                                                            ) {
                                                                              console.log(
                                                                                err
                                                                              );
                                                                              console.log(
                                                                                "for loop error for increment difference"
                                                                              );
                                                                            } else {
                                                                              if (
                                                                                result.length === 0
                                                                              ) {
                                                                                console.log(
                                                                                  "not found for month",
                                                                                  temp_month,
                                                                                  "for empId",
                                                                                  empID
                                                                                );
                                                                              } else {
                                                                                var data =
                                                                                  JSON.parse(
                                                                                    JSON.stringify(
                                                                                      result
                                                                                    )
                                                                                  )[0];
                                                                                var workedDays =
                                                                                  data.workedDays;
                                                                                var daysOfMonth =
                                                                                  data.daysOfMonth;
                                                                                var incrementvalue =
                                                                                  (prevPay +
                                                                                    original_gp) *
                                                                                  (increment /
                                                                                    100);
                                                                                if (
                                                                                  Math.floor(
                                                                                    incrementvalue
                                                                                  ) %
                                                                                  10 ===
                                                                                  0
                                                                                ) {} else {
                                                                                  incrementvalue =
                                                                                    Math.ceil(
                                                                                      incrementvalue /
                                                                                      10
                                                                                    ) *
                                                                                    10;
                                                                                }
                                                                                incrementvalue *=
                                                                                  workedDays /
                                                                                  daysOfMonth;
                                                                                var toAddValue =
                                                                                  (hra_MultFactor +
                                                                                    da_MultFactor) *
                                                                                  incrementvalue;
                                                                                finalIncrement =
                                                                                  Math.ceil(
                                                                                    toAddValue +
                                                                                    incrementvalue
                                                                                  );
                                                                                diff +=
                                                                                  parseInt(
                                                                                    finalIncrement
                                                                                  );
                                                                                console.log(
                                                                                  "calculated increment difference for empID",
                                                                                  empID,
                                                                                  "for month",
                                                                                  temp_month
                                                                                );
                                                                              }
                                                                            }
                                                                          }
                                                                        );
                                                                      }
                                                                      var incrementArray = [];
                                                                      for (
                                                                        let i = 1; i <
                                                                        durationIncrement +
                                                                        1; i++
                                                                      ) {
                                                                        incrementArray.push(
                                                                          i
                                                                        );
                                                                      }
                                                                      async.forEachOf(
                                                                        incrementArray,
                                                                        incrementLoop,
                                                                        function (
                                                                          err
                                                                        ) {
                                                                          if (err) {
                                                                            console.error(
                                                                              err
                                                                            );
                                                                          } else {}
                                                                        }
                                                                      );
    
                                                                      // var durationIncrement=JSON.parse(JSON.stringify())
                                                                      console.log(
                                                                        "increment difference is ",
                                                                        finalIncrement,
                                                                        "for empID",
                                                                        empID
                                                                      );
                                                                      console.log(
                                                                        "pay,gp,da,hra,ta_temp,cca_temp 5",
                                                                        pay,
                                                                        gp,
                                                                        da,
                                                                        hra,
                                                                        ta_temp,
                                                                        cca_temp,
                                                                        "for empID",
                                                                        empID
                                                                      );
                                                                    }
                                                                  }
                                                                }
                                                              );
                                                            }
                                                            mysqldb.query(
                                                              `select * from donation where empID='${empID}'`,
                                                              (err, result) => {
                                                                if (err) {
                                                                  console.log(err);
                                                                  console.log(
                                                                    "error while selecting from donation table"
                                                                  );
                                                                } else {
                                                                  if (
                                                                    result.length ===
                                                                    0
                                                                  ) {
                                                                    console.log(
                                                                      "no donations for employee with empID",
                                                                      empID
                                                                    );
                                                                  } else {
                                                                    var donationDays =
                                                                      JSON.parse(
                                                                        JSON.stringify(
                                                                          result
                                                                        )
                                                                      )[0]
                                                                      .donationDays;
                                                                    var amount =
                                                                      (gross_sal /
                                                                        daysOfMonth) *
                                                                      donationDays;
                                                                    oth_spl +=
                                                                      parseInt(
                                                                        amount
                                                                      );
                                                                    console.log(
                                                                      "donation amount is ",
                                                                      amount,
                                                                      "for empID ",
                                                                      empID
                                                                    );
                                                                  }
                                                                  mysqldb.query(
                                                                    `select * from recovery where empID='${empID}' and month='${month}' and year=${year}`,
                                                                    (
                                                                      err,
                                                                      result
                                                                    ) => {
                                                                      if (err) {
                                                                        console.log(
                                                                          err
                                                                        );
                                                                        console.log(
                                                                          "error while selecting from recovery table"
                                                                        );
                                                                      } else {
                                                                        if (
                                                                          result.length ===
                                                                          0
                                                                        ) {
                                                                          console.log(
                                                                            "no recovery for employee with empID",
                                                                            empID
                                                                          );
                                                                        } else {
                                                                          var recovery =
                                                                            JSON.parse(
                                                                              JSON.stringify(
                                                                                result
                                                                              )
                                                                            )[0]
                                                                            .recoveryAmount;
    
                                                                          oth_spl +=
                                                                            parseInt(
                                                                              recovery
                                                                            );
                                                                          console.log(
                                                                            "recovery amount is ",
                                                                            recovery,
                                                                            "for empID ",
                                                                            empID
                                                                          );
                                                                          console.log(
                                                                            "pay,gp,da,hra,ta_temp,cca_temp 6",
                                                                            pay,
                                                                            gp,
                                                                            da,
                                                                            hra,
                                                                            ta_temp,
                                                                            cca_temp,
                                                                            "for empID",
                                                                            empID
                                                                          );
                                                                        }
                                                                        mysqldb.query(
                                                                          `select * from income_tax where empID='${empID}' ORDER BY STR_TO_DATE(CONCAT(year, month, ' 01'), '%Y %M %d') desc limit 1`,
                                                                          (
                                                                            err,
                                                                            result
                                                                          ) => {
                                                                            if (
                                                                              err
                                                                            ) {
                                                                              console.log(
                                                                                err
                                                                              );
                                                                              console.log(
                                                                                "error while selecting from income_tax table"
                                                                              );
                                                                            } else {
                                                                              var tds = 0;
                                                                              if (
                                                                                result.length ===
                                                                                0
                                                                              ) {
                                                                                console.log(
                                                                                  "pay,gp,da,hra,ta_temp,cca_temp 7",
                                                                                  pay,
                                                                                  gp,
                                                                                  da,
                                                                                  hra,
                                                                                  ta_temp,
                                                                                  cca_temp,
                                                                                  "for empID",
                                                                                  empID
                                                                                );
    
                                                                                console.log(
                                                                                  "no income_tax for employee with empID",
                                                                                  empID
                                                                                );
                                                                              } else {
                                                                                tds =
                                                                                  JSON.parse(
                                                                                    JSON.stringify(
                                                                                      result
                                                                                    )
                                                                                  )[0]
                                                                                  .tds_per_month;
    
                                                                                // oth_spl+=tds
                                                                                console.log(
                                                                                  "tds is ",
                                                                                  tds,
                                                                                  "for empID ",
                                                                                  empID
                                                                                );
                                                                                //independant query
                                                                                mysqldb.query(
                                                                                  `update income_tax set balance=balance-tds_per_month where empID='${empID}' and month='${month}' and year=${year}`,
                                                                                  (
                                                                                    err,
                                                                                    result
                                                                                  ) => {
                                                                                    if (
                                                                                      err
                                                                                    ) {
                                                                                      console.log(
                                                                                        err
                                                                                      );
                                                                                      console.log(
                                                                                        "error while updating income_tax table"
                                                                                      );
                                                                                    } else {
                                                                                      console.log(
                                                                                        "updated balance in income_tax table for empID",
                                                                                        empID
                                                                                      );
                                                                                    }
                                                                                  }
                                                                                );
                                                                              }
                                                                              var total_ded =
                                                                                parseFloat(
                                                                                  pf
                                                                                ) +
                                                                                parseFloat(
                                                                                  prof_tax
                                                                                ) +
                                                                                parseFloat(
                                                                                  rev_stmp
                                                                                ) +
                                                                                parseFloat(
                                                                                  oth_spl
                                                                                ) +
                                                                                tds; //+parseFloat(lwp_amt);
                                                                              var net_sal =
                                                                                parseFloat(
                                                                                  gross_sal
                                                                                ) -
                                                                                parseFloat(
                                                                                  total_ded
                                                                                );
    
                                                                              console.log(
                                                                                "pay,gp,da,hra,ta_temp,cca_temp 8    ",
                                                                                pay,
                                                                                gp,
                                                                                da,
                                                                                hra,
                                                                                ta_temp,
                                                                                cca_temp,
                                                                                "for empID",
                                                                                empID
                                                                              );
    
                                                                              console.log(
                                                                                `INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,original_pay,bp,original_gp,gp,pf,other_deductions) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${tds}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${original_pay},${pay},${original_gp},${gp},${pf},${oth_spl})`
                                                                              );
                                                                              mysqldb.query(
                                                                                `INSERT INTO Salary (empID, month, year, da, hra, cca, diff, oth_spl, daysOfMonth, lwp, workedDays, ta, prof_tax, in_tax, sal_adv, rev_stmp, gross_sal, total_ded, net_sal,original_pay,bp,original_gp,gp,pf,other_deductions,advance) VALUES ('${empID}', '${month}', ${year}, ${da}, ${hra}, ${cca_temp}, ${diff}, ${oth_spl}, ${daysOfMonth}, ${lwp}, ${workedDays}, ${ta_temp}, ${prof_tax}, ${tds}, ${sal_adv}, ${rev_stmp}, ${gross_sal}, ${total_ded}, ${net_sal},${original_pay},${pay},${original_gp},${gp},${pf},${oth_spl},${adv_deduction})`,
                                                                                (
                                                                                  err,
                                                                                  result
                                                                                ) => {
                                                                                  if (
                                                                                    err
                                                                                  ) {
                                                                                    console.log(
                                                                                      err
                                                                                    );
                                                                                    console.log(
                                                                                      "error while inserting into salary table"
                                                                                    );
                                                                                  } else {
                                                                                    // console.log(JSON.parse(JSON.stringify(result))[0])
                                                                                    // res.send("Done");
                                                                                    // req.flash(
                                                                                    //     'success_msg',
                                                                                    //     'Employee found!'
                                                                                    // );
                                                                                    console.log(
                                                                                      "YAYYYYY"
                                                                                    );
                                                                                    console.log(
                                                                                      "i,length is ",
                                                                                      i,
                                                                                      length
                                                                                    );
                                                                                  }
                                                                                }
                                                                              );
                                                                            }
                                                                          }
                                                                        );
                                                                      }
                                                                    }
                                                                  );
                                                                }
                                                              }
                                                            );
                                                          }
                                                        }
                                                      );
                                                    }
                                                  }
                                                );
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    
      //to get total number of employees
      mysqldb.query(`select count(*) from Employees`, (err, result) => {
        if (result.length === 0) {
          console.log("no employees");
        } else {
          // to make it async
          length = JSON.parse(JSON.stringify(result))[0]["count(*)"];
          var array = [];
          for (let i = 1; i < length + 1; i++) {
            array.push(i);
          }
    
          async.forEachOf(array, calculateSalary, function (err) {
            if (err) {
              console.error(err);
            } else {}
          });
        }
      });
      res.redirect("index1");
    });