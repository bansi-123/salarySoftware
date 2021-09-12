
module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('Employee', {	
	  empID: {
            type: Sequelize.STRING,
            //  autoIncrement: true,
            primaryKey: true
      },
	  empName: {
			type: Sequelize.STRING
	  },
	  uan: {
			type: Sequelize.INTEGER
	  },
	  dept: {
			type: Sequelize.STRING
	  },
	designation:{
		type: Sequelize.STRING

	},
	pay:{
		type: Sequelize.INTEGER

	},
	gp:{
		type: Sequelize.INTEGER

	}, 
	pf:{
		type: Sequelize.DECIMAL

	}, 
	bankAccNum:{
		type: Sequelize.STRING

	},
	bankName:{
		type: Sequelize.STRING

	}, 
	doj:{
		type: Sequelize.DATE

	}, 
	salaryCategory:{
		type: Sequelize.STRING
		
	},
	ifscCode:{
		type: Sequelize.STRING
	},
	groupInsurance:{
		type: Sequelize.INTEGER
	},
	payBand:{
		type: Sequelize.STRING
	},
	designationCategory:{
		type: Sequelize.STRING
	},
	branchName:{
		type: Sequelize.STRING
	},
	emailID:{
		type: Sequelize.STRING
	},
	emailID2:{
		type: Sequelize.STRING
	},
	
	nonteach:{
		type: Sequelize.STRING
	},
	Subject:{
		type: Sequelize.STRING
	},   
	cca:{
		type: Sequelize.STRING
	},   
	ta:{
		type: Sequelize.STRING
	} , 
	dop :{
		type: Sequelize.DATE
	} , 
	doc:{
		type: Sequelize.DATE
	}   ,
	appointment :{
		type: Sequelize.STRING
	}  , 
	category:{
		type: Sequelize.STRING
	} ,  
	gender:{
		type: Sequelize.STRING
	} , 
	status:{
		type: Sequelize.STRING
	},
	  mobile:{
		type: Sequelize.INTEGER
	},  
    address_correspondence:{
		type: Sequelize.STRING
	} ,  
	address_permanent:{
		type: Sequelize.STRING
	} , 
	vacation:{
		type: Sequelize.STRING
	}  , 
	seniority:{
		type: Sequelize.STRING
	},  
	dept_seniority:{
		type: Sequelize.STRING
	} ,
	 aadhar:{
		type: Sequelize.INTEGER
	} , 
	Pan_No:{
		type: Sequelize.INTEGER
	},   
	onrole :{
		type: Sequelize.STRING
	} , 
	phd:{
		type: Sequelize.STRING
	} ,
	 phdSub:{
		type: Sequelize.STRING
	} ,
	phdUni:{
		type: Sequelize.STRING
	} ,
	phdInsti:{
		type: Sequelize.STRING
	},
	   phdYr:{
		type: Sequelize.STRING
	},  
	pgSub:{
		type: Sequelize.STRING
	},
	  pgUni:{
		type: Sequelize.STRING
	},
	pgYr:{
		type: Sequelize.STRING
	},
	ugSub:{
		type: Sequelize.STRING
	},
	ugUni:{
		type: Sequelize.STRING
	},
	ugYr:{
		type: Sequelize.STRING
	},
	grade:{
		type: Sequelize.STRING
	},
	netset:{
		type: Sequelize.STRING
	},
	othqual:{
		type: Sequelize.STRING
	},
	exp:{
		type: Sequelize.STRING
	},
	industry_exp:{
		type: Sequelize.STRING
	},
	uni_approval:{
		type: Sequelize.STRING
	},
	uni_app_date:{
		type: Sequelize.DATE
	},
	uni_app_period:{
		type: Sequelize.INTEGER
	},
	workexNT:{
		type: Sequelize.INTEGER
	},
	dob:{
		type: Sequelize.DATE
	},
	investment:{
		type: Sequelize.INTEGER
	},
	emp_temp_regime:{
		type: Sequelize.STRING
	},
	age:{
		type: Sequelize.INTEGER
	},
	photo:{
		type: Sequelize.STRING
	},
	paycommission:{
		type: Sequelize.STRING
	}

	});
  

	return Employee;
}
//empID	empName	uan	dept	designation	pay	gp	pf	bankAccNum	bankName	doj	salaryCategory

//empID	empName	uan	dept	designation	pay	gp	pf	bankAccNum	bankName	doj	salaryCategory
